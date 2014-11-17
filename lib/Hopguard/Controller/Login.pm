package Hopguard::Controller::Login;
use Moose;
use namespace::autoclean;

BEGIN {extends 'Catalyst::Controller'; }

=head1 NAME

Hopguard::Controller::Login - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut

sub index :Path :Args(0) {
    my ( $self, $c ) = @_;

	## Get the username / password from the form
	my $username = $c->request->params->{username};
	my $password = $c->request->params->{password};

    $c->log->debug("*** INSIDE LOGIN ***");
    $c->log->debug("Got username " . $username);

	## If both the values are found in the form
	if($username && $password){
		$c->log->debug("Attempting authentication");
		## Attempt to login
		if($c->authenticate({
								username	=>	$username,
								password	=>	$password
							}) ){
			$c->change_session_id; ## PARANOID SETTING to avoid session fixation attacks
			$c->response->redirect($c->uri_for("/ui/"));
		#	$c->response->redirect($c->flash->{redirect_after_login});
			return;
		}
		else{
			# Set an error message
			$c->stash(error_msg => "Bad username or password.");
		}
	}
	elsif(!$c->user_exists){
			$c->stash(error_msg => "Provide your username and password to login.");
	}
	
	## Default action is to send to login page

  #  $c->response->body('Matched Hopguard::Controller::Login in Login.');

	$c->stash(template => 'login.tt');
}


=head1 AUTHOR

Nishant Sharma,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

__PACKAGE__->meta->make_immutable;

1;
