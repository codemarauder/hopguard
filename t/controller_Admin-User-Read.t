use strict;
use warnings;
use Test::More;


use Catalyst::Test 'Hopguard';
use Hopguard::Controller::Admin::User::Read;

ok( request('/admin/user/read')->is_success, 'Request should succeed' );
done_testing();
