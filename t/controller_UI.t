use strict;
use warnings;
use Test::More;

BEGIN { use_ok 'Catalyst::Test', 'Hopguard' }
BEGIN { use_ok 'Hopguard::Controller::UI' }

ok( request('/ui')->is_success, 'Request should succeed' );
done_testing();
