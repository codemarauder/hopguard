    var RestClient = function(url, method){
        this.url = url;
        this.method = method;
        this.data = {};
        this.headers = {};
        console.log('restclient constructor called');
//        this.addParam("key",HOPBOX_API_KEY);
    };
    
    
    RestClient.prototype.request = function(callback){
        console.log('sending request to: ' + this.url + ' method: ' + this.method);
        //console.log('sending the parameters',this.data);
        if(iframeManager.isLoaded()){
			    iframeManager.ajax(this, callback);
        }else{
	  		  iframeManager.addLoadCallback(this, callback);
          iframeManager.buildIframe();
        }
    };   
 
    RestClient.prototype.addBody = function(body){
        this.data = body;
    }
    
    RestClient.prototype.addParam = function(key, value){
        if(this.url.indexOf("?") < 0 ){
            this.url = this.url + "?" + key + "=" + value;
        }else{
            this.url = this.url + "&" + key + "=" + value;
        }
    };
    
    RestClient.prototype.addHeader = function(key, value){
        this.headers[key] = value;    
    }
