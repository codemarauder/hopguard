use strict;
use warnings;
use Test::More;

BEGIN { use_ok 'Catalyst::Test', 'Hopguard' }
BEGIN { use_ok 'Hopguard::Controller::Admin::Category::Write' }

ok( request('/admin/category/write')->is_success, 'Request should succeed' );
done_testing();
