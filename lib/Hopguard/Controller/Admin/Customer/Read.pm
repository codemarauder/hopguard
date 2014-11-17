package Hopguard::Controller::Admin::Customer::Read;
use Moose;
use namespace::autoclean;

BEGIN { extends 'Catalyst::Controller'; }

=head1 NAME

Hopguard::Controller::Admin::Customer::Read - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut

sub index :Path :Args(0) {
    my ( $self, $c ) = @_;

    $c->response->body('Matched Hopguard::Controller::Admin::Customer::Read in Admin::Customer::Read.');
}

sub details : Chained('/admin/base') PathPart('customer/details') Args(0){
	my ( $self, $c ) = @_;

	my $db = $c->model('HopMongo')->db;
	my $customerid = $c->user->{customer};

	my $customer = $db->customers->find_one({_id => $customerid});
	my %customer_hash = (
				id						=>	$customer->{_id}->value,
				name					=>	$customer->{name},
				address					=>	$customer->{address},
				city					=>	$customer->{city},
				state					=>	$customer->{state},
				country					=>	$customer->{country},
				zip						=>	$customer->{zip},
				techcontact				=>	$customer->{techcontact},
				techcontactemail		=>	$customer->{techcontactemail},
				techcontactphone		=>	$customer->{techcontactphone},
				accountscontact			=>	$customer->{accountscontact},
				accountscontactemail	=>	$customer->{accountscontactemail},
				accountscontactphone	=>	$customer->{accountscontactphone},
				serviceinfo				=>	$customer->{serviceinfo}
			);

	$c->stash->{json}->{customer} = \%customer_hash;
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
