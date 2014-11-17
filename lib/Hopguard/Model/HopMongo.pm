package Hopguard::Model::HopMongo;

use Moose;
BEGIN { extends 'Catalyst::Model::MongoDB' };

__PACKAGE__->config(
	host => '127.0.0.1',
	port => '27017',
	dbname => 'hopguard',
	collectionname => '',
	gridfs => '',
);

=head1 NAME

Hopguard::Model::HopMongo - MongoDB Catalyst model component

=head1 SYNOPSIS

See L<Hopguard>.

=head1 DESCRIPTION

MongoDB Catalyst model component.

=head1 AUTHOR

Nishant Sharma,,,

=head1 LICENSE

This library is free software; you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

no Moose;
__PACKAGE__->meta->make_immutable;

1;
