use strict;
use warnings;
use Test::More;

BEGIN { use_ok 'Catalyst::Test', 'Hopguard' }
BEGIN { use_ok 'Hopguard::Controller::Admin::Policy::Read' }

ok( request('/admin/policy/read')->is_success, 'Request should succeed' );
done_testing();
