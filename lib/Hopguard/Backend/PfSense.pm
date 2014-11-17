package Hopguard::Backend::PfSense;
use Moose;
use LWP;
use HTTP::Cookies;

use namespace::autoclean;

has 'cpe', is => 'rw';
has 'user', is => 'rw', isa => 'Str';
has 'pass', is => 'rw', isa => 'Str';
has 'browser', is => 'rw', isa => 'LWP::UserAgent', 
	default => sub { my $b = LWP::UserAgent->new(); $b->cookie_jar({}); return $b; };

with 'Hopguard::Backend::PfSense::VPN',
	 'Hopguard::Backend::PfSense::States',
	 ;

sub _login {
	my $self = shift;
	my $cpe = $self->cpe;
	my $user = $self->user;
	my $pass = $self->pass;
	my $browser = $self->browser;

	my $domain = "https://" . $cpe;

	#print "Attempting login to $domain as $user...\n";

	my $response = $browser->post(
						$domain,
						[
							'usernamefld'	=>	$user,
							'passwordfld'	=>	$pass,
							'login'			=>	'Login',
						],
					);
	if ($response->content =~ m/Enter username and password to login/){
		return 0;
	}
	else {
		return 1;
	}
}

sub _cleanup {
	for ( @_ ) {
		s/^\s+//g;
		s/\s+$//g;
		s/[\xa0 ]+\z//;
		s/\s+/ /g;
		s/\\n/ /g;
	}
}

__PACKAGE__->meta->make_immutable;
no Moose;

1;
