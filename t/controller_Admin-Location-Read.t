use strict;
use warnings;
use Test::More;


use Catalyst::Test 'Hopguard';
use Hopguard::Controller::Admin::Location::Read;

ok( request('/admin/location/read')->is_success, 'Request should succeed' );
done_testing();
