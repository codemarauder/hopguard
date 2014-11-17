package Hopguard::Backend::PfSense::VPN;
use Moose::Role;
use LWP;
use HTML::TableExtract;
use HTTP::Cookies;

requires qw( cpe user pass browser );

sub openvpn_status {
	my $self = shift;
	my $login = $self->_login($self);
	if($login){
		my $browser = $self->browser;
		my $cpe = $self->cpe;
		my $domain = "https://" . $cpe;
		my $response = $browser->get("$domain/status_openvpn.php");

		my $te = HTML::TableExtract->new( attribs => {
									class => "tabcont sortable"
										}
									);
		$te->parse($response->content);
		my (@result);
		foreach my $ts (($te->tables)){
			foreach my $row ($ts->rows){
				next if (!$row->[0] || $row->[0] =~ /UNDEF/ || $row->[0] =~ /Name$/ || $row->[3] =~ /(\d+)\.(\d+)\.(\d+)\.(\d+)/);
				$self->_cleanup(@$row);
				my %result_hash;
				$result_hash{commonname} = $row->[0];
				$result_hash{realaddress} = $row->[1];
				$result_hash{virtualaddress} = $row->[2];
				$result_hash{connectedsince} = $row->[3];
				$result_hash{bytestx} = $row->[4];
				$result_hash{bytesrx} = $row->[5];
				#print join(',', @$row) . "\n";
				push @result, \%result_hash;    
			}
		}
               
		return \@result;
	}
	else{
		return 0;
	}
}

1;
