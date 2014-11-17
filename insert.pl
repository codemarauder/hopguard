#!/usr/bin/perl -w

use MongoDB;
use MongoDB::OID;

if($#ARGV < 1){
	print "Usage: $ARGV[0] category_name domains_list_file\n";
	exit;
}

my ($category, $domains_list) = @ARGV;

my $conn = MongoDB::Connection->new(host => 'localhost', port => 27017);
my $db = $conn->hopguard;

my $categories = $db->categories;

$categories->update({"name" => $category},{'$set'} => {'name' => $category, 'desc' => "Automatically created by import", 'customer' => 0},{'upsert' => 1});

open(DOMAINS, $domains_list) || die "Could not open file $domains_list: $!\n";
while (<DOMAINS>){
	chomp;
	print $_ . "\n";
	$categories->update({'name' => $category}, 
				{'$push' => {'domains' => { 'value' => $_ }}}, {'upsert' => 1} );
}

exit 0;
