use strict;
use warnings;
use Test::More;

BEGIN { use_ok 'Catalyst::Test', 'Hopguard' }
BEGIN { use_ok 'Hopguard::Controller::Admin::Policy::Write' }

ok( request('/admin/policy/write')->is_success, 'Request should succeed' );
done_testing();
