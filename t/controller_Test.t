use strict;
use warnings;
use Test::More;


use Catalyst::Test 'Hopguard';
use Hopguard::Controller::Test;

ok( request('/test')->is_success, 'Request should succeed' );
done_testing();
