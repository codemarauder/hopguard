use strict;
use warnings;
use Test::More;


use Catalyst::Test 'Hopguard';
use Hopguard::Controller::Admin::Customer::Read;

ok( request('/admin/customer/read')->is_success, 'Request should succeed' );
done_testing();
