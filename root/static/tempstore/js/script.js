/* MODEL */

// MODEL - UserContext : Populates the menu and privileges according to the Logged in user
function UserContext(){
	var self = this;
	self.loading = ko.observableArray();
	self.username = ko.observable();
	self.email = ko.observable();
	self.roles = ko.observableArray();
	self.menuitems = ko.observableArray(MENU_ARRAY);

	self.loadUserContext = function() {
		self.loading.push(true);
		// Load the User Context Object
		try{
			$.getJSON(URL_LOGGED_USER, function(data) {
				console.log(data);
				self.username = data.logged_user.fullname;
				self.email = data.logged_user.email;
				self.roles.removeAll();
				$.each(data.logged_user.roles,function(key,val){
					var userRole = val;
					if(val === "customeradmin"){
							self.menuitems.push(MENU_ARRAY_ADMIN_OBJECT);
					}
					self.roles.push(userRole);
				});
			})
		}catch(e){
			alert("Error while mapping categories" + e);							
		}
		self.loading.pop();
	}
	self.loadUserContext();
}


// VIEW MODEL : CategoriesListViewModel: Context for the Enforce Policy/
function CategoryListViewModel() {
	var self = this;
	self.loading = ko.observableArray();
	// Encapsulating the entire form in a property, so we can use ko.mapping in a safe way.
	// If properties were directly on the model, we'd have to re-init model every time we
	// load data, which could lead to unwanted consequences.
	self.superCategories = ko.observableArray();

	self.save = function(form) {
	};

	self.loadSuperCategories = function() {
		self.loading.push(true);
		// Load the Categories object
		try{
			$.getJSON(URL_CATEGORY_LIST, function(data) {
				console.log(data);
				self.superCategories.removeAll();
				$.each(data.supercategories,function(key,val){
					var superCategory = ko.mapping.fromJS(val);
					self.superCategories.push(superCategory);
				});

		//		var loadedSuperCategories ={};
		//		ko.mapping.fromJS(data.supercategories,{},loadedSuperCategories);
		//		self.superCategories = loadedSuperCategories;
			})
		}catch(e){
			alert("Error while mapping categories" + e);							
		}
		self.loading.pop();
	}
}

/** VIEW MODELS **/
function DashboardViewModel() {
}


function CustUsersListViewModel(){
	var self = this;

	self.loading = ko.observableArray();

	self.userList = ko.observableArray();

	self.populateUserList = function (){
		self.loading.push(true);
		try{
			$.getJSON(URL_USERS_LIST, function(data) {
				console.log(data);
				self.userList.removeAll();
				$.each(data.allusers,function(key,val){
					var user = ko.mapping.fromJS(val);
					self.userList.push(user);
				});
			})
		}catch(e){
			alert("There was an error with the USER Mapping request " + e);
		}
		self.loading.pop();
	};	

	self.addUser = function (){
		
	};

	self.removeUser = function (){
		
	};

}



// VIEW MODEL : AclListViewModel : Context for the Enforce Policy/
function AclListViewModel() {
 	var self = this;
 	self.acls = ko.observableArray();
	self.populateAcls = function (){
		try{
			$.getJSON(URL_POLICY_LIST, function(data) {
				console.log(data);
				self.acls.removeAll();
				$.each(data,function(key,val){
					var aclItem = ko.mapping.fromJS(val);
					self.acls.push(aclItem);
				});
			})
		}catch(e){
			alert("There was an error with the Mapping request " + e);
		}
	};
}

// VIEW MODEL : AclListViewModel : Context for the Enforce Policy/
function LocationListViewModel() {
 	var self = this;
 	self.locations = ko.observableArray();
	self.populateLocations = function (){
		try{
			$.getJSON(URL_LOCATION_LIST, function(data) {
				console.log(data);
				self.locations.removeAll();
				$.each(data,function(key,val){
					var location = ko.mapping.fromJS(val);
					self.locations.push(location);
				});
			})
		}catch(e){
			alert("There was an error with the Location Mapping request " + e);
		}
	};
}




function GraphContextViewModel(){
	var self = this;
	var curDateTime = new Date();
	self.fromDate = ko.observable(curDateTime.getDate()-2+"-"+curDateTime.getMonth()+"-"+curDateTime.getFullYear());
	self.toDate = ko.observable(curDateTime.getDate()-1+"-"+curDateTime.getMonth()+"-"+curDateTime.getFullYear());
	self.userList = ko.observableArray();
	self.filterUser = ko.observable("John Doe");
	self.location = ko.observable();
	self.filterSite = ko.observable();
}


// The view model is an abstract description of the state of the UI, but without any knowledge of the UI technology (HTML)
function PageContextViewModel(userContext){
  // Page Application Context
  var self = this;
	self.userContext = ko.observable(userContext);
	self.chosenMenuContext = ko.observable();
	self.chosenMenuItem = ko.observable();
	self.subMenuItems = ko.observableArray();
	self.menuSubHeading = ko.observable();
	self.chosenSubMenuItem = ko.observable();
	self.chosenResourceContext = ko.computed(function() {return this.chosenMenuItem() + "-" + this.chosenSubMenuItem();}, this);

	// Child View Models
	self.aclListViewModel = ko.observable(new AclListViewModel());
	self.graphContextViewModel = ko.observable(new GraphContextViewModel());
	self.categoryListViewModel = ko.observable(new CategoryListViewModel());
	self.custUsersListViewModel = ko.observable(new CustUsersListViewModel());
    // Behaviours
  self.goToMenuItem = function(menuitem) {
		self.chosenMenuContext(menuitem)
		self.subMenuItems(menuitem.submenu);
		self.menuSubHeading(menuitem.subheading);
		self.chosenSubMenuItem(menuitem.submenu[0]);
		location.hash = menuitem.name;
	};
  self.goToSubMenuItem = function(submenuitem) {
		self.chosenSubMenuItem(submenuitem);
		location.hash = self.chosenMenuItem() + '/' + submenuitem;
	};

	// Client-side routes
	Sammy(function() {
		this.get('#:menuitem', function() {
//			self.chosenMenuContext(match(self.userContext().menuitems(),this.params.menuitem));
			self.chosenMenuContext(self.userContext().menuitems.filterByProperty("name",this.params.menuitem)()[0]);
			self.subMenuItems(self.chosenMenuContext().submenu);
			self.menuSubHeading(self.chosenMenuContext().subheading);
			self.chosenMenuItem(self.chosenMenuContext().name);
			self.chosenSubMenuItem(self.subMenuItems()[0]);
		});

		this.get('#:menuitem/:submenuitem', function() {
			self.chosenMenuContext(self.userContext().menuitems.filterByProperty("name",this.params.menuitem)()[0]);
			self.chosenMenuItem(self.chosenMenuContext().name);
			self.subMenuItems(self.chosenMenuContext().submenu);
			self.menuSubHeading(self.chosenMenuContext().subheading);
			self.chosenSubMenuItem(this.params.submenuitem);
		});

		this.get('', function() { this.app.runRoute('get', '#Dashboard') });

		this.post('#/test', function() {
			$("#registerForm").submit(function(event) {
				/* stop form from submitting normally */
				event.preventDefault(); 
				if($("#registerForm").validate().form()){
					/* get some values from elements on the page: */
					var $form = $( this ),
							name = $form.find( 'input[name="name"]' ).val(),
							email = $form.find( 'input[name="email"]' ).val(),
							serial = $form.find( 'input[name="serial"]' ).val(),
							url = "/test";

					var newDrive = new CustomCategory(name,email,serial);
					var jsonData = ko.toJSON(newDrive);
					/* Send the data using post and put the results in a div */
					$.post( url, jsonData, function(data ) {
								$("#registerForm").hide();
								$("#resultSuccess").show(); 
						}
					);
				}
			});
		});

		this.after(function(){
			// Do stuff according to path
			switch (self.chosenMenuItem())
			{
				case "Dashboard":
				  switch (self.chosenSubMenuItem())
					{
						case "Overview":
							self.aclListViewModel().populateAcls();
						  break;
						case "Item 01":
						  break;
						case "Item 02":
						  break;
						case "Item 03":
						  break;
					}
				  break;
				case "View Reports":
				  switch (self.chosenSubMenuItem())
					{
						case "User Activity":						
						  plot("/static/data/top_content_type_by_user.json","#contentpiechart","pie");
						  plot("/static/data/top_sites_by_user.json","#topsitesgraph","bar");
						  plot("/static/data/top_downloads_by_user.json","#dlulgraph","bar");
						  break;
						case "Item 11":
						  break;
						case "Item 12":
						  break;
						case "Item 13":
						  break;
					}
				  break;
				case "Enforce Policies":
				  switch (self.chosenSubMenuItem())
					{
						case "Manage Categories":
							self.categoryListViewModel().loadSuperCategories();								
						  break;
						case "Manage TimeSlots":
						  break;
						case "URL Filtering":
							self.aclListViewModel().populateAcls();
						  break;
						case "Web 2.0 Filtering":
						  break;
					}
				  break;
				case "Administer":
				  switch (self.chosenSubMenuItem())
					{
						case "General Info":
						  break;
						case "Manage Locations":
						  break;
						case "Manage Users":
							self.custUsersListViewModel().populateUserList();
							$('#demo').dataTable();
						/*	$('#example').dataTable( {
							//	"sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
								"sPaginationType": "bootstrap",
								"oLanguage": {
									"sLengthMenu": "_MENU_ records per page"
								}
							}); */
						  break;
						case "Manage Subscriptions":
						  break;
					}
				  break;
			}
		});

	}).run();

}

$(document).ready(function () {
  //var userModel = new UserModel();
	var userContext	= new UserContext();
	ko.applyBindings(new PageContextViewModel(userContext));
	document.documentElement.className = '';
    // Load initial data via Ajax
    //userModel.load();

});

/** HELPER FUNCTIONS **/

function match(arr, name) {
	for(var i=0; i<arr.length; i++) {
		if (arr[i].name == name) return arr[i];
	}
}


// Handling Modal operations ? Better way to do it?

/**
$(".operations").delegate('a.table-preview','click', function(){
var text = $(this).parents('tr').attr('class');
$('.table-operations-placeholder').html("<div class=\"alert alert-success\">For example response from Ajax call <strong>displayRecord("+text+")</strong></div>");
$('.btn-group.open').removeClass('open');
return false;
});
$(".operations").delegate('a.table-edit','click', function(){
var text = $(this).parents('tr').attr('class');
$('.table-operations-placeholder').html("<div class=\"alert alert-warning\">For example response from Ajax call <strong>editRecord("+text+")</strong></div>");
$('.btn-group.open').removeClass('open');
return false;
});
$(".operations").delegate('a.modal-preview','click', function(){
var text = $(this).parents('tr').attr('class');
$('.operations-modal-header').html("Preview for id: "+text);
$('.operations-modal').html("<div class=\"alert alert-success\">For example response from Ajax call <strong>displayRecord("+text+")</strong></div>");
$('#operations-modal').modal('show');
$('.btn-group.open').removeClass('open');
return false;
});
$(".operations").delegate('a.modal-edit','click', function(){
var text = $(this).parents('tr').attr('class');
$('.operations-modal-header').html("Edit id: "+text);
$('.operations-modal').html("<div class=\"alert alert-warning\">For example response from Ajax call <strong>editRecord("+text+")</strong></div>");
$('#operations-modal').modal('show');
$('.btn-group.open').removeClass('open');
return false;
});
$("input.select-all").click(function(){
if($("input.select-all").attr('checked') == 'checked'){
$("input.selection").attr('checked', true);
}
else{
$("input.selection").attr('checked',false);
}
});
**/
