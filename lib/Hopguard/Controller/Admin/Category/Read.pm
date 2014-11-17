package Hopguard::Controller::Admin::Category::Read;
use Moose;
use namespace::autoclean;

BEGIN {extends 'Catalyst::Controller'; }

=head1 NAME

Hopguard::Controller::Admin::Category::Read - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut

#sub index : Chained('/admin/base') PathPart('category/read') Args(0) {
#    my ( $self, $c ) = @_;
#    $c->response->body('Matched' );
#}

## Subroutine to return Supercategory and Category name for a search domain/url

## Subrouting to list all domains/urls for a User Defined category
sub get_details :Chained('/admin/base') PathPart('category/details') Args(1) {
	my ( $self, $c, $category_name ) = @_;

	my $db = $c->model('HopMongo')->db;

## Expect category name from UI. Get customer ID from the user.
	my $customer = $c->stash->{customerid};
	#my $category_name = $c->request->parameters->{category};

	my $category = $db->categories->find_one({'$and' => [Tie::IxHash->new(name => $category_name, customer => $customer)]});

	$c->log->debug("*** Category ID: " . $category->{_id});

	my %cat_hash = (
			id			=>	$category->{_id}->value,
			name 		=>	$category->{name},
			description	=>	$category->{desc},
			domains		=>	$category->{domains},
			urls		=>	$category->{urls}
		);

	$c->stash->{json}->{category} = \%cat_hash;

	$c->forward('View::JSON');
}

## Subroutine to list all the Supercategories and their Categories along with Description
sub list : Chained('/admin/base') PathPart('category/list') Args(0) {
	my ( $self, $c ) = @_;

	my $db = $c->model('HopMongo')->db;
	my $super_cat_cur = $db->supercategories->find()->sort({name => 1});

	my @categories_res;

	if($super_cat_cur){
		while (my $supercategory = $super_cat_cur->next){
			
				my (@global_cats, @userdef_cats);

				$c->log->debug("**** Supercategory: " . $supercategory->{name});

				my %cat_hash = (
					id			=>	$supercategory->{_id}->value,
					name		=>	$supercategory->{name},
					description	=>	$supercategory->{desc},
					tag			=>	$supercategory->{tag},
				);

			foreach ($supercategory->{categories}){
#### WORKAROUND - To be fixed later
#### Why it is returning array inside arrays?
				foreach my $category (@$_){

					$c->log->debug("**** Searching for category: " . $category);

	## First get global categories
					if($supercategory->{name} ne "User Defined"){

						my $query = 
						my $category = $db->categories->find_one({'$and' => [Tie::IxHash->new( _id => $category, customer => 0)] },
									{name => 1, desc => 1});
						push @global_cats , {
								id			=>	$category->{_id}->value,
								name		=>	$category->{name},
								description	=>	$category->{desc}
						};
						$c->log->debug("**** Found: " . $category->{name});
					}
	## Then get User Defined categories
					else{
						my $category = $db->categories->find_one({'$and' => [Tie::IxHash->new(_id => $category, customer => $c->stash->{customerid})]},
									{"name" => 1, "desc" => 1});
						push @userdef_cats, {
							id			=>	$category->{_id}->value,
							name		=>	$category->{name},
							description	=>	$category->{desc}
						};
					
					}
				}
			}

			my @cats = (@global_cats, @userdef_cats);
		
			$cat_hash{categories} = \@cats;
			push @categories_res, \%cat_hash;

		}
	}

	$c->stash->{json}->{supercategories} = \@categories_res;
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
