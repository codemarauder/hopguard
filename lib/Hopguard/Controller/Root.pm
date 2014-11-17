package Hopguard::Controller::Root;
use Moose;
use namespace::autoclean;

BEGIN { extends 'Catalyst::Controller' }

#
# Sets the actions in this controller to be registered with no prefix
# so they function identically to actions created in MyApp.pm
#
__PACKAGE__->config(namespace => '');

=head1 NAME

Hopguard::Controller::Root - Root Controller for Hopguard

=head1 DESCRIPTION

[enter your description here]

=head1 METHODS

=head2 auto

The auto routing configuration

=cut

sub auto :Private {
	my ($self, $c) = @_;
	
	$c->log->debug("*** Inside Auto ***");

	if($c->user_exists){
		if($c->request->path eq ""){
			$c->response->redirect($c->uri_for('/ui/'));
		}
		$c->log->debug("*** User exists. Returning 1 ***");
		return 1;
	}
	if($c->controller eq $c->controller('Login')){
		if($c->user_exists){
			$c->response->redirect($c->uri_for('/ui/'));
			return 1;
		}
		return 1;
	}
	if(!$c->user_exists){
		$c->log->debug("*** User does not exist. Redirecting to Login ***");
		$c->response->redirect($c->uri_for("/login"));
#		$c->flash->{redirect_after_login} = '' . $c->req->uri;
		return 0;
	}
	return 1;
}

=head2 index

The root page (/)

=cut

sub index :Path :Args(0) {
    my ( $self, $c ) = @_;
	
	$c->stash(error_msg => "Login to begin");
	$c->stash(template => "login.tt");
}

=head2 default

Standard 404 error page

=cut

sub default :Path {
    my ( $self, $c ) = @_;
    $c->response->body( 'Page not found' );
    $c->response->status(404);
}

=head2 end

Attempt to render a view, if needed.

=cut

sub end : ActionClass('RenderView') {}

=head1 AUTHOR

Nishant Sharma,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

__PACKAGE__->meta->make_immutable;

1;
