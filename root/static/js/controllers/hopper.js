/*
    Controllers are used to get the data from the server, process the data and instantiate the views
*/

App.Controllers.Hopper = Backbone.Router.extend({

	routes: {
	//Routes which do not require to be signed in 
		'!/home': 'loadDefault',
		'!/signup' : 'loadSignup',
		'!/signin' : 'loadSignin',
		'!/signin/:username' :'loadSignin',
		'!/forgot' : 'loadForgotPassword',
		'!/resetPass/:uid/:tempPass' : 'loadResetPassword',
		'!/verify/:uid/:hash' : 'loadVerifyEmail',
		'!/lost' : 'loadLost',
		'!/contact':'loadContactUs',
		'!/terms':'loadTermsPage',
		'!/about': 'loadAboutPage',
	//Routes which require user to be signed in
		'!/profile' : 'loadProfile',
		'!/setting':'loadSettings',
		'!/dashboard':'loadDashboard',
		'!/dashboard/:submenuitem':'loadDashboard',
  		'!/report':'loadReport',
		'!/report/:submenuitem':'loadReport',
  		'!/connect':'loadConnect',
		'!/connect/:submenuitem':'loadConnect',
		'!/policy':'loadPolicy',
		'!/policy/:submenuitem':'loadPolicy',
		'!/admin':'loadAdmin',
		'!/admin/:submenuitem':'loadAdmin'
  },
		  
	initialize: function() {
	  console.log("Start of initialize of hopper.js controller");
	  this.route('', 'loadDefault', this.loadDefault);
	},

	loadDefault:function(){
		var that = this;
		isUserLoggedIn(function(isUserLogged){
			if(isUserLogged){
				that.loadDashboard();
			}
			else{
				that.loadHome();
			}
		});
	},
	
	loadDashboard : function(submenuitem){
		checkAccess(function(isAccessible){
			if(isAccessible){
				loadTab("dashboard", submenuitem, "overview")
			}
		});
	},

	loadReport : function(submenuitem){
		checkAccess(function(isAccessible){
			if(isAccessible){
				loadTab("report", submenuitem, "useractivity")
			}
		});
	},


	loadConnect : function(submenuitem){
		checkAccess(function(isAccessible){
			if(isAccessible){
				loadTab("connect", submenuitem, "location")
			}
		});
	},

	loadPolicy : function(submenuitem){
		checkAccess(function(isAccessible){
			if(isAccessible){
				loadTab("policy", submenuitem, "category")
			}
		});
	},

	loadAdmin : function(submenuitem){
		checkAccess(function(isAccessible){
			if(isAccessible){
				loadTab("admin", submenuitem, "generalinfo")
			}
		});
	},
	loadAboutPage:function(){
	  console.log("START of load about us function");
	  $('#maincontent_full_width').empty();$('#maincontent').empty();
	  $('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
	  $('#maincontent').load('about.html');
	},

	loadTermsPage:function(){
	  console.log("START of load terms function");
	  $('#maincontent_full_width').empty();$('#maincontent').empty();
	  $('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
	  $('#maincontent').load('terms.html');
	},

	loadContactUs:function(){
	  console.log("START of load contact us function");
	  $('#maincontent_full_width').empty();$('#maincontent').empty();
	  $('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
	  $('#maincontent').load('contactUs.html');
	},

/**	loadDeveloperPage:function(){
	  console.log("START of load developer function");
	  $('#maincontent_full_width').empty();$('#maincontent').empty();
	  $('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
	  $('#maincontent').load('developer.html');
	},
	/**   loadBrandPage:function(){
		console.log("START of load brands function");
		$('#maincontent_full_width').empty();$('#maincontent').empty();
		$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
		//$('#maincontent').load('brands.html');
		$('#maincontent').load('comingSoon.html');
	},**/

	/**        loadBusinessPage:function(){
		console.log("START of load business function");
		$('#maincontent_full_width').empty();$('#maincontent').empty();
		$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
		//$('#maincontent').load('business.html');
		$('#maincontent').load('comingSoon.html');
	},

	loadInvite : function(){
		$('#maincontent_full_width').empty();$('#maincontent').empty();
		$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
		$('#maincontent').load('invite	');
	},**/

	loadSignup : function(){
		//$(document.body).load("header.html",function(){
		$('#maincontent_full_width').empty();$('#maincontent').empty();
		$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
		$('#maincontent').load('signup.html',function(){});
		//});
	},

	loadSignin :function(username){
		//$(document.body).load("header.html",function(){
		console.log("start of Load signin funciton ");
		$('#maincontent_full_width').empty();$('#maincontent').empty();
		$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
		$('#maincontent').load('signin.html',function(){
			if(username != undefined){
				$('#email_login_diff').val(username);
			}
		});
		//});
	},

	loadForgotPassword : function(){
		console.log("the load forgot password html is being loaded");
		$('#maincontent_full_width').empty();$('#maincontent').empty();
		$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
		$('#maincontent').load('forgotPassword.html',function(){
			$.facebox.close();
			console.log("the load forgot password html has been loaded");
			$('#reset_password').click(function(){
				var email =$("#forgot_email").val();
				var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i ;
			  if(!ck_email.test(email) || email ==''){
		      alert("please enter a valid ");
			  }
			  else{
			    console.log("the email is valid and now a server call is being made");
			    sendEmailForForgotPassword(email , function(success,result){
		        if(success){
	            alert('the password reset link has been sent to your email');
		        }
		        else{
	            alert(result);
		        }
			    });
			  }
			});
		});
	},

	loadResetPassword: function(uid,tempPass){
		console.log("start of load reset password");
		$('#maincontent_full_width').empty();$('#maincontent').empty();
		$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
		$('#maincontent').load('resetPassword.html',function(){
			$('#reset_password_submit').click(function(){
				if($('#reset_password').val().length < 6 ){
					alert('the password should be minimum 6 characters');
				}
				else{
					if( $('#reset_password').val() ==   $('#reset_password_confirm').val()   ){
						ResetPassword(uid,tempPass,$('#reset_password').val() ,function(success,result){
							if(success){
								alert('your password has been successfully reset');
							}
							else{
								alert(result);
							}
						});
					}
					else{
						alert('the passwords do not match');
					}
				}
			});
		});
	},

	loadVerifyEmail: function(uid,hash){
		console.log("start of verify email funciton ");
		$('#maincontent_full_width').empty();$('#maincontent').empty();
		$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
		$('#maincontent').load('verifyEmail.html',function(){
		  console.log("in load verify email ");
		  verifyUser(uid,hash,function(success,result){
		    console.log("the result returned to load verify is ",result);
		    $('.wait_div').hide();
		    if(success){
	       $('#confirmation_div').html(' Congratulations, your delightcircle account has been verified. Please sign in to continue using your account.');
		    }
		    else if(result=='VERIFIED') {
	        $('#confirmation_div').html(' Your account has already been verified.');
		    }
		    else{
	        $('#confirmation_div').html(result);
		    }
		    $('#confirmation_div').show();
		  });
		});
	},

/**	loadClaimBusiness:function(id){
		$('#maincontent_full_width').empty();$('#maincontent').empty();
		$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
		$('#maincontent').load('claimBusiness.html',function(){
			rc = new RestClient(URL_PLACE+ id, 'GET');
			rc.request(function(data){
				console.log('place info returned is', data,$('#place_details')[0]);
				var place = new Place(data);
				new App.Views.ClaimPlaces({
					placeInfo: place,
					el : $("#place_details")[0]
				});
			});
		});
	},**/

	loadLost : function(){
		$('#maincontent_full_width').empty();$('#maincontent').empty();
		$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
		$('#maincontent').load('lost.html');
	},

/**	loadIntro : function(){
		setActiveTab("default");
		console.log("Start of loadIntro in deals.js controller");
		$('#maincontent_full_width').empty();$('#maincontent').empty();
		$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
		$('#maincontent').load('intro.html');
	},**/


	/************************************* REQUIRES ACCESS AUTHENTICATION ****************************************/
/**	loadDownloads: function(){
		console.log('loading download');
		checkAccess(function(isAccessible){
			if(isAccessible){
				$('#maincontent_full_width').empty();$('#maincontent').empty();
				$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
				$('#maincontent').load('download.html');
				setActiveTab("download_tab");
			}
		});
	},**/

	loadSettings:function(){
		$('#maincontent_full_width').empty();$('#maincontent').empty();
		$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
		$('#maincontent').load('settings.html');
	},
	
	loadHome : function(){
		console.log("loading the home page");
		checkAccess(function(isAccessible){
			if(isAccessible){
			  $('#maincontent_full_width').empty();$('#maincontent').empty();
			  $('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
			  $('#maincontent').load('home.html',function(){
					setActiveTab("home_tab");
					loadPopularDeals( function(){	});
					loadFollowingForHome();
					loadRecommendedForHome();
					if(FB != undefined){
						console.log("the FB object is ",FB);
				  	FB.XFBML.parse();
					}
					$('#invite_facebook_friends').click(function(){
						$(window).scrollTo({top:'0px', left:'0px'});
						sendRequestViaMultiFriendSelector(); 
					});
					Backbone.history.navigate('!/home',{ replace: true});
				});
			}
		});
	},

	loadProfile : function(){
		checkAccess(function(isAccessible){
			if(isAccessible){
				$('#maincontent_full_width').empty();$('#maincontent').empty();
				$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
				$('#maincontent').load('profile.html',function(){
					setActiveTab("user_name");
				});
			}
		});
	}//,

/**	//Following page start
	loadFollowing: function(id){
		checkAccess(function(isAccessible){
			if(isAccessible){
				d = new Date;
				console.log('loading following', d.getTime());
				$("body").mask("",500);
				$('#maincontent_full_width').empty();$('#maincontent').empty();
				$('#maincontent').hide(); $('#maincontent_full_width').show();$('.footer').hide();
				$('#maincontent_full_width').load('followingTest.html',function(){
					setActiveTab("following_tab");
					//this.getRecentReviews();
					var loaded = 1;
					callUnmask = function(){
						if(loaded%2 == 0){
							console.log("the unmask has been called ");
							$("body").unmask();
						}
						loaded++;
					};
					//this.getPopularDeals(callUnmask);
					getFollowingStores(id,callUnmask);
					getRecommendedStores(id,callUnmask);
					console.log("the loading has been loaded");
				});
			}
		});
	},

	loadFollowingWithId : function(id){
		var that = this;
		checkAccess(function(isAccessible){
			if(isAccessible){
				that.loadFollowing(id);
				Backbone.history.navigate('!/following',{ replace: true});
			}
		});
	},

	loadFollowMore : function(){
		checkAccess(function(isAccessible){
			if(isAccessible){
				setActiveTab("none");
				$('#maincontent_full_width').empty();$('#maincontent').empty();
				$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
				$('#maincontent').load('followMoreSeperate.html',function(){ 
				});
			}
		});
	},
	//Following page end

	//Nearby page start
	loadOffersSearch:function(area,query){
		checkAccess(function(isAccessible){
			if(isAccessible){
				console.log("the offer search is being opene");
				if(area === undefined){
					area = LOCALITY_DEFAULT[getCookie('city')] ;
					if(  $.trim($('#search_area').val()) != "" && $.trim($("#search_area").val())  != undefined ){
						area = $("#search_area").val();
					}
				}
				$("#search_area").val(area);
				if(query === undefined){
					loadOfferSearch(area,"Popular");
					$("#search_text").val("Popular");
				}
				else{
					$("#search_text").val(query);
					loadOfferSearch(area,query);    
				}
			}
		});
	},

	loadNearbyQueryMap: function(area,query){
		checkAccess(function(isAccessible){
			if(isAccessible){
				console.log("the nearby is being loaded");
				if(area === undefined){
					area = area = LOCALITY_DEFAULT[getCookie('city')] ;;
					if( $.trim($('#search_area').val()) != "" &&  $.trim($('#search_area').val())  != undefined ){
						area = $("#search_area").val();
					}
				}
				$("#search_area").val(area);
				if(query === undefined){
					loadPlaceSearchMap(area,"Nearby");
					$("#search_text").val("Nearby");
				}
				else{
					$("#search_text").val(query);
					loadPlaceSearchMap(area,query);    
				}
			}
		});
	},

	loadBrand:function(brand){
		fetchBrandPlace(brand,function(success,data){
			if(success){
				Backbone.history.navigate('!/place/'+data['placeId'],{replace:true , trigger:true});
			}else{
				Backbone.history.navigate('!/lost', true);
			}
		});
	},

	//Place page start
	loadPlace: function(placeid){
		var that = this;
		checkAccess(function(isAccessible){
			if(isAccessible){
			that.loadPlaceTab(placeid,"wall");
			}
		});
	},

	loadPlaceTab: function(placeid,tab){
		var that = this;
		checkAccess(function(isAccessible){
			if(isAccessible){
				that.loadOffer(placeid,tab,"default");
			}
		});
	},

	getGPlaceFromId:function (placeid){
		checkAccess(function(isAccessible){
			if(isAccessible){
				console.log(' Loading place for id : ' , placeid);
				$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
				$('#maincontent').load('place.html',function(){
					rc = new RestClient(URL_PLACE+ placeid, 'GET');
					rc.request(function(data){
						loadGPlace(data);
					});
				});
			}
		});
	},

	loadOffer: function(placeid,tab,offerid){
		var that = this;
		checkAccess(function(isAccessible){
			if(isAccessible){
				setActiveTab("default");
				if(offerid === undefined){
					if(tab === undefined){
						that.loadOffer(placeid,"wall","default");     
					}
					else{
						that.loadOffer(placeid,tab,"default");
					}
				}
				else{
					console.log(' Loading place for id : ' , placeid);
					$('#maincontent_full_width').empty();$('#maincontent').empty();
					$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
					$('#maincontent').load('place.html',function(){ 
						fetchPlaceInfo(placeid,function(place){
							new App.Views.Place({
							  placeInfo: place,
							  el : $('#r_right')[0]
							});
							$('meta[name=Description]').attr('content', place.get('placeAddress'));
							$("meta[property=og\\:title]").attr("content", place.get('placeName'));
							$("meta[property=og\\:image]").attr('content',place.get('placeLogo'));
							$("meta[property=og\\:url]").attr('content',IPADDRESS+'/delight-website/#!/place/'+place.get('placeId'));
							$('meta[name=keywords]').attr('content', place.get('placeAddress'));
							console.log('new Place view created');
							if(tab == "wall"){	 
								loadWall(placeid,DELIGHT_STRING,offerid);
								console.log("loading the wall tab ");
							}
							else if(tab == 'stores'){
								loadStores(placeid);
								console.log("loading the stores tab");
							}
							else if(tab == 'outlets'){
								loadOutlets(placeid);
								console.log("loading the outlets tab");
							}
							else if(tab == "offers"){		 
								loadOffers(placeid,offerid);
								console.log("loading the offers tab ");
							}
							else if(tab == "featured"){	 
								loadFeatured(placeid,offerid);
								console.log("loading the featured tab ");
							}
							else if(tab == "map"){		  
								loc_coordinate = place.get("placeLocation");
								if(loc_coordinate== "" || loc_coordinate === undefined || loc_coordinate == null){
									loadMap(place.get("placeAddress"));
								}else{
									var latlngStr = loc_coordinate.split(",",2);
									var lat = parseFloat(latlngStr[0]);
									var lng = parseFloat(latlngStr[1]);
									var latlng = new google.maps.LatLng(lat, lng);
									loadMap(place.get("placeAddress"),latlng);    
								}
								console.log("loading the map tab ",place);
							}
							else{
								loadWall(placeid,DELIGHT_STRING);
								console.log("loading the wall tab ");
							}
					 		//var bodyContent = {'viewsCount':'1','viewsInfo':[{'viewType':VIEW_PLACE, 'viewTime': getTimeStamp() , PLACE_ID_STRING: placeid }]};
							var interaction = {};
							interaction['viewType'] = VIEW_PLACE;
							interaction['viewTime'] = getTimeStamp();
							interaction[PLACE_ID_STRING] = placeid;
	
							bodyContent = {};
							bodyContent['viewsCount'] = "1";
							bodyContent['viewsInfo'] = [interaction];
							console.log("the final body content is ",bodyContent);
							sendViewUpdates(bodyContent);
							console.log("the fb like button is ",$('#fb_place_like'));
							if(FB != undefined){
								FB.XFBML.parse();
							}
							//twttr.widgets.load();
						});
					});
				}
			}
		});
	},
	//Place page end

	/*********************************CAN BE PERSONALIZED FOR A USER = BUT SHOULD BE VISIBLE PUBLICLY***********/
/**	loadRewards :function(){
		console.log('loading reward');
		checkAccess(function(isAccessible){
			if(isAccessible){
				$('#maincontent_full_width').empty();$('#maincontent').empty();
				$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
				$('#maincontent').load('rewards.html',function(){
					//rewardsDisplay
					fetchRewardsAll(function(rewardsInfo){
						view = new App.Views.RewardsCollectionView ({
							rewardsInfo: rewardsInfo,
							el : $('#rewardsDisplay')[0]
						});    
					})
				});
				setActiveTab("rewards_tab");
			}
		});
	},
	/******************************* THESE ARE NOT ROUTES BUT ARE CALLED IN ROUTES ***************/

/**	//this for popular in following page
	getPopularDeals: function(callback){
		fetchPopularDeals(function(popularDeals){
			new App.Views.PopularInFollowing({
		    popularDeals: popularDeals,
		    el :$("#popularStores")
		  });		
			callback();
			//this is for the following page . Pintrest style loadign              
			//var $container = $('#popularDealsHolder');
			//$container.imagesLoaded(function(){
			//  $container.masonry({
			//    itemSelector : '.deal_div_top',
			//    columnWidth : 230
			//  });
			//});
		});
	},

	// this is for recent reviews in following page
	getRecentReviews : function(){
		fetchRecentReviews(getCookie("city"),"3",function(recentReviews){
			console.log("loadReviews data is ", recentReviews);
			view = new App.Views.UpdatingRecentReviewCollectionView({
				collection: recentReviews,
				el :$("#recentReviewsHolder")
			});
			view.render().el
		});
	},

	loadOffersSearchMap:function(area,query){
		$("#search_area").val(area);
		if(query === undefined){
			loadOfferSearchMap(area,"");
		}
		else{
			$("#search_text").val(query);
			loadOfferSearchMap(area,query);    
		}
	},

	loadNearby : function(){
		this.loadNearbyQuery(undefined,undefined);
	},

/**	loadNearbyQuery: function(area,query){
		console.log("the nearby is being loaded");
		if(area === undefined){
			area = default_loc ;
		}
		$("#search_area").val(area);
		if(query === undefined){
			loadPlaceSearch(area,"");
		}
		else{
			$("#search_text").val(query);
			loadPlaceSearch(area,query);    
		}
	}**/
});


/**

function getFollowingStores(id,callback){
	console.log('getting the list of following stores ',followingStoreCollection);
	fetchFollowingStores(0,11,true,true,function(followingStores){
		followingStoreCollection = followingStores;
		new App.Views.FollowingStore({
			storeCollection:followingStoreCollection,
			el : $("#followingStores"),
			heading : $('#followingStoreViewHeading'),
			isRecommended : false,
			storeId:id
		});
		new App.Views.FollowingStoreList({
			storeCollection:followingStoreCollection,
			el: $('#following_store_unordered_list'),
			showFollowButton : false,
			noStoreMessage : $('#following_no_store_message')
		});
		lv = new App.Views.FollowingPageination({
			offset:11,
			count:11,
			el:$('#following_pagination')
		});
		console.log("the following store loading has been completed");
		callback();
	});
};
        
        
function getRecommendedStores(id,callback){
	console.log('getting the list of following stores ',recommendedStoreCollection);
	fetchRecommendedStores(undefined,true,true,function(recommendedStores){
		recommendedStoreCollection =recommendedStores;
		new App.Views.FollowingStore({
	    storeCollection:recommendedStoreCollection,
			el : $("#recommendedStores"),
	    heading : $('#recommendedStoreViewHeading'),
	    isRecommended :true,
    	storeId:id
		});
		new App.Views.FollowingStoreList({
	    storeCollection:recommendedStoreCollection,
	    el: $('#recommended_store_unordered_list'),
	    showFollowButton : true,
    	noStoreMessage:$('#recommended_no_store_message')
		});
		callback();
	});
}

function loadMap(address,latlong){
	if(latlong === undefined){
		console.log("in if option ");
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': address}, function(results, status) {
		  if (status == google.maps.GeocoderStatus.OK) {
	      var latlng = results[0].geometry.location;
	      loadMap(address,latlng);
		  }
		  else {
	      alert("Geocode was not successful for the following reason: " + status);
		  }
		});
	}
	else{
		content = '<div id="map_canvas" style="width: 978px; height: 410px;">'+'</div>';
		$('.tab_active').removeClass('tab_active');
		$('#map').addClass('tab_active');
		$('#tab_content').html(content);
		console.log("in else option ");
	  var myOptions = {
		  zoom: 15,
		  center: latlong,
		  zoomControl: true,
		  mapTypeId: google.maps.MapTypeId.ROADMAP,
		  disableDefaultUI: true
	  }
	  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	  var marker = new google.maps.Marker({
		  map: map,
		  position: latlong	      
	  });
	  var infowindow = new google.maps.InfoWindow({
      content: address
	  });
	  infowindow.open(map,marker);
	  google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
	  });	
	} 
};


function loadPopularDeals(callback){
	console.log('getting popular deals',CITY_LATLONG[ getCookie("city")]);
  var city = getCookie("city");
  if(city == "" || city == undefined || city == null){
	  city = default_loc;
  }
  searchOffers(CITY_LATLONG[city][0],CITY_LATLONG[ city][1],"1","Popular","50",function(popularDeals){
		new App.Views.Popular({
	    popularDeals: popularDeals,
      el :$("#popularDeals")
    });
    callback();
  });
};


function loadFollowingForHome(){
	fetchFollowingStores(0,12,false,false,function(followingStores){
	  followingStoresForHome = followingStores;
	  new App.Views.FollowingStorePreview({
		  followingStoreCollection:followingStoresForHome ,
		  recommendedStoreCollection:recommendedStoresForHome,
		  el: $('#followingInHome'),
		  isFollowing : true,
		  noStoreMessage : $('#followingInHome_noStore')
    });
	});    
};

function loadRecommendedForHome(){
	fetchRecommendedStores(10,false,false,function(recommendedStores){
		recommendedStoresForHome = recommendedStores;
		if(recommendedStores.length >0){
		  new App.Views.FollowingStorePreview({
		    recommendedStoreCollection:recommendedStoresForHome,
		    followingStoreCollection:followingStoresForHome ,
		    el: $('#recommendedInHome'),
		    isFollowing : false,
		    noStoreMessage:$('#recommendedInHome_noStore')
      });
		}
		else{
	    $('#recommendedInHomeTop').hide();
		}
	});
};

function loadOfferExploreCatergories(){
	fetchOfferExploreCategories(function(exploreInfo){
		//console.log("++++++++++++++++++++++++",exploreInfo);
		new App.Views.ExploreNearbyCategoryCollectionView ({
		  exploreInfo:exploreInfo,
		  el : $('#offer_search_categories_holder')
		});
	});
};

function loadPlaceExploreCategories(){
  fetchPlaceExploreCategories(function(exploreInfo){
    console.log("++++++++++++++++++++++++",exploreInfo);
    new App.Views.ExploreNearbyCategoryCollectionView ({
		  exploreInfo:exploreInfo,
		  el : $('#place_search_categories_holder')
    });
  });
};

function loadPlaceSearchMap(address,query,latitude,longitude){
	checkAccess(function(isAccessible){
		if(isAccessible){
  		Backbone.history.navigate("!/searchMap/place/"+address+"/"+query);
	    $('#maincontent_full_width').empty();$('#maincontent').empty();
	    $('#maincontent_full_width').show();$('#maincontent').hide();$('.footer').hide();
	    $('#maincontent_full_width').load("searchMapFixed.html",function(){
				loadPlaceExploreCategories();
				if ( latitude === undefined || longitude === undefined ) {
			    geocodeArea(address,function(latitude_returned,longitude_returned){
						console.log("the latitude "+ latitude_returned+" and longitude " + longitude_returned);
				    loadPlaceSearchMap(address,query,latitude_returned,longitude_returned);   
			    });
			    //$("body").unmask();
				}
				else{
				  var city = getCookie('city');
				  $("body").mask("Searching for "+ query +" near "+address+", " +city,500);
				  setActiveTab("place_search_tab");
				  $("#places_search").click();
				  console.log("the coordinates are "+ latitude +'  ' + longitude);
				  radius = undefined;
		    
			    var $category_elements = $('.category_text');
				  $('.category_image_holder').removeClass('category_image_holder_highlight');
				  $('.category_text').removeClass('category_text_highlight');
		    
				  $('.category_holder').each(function(){
						console.log("the category is ",$.trim($(this).find($category_elements).html()).toLowerCase(),$.trim(query).toLowerCase());
						if($.trim($(this).find($category_elements).html()).toLowerCase() == $.trim(query).toLowerCase()){
					    console.log("we have found the correct category to be selected");
					    $(this).find($('.category_image_holder')).addClass('category_image_holder_selected');
					    $(this).find($('.category_text')).addClass('category_text_selected');
						}    
			    });
			    searchPlaces(latitude,longitude,"1",query,radius,function(nearbyPlaces,maxRadius){
						if(nearbyPlaces.length > 0 ){
						  console.log("received maxRadius",maxRadius);
						  var width = $('#map_canvas').width();
						  var heigth = $('#map_canvas').height();
						  if(width>heigth){
								maxRadius = maxRadius*width/heigth;
						  }
						  console.log("modified maxRadius",maxRadius);
						  var zoom = calculateZoomLevel(width,maxRadius)-1;
						  console.log("the nearby places are more than zero with zoom",zoom);
						}
						else{
						  var zoom = 14;
						  $('#search_result').html(ich.nearbyNoResultTemplate({"id": 1}),true);
						}
						var latlong = new google.maps.LatLng(latitude,longitude);
						var myOptions = {
					    zoom: Math.min(zoom,18),
					    center: latlong,
					    mapTypeId: google.maps.MapTypeId.ROADMAP
					  }   
						var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
						var markersArray = [];
						var highestMarkerZindex = 0;
	       
						var myInfoBoxOptions = {
							alignBottom: true
							,content: "DefaulHover"
							,disableAutoPan: false
							,maxWidth: 0
							,pixelOffset: new google.maps.Size(-75, -70)
							,zIndex: null
							,boxStyle:{
								opacity:1
								,width: "150px"
							}
						 ,closeBoxMargin: "9px 3px 3px -30px"
						 ,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
						 ,infoBoxClearance: new google.maps.Size(1, 1)
						 ,isHidden: false
						 ,pane: "floatPane"
						 ,enableEventPropagation: false
						};
						var infoWindowHover = new InfoBox(myInfoBoxOptions);
						var infoWindowClick = new InfoBox(myInfoBoxOptions);
			
						if(nearbyPlaces.length > 0 ){
					    new App.Views.NearbyCollectionViewMap({
								nearbyPlaces: nearbyPlaces,
								el :$('#search_result')[0],
								map :map,
								markersArray:markersArray,
								infoWindowClick:infoWindowClick,
								infoWindowHover:infoWindowHover,
								higestMarkerZindex:highestMarkerZindex
					    });
							$("body").unmask();
						}else{
							$("body").unmask();    
						}
			
						updateMapResults = function(){
					  //$("#maincontent_full_width").mask("Loading...");
					  console.log("making a new query ");
					  var center = map.getCenter();
					  var latitude= center.lat();
					  var longitude = center.lng();
					  latlong = center;
					  var bound = map.getBounds();
					  var westLat = bound.getSouthWest().lat();
					  var westLng = bound.getSouthWest().lng();
					  var eastLat = bound.getNorthEast().lat();
					  var eastLng = bound.getNorthEast().lng();
					  var radius = 2;
					  if(width>heigth){
							radius= getDistance(westLat,eastLng,westLat,westLng)/2;
					  }else{
							radius= getDistance(eastLat,westLng,westLat,westLng)/2;
					  }
				    searchPlaces(latitude,longitude,"1",query,radius,function(nearbyPlaces){
							if (markersArray) {
							  for (var i = 0; i < markersArray.length; i++ ) {
							    markersArray[i].setMap(null);
							  }
							}
							markersArray =[];
							highestMarkerZindex = 0;
							if(nearbyPlaces.length > 0){
							  new App.Views.NearbyCollectionViewMap({
									nearbyPlaces: nearbyPlaces,
									el :$('#search_result')[0],
									map :map,
									markersArray:markersArray,
									infoWindowClick:infoWindowClick,
									infoWindowHover:infoWindowHover,
									higestMarkerZindex:highestMarkerZindex
							  });
							}
							else{
						  	$('#search_result').html(ich.nearbyNoResultTemplate());
							}
					  });
				    //var t=setTimeout( $("#maincontent_full_width").unmask(),3000)
					};	
					google.maps.event.addListener(map,'zoom_changed',function(){
			    	updateMapResults();
					});
					google.maps.event.addListener(map,'center_changed',function(){
				    var C = map.getCenter();
				    var X = C.lng();
				    var Y = C.lat();
				    var bound = map.getBounds();
				    console.log("the center has been changed ",C);
				    console.log("the zoom level is ", map.getZoom());
				    var d = getDistance(Y,X,latlong.lat(),latlong.lng());
				    console.log("the distance between the two points is ",d);
				    var result = 40075.004/(Math.pow(2,(map.getZoom())));
				    console.log("the resultant length is ",result)
				    if(d>result){
			       updateMapResults();
				    }
					});
		    });
			}
	  });
	}
});
};


function loadOfferSearch(address,query,latitude,longitude){
    checkAccess(function(isAccessible){
	if(isAccessible){
	    
	    console.log("in load Offer Search ");
	    Backbone.history.navigate("!/search/offer/"+address+"/"+query);
	    $('#maincontent_full_width').empty();$('#maincontent').empty();
	    $('#maincontent_full_width').hide();$('#maincontent').show();$('.footer').show();
	    $('#maincontent').load("search.html",function(){
		$('#search_results_loader').hide();
		loadOfferExploreCatergories();
		setActiveTab("offer_search_tab");
		$("#offers_search").click();
		
		if ( latitude === undefined || longitude === undefined ) {
		   
		    geocodeArea(address,function(latitude_returned,longitude_returned){
			loadOfferSearch(address,query,latitude_returned,longitude_returned);
		    });
		    //$("body").unmask();
		}
		else{
		    var city = getCookie('city');
		    $("body").mask("Searching for "+ query +" offers & new arrivals near "+address+", " +city,500);
		    $('#search_results').empty();
		 
		    console.log("the coordinates are "+ latitude +'  ' + longitude);
		    
		    var $category_elements = $('.category_text');
		    $('.category_image_holder').removeClass('category_image_holder_highlight');
		    $('.category_text').removeClass('category_text_highlight');
		    
		    $('.category_holder').each(function(){
			console.log("the category is ",$.trim($(this).find($category_elements).html()).toLowerCase(),$.trim(query).toLowerCase());
			if($.trim($(this).find($category_elements).html()).toLowerCase() == $.trim(query).toLowerCase()){
			    console.log("we have found the correct category to be selected");
			    $(this).find($('.category_image_holder')).addClass('category_image_holder_selected');
			    $(this).find($('.category_text')).addClass('category_text_selected');
			}    
		    });
		      
		    searchOffers(latitude,longitude,"1",query,undefined,function(nearbyOffers){
			console.log("the nearby offers are ",nearbyOffers);
			if(nearbyOffers.length > 0){
			    console.log("the nearbyOffers are more than zero");
			    eview = new App.Views.OfferSearchCollectionView({
				collection:nearbyOffers,
				el : $('#search_results')
			    });
			    eview.render();
			    $('search_results_loader').show();
			    lv = new App.Views.EndlessLoader({
				longitude:longitude,
				latitude:latitude,
				query:query,
				nextPageCount:2,
				el:$('#search_results_loader')
			    });
			    
			    try{
				FB.XFBML.parse();
			    }
			    catch(error){
				
			    }
			    
			    $(document).unbind("scroll"); // unbinding any previous endless scrolls
			    $(document).endlessScroll({
				bottomPixels: 150,
				fireDelay: 10,
				intervalFrequency: 5,        
				ceaseFire:function(i){
				    if($("#search_results_loader").is(':hidden')){
					console.log("ceasfire for the offers is being called");
					return true;
				    }
				    else{
					return false;
				    }
				},
				callback: function(i) {
				    if(!$("#search_results_loader").is(':hidden')){
				       $('#endless_loader_more').click();
				    }
				}
			    });
			    $("body").unmask();
			    $('a[rel*=facebox]').facebox();
			    $('#search_results_loader').show();
			}
			else{
			    $('#search_results').html('<p>No results found . Please try another search </p>');
			    $("body").unmask();
			    $('#search_results_loader').hide();
			}
			
			
		    });
		   
		}
		//$('#loading').hide();
	    });
	}
    });
};


//this is for the stores for malls in place page
function loadStores(placeid){
    $('.tab_active').removeClass('tab_active');
    $('#stores').addClass('tab_active');
    console.log('loading the offers for place id :',placeid);
    $('#tab_content').load('stores.html',function(){

        fetchMallPlaces(placeid,function(places,placesArray){
	    console.log("the mall places info is",places);
            var placeFinal =new PlaceCollection(placesArray );
            $('#filter_box').keyup(function(){
                $('.category_image_holder').removeClass('category_image_holder_selected');
                $('.category_text').removeClass('category_text_selected');
                console.log("the key up function is being called",$('#filter_box').val().toLowerCase());
		console.log("the places is ",places,placeFinal);
                placeFinal.reset(new PlaceCollection(placesArray).filter(function(place){
                    return place.get("placeName").toLowerCase().indexOf($('#filter_box').val().toLowerCase()) == 0
                }));
		console.log("the new placeFinal is " , placeFinal,places);
            });
            new App.Views.placesCollectionPreview({
                placeCollection : placeFinal,
                el: $('#store_result_holder')
            });
	    fetchMallFilterCategories(function(filterInfo){
            	new App.Views.FilterCategoryCollectionView ({
         	      	filterInfo:filterInfo,
	                el : $('#store_filter_categories_holder')
		});
	     });
       	     $('.deal_div_top_explore').click(function(){
		var filter =$.trim( $(this).find('.category_text')[0].textContent);
		console.log('the filter is ',filter);
                $('.category_image_holder').removeClass('category_image_holder_selected');
                $('.category_text').removeClass('category_text_selected');
                $(this).find('.category_image_holder').addClass('category_image_holder_selected');
                $(this).find('.category_text').addClass('category_text_selected');
		if(filter.toLowerCase() == 'all'){
                        console.log("all has beein selected for mall filter ");
                        placeFinal.reset(new PlaceCollection(placesArray).filter(function(place){
                            return true;
                        }));
                }
		else{
	                placeFinal.reset(new PlaceCollection(placesArray).filter(function(place){
                            var result = false;
                            $.each(place.get('placeCategories'),function(index,category){
                                console.log('the category and filer are',filter ,category);
                                if(category == filter ){
                                    result = true;
                                  return false;
                                }
                            });
                            return result;
            		}));
		}
        });
        }); 
    });
};

function loadOutlets(placeid){
  $('#tab_content').empty();
  $('.tab_active').removeClass('tab_active');
  $('#outlets').addClass('tab_active');
  $('#tab_content').mask("",500);
  console.log('loading the offers for place id :',placeid);
  $('#tab_content').load('outlets.html',function(){
		fetchPlaceOutlets(placeid,function(outlets){
			new App.Views.placesCollectionPreview({
				placeCollection : outlets,
				el: $('#outlets_content'),
				isOutlets:true
		  });
		});
  });
  $('#tab_content').unmask();
}

function loadOffers(placeid,offerid) {
	$('.tab_active').removeClass('tab_active');
	$('#offers').addClass('tab_active');
	console.log('loading the offers for place id :',placeid);
	$('#tab_content').load('offers.html',function(){
		fetchOffers(placeid,function(offersCollection){
			new App.Views.OfferCollectionView({
				offerCollection:offersCollection,
				selectedOffer:offerid ,
				el : $('#offers_tab')[0],
				placeId:placeid
			});
		  console.log("the offersCollection is",offersCollection);	  
		  var selectedOffer= offersCollection.find(function(offer){
	      return offer.get("dealId")== offerid
		  });
		  try{
	      FB.XFBML.parse();
		  }
		  catch(error){		      
		  }
		  $('meta[name=Description]').attr('content', selectedOffer.get('dealDesc'));
		  $("meta[property=og\\:title]").attr("content", selectedOffer.get('dealName'));
		  $("meta[property=og\\:image]").attr('content',selectedOffer.get('dealImage'));
		  $("meta[property=og\\:url]").attr('content',IPADDRESS+'/delight-website/#!/place/'+placeid+'/offers/'+offerid);
		  $('meta[name=Keywords]').attr('content', selectedOffer.get('dealDesc'));
		});    
	}); 
};


function loadFeatured(placeid,featuredid){
	console.log('loading the featured offers for place id :',placeid);
	$('.tab_active').removeClass('tab_active');
	$('#featured').addClass('tab_active');
	$('#tab_content').load('featured.html',function(){
		fetchFeatured(placeid,function(featured){
			new App.Views.FeaturedCollectionView({
				featuredCollection:featured,
				selectedFeatured:featuredid,
				el : $('#featured_tab')[0],
				placeId:placeid
			});     
			//new App.Views.Featured({featuredCollection:featured,selectedFeatured:featuredid});
			try{
				FB.XFBML.parse();
			}
			catch(error){
			}
	  });
	});
};

function loadWall(placeid,placetype,reviewId){
	$('.tab_active').removeClass('tab_active');
	$('#wall').addClass('tab_active');
	$("#tab_content").load("wall.html",function(){
	  fetchOffers(placeid,function(offersCollection){
	    if(offersCollection.length > 0){
	      new App.Views.OffersPreviewCollectionView({
	        offerCollection:offersCollection,
          el : $('#offers_preview')[0],
          placeId:placeid,
          isOffer : true
        });          
      }
      else{
	      $('#offer_heading').hide();
      }
	  });
	  fetchFeatured(placeid,function(featured){
	    if(featured.length > 0){
				new App.Views.OffersPreviewCollectionView({
					offerCollection:featured,
					el : $('#featured_preview')[0],
					placeId:placeid,
					isOffer : false
				});
			}
      else{
	      $('#featured_heading').empty();
      }
	  });
	  //console.log("tab content ",$("#tab_content").html());
	  console.log('loading the reviews for place id :', placeid);
	  fetchReviews(placeid,placetype,function(reviews){
		  new App.Views.Wall({
		    reviewInfo:reviews,
		    placeId:placeid,
		    el :$('#place_reviews')[0],
		    reviewId:reviewId
		  });
	  });  
	});
};

function loadGPlace(data){         
    console.log('place info returned is', data);
    var place = new Place(data);
    new App.Views.Place({
        placeInfo: place,
        el : $('#r_right')[0]
    });
    $('#tab_content').load('wall.html',loadWall(place.get("placeId"),GOOGLE_STRING));
    console.log('new Place view created');
};

function getGPlaceFromModel(model){
	console.log(' The gplace model is  ' , model);
	$('#maincontent_full_width').empty();$('#maincontent').empty();
	$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
	$('#maincontent').load('place.html',function(){
		rc = new RestClient(URL_GPLACE_INFO, 'POST');
		rc.addBody(JSON.stringify(model));
		rc.request(function(data){
		  console.log("gplace data returned is ",data);
		  loadGPlace(data);
		  Backbone.history.navigate("#!/place/"+data["placeId"]);
		});
	});
};
**/
function setActiveTab(activetab, activesubtab){
//	$("#dashboard_overview_tab").removeClass("active");
	activateSubmenu(activetab);
	_.each(MENU_ARRAY_OBJECT.menuitems,function(menuitem){
		$("#"+menuitem.path+"_tab").removeClass("active");
		_.each(menuitem.submenu,function(submenuitem){
			$("#"+menuitem.path+"_"+submenuitem.path+"_tab").removeClass("active");
		});
	});
	$(".user_details_right").removeClass("active");
	switch(activetab){
		case 'user_name':
			$(".user_details_right").addClass("active");
			break;
		default:
			$("#"+activetab+"_tab").addClass("active");
			$("#"+activetab+"_"+activesubtab+"_tab").addClass("active");
			break;
	}
};

function activateSubmenu(menuitem){
	var submenu_items = fetchSubMenuItems(menuitem);
	$('#subnav_wrapper').html(ich.subnavTemplate(submenu_items));
};
	
function loadTab(activeTab, activeSubTab, defaultSubTab){
	console.log("loading the "+ activeTab +"page");
	//Set the curret menuitem and submenuitem
	if(activeSubTab == undefined){
		activeSubTab = defaultSubTab;
	}
	$('#maincontent_full_width').empty();$('#maincontent').empty();
	$('#maincontent_full_width').hide(); $('#maincontent').show();$('.footer').show();
	$('#maincontent').load('/static/js/templates/'+"report"+".tpl",function(){ //activeTab
		$('#tabcontent_full_width').empty();$('#tabcontent').empty();
		$('#tabcontent_full_width').hide(); $('#tabcontent').show();$('.footer').show();
		$('#tabcontent').load('/static/js/templates/'+activeTab+"_"+activeSubTab+".tpl",function(){
			setActiveTab(activeTab,activeSubTab);
			ich.grabTemplates(); // add page templates to ich
			loadPage(activeTab,activeSubTab);
			Backbone.history.navigate('!/'+activeTab+'/'+activeSubTab,{ replace: true});
		});
	});
};

function loadPage(activeTab,activeSubTab){
	switch(activeTab){
		case 'dashboard':
			switch(activeSubTab){
				case 'overview':
					console.log("loading" + activeSubTab);
					break;
				case 'item01':
					console.log("loading" + activeSubTab);
					break;
				case 'item02':
					console.log("loading" + activeSubTab);
					break;
				case 'item03':
					console.log("loading" + activeSubTab);
					break;
				default:
					break;
			}
		case 'report':
			switch(activeSubTab){
				case 'useractivity':
					console.log("loading" + activeSubTab);
					break;
				case 'item11':
					console.log("loading" + activeSubTab);
					break;
				case 'item12':
					console.log("loading" + activeSubTab);
					break;
				case 'item13':
					console.log("loading" + activeSubTab);
					break;
				default:
					break;
			}
		case 'connect':
			switch(activeSubTab){
				case 'location':
					console.log("loading" + activeSubTab);
					break;
				case 'link':
					console.log("loading" + activeSubTab);
					break;
				default:
					break;
			}
		case 'policy':
			switch(activeSubTab){
				case 'category':
					console.log("loading" + activeSubTab);
					fetchCategoryList(function(superCategoryCollection,userdefinedSuperCategory){
						new App.Views.SuperCategoryListView({
							superCategoryCollection : superCategoryCollection,
							el :$("#autoSuperCategoryCollectionDisplay")
						});
						new App.Views.UserDefinedCategoryListView({
							userdefinedSuperCategory : userdefinedSuperCategory,
							el :$("#userdefinedcategorylisting")
						});						
						
					});    
					break;
				case 'timeslot':
					console.log("loading" + activeSubTab);
					break;
				case 'urlfilter':
					console.log("loading" + activeSubTab);
					break;
				case 'webfilter':
					console.log("loading" + activeSubTab);
					break;
				default:
					break;
			}
		case 'admin':
			switch(activeSubTab){
				case 'generalinfo':
					console.log("loading" + activeSubTab);
					break;
				case 'locations':
					console.log("loading" + activeSubTab);
					break;
				case 'users':
					console.log("loading" + activeSubTab);
					break;
				case 'subscription':
					console.log("loading" + activeSubTab);
					break;
				default:
					break;
			}
		default:
			break;
	}
};
