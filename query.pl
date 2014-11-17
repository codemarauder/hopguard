#!/usr/bin/perl -w

use MongoDB;
use MongoDB::OID;

my $conn = MongoDB::Connection->new(host => 'localhost', port => 27017);
my $db = $conn->hopguard;

my $all_locations = $db->locations->find({customer => 1});

while (my $doc = $all_locations->next){
	print "$doc->{name}, $doc->{ipaddr}\n";
}

exit 0;
