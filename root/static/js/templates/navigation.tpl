
<script type="text/javascript">
$(document).ready(function(){
    //the overlay for facebox
    $('a[rel*=facebox]').facebox();
    
    //the dropdown signup
//    $(".signin").click(function(e) {
//        e.preventDefault();
//        $("fieldset#signin_menu").toggle();
//        $(".signin").toggleClass("menu-open");
//    });

//    $("fieldset#signin_menu").mouseup(function() {
        return false
//    });
//    $(document).mouseup(function(e) {
//        if($(e.target).parent("a.signin").length==0) {
//            $(".signin").removeClass("menu-open");
//            $("fieldset#signin_menu").hide();
//        }
//  	});
  
//    $(".dropdown_options dt a").click(function() {
      // Change the behaviour of onclick states for links within the menu.
//      var toggleId = "#" + this.id.replace(/^link/,"ul");
      
      // Hides all other menus depending on JQuery id assigned to them
//      $(".dropdown_options dd ul").not(toggleId).hide();
      
      //Only toggles the menu we want since the menu could be showing and we want to hide it.
//      $(toggleId).toggle();
      
      //Change the css class on the menu header to show the selected class.
//      if($(toggleId).css("display") == "none"){
//          $(this).removeClass("selected");
//      }else{
//        $(this).addClass("selected");
//      }      
//    });
    
//    $(".dropdown_options dd ul li a").click(function() {
      // This is the default behaviour for all links within the menus
//      var text = $(this).html();
//      $(".dropdown_options dt a span").html(text);
//      $(".dropdown_options dd ul").hide();
//    });
    
//    $(document).bind('click', function(e) {
      // Lets hide the menu when the page is clicked anywhere but the menu.
//        var $clicked = $(e.target);
//        if (! $clicked.parents().hasClass("dropdown_options")){
//            $(".dropdown_options dd ul").hide();
//            $(".dropdown_options dt a").removeClass("selected");
//        }
//    });

    /************************SignIn Related************************/

    $('#email_login').keydown(function(){
      var intKey = 0;
      e= (window.event)? event : e;
      intKey = (e.keyCode)? e.keyCode: e.charCode;
      if (intKey == 13) {
        console.log('login needs to be invoked');
        $('#signin_submit').click();
      }
    });
    $('#password_login').keydown(function(){
      var intKey = 0;
      e= (window.event)? event : e;
      intKey = (e.keyCode)? e.keyCode: e.charCode;
      if (intKey == 13) {
        console.log('login needs to be invoked');
        $('#signin_submit').click();
      }
    });

    $('#signin').submit(function(){
      $('#signin_submit').click();
      return false;
    });
    $('#signin_submit').click(function(){  
      var email = $('#email_login').val();
      var password =$('#password_login').val();
      var remember_element = document.getElementById('remember');
      var remember = false;
      if(remember_element.checked){
          console.log("the checkbox is checked");
          remember = true;
      }
      console.log("the signin submit in navigation has been clicked");
        hopbox_signin(email,password,remember,function(errors){
          if(errors.length < 1){
            console.log("there are no errors");
          }
          else{
            console.log("there are errors");
            Backbone.history.navigate("!/signin/"+email,true);
            var notification = ' ' ;
            $.each(errors,function(index,value){
              console.log(value);
              if(index==0){
                      notification = value;
              }else{
                  notification = notification +', '+ value;
              }

            });
            showErrorNotification(notification);
          }
        });
    });

    /************************for city select dropdown ************************/
//    $(".dropdown img.flag").addClass("flagvisibility");
//    $("#sample dt a").click(function() {
//      $("#sample dd ul").toggle();
//    });
//    $('.select_city_arrow').click(function(){
//      $("#sample dd ul").toggle();
//    });

//    function getSelectedValue(id) {
//        return $("#" + id).find("dt a span.value").html();
//    }
    
//    $(document).bind('click', function(e) {
//        var $clicked = $(e.target);
//        if (! $clicked.parents().hasClass("dropdown")  &&  !$clicked.hasClass("select_city_arrow"))
//            $(".dropdown dd ul").hide();
//    });
    
    //$("#flagSwitcher").click(function() {
    //    $(".dropdown img.flag").toggleClass("flagvisibility");
    //});
    /************************END city select dropdown ************************/
   
//    var city1 = getCookie("city");
//    if(city1 === undefined){
//      city1 = default_loc;
//    }
//    console.log("the city is ",city1);
//    console.log("The name of the locality is ",LOCALITY_PLACEHOLDER[city1] );
//    $('#search_area').attr('placeholder',LOCALITY_PLACEHOLDER[ city1]);
//    $(".dropdown dt a span").html(city1);
//    console.log("Selected value is: " + getSelectedValue("sample"));
//    $("#sample dd ul li a").click(function(){
//      $('.s_field input').val("");
//      var text = $(this).html();
//      $(".dropdown dt a span").html(text);
//      $(".dropdown dd ul").hide();
//      console.log("Selected value is: " + getSelectedValue("sample"));
//      $('#search_area').attr('placeholder',LOCALITY_PLACEHOLDER[ getSelectedValue("sample")]);
//      console.log("The name of the locality is ",LOCALITY_PLACEHOLDER[ getSelectedValue("sample")] );
//      setCookie('city', getSelectedValue("sample"),365);
//      Backbone.history.navigate('!/home',true);
//    });
   

    console.log("the last statement in the navigation is being run ");
});
</script>

<script type="text/javascript">
//This script is for the initialization of the search box ** Use for User Search
//var selected_address ;
//var selected_latitude;
//var selected_longitude;
//var search_type = "place";
$(document).ready(function(){
    console.log("running the second document ready");
    //we will be using this to cache the responses from the server
//    var ajaxCache = {};
//    console.log("in document ready function ");
//    $("#search_area").autocomplete({
//        source: function(request,response){
//            //what are we searching for
//            var query_type = $(this).attr('element').attr('id');
            //the cacheterm that we use to save it in the cache
//            var cachedTerm = (request.term + '' + query_type) . toLowerCase();
            //if the data is in the cache and the data is not too long, use it
//            if (ajaxCache[cachedTerm] != undefined && ajaxCache[cachedTerm].length < 13) {
              //map the data into a response that will be understood by the autocomplete widget
//              response($.map(ajaxCache[cachedTerm], function(item) {
//                return {
//                  label: item.address,
//                  value: item.address,
//                  lat: item.lat,
//                  lng: item.lng
//                }
//              }));
//            }
//            else{
//              fetchLocalitySuggestions(getCookie('city'),request.term,function(locationInfo){
                ////cache the data for later
//                ajaxCache[cachedTerm] = locationInfo;
                //map the data into a response that will be understood by the autocomplete widget
//                response($.map(locationInfo, function(item) {
//                    return {
//                      label: item.address,
//                      value: item.address,
//                      lat: item.lat,
//                      lng: item.lng
//                    }
//                }));
//                console.log("The autocomplete data returned is ", locationInfo);
//              });    
//            }
            
//        },  
//        minLength: 1,
//        select: function( event, ui ) {
//          uiJSON = JSON.stringify(ui);
//          console.log("the ui is ", ui.item.lat);
//          selected_address = ui.item.value;
//          selected_latitude = ui.item.lat;
//          selected_longitude = ui.item.lng;
//        }
//    });
    
//    $("#places_search").click(function(){
//      console.log("the places search is clicked");
//      $("#places_search").addClass('search_option_selected_places');
//      $("#offers_search").removeClass('search_option_selected_offers');
//        $("#arrow_places").addClass('arrow_open');
//        $("#arrow_offers").removeClass('arrow_open');
//      $('#search_text').attr('placeholder',PLACE_SEARCH_PLACEHOLDER);
//      search_type = "place";
//    });
    
//    $("#offers_search").click(function(){
//      $("#offers_search").addClass('search_option_selected_offers');
//      $("#places_search").removeClass('search_option_selected_places');
//        $("#arrow_offers").addClass('arrow_open');
//        $("#arrow_places").removeClass('arrow_open');
//      console.log("the offers search is clicked");
//      search_type = "offer";
//      $('#search_text').attr('placeholder',OFFER_SEARCH_PLACEHOLDER);
//    });
//    $("#offers_search").click();
//    var cache_offers = {};
//    var cache_places = {};
//    $('#search_text').autocomplete({
//      minLength: 0,
//      source: function( request, response ) {
//        var query_type = $(this).attr('element').attr('id');
        //the cacheterm that we use to save it in the cache
//        var cachedTerm = (request.term + '' + query_type) . toLowerCase();
        //if the data is in the cache and the data is not too long, use it
//        if(search_type == "offer"){
//          if (cache_offers[cachedTerm] != undefined && cache_offers[cachedTerm].length < 13) {
              //map the data into a response that will be understood by the autocomplete widget
//              response($.map(cache_offers[cachedTerm], function(item) {
//                return {
//                  label: item,
//                  value: item
//                }
//              }));
//          }
//          else{
//            fetchOffersSuggestions(request.term,function(offersSuggestions){
              ////cache the data for later
//              cache_offers[cachedTerm] = offersSuggestions;
              //map the data into a response that will be understood by the autocomplete widget
//              response($.map(offersSuggestions, function(item) {
//                  return {
//                    label: item,
//                    value: item
//                  }
//              }));
//              console.log("The offers autocomplete data returned is ", offersSuggestions);
//            });    
//          }
//        }
//        else{
//          if (cache_places[cachedTerm] != undefined && cache_places[cachedTerm].length < 13) {
              //map the data into a response that will be understood by the autocomplete widget
//              response($.map(cache_places[cachedTerm], function(item) {
//                return {
//                  label: item,
//                  value: item
//                }
//              }));
//          }
//          else{
//            fetchPlaceSuggestions(request.term,function(placesSuggestions){
              ////cache the data for later
//              cache_places[cachedTerm] = placesSuggestions;
              //map the data into a response that will be understood by the autocomplete widget
//              response($.map(placesSuggestions, function(item) {
//                  return {
//                    label: item,
//                    value: item
//                  }
//              }));
//              console.log("The offers autocomplete data returned is ", placesSuggestions);
//            });    
//          }
//        }
//      },
//      select: function(event, ui){
//        console.log('selected: ' + ui.item.value);
        //create formatted category  
//      } 
//    });
//    $('#search_text').click(function(){    
//      $(this).autocomplete('search');
//    });


//  $('#btn_search').click(function(){
//    checkAccess(function(isAccessible){
//      if(isAccessible){
//        console.log("search has been performed");
//        var address = $("#search_area").val();
//        var query = $("#search_text").val();
//        query = $.trim(query);
//        address = $.trim(address);
//        if(search_type == "offer"){
//          if(address != ''){   
//            if(selected_address == address && selected_longitude!='' && selected_latitude!='' && selected_latitude != null && selected_longitude != null){
//              loadOfferSearch(address,query,selected_latitude,selected_longitude);
//            }
//            else{
//              loadOfferSearch(address,query);
//            }
//          }
//          else{
//            var city = getCookie("city");
//            loadOfferSearch(city,query);
//          }
//        }
//        else{
//          if(address != ''){   //TODO if validation does not work try another validation
//             if(selected_address == address && selected_longitude!='' && selected_latitude!='' && selected_latitude != null && selected_longitude != null){
//              loadPlaceSearchMap(address,query,selected_latitude,selected_longitude);
//             }
//             else{
//              loadPlaceSearchMap(address,query);
//             }
//          }
//          else{
//           var city = getCookie("city");
//           loadPlaceSearchMap(city,query);
//          }
//        }
//      }
//    },true);
//  });


//  $('#search_form').submit(function(){
//    $('#btn_search').click();
//    return false;
//  });

  
    //$('#search_area').keydown(function(){
    //  var intKey = 0;
    //  e= (window.event)? event : e;
    //  intKey = (e.keyCode)? e.keyCode: e.charCode;
    //  if (intKey == 13) {
    //    console.log('the search needs to be invoked SEARCH_AREA');
    //    $('#btn_search').click();
    //  }
    //});
    //$('#search_text').keydown(function(){
    //  var intKey = 0;
    //  e= (window.event)? event : e;
    //  intKey = (e.keyCode)? e.keyCode: e.charCode;
    //  if (intKey == 13) {
    //    console.log('the search needs to be invoked SEARCH_AREA');
    //    $('#btn_search').click();
    //  }
    //});
    console.log("the placeholder has been set for the input boxes------------------------------------------------------------------>>>");
    $('input[placeholder], textarea[placeholder]').placeholder();
    console.log("the placeholder has been set for the input boxes------------------------------------------------------------------>>>");
    
 /**   var script = 'http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-4f60a16c50a277db';
    if (window.addthis){
        window.addthis = null;
        window._adr = null;
        window._atc = null;
        window._atd = null;
        window._ate = null;
        window._atr = null;
        window._atw = null;
    }
    $.getScript( script );**/
});
</script>



<!-- <div class="feedback-tab">
      <!--<a href="#" id="feedback"><span>Send Feedback</span></a>-->
<!--    <script id="controlinit-8" type="text/javascript+initialized" class="li-control">
      </script>
    </div> -->
			
<!--
  	   <div class="option_holder_wrapper">
  		   <div class="option_holder">
  			   <div class="search_options">
         		<div class="search_options-left">
			     		<ul class="rounded_options">
	           		<li class ='search_options_li' id='offers_search' >Search Offers <div class="blue_arrow" id='arrow_offers'></div></li>
							 	<li class ='search_options_li' id='places_search' >Search Stores <div class="blue_arrow" id='arrow_places'></div></li>
              </ul>
		        </div>
          </div>
        </div>
     </div>
     
     <div class="search_holder">
        <div class="searchbox">
          <div class="search_bottom">
	          <div class="search_left">           
              <a href="#!/home"><img src="static/images/logo_delight.png" style="margin-top:10px" /></a>       
  	        </div>
  	        <div class="search_right_bottom">
                <div class="search_fields">
                </div>
            </div>
            <div class="search_right">
              <div class="search_right_bottom">
              <div class="search_icons"><img src="static/images/search_icon.png" width="22" height="22" /></div>
                <div class="search_panel">
                  <form class="float_left" id="search_form">
                    <div class="city_select_dropdown">
                      <img  class="select_city_arrow" src="static/images/cityselect_arrow.png">
                      <dl id="sample" class="dropdown">
                        <dt><a href="javascript:void(0)"><span>Select city</span></a></dt>
                        <dd>
                          <ul>
                            <li><a href="javascript:void(0)">Bangalore<img class="flag" alt="" /><span class="value">Bangalore</span></a></li>
                            <li><a href="javascript:void(0)">Delhi NCR<img class="flag" alt="" /><span class="value">Delhi NCR</span></a></li>
                            <li><a href="javascript:void(0)">Mumbai<img class="flag"  alt="" /><span class="value">Mumbai</span></a></li>
                            <li><a href="javascript:void(0)">Hyderabad<img class="flag" alt="" /><span class="value">Hyderabad</span></a></li>
                            <li><a href="javascript:void(0)">Kolkata<img class="flag" alt="" /><span class="value">Kolkata</span></a></li>
                            <li><a href="javascript:void(0)">Chennai<img class="flag"  alt="" /><span class="value">Chennai</span></a></li>
                            <li><a href="javascript:void(0)">Pune<img class="flag"  alt="" /><span class="value">Pune</span></a></li>
                            <li><a href="javascript:void(0)">Chandigarh<img class="flag"  alt="" /><span class="value">Chandigarh</span></a></li>
                          </ul>
                        </dd>
                      </dl>
                    </div>
                    <div class="s_field">
                      <input id="search_text" type="text" placeholder="Shops,pub,bar etc.." tabindex="1"/>
                    </div>
                    <div class="s_field">
                        <input id="search_area" type="text" placeholder="Location"  autocomplete="off" tabindex="2" />
                    </div>
                    <div class="button_body">
                      <img id="btn_search" src="static/images/search_bt_light.png" />
                      <input type="submit" style="width: 0px;height: 0px;border: none; padding:0; margin:0;">
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="search_top">
            <div class="search_right">
              <div class="search_right_top">
                <div class="secondary_menu">
                  <ul>
                     <!-- <li id = "home_tab" ><a class="Search_bottom_list" href="#!/home">Home</a></li>-->
<!--                     <li id = "home_tab"><a class="Search_bottom_list" href="#!/home">Home</a></li>
                      <li id = "following_tab"><a class="Search_bottom_list" href="#!/following">Favorites</a></li>
                      <li id = "offer_search_tab"><a class="Search_bottom_list" href="#!/search/offer/">Offers</a></li>
                      <li id = "place_search_tab"><a class="Search_bottom_list" href="#!/searchMap/place/">Stores</a></li>
                      <li id = "rewards_tab"><a class="Search_bottom_list" href="#!/rewards">Rewards</a></li>
                      <li id = "download_tab"><a class="Search_bottom_list" href="#!/download">Mobile</a></li>
                  </ul>
                </div>
                
                <div class="search_right_top">
                  
                <div class = "top_right">
                    <div id="logged_out">
                      <!--<div class="button_inner_template_big" onClick="Backbone.history.navigate('#!/invite',true)">Sign Up for early access</div>-->
<!--                      <div class="sign_up"><div id="sign_up_con"> <a href="#!/signup" id="signup">Sign Up</a></div></div>
                      <div id="container">
                        <div id="topnav" class="topnav"> <a href="login" class="signin"><span>Sign in</span></a> </div>
                        <fieldset id="signin_menu">
                          <form  id="signin">
                            <table>
                              <tr>
                                <td>
                                  <div class="fb-login-button" data-scope="email,user_birthday,publish_stream" id="facebook_login" length="long" size="large">Login</div> 
                                </td>
                                <td>
                                   Best way to sign in
                                </td>
                              </tr>
                              <tr>
                                <td colspan="2">
                                  <div class="or"></div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <label for="email_login">Email</label>
                                </td>
                                <td>
                                  <input id="email_login" name="email_login" value="" title="email_login" tabindex="4" type="text">  
                                </td>
                              </tr>
                              <tr>
                                  <td>
                                    <label for="password_login">Password</label>
                                  </td>
                                  <td>
                                    <input id="password_login" name="password_login" value="" title="password_login" tabindex="5" type="password">
                                  </td>
                              </tr>
                              <tr>
                                <td>
                                  <input type="button" id="signin_submit" value="Sign in" tabindex="6" >
                                  <input type="submit" style="width: 0px;height: 0px;border: none; padding:0; margin:0;">
                                </td>
                                <td>
                                  <input id="remember" name="remember_me" value="1" tabindex="7" type="checkbox">
                                  <label for="remember">Remember me</label>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                </td>
                                <td>
                                  <a href="#!/forgot" id="resend_password_link">Forgot your password?</a>
                                </td>
                              </tr>
                            </table>                            
                          </form>
                        </fieldset>
                      </div>
                      <div class="fb-login-button" data-scope="email,user_birthday,publish_stream" id="facebook_login" length="long" size="large">Login</div>
                    </div>
                    
												      <div id="logged_in" class = "logged_in">
												        <a href="#!/profile" title="Profile" id="user_profile_link">
												          <div  class="user_details" id= "user_details">  
												            <div class="user_details_left">
												              <div class="user_details_profile_pic"><img id="user_img"></div>
												            </div>
												            <div class="user_details_right">
												              <div id="user_name" class="user_details_pic"></div>
												              <div class="points_icon"> <img src="static/images/delight_icon.png" height="15px"></div>
												              <div id="user_points" class="user_details_points"></div>
												            </div> 
												            <div class="user_dropdown">
												              <dl style="" class="dropdown_options">
												                  <dt><a id="linkglobal" style="cursor:pointer;" class="selected"></a></dt>
												                  <dd>
												                      <ul id="ulglobal" style="display: block; ">
												                          <li class="setting_icon"><a href="#!/setting">Settings</a></li>
												                          <li class="help_icon"><a href="#!/intro">Take tour</a></li>
												                          <li class="logout_icon"><a href="javascript:void(0)" onclick="hopbox_logout()">Logout</a></li>
												                      </ul>
												                  </dd>
												             </dl>
												            </div>       
												          </div>
												        </a>
												      </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          
       </div>
       </div>
        </div>
-->


<div id="iframeTag"></div>
<div class="navbar navbar-fixed-top">
	<div class="navbar-inner">
		<div class="container-fluid">
			<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</a>
			<a class="brand" href="#!/home">Hopbox</a>
			<div id="logged_in" class="btn-group pull-right">
				<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
					<i class="icon-user"></i>
					<span id="user_name"></span>
					<span class="caret"></span>
				</a>
				<ul class="dropdown-menu">
				  <li><a href="#!/profile">Profile</a></li>
				  <li class="divider"></li>
				  <li><a href="/logout">Sign Out</a></li>
				</ul>
			</div>
			<div id="logged_out" class="btn-group pull-right">
			</div>
			<div class="nav-collapse" id="nav_wrapper">
			</div><!--/.nav-collapse -->
		</div>
	</div>
</div>

<div class="container-fluid" id="subnav_wrapper" ></div>

<div class="content_wrapper" id="maincontent"></div>

<div class="content_wrapper_full_width" id="maincontent_full_width"></div>

<div class="footer"> </div>

<script type="text/html" id="navTemplate">
	<ul class="nav">
		{{#menuitems}}
			<li id="{{path}}_tab"><a href="#!/{{path}}">{{name}}</a></li>
		{{/menuitems}}
	</ul>
</script>

<script type="text/html" id="subnavTemplate">
	<header class="jumbotron subhead" id="overview">
		<p class="lead">{{subheading}}</p>
		<div class="subnav">
			<ul class="nav nav-pills">
			{{#submenu}}
				<li id="{{parentpath}}_{{path}}_tab"><a href="#!/{{parentpath}}/{{path}}">{{name}}</a></li>
			{{/submenu}}
			</ul>
		</div>
	</header>
</script>
