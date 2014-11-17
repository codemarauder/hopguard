package Hopguard::Controller::Admin::User::Read;
use Moose;
use namespace::autoclean;

BEGIN { extends 'Catalyst::Controller'; }

=head1 NAME

Hopguard::Controller::Admin::User::Read - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut

sub index :Path :Args(0) {
    my ( $self, $c ) = @_;

    $c->response->body('Matched Hopguard::Controller::Admin::User::Read in Admin::User::Read.');
}

sub loggedin : Chained('/admin/base') PathPart('user/loggedin') Args(0){
	my ( $self, $c ) = @_;

	my $db = $c->model('HopMongo')->db;

	my %user_hash = (
			id			=>	$c->user->{_id}->value,
			fullname	=>	$c->user->{fullname},
			roles		=>	$c->user->{roles},
			email		=>	$c->user->{email}
		);

	$c->stash->{json}->{logged_user} = \%user_hash;
	$c->forward('View::JSON');
}

sub groupslist : Chained('/admin/base') PathPart('group/list') Args(0){
	my ( $self, $c ) = @_;

	my $db = $c->model('HopMongo')->db;

	my $groups_cur = $db->groups->find({customer => $c->user->{customer}},{name => 1});
	my @groups_res;
	while (my $group = $groups_cur->next){
		my %group_hash = (
				id			=>	$group->{_id}->value,
				name		=>	$group->{name},
				description	=>	$group->{desc},
			);

		$c->log->debug("*** Group ID " . $group->{_id});
		my $user_cur = $db->users->find({'$and' => [Tie::IxHash->new(customer => $c->user->{customer}, groups => $group->{_id})]});

		my @users;
		while (my $user = $user_cur->next){
			$c->log->debug("*** Found user " . $user->{username});
			push @users, { username => $user->{username}, id => $user->{_id}->value, fullname => $user->{fullname}};
		}

		$group_hash{users} = \@users;
		push @groups_res, \%group_hash;
	}

	$c->stash->{json}->{allgroups} = \@groups_res;
	$c->forward('View::JSON');
}

sub list : Chained('/admin/base') PathPart('user/list') Args(0){
	my ( $self, $c ) = @_;

	my $db = $c->model('HopMongo')->db;

	my $customerid = $c->user->{customer};
	my $user_cur = $db->users->find({customer => $customerid});

	my @user_arr;

	while (my $user = $user_cur->next){
		my %user_hash = (
			id			=>	$user->{_id}->value,
			fullname	=>	$user->{fullname},
			username	=>	$user->{username},
			email		=>	$user->{email},
		);

		my @groups_arr;

		foreach ($user->{groups}){
			my $group = $db->groups->find_one({_id => @$_}); ### Array ref needs to be searched - TRICK
			$c->log->debug("**** Group " . $group->{name});
			push @groups_arr, { id => $group->{_id}->value, name => $group->{name}};
		}

		$user_hash{groups} = \@groups_arr;
		push @user_arr, \%user_hash;
	}

	$c->stash->{json}->{allusers} = \@user_arr;
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
