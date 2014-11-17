package Hopguard::Backend::PfSense::States;
use Moose::Role;
use LWP;
use HTML::TableExtract;
use HTTP::Cookies;

requires qw( cpe user pass browser );

sub states_status {
	my $self = shift;
	my $login = $self->_login($self);
	if($login){
		my $browser = $self->browser;
		my $cpe = $self->cpe;
		my $domain = "https://" . $cpe;
		my $response = $browser->get("$domain/diag_dump_states.php");

		my $te = HTML::TableExtract->new( attribs => {
									class => "tabcont sortable"
										}
									);
		$te->parse($response->content);
		my (@result);
		foreach my $ts (($te->tables)){
			foreach my $row ($ts->rows){
				next if ( $row->[0] =~ /Proto/ );
				$self->_cleanup(@$row);
				my %result_hash;
				$row->[1] =~ s/\s+//g;
				my @tmp;
				if ($row->[1] =~ /->/){
					@tmp = split(/->/, $row->[1]);
					if ($#tmp > 1){
						$result_hash{src}	= $tmp[0];
						$result_hash{nat}	= $tmp[1];
						$result_hash{dst}	= $tmp[2];
					}
					else {
						$result_hash{src}	= $tmp[0];
						$result_hash{nat}	= "";
						$result_hash{dst}	= $tmp[1];
					}
				}
				else {
					@tmp = split(/<-/, $row->[1]);
					if ($#tmp > 1){
						$result_hash{src}	= $tmp[2];
						$result_hash{nat}	= $tmp[1];
						$result_hash{dst}	= $tmp[0];
					}
					else {
						$result_hash{src}	= $tmp[1];
						$result_hash{nat} 	= "";
						$result_hash{dst} 	= $tmp[0];
					}

				}

				$result_hash{proto} = uc($row->[0]);
				$result_hash{state} = $row->[2];
				
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
