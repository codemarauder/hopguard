use strict;
use warnings;
use Test::More;


use Catalyst::Test 'Hopguard';
use Hopguard::Controller::Hopguard::Test;

ok( request('/hopguard/test')->is_success, 'Request should succeed' );
done_testing();
