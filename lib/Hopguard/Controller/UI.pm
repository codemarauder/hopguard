package Hopguard::Controller::UI;
use Moose;
use namespace::autoclean;

BEGIN {extends 'Catalyst::Controller'; }

=head1 NAME

Hopguard::Controller::UI - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut

sub index :Path :Args(0) {
    my ( $self, $c ) = @_;

	$c->stash(template => 'hopmon.tt');
}

sub xdreceiver : Chained('/') PathPart('xdreceiver') :Args(0){
    my ( $self, $c ) = @_;
    $c->stash(template => 'xdreceiver.tt');
}


=head1 AUTHOR

Nishant Sharma,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

__PACKAGE__->meta->make_immutable;

1;
