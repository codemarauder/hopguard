package Hopguard::Controller::Admin::Location::Read;
use Moose;
use namespace::autoclean;
use Data::Dumper;

BEGIN { extends 'Catalyst::Controller'; }

=head1 NAME

Hopguard::Controller::Admin::Location::Read - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut

#sub index :Path :Args(0) {
#    my ( $self, $c ) = @_;
#
#    $c->response->body('Matched Hopguard::Controller::Admin::Location::Read in Admin::Location::Read.');
#}

sub list : Chained('/admin/base') PathPart('location/list') Args(0){
	my ( $self, $c ) = @_;

	my $db = $c->model('HopMongo')->db;
	my $customerid = $c->user->{customer};

	$c->log->debug("*** Searching locations for customerid " . $customerid);

	my $location_cur = $db->locations->find({customer => $customerid})->sort({name => 1});
	my @location_arr;

	while ( my $location = $location_cur->next ){
		$c->log->debug("*** Found location " . $location->{name});
		my %location_hash = ( 
						id			=> $location->{_id}->value,
						name 		=> $location->{name},
						description => $location->{desc},
						ipaddress	=> $location->{ipaddr},
						authenabled	=> $location->{authenabled}
					);
		push @location_arr, \%location_hash;
	}

	$c->stash->{json}->{locations} = \@location_arr;
	$c->forward('View::JSON');
}


=head1 AUTHOR

Nishant Sharma,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

__PACKAGE__->meta->make_immutable;

1;
