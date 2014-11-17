use strict;
use warnings;
use Test::More;


use Catalyst::Test 'Hopguard';
use Hopguard::Controller::Admin::User::Write;

ok( request('/admin/user/write')->is_success, 'Request should succeed' );
done_testing();
