package Hopguard::Controller::Admin;
use Moose;
use namespace::autoclean;

BEGIN {extends 'Catalyst::Controller'; }

=head1 NAME

Hopguard::Controller::Admin - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut

sub base : Chained('/') PathPart('admin') CaptureArgs(0) {
    my ( $self, $c ) = @_;

	$c->log->debug("*** Inside Admin::Base");

	my $customerid = $c->user->{'customer'};

## TODO allow to access admin interface only if user role is customeradmin / customersuperadmin
#	my $role = $c->user->{'roles'};

	$c->stash(
			customerid	=>	$customerid,
		);
	
}

=head1 AUTHOR

Nishant Sharma,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

__PACKAGE__->meta->make_immutable;

1;
