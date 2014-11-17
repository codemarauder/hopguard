
var App = {
    Views: {},
    Controllers: {},
    init: function() {
        checkCookie(function(hasVisited){
            console.log("Initial Hash is "+location.hash)                         
            //Detecting the browser and prompting the user to download the application .
            var ua = navigator.userAgent.toLowerCase();
            console.log('the user agent - '+ ua);
            var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
            var isBlackberry = ua.indexOf("blackberry") > -1;
            var isIphone = ua.match(/iphone/i);
            var isIpod = ua.match(/ipod/i);
            if(isIpod || isIphone || isAndroid || isBlackberry ){
                //document.location.href = "#!/mobilelanding";
                //window.location.href = "#!/mobilelanding";
                //router_global = new App.Controllers.Deals();
                //Backbone.history.start();
            }else{
                $(document.body).load('/static/js/templates/navigation.tpl',function(){
                    ich.refresh(); // refresh ich
                    console.log("the navigator is loaded");
                    showLoggedInSection(function(){
                        console.log("The logged in section is being shown now ");
                        console.log("the document.URL is ",document.URL);
                        if(hasVisited){
                            console.log("the user has visited earlier");
                        }
                        else
                        {
                            console.log("the user has NOT visited earlier");
//                            createAnonymousUser(function(){
//                                  console.log('anonymous user successfully created');
//                            });
                        }
                        router_global = new App.Controllers.Hopper();
                        Backbone.history.start();
                    });
                });    
            }
            
        });
    }
};
