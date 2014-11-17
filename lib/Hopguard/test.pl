#!/usr/bin/perl

use strict;
use lib '/home/nishant/unmukti/hopbox-portal/Hopguard/lib';
use Hopguard::Backend::PfSense;

my $cpe = Hopguard::Backend::PfSense->new( "cpe" => "hopbox", "user" => "admin", "pass" => "pfsense");

my $rows = $cpe->states_status;

foreach my $row (@$rows){
	foreach my $key (keys %$row){
		print $key . " => " . $row->{$key}. "\n";
	}
	print "-\n";
}
