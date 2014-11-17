#!/usr/bin/perl -w

use MongoDB;
use MongoDB::OID;

$|=1;

my $DEBUG = 1;

my $conn = MongoDB::Connection->new(host => 'localhost', port => 27017);
my $db = $conn->hopguard;

my $location = $db->locations;
my $users = $db->users;
my $acls = $db->acls;
my $destinations = $db->categories;

while(<STDIN>) {

	chomp;

	my ($ACCESS, $MESSAGE);

	my ($cid, $login, $ext_user, $src, $dst, $url, $method, $xff, $req_mime, $rep_mime, $browser) = split(/\s+/);
	$cid =~ s/%(..)/pack("H*", $1)/ge;
	$url =~ s/%(..)/pack("H*", $1)/ge;
	$browser =~ s/%(..)/pack("H*", $1)/ge;
	$req_mime =~ s/%(..)/pack("H*", $1)/ge;
	$rep_mime =~ s/%(..)/pack("H*", $1)/ge;

	if ($DEBUG){
		print STDERR "$cid, $url, $src, $login, $ext_user, $method, $xff, $req_mime, $rep_mime, $browser\n";
	}

## Get customer ID from user
	print STDERR "Getting customer ID from user $login... " if $DEBUG;
	my $customer;
	my $user_customer = $users->find({login => $login})->limit(1);
	while (my $user_cursor = $user_customer->next){
		$customer = $user_cursor->{customer};
	}
	print STDERR "$customer\n" if $DEBUG;

## Get location from SRC
	print STDERR "Getting location from SRC $src... " if $DEBUG;
	my $location_name = "ALL";
	my $src_location = $location->find({src => $src})->limit(1);
	if($src_location){
		while (my $src_location_cursor = $src_location->next){
			$location_name = $src_location_cursor->{name};
		}
	}
	else{
		print STDERR "not found. Setting as " if $DEBUG;
	}
	print STDERR "$location_name\n" if $DEBUG;

## Get default ACL for customer
	print STDERR "Getting default ACL for customer... " if $DEBUG;
	my $default_acl = $acls->find({name => qr/default/i, customer => $customer});
	while (my $default_cursor = $default_acl->next){
		$ACCESS = OK if $default_cursor->{access} eq 'allow';
		$ACCESS = ERR if $default_cursor->{access} eq 'deny';
	}
	print STDERR "$ACCESS\n" if $DEBUG;

## Get default ACL for the location
	print STDERR "Getting default ACL for location $location_name... " if $DEBUG;
	my $location_default_acl = $acls->find({name => qr/default/i, customer => $customer, location => $location_name});
	if($location_default_acl){
		while (my $location_default_acl_cursor = $location_default_acl->next){
			$ACCESS = OK if $default_cursor->{access} eq 'allow';
			$ACCESS = ERR if $default_cursor->{access} eq 'deny';
		}
	}
	else{
		print STDERR "not found. Setting as " if $DEBUG;
	}
	print STDERR "$ACCESS\n";

## Get the categories of requested URL / DOMAIN
## Recursively
	my @acl_destinations;
	print STDERR "Getting category for requested domain/URL recursively... \n";
	while($dst){
		print STDERR "$dst -> " if $DEBUG;
		my $dst_categories = $destinations->find({"domains.value" => $dst});
		while (my $dst_cursor = $dst_categories->next) {
			push @acl_destinations, $dst_cursor->{name};
			print STDERR $dst_cursor->{name} . " " if $DEBUG;
		}
		if($dst =~ m/^(.*?)\.(.*)$/){
			$dst = $2;
			print STDERR "\n" if $DEBUG;
			next;
		}
		else { 
			print STDERR "\n" if $DEBUG;
			last;
		}
	}

## Get all the ACLs for user/group, destination
	print STDERR "Getting all the ACLs for $login\n" if $DEBUG;

	my $all_acls = $acls->find({users => $login, destinations => {'$in' => [@acl_destinations]}})->sort({position => 1});
	
	while (my $doc = $all_acls->next){
		print STDERR "$doc->{name}, $doc->{position}, $doc->{access}\n" if $DEBUG;
		$ACCESS = OK if $doc->{access} eq 'allow';
		$ACCESS = ERR if $doc->{access} eq 'deny';
	}

	print $cid . " " . $ACCESS . "\n";

}

exit 0;
