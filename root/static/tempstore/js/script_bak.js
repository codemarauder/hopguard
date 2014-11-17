/* MODEL */

// MODEL - UserContext : Populates the menu and privileges according to the Logged in user
function UserContext(){
	var self = this;
	self.loading = ko.observableArray();
	self.username = ko.observable();
	self.email = ko.observable();
	self.roles = ko.observableArray();

	self.loadUserContext = function() {
		self.loading.push(true);
		// Load the User Context Object
		try{
			$.getJSON('/admin/user/read/loggedin', function(data) {
				console.log(data);
				self.username = data.logged_user.fullname;
				self.email = data.logged_user.email;
				$.each(data.logged_user.roles,function(key,val){
					var userRole = ko.mapping.fromJS(val);
					self.roles.push(userRole);
				});
			})
		}catch(e){
			alert("Error while mapping categories" + e);							
		}
		self.loading.pop();
	}
	self.loadUserContext();
	self.menuitems = [
				{name:"Dashboard", submenu: ["Overview","Item 01","Item 02","Item 03"],	subheading: "An Overview of network status"},
				{name: "View Reports",submenu: ["User Activity","Item 11","Item 12","Item 13"],subheading: "In Depth Reports of all kinds"},
				{name: "Enforce Policies",submenu: ["Manage Categories","Manage TimeSlots","URL Filtering","Web 2.0 Filtering"], subheading: "Configure Network Policies here"}
	];
	if(self.role === "customeradmin"){
			self.menuitems.push({name:"Administer",submenu: ["General Info"],subheading: "Manage Organisation specific settings"});
	}




}


// VIEW MODEL : CategoriesListViewModel: Context for the Enforce Policy/
function CategoryListViewModel() {
	var self = this;
	// Somewhat sophisticated loading flag that supports parallel loading of multiple endpoints.
	self.loading = ko.observableArray();
	// Encapsulating the entire form in a property, so we can use ko.mapping in a safe way.
	// If properties were directly on the model, we'd have to re-init model every time we
	// load data, which could lead to unwanted consequences.
	self.superCategories = ko.observableArray();
	// Save data
	self.save = function(form) {
	};

	self.loadSuperCategories = function() {
		self.loading.push(true);
		// Load the Categories object
		try{
			$.getJSON('/admin/category/read/list', function(data) {
				// Now use this data to update your view models,
				// and Knockout will update your UI automatically				
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
	self.loadSuperCategories();
}

/** VIEW MODELS **/
function DashboardViewModel() {
}


// VIEW MODEL : AclListViewModel : Context for the Enforce Policy/
function AclListViewModel() {
 	var self = this;
 	self.acls = ko.observableArray();
	self.populateAcls = function (){
		try{
			$.getJSON("/admin/policy/read", function(data) {
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

// MODEL - UserContext : Populates the menu and privileges according to the Logged in user
function CustomCategory(name,email,serial){
	var self = this;
	self.name = ko.observable(name);
	self.email =	ko.observable(email);
	self.serial = ko.observable(serial);
}



// The view model is an abstract description of the state of the UI, but without any knowledge of the UI technology (HTML)
function PageContextViewModel(){
  // Page Application Context
  var self = this;
	self.userContext = ko.observable(new UserContext());
	self.chosenMenuContext = ko.observable(self.userContext().menuitems[0]);
	self.chosenMenuItem = ko.observable(self.chosenMenuContext().name);
	self.subMenuItems = ko.observableArray(self.chosenMenuContext().submenu);
	self.menuSubHeading = ko.observable(self.chosenMenuContext().subheading);
	self.chosenSubMenuItem = ko.observable(self.chosenMenuContext().submenu[0]);
	self.chosenResourceContext = ko.computed(function() {return this.chosenMenuItem() + "-" + this.chosenSubMenuItem();}, this);

	// Child View Models
	self.aclListViewModel = ko.observable(new AclListViewModel());
	self.graphContextViewModel = ko.observable(new GraphContextViewModel());
	self.categoryListViewModel = ko.observable(new CategoryListViewModel());

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
			self.chosenMenuContext(match(self.userContext.menuitems,this.params.menuitem));
			self.subMenuItems(self.chosenMenuContext().submenu);
			self.menuSubHeading(self.chosenMenuContext().subheading);
			self.chosenMenuItem(self.chosenMenuContext().name);
			self.chosenSubMenuItem(self.subMenuItems()[0]);
		});

		this.get('#:menuitem/:submenuitem', function() {
			self.chosenMenuContext(match(self.userContext.menuitems,this.params.menuitem));
			self.chosenMenuItem(self.chosenMenuContext().name);
			self.subMenuItems(self.chosenMenuContext().submenu);
			self.menuSubHeading(self.chosenMenuContext().subheading);
			self.chosenSubMenuItem(this.params.submenuitem);
		});


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

		this.get('', function() { this.app.runRoute('get', '#Dashboard') });

		this.after(function(){
			self.userContext().loadUserContext();
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
					}
				  break;
			}
		});

	}).run();

}

$(document).ready(function () {
  //var userModel = new UserModel();
	ko.applyBindings(new PageContextViewModel());
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
