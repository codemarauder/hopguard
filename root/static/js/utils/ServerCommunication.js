fetchSubMenuItems = function(menuitem){
	var chosenMenu = _.find(MENU_ARRAY_OBJECT.menuitems,function(lmenuitem){
		if(lmenuitem.path == menuitem){
			_.each(lmenuitem.submenu,function(submenuitem){
				submenuitem.parentpath=menuitem;
			});
			return lmenuitem;
		}
	});
	return $.parseJSON(JSON.stringify(chosenMenu));    
}

fetchCategoryList = function(callback){
	console.log('getting category list');
	rc = new RestClient(URL_CATEGORY_LIST, 'GET');
	rc.request(function(data){
		console.log(' Categories returned is: ', data);
		var superCategoryList = [];
		var userdefinedSuperCategory;
		_.each(data.supercategories,function(supercategory){
			if(supercategory.name == USER_DEFINED_CATEGORY){
				userdefinedSuperCategory = new SuperCategory(supercategory);
			}else{
				superCategoryList.push(new SuperCategory(supercategory));		
			}
		});
		superCategoryCollection = new SuperCategoryCollection(superCategoryList);
		callback(superCategoryCollection,userdefinedSuperCategory);
	});
}

/**    checkFbUserExists = function(email,callback){
        rc = new RestClient(URL_CHECK_FB_USER,'POST');
        rc.addHeader("Accept", "application/json");
        var user={'email':email};
        rc.addBody(JSON.stringify(user));
        rc.request(function(data){
            console.log("response to check fb user exists is ",data);
            if(data['result'] == "yes"){
                callback(true,data);
            }
            else if(data['result'] == "no"){
                callback(false,data);
            }
        });
    };**/
    
/**    fbUserLogin = function(user,callback){
        rc = new RestClient(URL_FB_USER_LOGIN,'POST');
        rc.addHeader("Accept", "application/json");
        rc.addBody(JSON.stringify(user));
        rc.request(function(data){
            console.log("response to fb user login is ",data);
            if(data['result'] == RESULT_OK){
                callback(true,data);
            }
            else if(data['result'] == 'already exists'){
                callback(false,data);
            }
        });
    };**/

    getUserInfo =function(callback){
        rc = new RestClient(URL_USER_INFO, 'GET');
        rc.request(function(data){
            console.log(' User info data returned is: ', data);
            var user = new User(data);
            callback(user);
        });
    };
    
/**    fetchBrandPlace = function(brand,callback){
        rc = new RestClient(URL_BRAND_SEARCH + '/' + brand, 'GET');
        try{
            addLocationData(rc,function(){
                rc.request(function(data){
                    console.log('the data returned for fetchBrnadPage is',data);
                    if(data['result'] == RESULT_OK){
                        callback(true,data);
                    }
                    else{
                        callback(false,data);
                    }
                });
            });
        }
        catch(error){
            callback(false);
        }
    }; **/

    updateUserPhone = function(phone,callback){
        rc = new RestClient(URL_UPDATE_PHONE ,'POST');
        var phoneJson ={'userPhone':phone};
        rc.addBody(JSON.stringify(phoneJson));
        rc.request(function(data){
            if(data['result'] == RESULT_OK){
                console.log("the user phone details has been updated");
                callback(true,data);
            }
            else{
                console.log("the user phone has not been updated");
                callback(false,data);
            }
        });
        
        
    };
    
/**    createAnonymousUser = function(callback){
        rc = new RestClient(URL_LOGIN_ANONYMOUS, 'POST');
        rc.request(function(data){
            if(data['result'] == RESULT_OK){
                console.log('cookie created');
                setCookie('login_type','anonymous',365);// setting the login type to anonymous
                setCookie('city',default_loc,1);
                console.log("setting the city as ",default_loc);
                console.log('creating anonymous cookie ');
                console.log('the location of the city is  ',CITY_LATLONG[ getCookie("city")]);
                setLocation(CITY_LATLONG[ getCookie("city")][0],CITY_LATLONG[ getCookie("city")][1]);
                callback();
            }
            else{
                console.log('cookie not created',data);
            }
        });
    }; **/
    
/**    setLocation = function(lat,lng,callback){
        var location = {'lat':lat,'long':lng};
        var JSONlocation = JSON.stringify(location);
        rc = new RestClient(URL_SET_LOCATION ,'POST');
        rc.addBody(JSONlocation);
        rc.request(function(data){
            if(data['result'] == RESULT_OK){
                console.log('user location is set to ',lat,lng);
            }
            else
                console.log('cookie not created and data retruned is ',data);
        });
    } **/
    
/**    searchPlaces = function(latitude, longitude, page,query,radius,callback){
        console.log("performing place search ", query);
        var rc;
        query = $.trim(query);
        if(query == ''){
            query = "Nearby";
        }
        rc = new RestClient(URL_SEARCH_PLACES, 'GET');
        rc.addParam("lat", latitude);
        rc.addParam("query", query);
        rc.addParam("long", longitude);
        rc.addParam("page",page);
        if(radius === undefined){
            
        }
        else{
             rc.addParam("radius",radius);
        }
        rc.request(function(data){
            if(data['result']==RESULT_OK){
                console.log('place search data returned as :' , data);
                var nearbyPlaces = new NearbyPlacesCollection(data['places']);
                console.log('places collection is: ' , nearbyPlaces);
                var maxDistance = parseFloat(data['maxDistance']);
                callback(nearbyPlaces,maxDistance);
            }
            else if(data['result']==RESULT_ZERO_RESULTS ){
                var nearbyPlaces = new NearbyPlacesCollection();
                callback(nearbyPlaces, 0);
            }
        });
    }; **/
    
/**    fetchWishlist = function(callback){
        console.log('start of page wishlist ');
        rc = new RestClient(URL_GET_WISHLIST ,'GET');
        rc.addParam("lastDate", "getAll");
        rc.request(function(data){
            console.log('the wishlist data returned',data);
            wishlistCollection = new StoreCollection(data['wishlistInfo']);
            callback(wishlistCollection);
        });
    }; **/
    
/**    fetchUserFeed = function(callback){
        rc = new RestClient(URL_USER_FEED,'GET');
        rc.addParam("count", 20);
        rc.request(function(data){
            console.log("the user feed returned is ",data['interactions']);
            interactionCollection = new InteractionCollection(data['interactions']);
            callback(interactionCollection);
        });
    };**/

/**    searchOffers = function(latitude, longitude, page,query,radius,callback){
        console.log("performing offer search ", query);
        var rc;
        query = $.trim(query);
      
        rc = new RestClient(URL_OFFER_SEARCH, 'GET');
        rc.addParam("query", query);
        rc.addParam("lat", latitude);
        rc.addParam("long", longitude);
        rc.addParam("page",page);
        if(radius === undefined){
            
        }
        else{
             rc.addParam("radius",radius);
        }
        rc.request(function(data){
             console.log('data returned as :' , data);
             var nearbyOffers = new DealsCollection(data['offersInfo']);
             console.log('places collection is: ' + nearbyOffers);
              var maxDistance = parseFloat(data['maxDistance']);
             callback(nearbyOffers,maxDistance);
        });
    };**/
    
/**    geocodeArea = function (address,callback){
        geocoder = new google.maps.Geocoder();
        city = getCookie("city");
        geocoder.geocode( { 'address': address+" , "+city}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var latlong = results[0].geometry.location;
                console.log("latlong",latlong);
                latitude = latlong.lat();
                longitude = latlong.lng();
                console.log("the lat"+latitude+" and long are "+longitude);
                callback(latitude,longitude);
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });  
    };**/
    
/**    fetchRecentReviews = function(city,count,callback){
        console.log("getting recent reviews", city);
        var rc;
        
      
        rc = new RestClient(URL_RECENT_REVIEWS, 'GET');
        rc.addParam("city", city);
        rc.addParam("count", count);
        rc.request(function(data){
             console.log('data returned as :' , data);
             var recentReviews = new DealsCollection(data['reviewsInfo']);
             console.log('places collection is: ' + recentReviews);
             callback(recentReviews);
        });
    };**/
    
/**    fetchPlaceInfo = function(placeid,callback){
        rc = new RestClient(URL_PLACE+ placeid, 'GET');
        rc.request(function(data){
            console.log('place info returned is', data);
            var place = new Place(data);
            callback(place);
        });
    };**/
    
/**    fetchMallPlaces = function(placeid, callback){
        rc = new RestClient(URL_PLACE+ placeid + '/mallPlaces', 'GET');
        rc.request(function(data){
            if(data['result'] == RESULT_OK)
            {
                console.log('mall places info returned is', data);
                var places = new PlaceCollection (data['placesInfo']);
                callback(places,data['placesInfo']);
            }
        });  
    };**/
    
/**    fetchPlaceOutlets = function(placeid,callback){
        rc = new RestClient(URL_PLACE+ placeid + '/outlets'  ,'GET');
        rc.request(function(data){
            console.log("the place outlets data returned is ",data);
            if(data['result'] == RESULT_OK)
            {
                var outlets = new PlaceCollection (data['outletsInfo']);
                callback(outlets);
            }
        });
    };**/

/**    fetchOffers = function(placeid,callback){
        rc = new RestClient(URL_PLACE+ placeid+"/deals" ,'GET');
        rc.addParam(PLACE_TYPE_STRING,DELIGHT_STRING);
        rc.request(function(data){
            console.log('Offers data received is : ' ,data );
            var offersCollection = new DealsCollection(data['dealsInfo']);
            callback(offersCollection);
        });
    };**/
    
/**    fetchFeatured = function(placeid,callback){
        rc = new RestClient(URL_PLACE + placeid+"/featured",'GET');
        rc.addParam(PLACE_TYPE_STRING,DELIGHT_STRING);
        rc.request(function(data){
            console.log('Featured data received is : ' ,data );
            var featured = new FeaturedCollection(data['featuredInfo']);
            callback(featured);
        });
    };**/
    
/**    fetchReviews = function(placeid,placetype,callback){
        rc = new RestClient(URL_PLACE+placeid+"/reviews",'GET');
        rc.addParam(PLACE_TYPE_STRING,placetype);
        rc.request(function(data){
            console.log('Reviews data received is : ' ,data );
            var reviews = new ReviewsCollection(data['reviewsInfo']);
            callback(reviews);
        });
    };**/
    
/**    fetchRecommendedStores = function(count,offers,featured,callback){
        rc = new RestClient(URL_RECOMMENDED_STORES,'GET');
        if(!offers){
            rc.addParam('offers',false);
        }
        if(!featured){
            rc.addParam('featured',false);
        }
        if(count != undefined){
            rc.addParam('count',count);
        }
        addLocationData(rc,function(){
            rc.request(function(data){
              console.log('recomennded stores data returned: ', data);
              var recommendedStores = new StoreCollection(data['storesInfo']);
              console.log('recommended store data returned is: ',recommendedStores);
              callback(recommendedStores);
            });
        });
    };**/
    
/**    fetchSuggestedStores = function(type,callback){
        rc = new RestClient(URL_SUGGESTED_STORES ,'GET');
        rc.addParam(PLACE_TYPE_STRING,type);
        rc.request(function(data){
            console.log('the follow more data returned',data);
            storeCollection = new StoreCollection(data['storesInfo']);
            callback(storeCollection);
        });
    };**/
    
    
/**    fetchFollowingStores = function(offset,count,offers,featured,callback){
        rc = new RestClient(URL_FOLLOWING_STORES,'GET');
        if(offset != undefined && count != undefined){
            rc.addParam('offset',offset);
            rc.addParam('count',count);
        }
        if(!offers){
            rc.addParam('offers',false);
        }
        if(!featured){
            rc.addParam('featured',false);
        }
        addLocationData(rc,function(){
            rc.request(function(data){
                console.log('following store data returned is: ',data);
                var followingStores = new StoreCollection(data['followingStoresInfo']);
                console.log('following store data returned is: ',followingStores);
                callback(followingStores);
            });    
        });
        
    } **/

/**    fetchOfferExploreCategories = function(callback){
        var offerExplore = {"exploreInfo":
                    [
                        {   "exploreImage": "cat_nearby.png",
                            "exploreCategory": "Popular",
                            "type":"offer"
                        },
                        {   "exploreImage": "cat_apparel.png",
                            "exploreCategory": "Apparel",
                            "type":"offer"
                        },
                        {   "exploreImage": "cat_electronics.png",
                            "exploreCategory": "Electronics",
                            "type":"offer"
                        },
                        {   "exploreImage": "cat_homedecor.png",
                            "exploreCategory": "Home Decor",
                            "type":"offer"
                        },
                        {   "exploreImage": "cat_restaurants.png",
                            "exploreCategory": "Restaurants",
                            "type":"offer"
                        },
                        {   "exploreImage": "cat_grocery.png",
                            "exploreCategory": "Grocery",
                            "type":"offer"
                        },
                        {   "exploreImage": "cat_footwear.png",
                            "exploreCategory": "Footwear",
                            "type":"offer"
                        },
                        {   "exploreImage": "cat_mobile.png",
                            "exploreCategory": "Mobiles",
                            "type":"offer"
                        }
                    ]    
                };
        var exploreModel =new ExploreCollection(offerExplore['exploreInfo']) ;
        callback(exploreModel);
    }**/
    
/**    fetchPlaceExploreCategories = function(callback){
        var placeExplore = {"exploreInfo":
                    [
                        {   "exploreImage": "cat_nearby.png",
                            "exploreCategory": "Nearby",
                            "type":"place"
                        },
                           {   "exploreImage": "cat_shopping.png",
                            "exploreCategory": "Shopping",
                            "type":"place"
                        },
                            {   "exploreImage": "cat_electronics.png",
                            "exploreCategory": "Electronics",
                            "type":"place"
                        },
                        {   "exploreImage": "cat_grocery.png",
                            "exploreCategory": "Grocery",
                            "type":"place"
                            
                        },
                        {   "exploreImage": "cat_restaurants.png",
                            "exploreCategory": "Restaurants",
                            "type":"place"
                        },
                        {   "exploreImage": "cat_coffee.png",
                            "exploreCategory": "Coffee",
                            "type":"place"
                        },
                        {   "exploreImage": "cat_bars.png",
                            "exploreCategory": "Bars",
                            "type":"place"
                        },
                        {   "exploreImage": "cat_movies.png",
                            "exploreCategory": "Movies",
                            "type":"place"
                        }
                    ]    
                };
        var exploreModel =new ExploreCollection(placeExplore['exploreInfo']) ;
        callback(exploreModel);    
    }**/

/**    fetchMallFilterCategories = function(callback){
        var placeExplore = {"exploreInfo":
                    [
                        {   "exploreImage": "default_place_grey.png",
                            "exploreCategory": "All",
                            "type":"place"
                        },
                        {   "exploreImage": "cat_apparel.png",
                            "exploreCategory": "Apparel",
                            "type":"place"
                        },
                        {   "exploreImage": "cat_movies.png",
                            "exploreCategory": "Arts & Entertainment",
                            "type":"place"
                            
                        },
                        {   "exploreImage": "cat_electronics.png",
                            "exploreCategory": "Electronics",
                            "type":"place"
                        },
                      
                        {   "exploreImage": "cat_grocery.png",
                            "exploreCategory": "Grocery",
                            "type":"place"
                        },
                        {   "exploreImage": "cat_restaurants.png",
                            "exploreCategory": "Restaurants & Cafes",
                            "type":"place"
                        },
                        {   "exploreImage": "cat_home&office.png",
                            "exploreCategory": "Home & Office",
                            "type":"place"
                        },
                        {   "exploreImage": "default_place_grey.png",
                            "exploreCategory": "Health & Beauty",
                            "type":"place"
                        },
                        {   "exploreImage": "cat_bars.png",
                            "exploreCategory": "Night Life",
                            "type":"place"
                        }
                    ]    
                };
        var exploreModel =new ExploreCollection(placeExplore['exploreInfo']) ;
        callback(exploreModel);    
    }**/

/**    fetchPopularDeals = function(callback){
        console.log('getting popular deals');
            rc = new RestClient(URL_POPULAR_DEALS, 'GET');
            rc.request(function(data){
                console.log(' Popular deals data returned is: ', data);
                var popularDeals = new DealsCollection(data['dealsInfo']);
                callback(popularDeals);
            });
    }**/
    
 /**   followPlace = function(Id,type,oparams,callback){
        prompToSignIn(function(isLoggedIn){
            if(isLoggedIn){
                rc = new RestClient(URL_FOLLOW_STORE+ Id+"/follow", 'POST');
                rc.addParam(PLACE_TYPE_STRING, type);
                if(oparams != undefined && oparams != ""){
                    rc.addParam('oparams',oparams);
                }
                addLocationData(rc,function(){
                    rc.request(function(data){
                        console.log(' data returned from following', data);
                        if(data['result'] ==  RESULT_OK){
                            var store = new Store(data['placeInfo']);
                            callback(true,store);
                        }
                        else{
                            callback(false);
                            console.log("follow place has failed");
                        }
                    });
                });   
            }
            else{
                callback(false,"user access denied");
            }
        });
        
    }**/
    
/**    unfollowPlace = function(Id,type,callback){
        prompToSignIn(function(isLoggedIn){
            if(isLoggedIn){
                rc = new RestClient(URL_UNFOLLOW_STORE+ Id+"/unfollow", 'POST');
                rc.addParam(PLACE_TYPE_STRING, type);
                rc.request(function(data){
                    console.log(' data returned from un-following', data);
                    if(data['result'] ==  RESULT_OK){
                        callback(true);
                    }
                    else{
                        callback(false);
                        console.log("UN follow place has failed");
                    }
                });
            }
            else{
                callback(false,"user access denied");
            }
        });
    }**/
    
    
/**    sharePlaceCall = function(storeId,email,phone,callback){
        rc = new RestClient(URL_PLACE+ storeId+"/share",'POST');
        var body = {'phone':phone , 'email':email};
        JSONbody = JSON.stringify(body);
        rc.addBody(JSONbody);
        rc.request(function(data){
            if(data['result'] ==  RESULT_OK || data['result'] == 'ok'){
                console.log("the details were sent",data);
                callback(true);
            }
            else{
                console.log("there is some error",data);
                callback(false);
            }
        });
    }**/
    
/**    shareDealCall = function(placeId,dealId,email,phone,callback){
        rc = new RestClient(URL_DEALS+ dealId+"/share",'POST');
        console.log("the shareDealCall parameters are ",dealId,phone,email);
        var bodyContent = {'phone':phone,'email':email ,'placeId':placeId};
        var JSONlocation = JSON.stringify(location);
        JSONbody = JSON.stringify(bodyContent);
        rc.addBody(JSONbody);
        rc.request(function(data){
            if(data['result'] ==  RESULT_OK || data['result'] == 'ok'){
                  console.log("the details were sent",data);
                callback(true);
            }
            else{
                console.log("there is some error",data);
                callback(false);
            }
        });
    }**/

/**    shareFeaturedCall = function(placeId,featuredId,email,phone,callback){
        rc = new RestClient(URL_FEATURED+ featuredId+"/share",'POST');
        var body = {'phone':phone , 'email':email,'placeId':placeId};
        JSONbody = JSON.stringify(body);
        console.log("the body is ",JSONbody);
        rc.addBody(JSONbody);
        rc.request(function(data){
            if(data['result'] ==  RESULT_OK || data['result'] == 'ok'){
                console.log("the details were sent",data);
                callback(true);
            }
            else{
                console.log("there is some error",data);
                callback(false);
            }
        });
    }**/
    
/**    addDealToWishlistCall = function(dealId,placeId,callback){
        rc = new RestClient(URL_ADD_DEAL_TO_WISHLIST, 'POST');
        rc.addParam(DEAL_ID, dealId);
        rc.addParam(PLACE_ID_STRING, placeId ) ;
        rc.request(function(data){
            console.log('response to add to wishlist ', data['result']);
            if((data['result'])== RESULT_OK){
                callback(true,data);
            }
            else{
                console.log("error was encountered while adding deal to wishlist");
                callback(false,data);
            }
        });
    }**/
    
    
    
/**    sendViewUpdates = function(interactionJSON){
        rc = new RestClient(URL_VIEWS_UPDATE , 'POST');
        //var bodyContent = {'viewsCount':'1','viewsInfo':{'viewType':type , 'viewTime': getTimeStamp() , PLACE_ID_STRING: placeId , DEAL_ID:offerId }};
        JSONbody = JSON.stringify(interactionJSON);
        rc.addBody(JSONbody);
        rc.request(function(data){
            console.log("the data has been sent ",data);
        });
    };**/
    
    
/**    fetchRewardsAll = function(callback){
        console.log('getting rewards');
        rc = new RestClient(URL_REWARDS_ALL, 'GET');
        rc.request(function(data){
            console.log(' Rewards data returned is: ', data);
            if(data['result'] == RESULT_OK)
            {
                var rewardsInfo = new RewardsCollection(data['rewardsInfo']);
                callback(rewardsInfo);
            }
            else if( data['result'] == RESULT_ZERO_RESULTS){
                console.log("there are no rewards");
            }
        });
    };**/
    
/**    redeemReward  = function(rewardId,callback){
        console.log('redeeming rewards',rewardId);
        rc = new RestClient(URL_REWARDS_REDEEM, 'POST');
        rc.addParam('rewardId',rewardId);
        rc.request(function(data){
            console.log(' Rewards redeem data returned is: ', data);
            if(data['result'] == RESULT_OK)
            {   console.log("Reward was redeemed");
                callback(true,data['rewardMsg'],data['userDPoints']);
            }
            else{
                console.log("Unable to redeem the reward");
                callback(false,data['rewardMsg'],data['userDPoints']);
            }
        });
    };**/

/**    verifyUser = function(uid,hash,callback){
        rc = new RestClient(URL_USER+'/'+uid +'/verify' , 'POST');
        rc.addParam('hash', hash ) ;
	rc.addParam('type','Email');
        rc.request(function(data){
            console.log("the response to verify user is ",data['result']);
		if((data['result'])==RESULT_OK){
			 callback(true,data['result']);
		}
		else{
			callback(false,data['result']);
		}
        });
    };**/
    
sendEmailForForgotPassword = function(email,callback){
	rc = new RestClient(URL_SEND_FORGOT_PASSWORD,'POST');
	rc.addParam('email',email);
	rc.request(function(data){
            console.log('the response to send forgot password is ',data);
            if(data['result'] == RESULT_OK){
                console.log("a link to reset your password has been sent to your email");
                callback(true,data['result']) ;
            }
            else{
             callback(false,data['result']);
            }
	});
};

ResetPassword = function(uid,tempPass,newPass,callback){
	rc = new RestClient( URL_RESET_PASSWORD+'/'+uid+'/'+tempPass ,'POST');
	var body = {'password':newPass};
        JSONbody = JSON.stringify(body);
        rc.addBody(JSONbody);
	rc.request(function(data){
            console.log('the response to send reset password is ',data);
            if(data['result'] == RESULT_OK){
                console.log("the response to reset password is OK ");
                callback(true,data['result']) ;
            }
            else{
             callback(false,data['result']);
            }
	});
};

sendPasswordChange = function(old_pass,new_pass,callback){
    rc = new RestClient(URL_CHANGE_PASSWORD , 'POST');
    var body ={'oldPassword':old_pass, 'newPassword':new_pass};
    JSONbody = JSON.stringify(body);
    rc.addBody(JSONbody);
    rc.request(function(data){
        console.log('the response to send change password is ',data);
        if(data['result'] == RESULT_OK){
            callback(true,data['result']);
        }
        else{
            callback(false,data['result']);
        }
    });
};

/**removeFromWishlistCall = function(wishId,callback){
    rc = new RestClient(URL_REMOVE_FROM_WISHLIST , 'POST');
    var body ={'wishId':wishId};
    JSONbody = JSON.stringify(body);
    rc.addBody(JSONbody);
    rc.request(function(data){
            console.log('the response to send reset password is ',data);
            if(data['result'] == RESULT_OK){
                console.log("the response to remove from wish id is");
                callback(true,data['result']) ;
            }
            else{
             callback(false,data['result']);
            }
    });
    
};**/

/**sendPartnerQuery = function(type, name , email , phone , company_or_brand, message ,callback){
    rc = new RestClient(URL_PARTNER_QUERY, 'POST');
    if(message === undefined){
        var body = {'type':type , 'name':name , 'email':email, 'phone':phone , 'company_or_brand':company_or_brand};
    
    }
    else{
        var body = {'type':type , 'name':name , 'email':email, 'phone':phone , 'company_or_brand':company_or_brand ,'msg':message};
    }
    JSONbody = JSON.stringify(body);
    rc.addBody(JSONbody);
    rc.request(function(data){
        console.log("the response to post queries is ",data);
        if(data['result'] == RESULT_OK){
            callback(true,data['result']);
        }
        else{
            callback(false,data['result']);
        }
        
    });
};**/
requestInvite = function(email,city,phone,callback){
    rc = new RestClient(URL_REQUEST_INVITE , 'POST');
    var body = {
        'email':email,
        'city':city,
        'phone':phone
    }
    JSONbody = JSON.stringify(body);
    rc.addBody(JSONbody);
    rc.request(function(data){
        console.log("the response to request invite is ",data);
        if(data['result'] == RESULT_OK){
            callback(true,data['result']);
        }
        else{
            callback(false,data['result']);
        }
    });
};

addLocationData = function(rc,callback){
    var city = getCookie("city");
    if(city == "" || city == undefined || city == null){
        city = default_loc;
    }
    var latitude=CITY_LATLONG[city][0];
    var longitude =CITY_LATLONG[ city][1];
    rc.addParam("lat", latitude);
    rc.addParam("long", longitude);
    callback();
};
sendDownloadLink = function(data , type , callback){
    rc = new RestClient(URL_SEND_DOWNLOAD_LINK, 'POST');
    if(type == "email"){
        rc.addParam('email',data);
    }else if (type == "sms"){
        rc.addParam('mobile',data)
    }
    rc.request(function(data){
        if(data['result'] == RESULT_OK){
            callback(true,data['result']);
        }
        else{
            callback(false,data['result']);
        }
    });
};
fetchLocalitySuggestions =  function(city,term,callback){
    rc = new RestClient(URL_LOCALITY_SUGGESTIONS,'GET');
    rc.addParam('city',city);
    rc.addParam('term',term);
    rc.request(function(data){
       result = data['locationsInfo'];
       callback(result);
    });
};
fetchOffersSuggestions = function(term,callback){
    rc = new RestClient(URL_OFFER_SUGGESTIONS,'GET');
    rc.addParam('term',term);
    rc.request(function(data){
       result = data['suggestions'];
       callback(result);
    });
};
fetchPlaceSuggestions = function(term,callback){
    rc = new RestClient(URL_PLACE_SUGGESTIONS,'GET');
    rc.addParam('term',term);
    rc.request(function(data){
       result = data['suggestions'];
       callback(result);
    });
    
};
addFeaturedToWishlistCall = function(featuredId,placeId,callback){
    rc = new RestClient(URL_ADD_FEATURED_TO_WISHLIST, 'POST');
    rc.addParam(FEATURED_ID, featuredId);
    rc.addParam(PLACE_ID_STRING, placeId ) ;
    rc.request(function(data){
       console.log('response to add to wishlist ', data['result']);
       if((data['result'])== RESULT_OK){
           callback(true,data);
       }
       else{
           console.log("error was encountered while adding deal to wishlist");
           callback(false,data);
       }
    });
};
    
    
    
