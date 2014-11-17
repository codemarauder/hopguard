var iframeManager = {
    xhrObject: null,
    iframeLoading: !1,
    tag: null,
    rcQueue: [],
    cbQueue: [],

    isLoaded: function(){
        return null != iframeManager.xhrObject;
    },
    
    addLoadCallback: function(rc, callback){
			console.log('adding to load queue' + rc.url);
			iframeManager.rcQueue.push(rc);
			iframeManager.cbQueue.push(callback);
    },

    runLoadCallbacks: function () {
			console.log('executing the requests from the load queue');
			/*for(var i=0; i<iframeManager.rcQueue.length; i++){
					iframeManager.ajax(iframeManager.rcQueue[i], iframeManager.cbQueue[i]);
			}*/
			while(iframeManager.rcQueue.length != 0){
				 // iframeManager.ajax(iframeManager.rcQueue.pop(), iframeManager.cbQueue.pop());
					iframeManager.rcQueue.pop().request(iframeManager.cbQueue.pop());
			}
    },

    ajax: function(rc, callback){
			//console.log('making ajax request' + rc.url + 'callback' + callback);
        $.ajax({
            url: rc.url,
            type: rc.method,
            data: rc.data,
            headers: rc.headers,
				    crossDomain: !1,
				    async: true,
            dataType: 'json',
            contentType: 'text/html',
            xhr: function(){
				    	delete iframeManager.xhrObject;
				    	iframeManager.xhrObject = iframeManager.getHTTPObject();
							return iframeManager.xhrObject;
				    },
            success: function( data ) {
                if(data['result']==RESULT_INVALID_USER ){
											console.log("Invalid User");
//                    createAnonymousUser(function(){
//                        console.log("in the callback for iframe manager");
//                        window.location.reload();
//                    });                  
                }else{
                    callback(data);
                }
            },
				    error: function(errorType, errorData, errorThrown){
                console.log('Error: ', errorData, 'Error Type:', errorType, 'Error Thrown:', errorThrown);
            }
        });
    },

    buildIframe: function(){
		  if(!iframeManager.iframeLoading){
				iframeManager.iframeLoading = !0;
			  var a = document.createElement("DIV");
			  a.innerHTML = '<iframe onload="iframeManager.tempIframeCallback()" id="xd_iframe" tabindex="-1" role="presentation" style="position:absolute;top:-9999px;" src="' + XD_RECEIVER_ENDPOINT + '"></iframe>';
			  iframeManager.tag = a.firstChild;
			  console.log('building iframe');
			  document.getElementById("iframeTag").appendChild(iframeManager.tag);
		  }
    },

    getHTTPObject : function() {
      var http = false;
      //Use IE's ActiveX items to load the file.
      if(typeof ActiveXObject != 'undefined') {
              try {
              http = new iframeManager.tag.contentWindow.ActiveXObject("Msxml2.XMLHTTP")
              }
              catch (e) {
                      try {
                      http = new iframeManager.tag.contentWindow.ActiveXObject("Microsoft.XMLHTTP");}
                      catch (E) {http = false;}
              }
      //If ActiveX is not available, use the XMLHttpRequest of Firefox/Mozilla etc. to load the document.
      } else if (window.XMLHttpRequest) {
              try {
                  console.log('creating xml http request with this: ', iframeManager.tag);
                  http = new iframeManager.tag.contentWindow.XMLHttpRequest
              }
              catch (e) {http = false;}
      }
      return http;
    },

    tempIframeCallback: function () {
      console.log('temp iframe callback function called');
      delete iframeManager.xhrObject;
      iframeManager.xhrObject = iframeManager.getHTTPObject();
			iframeManager.runLoadCallbacks();
    }

};

