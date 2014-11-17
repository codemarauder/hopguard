var router_global;
//var default_loc = "Bangalore";
//var otherOpportunities;
var user_global ;
var MENU_ARRAY_OBJECT = {
	menuitems: [
		{name:"Dashboard", path:"dashboard", submenu: [{name:"Overview", path:"overview" },{name:"Item 01", path:"item01"},{name:"Item 02", path:"item02"},{name:"Item 03", path:"item03"}],	subheading: "An Overview of network status"},
		{name: "View Reports", path:"report", submenu: [{name:"User Activity", path:"useractivity"},{name:"Item 11", path:"item11"},{name:"Item 12", path:"item12"},{name:"Item 13", path:"item13"}],subheading: "In Depth Reports of all kinds"},
		{name: "Connect", path:"connect", submenu: [{name:"Location", path:"location"},{name:"Link", path:"link"}],subheading: "Explore Connectivity Status"},
		{name: "Enforce Policies", path:"policy", submenu: [{name:"Manage Categories", path:"category"},{name:"Manage TimeSlots", path:"timeslot"},{name:"URL Filtering", path:"urlfilter"},{name:"Web 2.0 Filtering", path:"webfilter"}], subheading: "Configure Network Policies here"}
	]
};
var MENU_ARRAY_ADMIN_OBJECT = {name:"Administer", path:"admin", submenu: [{name:"General Info", path:"generalinfo"},{name:"Manage Locations", path:"locations"},{name:"Manage Users", path:"users"},{name:"Manage Subscriptions", path:"subscription"}],subheading: "Manage Organisation specific settings"};
