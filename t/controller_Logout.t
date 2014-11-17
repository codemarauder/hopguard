use strict;
use warnings;
use Test::More;

BEGIN { use_ok 'Catalyst::Test', 'Hopguard' }
BEGIN { use_ok 'Hopguard::Controller::Logout' }

ok( request('/logout')->is_success, 'Request should succeed' );
done_testing();
