package Hopguard::View::HTML;

use strict;
use warnings;

use base 'Catalyst::View::TT';

__PACKAGE__->config(
	TEMPLATE_EXTENSION => '.tt',
	INCLUDE_PATH => [
		Hopguard->path_to( 'root', 'static', 'templates' ),
	],
#	WRAPPER => 'layouts/wrapper',
	render_die => 1,
#	DEBUG   => 'all',
);

=head1 NAME

Hopguard::View::HTML - TT View for Hopguard

=head1 DESCRIPTION

TT View for Hopguard.

=head1 SEE ALSO

L<Hopguard>

=head1 AUTHOR

Nishant Sharma,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
