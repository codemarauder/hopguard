package Hopguard::Controller::Admin::Policy::Read;
use Moose;
use namespace::autoclean;

BEGIN {extends 'Catalyst::Controller'; }

=head1 NAME

Hopguard::Controller::Admin::Policy::Read - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut

sub list :Chained('/admin/base') :PathPart('policy/list') :Args(0) {
    my ( $self, $c ) = @_;

	my $db = $c->model('HopMongo')->db;

	my $all_acls = $db->acls->find({customer => $c->stash->{customerid}})->sort({position => 1});
	my @results;
	if($all_acls){
		while (my $acl = $all_acls->next){
			my @times;
			my $time = $acl->{times};
			foreach (@$time){
				my $day = $_->{days};
				my $days;
				foreach (@$day){
					$days .= $_;
				}
				$days = 'Everyday' if $days eq 'MTWHFAS';
				$days = 'Weekdays' if $days eq 'MTWHF';
				$days = 'Weekends' if $days eq 'AS';
				push @times, $_->{name} . ": " . $days . " " . sprintf("%04u", $_->{timeon}) . "-" . $_->{timeoff};
			}
			push @results, {
				id			=> $acl->{_id}->value,
				position	=> $acl->{position},
				name		=> $acl->{name},
				desc		=> $acl->{desc},
				users		=> $acl->{users},
				groups		=> $acl->{groups},
				locations	=> $acl->{locations},
				destinations => $acl->{destinations},
				method		=> $acl->{method},
				mimes		=> $acl->{mimes},
				times		=> \@times,
				access		=> $acl->{access}
			};
		}
	}

#	$c->stash->{json}->{acls} = \@results;
	$c->stash->{json} = \@results;

	$c->forward('View::JSON');

    #$c->response->body('Matched Hopguard::Controller::Admin::Policy::Read in Admin::Policy::Read.');
}

=head1 AUTHOR

Nishant Sharma,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

__PACKAGE__->meta->make_immutable;

1;
