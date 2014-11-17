use strict;
use warnings;
use Test::More;

BEGIN { use_ok 'Catalyst::Test', 'Hopguard' }
BEGIN { use_ok 'Hopguard::Controller::Admin' }

ok( request('/admin')->is_success, 'Request should succeed' );
done_testing();
