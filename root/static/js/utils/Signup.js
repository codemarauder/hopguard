function hopbox_signin(email,password,remember,callback){
    var errors = [];
    user = {'userEmail':email, 'userPwd':password , 'remember' :remember};
    var JSONuser = JSON.stringify(user);
    console.log('user data in string format: ' + JSONuser);
    var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i ; // regex for 
    if (!ck_email.test(email) || email == '') {
       errors[errors.length] = "please enter valid email";
       console.log("the errors string is ",errors);
    }
    if(password == ''){
        errors[errors.length] = "please enter password";
        console.log("the errors string is ",errors);
    }
    if(errors.length < 1 ){
        console.log("the errors string is ",errors);
        rc = new RestClient(URL_LOGIN,'POST');
        rc.addHeader("Accept", "application/json");
        //rc.addHeader("Content-Type", "application/x-www-form-urlencoded");
        console.log("rc before add body is ",rc);
        rc.addBody(JSONuser);
        console.log("rc after add body is ",rc);
        rc.request(function(data){
            console.log("response to signin: ", data );
            if(data['result']== RESULT_OK){  
                createUser(data,function(){
                    callback(errors);      
                });
                Backbone.history.navigate('!/home',true);
            }
            else{
                errors[errors.length] = data['result'];
                console.log(data['result']);
                callback(errors); 
            }
        });   
    }
    else{
        callback(errors); 
    }
}


function hopbox_signup(name,email,mobilenumber,sex,birthday,birthmonth,birthyear,password,confirmpassowrd,city,callback){
     //console.log("signup callback ",callback);
    var errors = [];
    if($.trim(name) == ''){
        errors[errors.length] = "Enter a name";
    }
    var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i ; // regex for 
    if (!ck_email.test(email)) {
        errors[errors.length] = "Enter a valid email address.";
    }
    if($.trim(mobilenumber) != ''){
        var ck_number = /^[789]\d{9}$/i ;
        if(!ck_number.test(mobilenumber) && mobilenumber!= ''){
            errors[errors.length] = 'please enter valid phone number';
            console.log("the errors string is ",errors);
        }
    }
    if(sex == 0 ){
        errors[errors.length] = "Select Gender ";
    }
    
    if(birthday == -1 || birthyear == -1  || birthmonth == -1){
        errors[errors.length] = "Select valid birthday";
    }
    if($.trim(password) == '' ){
        errors[errors.length] ="Enter password";
    }
    else if( password != confirmpassowrd){
        errors[errors.length] ="Passwords do not match ";
    }
    if(errors.length == 0 ){
        $('#error_messages').empty();
        var birthdayformatted = birthmonth+'/'+birthday+'/'+birthyear;     //      MM/DD/YYYY
        //console.log("the formatted birthdate is : ", birthdayformatted);
        
        //NOT SENDING THE CITY FOR THE TIME BEING
        //user = {'userName':name,'userEmail':email,'userPhone':mobilenumber,'userGender':sex,'userBday':birthdayformatted,'userPwd':password,'userCity':city };
        user = {'userName':name,'userEmail':email,'userPhone':mobilenumber,'userGender':sex,'userBday':birthdayformatted,'userPwd':password };
        console.log("the user data is ",user);
        var JSONuser= JSON.stringify(user);    
        rc = new RestClient(URL_DELIGHT_SIGNUP, 'POST');
        rc.addHeader("Accept", "application/json");
        rc.addBody(JSONuser);
        rc.request(function(data){
            if(data['result']== RESULT_OK){
                errors =[];
                console.log("response to signup: ", data );
                createUser(data);
                callback(errors);

  
            }
            else{
                console.log(data['result']);
                errors[errors.length] = data['result'];
                callback(errors)
            }
            
        });
        
        
    }
    else{
        callback(errors);
        //alert("please enter valid data ");
      
        console.log(errors);
        }
}

function hopbox_logout(){
    rc = new RestClient(URL_LOGOUT,'POST');
    rc.request(function(data){
        console.log("reponse to logut: " ,data );
        if(data['result'] == RESULT_OK){
            console.log("logout sucessful ");
            $('#logged_out').show();
            $('#logged_in').hide();
            
            createAnonymousUser(function(){
                console.log("the create anonymous user was successful");
                //DELETED THE COMMENT ON 30MAY
                FB.logout(function(response1) {
                    console.log("the response to fb logout is ",response1);
                    FB.Auth.setAuthResponse(null, 'unknown');
                    //window.location.href = '#!/home';
                    //window.location.reload();
                });
                Backbone.history.navigate('!/intro',true);
            });
        }
        else{
            console.log("logout unsuccessful ");
        }
        user_global = new User();
    });
};

//function used to set the user name , image and points once the user is logged in
function updateUserInfoDisplay(){
    $('#user_name').html(user_global.get('logged_user').fullname);
//    $('#user_points').html(user_global.get('userDPoints'));
//    $('#user_img').attr('src' ,user_global.get('userPic'));
	//Add Admin tab for Admin User Role
	_.find(user_global.get('logged_user').roles,function(role){
		if(role == ADMIN_ROLE_NAME){
			MENU_ARRAY_OBJECT.menuitems.push(MENU_ARRAY_ADMIN_OBJECT);
		}
	});
	$('#nav_wrapper').html(ich.navTemplate($.parseJSON(JSON.stringify(MENU_ARRAY_OBJECT))));
};


function createUser(data,callback){
    user =  new User( {userName : data['userName'] ,userId : data['userId'], userPic:data['userPic'] , userPwd:"",userName:data['userName'] ,userDPoints:data['userDPoints'], userScans:data['userScans'] , userWalkins:data['userWalkins'] , userLoggedin :'yes'});
    user_global = user;
    setCookie('login_type','delight_login',365);
    if(getCookie('city') == undefined || getCookie('city') == ""){
        setCookie('city','Bangalore',365);
        console.log("setting the city as Banglaore <------------------------<-=------------------------------------------");
    }
    updateUserInfoDisplay();
    $('#logged_out').hide();
    $('#logged_in').show();    
    if(callback === undefined){
        
    }
    else{
        callback();
    }
}


function checkAccess(callback,isModalShown){
    isUserLoggedIn(function(isUserLogged){
        //if(isUserLogged){
            callback(true);
        //}
        //else{
        //    if(Backbone.history.fragment == '!/intro' ){
        //        if(isModalShown == true){
        //            $.facebox({ ajax: 'inviteInfoModal.html' });    
        //        }
        //    }
        //    else{
        //        Backbone.history.navigate('!/intro',{trigger: true, replace: true});
        //        $.facebox({ ajax: 'inviteInfoModal.html' });
        //    }
        //    callback(false);
        //}
    });
    //return true;
}

function prompToSignIn(callback){
    isUserLoggedIn(function(isUserLogged){
        if(isUserLogged){
            callback(true);
        }
        else{
             $.facebox({ ajax: 'signupPrompt.html' });
             //alert("please sign in to perform the action");
             callback(false);
        }
    });
}

function showLoggedInSection(callback){
    console.log("checking login cookie");
    isUserLoggedIn(function(isUserLogged){
        if(isUserLogged){
            console.log("the login cookie is PRESENT ");
            rc = new RestClient(URL_USER_INFO, 'GET');
            rc.request(function(data){
                console.log(' User info data returned is: ', data);
                user_global = new User(data);
                updateUserInfoDisplay();
                callback();
            });            
            $('#logged_out').hide();
            $('#logged_in').show();    
        }
        else{
            console.log("the login cookie is ABSENT");
            $('#logged_out').show();
            $('#logged_in').hide();     
        }
    });
}
