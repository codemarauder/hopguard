#!/usr/bin/perl 

use MongoDB;
use MongoDB::OID;

if($#ARGV < 2){
	print "Usage: $ARGV[0] server category_name domains_list_file\n";
	exit;
}

my ($server, $category, $domains_list) = @ARGV;

my $conn = MongoDB::Connection->new(host => $server, port => 27017); 
my $db = $conn->hopguard;

my $categories = $db->categories;

my $check = $categories->find_one({"name" => $category, "customer" => 0});
$categories->insert({'name' => $category, 'desc' => "Automatically created by import", 'customer' => 0}) if (!$check->{name});

open(DOMAINS, $domains_list) || die "Could not open file $domains_list: $!\n";
while (<DOMAINS>){
	chomp;
	print $_ . "\n";
	$categories->update({'name' => $category}, 
				{'$push' => {'domains' => { 'value' => $_ }}}, {'upsert' => 1} );
}

exit 0;
