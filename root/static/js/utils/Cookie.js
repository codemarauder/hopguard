
function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
        {
            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x=x.replace(/^\s+|\s+$/g,"");
            if (x==c_name)
            {
                return unescape(y);
            }
        }
}

function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

function checkCookie(callback)
{
    var sessionCookie=getCookie("hopport_session");
    if (sessionCookie!=null && sessionCookie!="")
    {
        
        callback(true);
    }
    else 
    {
        callback(false);
       
    }
}

// Always return true now as user login handled by server.
function isUserLoggedIn(callback){
    var loginCookie = getCookie("login_type");
    if( loginCookie == 'hopbox_login'){
        callback(true);
    }
    else if  ( loginCookie == 'anonymous' ){
        callback(true); //temp hack to get hopport running
    }
    else{
        callback(true); //temp hack to get hopport running
    }
}
