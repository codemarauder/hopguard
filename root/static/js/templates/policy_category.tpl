<div class="container-fluid">
	<div class="row-fluid">
		<div class="span8">
			<div id="autoSuperCategoryCollectionDisplay" style="margin-left=auto"><img src="/static/img/ajax-loader-2.gif" id="ajaxLoaderCategory"/></div>
		</div><!--/span8 -->
		<div class="span4 well">
			<div class="row-fluid">
				<div class="span12">
					<p>Lookup URL</p>
					<form class="form-inline" id="lookupForm">
						<div class="control-group">
							<div class="controls">
								<span>http(s)://</span>
							  <input type="text" class="input-xsmall required" data-provide="typeahead" data-items="4" data-source="[&quot;Alabama&quot;,&quot;Alaska&quot;,&quot;Arizona&quot;,&quot;Arkansas&quot;,&quot;California&quot;,&quot;Colorado&quot;,&quot;Connecticut&quot;,&quot;Delaware&quot;,&quot;Florida&quot;,&quot;Georgia&quot;,&quot;Hawaii&quot;,&quot;Idaho&quot;,&quot;Illinois&quot;,&quot;Indiana&quot;,&quot;Iowa&quot;,&quot;Kansas&quot;,&quot;Kentucky&quot;,&quot;Louisiana&quot;,&quot;Maine&quot;,&quot;Maryland&quot;,&quot;Massachusetts&quot;,&quot;Michigan&quot;,&quot;Minnesota&quot;,&quot;Mississippi&quot;,&quot;Missouri&quot;,&quot;Montana&quot;,&quot;Nebraska&quot;,&quot;Nevada&quot;,&quot;New Hampshire&quot;,&quot;New Jersey&quot;,&quot;New Mexico&quot;,&quot;New York&quot;,&quot;North Dakota&quot;,&quot;North Carolina&quot;,&quot;Ohio&quot;,&quot;Oklahoma&quot;,&quot;Oregon&quot;,&quot;Pennsylvania&quot;,&quot;Rhode Island&quot;,&quot;South Carolina&quot;,&quot;South Dakota&quot;,&quot;Tennessee&quot;,&quot;Texas&quot;,&quot;Utah&quot;,&quot;Vermont&quot;,&quot;Virginia&quot;,&quot;Washington&quot;,&quot;West Virginia&quot;,&quot;Wisconsin&quot;,&quot;Wyoming&quot;]" id="lookup_url" name="lookup_url">
								<button type="submit" class="btn">Look UP!</button>
							</div>
						</div>
					</form>
				</div><!--/span12 -->
			</div><!--/row fluid -->
			<div class="row-fluid">
				<div class="span12">
					<p>Lookup URL</p>
					<div id="userdefinedcategorylisting"> </div>
				</div><!--/span12 -->
			</div><!--/row fluid -->		
		</div><!--/span4 -->
	</div><!--/row fluid -->
</div><!--/container fluid -->

<script type="text/html" id="autoSuperCategoryCollectionDisplayTemplate">
	<div class="row-fluid">
		<div class="span12">
			<div class="row-fluid">
				<div class="span6">
					<p>Manage Categories</p>
				</div><!--/span6 -->						
				<div class="span6">
				</div><!--/span6 -->	
			</div><!--/row fluid -->						
		</div><!--/span12 -->
	</div><!--/row fluid -->					
	<div class="row-fluid">
		<div class="span12">
			<div class="accordion" id="autoSuperCategoryAccordian">
					<div id="superCategoryItemDisplay"></div>					
			</div><!--/accordian2 -->
		</div><!--/span12 -->
	</div><!--/row fluid -->	
</script>

<script type="text/html" id="autoSuperCategoryItemDisplayTemplate">
	<div class="accordion-group">
		<div class="accordion-heading">
			<a class="accordion-toggle" data-toggle="collapse" data-parent="#autoSuperCategoryAccordian" href="#{{id}}"> 
				<span>{{name}}</span>
				<p>{{description}}</p>
			</a>
		</div> <!--/accordian heading -->
		<div id="{{id}}" class="accordion-body collapse">
			<div class="accordion-inner">
				<ul>
					{{#categories}}
					<li>{{name}} , {{description}}</li>
					{{/categories}}
				</ul>
			</div> <!--/accordian inner -->
		</div><!--/accordian body -->
	</div> <!--/accordian group -->
</script>


<script type="text/html" id="userSuperCategoryItemDisplayTemplate">
	<span>{{name}}</span>
	<p>{{description}}</p>
	<ul>
		{{#categories}}
		<li>{{name}} , {{description}}</li>
		{{/categories}}
	</ul>
</script>




