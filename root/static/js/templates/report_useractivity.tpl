<div class="container-fluid">
	<!--Section Heading & Date Filter -->
	<div class="row-fluid">
		<!-- Hidden form to submit graph clicks -->
		<!-- <form style="display: hidden" action="????" method="POST" id="graphForm">
			<input type="hidden" id="graph_from_date" name="from_date" data-bind="value: $root.graphContextViewModel().fromDate()"/>
			<input type="hidden" id="graph_to_date" name="to_date" data-bind="value: graphContextViewModel().toDate()"/>
			<input type="hidden" id="graph_select_site" name="select_site" data-bind="value: $root.graphContextViewModel().filterSite()"/>
		</form> -->
		<!-- Title on the Page Context -->
		<div class="span3">
			<h3>User Activity - WebAccess Details</h3>
			<p>Showing webaccess activities for <span id="filteruserdisplay"></span></p>
		</div>
		<div class="span9">
			<!-- Calendar / Month / Year Selector -->
			<!--	<form method="post" data-ajax="false" submit="[% c.base %]">
				<p class="pull-right">
					Showing results within dates <input id="fromdate" class="date" type="text"  name="from_date"> and <input id="todate" class="date" type="text" name="to_date">
					<button class="submit">Change</button>
				</p>
			</form> -->
		</div>
	</div><!--/row-->

	<!--User Level Filters -->
	<div class="row-fluid well">
		<h4>Filter</h4>
		<form method="post" data-ajax="false" submit="????">
		<div class="span2">
			<input type="radio" id="hosts_radio" name="host_or_user" value="host" checked> By Hosts
			<input type="radio" id="users_radio" name="host_or_user" value="user" disabled> By Users
		</div>
		<!-- Add data-toggle="buttons-radio" for radio style toggling on btn-group
		<div class="btn-group span2" data-toggle="buttons-radio" data-bind="value">
			<button class="btn">By Hosts</button>
			<button class="btn">By Users</button>
		</div>-->
		<div class="span4">
			<select > <!--data-bind="options: availableUsers, selectedOptions: chosenUsers"-->
				<!-- <optgroup label="Users">
				</optgroup> select options:size="5" multiple="true"-->
			</select>
		</div>
		<div class="span4">
			<input type="radio" id="data_radio" name="data_or_surf" value="data" checked> By Data Usage
			<br/>
			<input type="radio" id="surf_radio" name="data_or_surf" value="surf" disabled> By Surfing Time
		</div>
		<div class="span2">
			<button class="submit">GO!</button>
		</div>
		</form>
	</div> <!--/row-->

	<!-- ***** Charts Start Here ***** -->
	<div class="row-fluid">
		<div class="span4" id="graph_4">
			<h4 class="handle">Content Types by %</h4>
				<div><p>This donut chart is showing different types of content acessed by [% filter_user %]. A high percentage of content types like <strong>video/</strong> or <strong>audio/</strong> indicates user spending substantial amount of his/her bandwidth on multimedia sites. Content type which account for less than 3% are combined into <strong>Others</strong>.</p></div>
				<div id="contentpiechart" style="width:;height:300px;">Loading graph...</div>
		</div>
		<div class="span4" id="graph_1">
			<h4 class="handle">Top Sites</h4>
				<div><p>This bar report displays top 25 sites (ordered by data transfer) accessed by [% filter_user %]. Hovering the mouse pointer on a bar will display a tooltip showing information about site and data transferred.</p></div>
				<div id="topsitesgraph" style="width:;height:300px;">Loading graph...</div>
		</div>
		<div class="span4" id="graph_2">
			<h4 class="handle">Top Downloads / Uploads</h4>
				<div><p>This bar report shows top 25 files (ordered by size) downloaded or uploaded by the user. Hovering the mouse pointer on a bar will display a tooltip mentioning the file's <strong>content type, date & time of download</strong> and <strong>size</strong>.</p></div>
				<div id="dlulgraph" style="width:;height:300px;">Loading graph...</div>
		</div>
	</div>
		<!--<div class="widget" id="graph_3">
			<h4 class="handle">Top Content Types</h4>
			<div id="contentbargraph" style="width:;height:500px;">Loading graph...</div>
		</div> -->

		<!-- Top Sites - type:Bar Chart G12 Grid -->
		<!--<div><h3>Top Sites</h3></div>
		<div class="span12" id="topsitesgraph" style="width:;height:500px;">Loading graph...</div>
		-->

		<!-- Top Downloads / Uploads - type:Bar Chart G12 Grid -->
		<!--<div><h3>Top Down/Uploads</h3></div>
		<div class="span12" id="dlulgraph" style="width:;height:500px;">Loading graph...</div>
		-->
		<!-- Top Content Type - type:Bar Chart G12 Grid -->
		<!--
		<div><h3>Top Content Type</h3></div>
		<div class="span12" id="contentbargraph" style="width:;height:500px;">Loading graph...</div>
		-->
		<!-- Top Content Type - type:Pie Chart G12 Grid -->
		<!--
		<div><h3>Content Type Distribution</h3></div>
		<div class="span12" id="contentpiechart" style="width:;height:500px">Loading graph...</div>
		-->
</div> <!--End User Activity Container -->
<!-- END OF Container for View Reports/User Activity Page ***************************************************************************************-->
