        function getTimePeriod(time){
            //var prevTime = new Date(2011,1,1,0,0);  // Jan 1, 2011
            console.log("the time is ",time);
            prevDate = time.substring(0, time.indexOf(' ')).split('-');
            prevTime = time.substring(time.indexOf(' ') + 1, time.lastIndexOf('.')).split(':');
            // check why i had to do minus 1 - TODO
            var lastTime = new Date(prevDate[0], prevDate[1]-1, prevDate[2], prevTime[0], prevTime[1], prevTime[2]);            
            var thisTime = new Date();              // now
            var current_timezone = thisTime.getTimezoneOffset();
            var diff = thisTime.getTime() - lastTime.getTime() + (current_timezone * 60000);   // now - jan 1
            if(diff > 0){
                var days = Math.floor(diff / (1000*60*60*24));
                if(days > 0 && days < 30){
                    if(days == 1)
                        return days + " day ";
                    else
                        return days + " days ";
                }
                else if(days == 0){
                    var hours = Math.floor(diff/(1000 * 3600));
                    if(hours == 0){
                        var minutes = Math.floor(diff/(1000 * 60));
                        if(minutes == 0){
                            var secs = Math.floor(diff/1000);
                            return secs + " seconds ";
                        }
                        else if(minutes == 1)
                            return minutes + " minute ";
                        else
                            return minutes + " minutes ";
                    }
                    else if(hours == 1)
                        return hours + " hour ";
                    else
                        return hours + " hours ";
                }else{
                    var months = Math.floor(days/30);
                    if(months == 1)
                        return months + " month ";
                    else
                        return months + " months ";
                }
            }
            else{
                return "few seconds";
            }
        };
        
 /**       function updateTimeForReviews()
        {
            var timeItems = $('#reviewsContent').find('#feedTime .hidden');
            $.each(timeItems, function(index, input){
                updatedTime = getTimePeriod($(input).html()) + ' ago via Android';
                $(input).next().html(updatedTime);
            });
        } **/
        
        function getddMMMMYY(v){
            console.log("v.getdate()",v);
            var monthNames = [ "Jan", "Feb", "March", "April", "May", "June","July", "Aug", "Sept", "Oct", "Nov", "Dec"];
            month = monthNames[parseInt(v.slice(5,7),10)-1]; //the second argument to parseInt specifys the base to convert to 
            //console.log("the month without parseInt ", v.slice(5,7));
            //console.log("the month with parseInt ", parseInt(v.slice(5,7)));
            return v.slice(8,10)+ ", " +  month + " "+ v.slice(0,4) 
        }
        
        
//        function getDistance(lat1,lon1,lat2,lon2){
               /** Converts numeric degrees to radians */
//            if (typeof(Number.prototype.toRad) === "undefined") {
//              Number.prototype.toRad = function() {
//               return this * Math.PI / 180;
//              }
//            }
            //console.log("the lat long of first ",lat1,lon1);
            //console.log("the lat long of first ",lat2,lon2);
//            var R = 6371; // Radius of the earth in km
//            var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
//            var dLon = (lon2-lon1).toRad(); 
//            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//                    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
//                    Math.sin(dLon/2) * Math.sin(dLon/2); 
//           var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//            var d = R * c; // Distance in km
//            return d;
//        }
        
//        function getzoom(bound,pixelWidth){
//            var GLOBE_WIDTH = 256; // a constant in Google's map projection
//            var west = bound.getSouthWest().lng();
//            var east = bound.getNorthEast().lng();
//            var angle = east - west;
//            if (angle < 0) {
//              angle += 360;
//            }
            //var pixelWidth = $('#map_canvas').width();
            //console.log("the map width ", pixelWidth);
//            var zoom = Math.round(Math.log(pixelWidth * 360 / angle / GLOBE_WIDTH) / Math.LN2);
//            return zoom;
//        }
        
//    function calculateZoomLevel(widthInPixels,radius) {
//        console.log("width in pixels is ",widthInPixels);
//        console.log("radius is ",radius);
//        var equatorLength = 40075004; // in meters
//        var metersPerPixel = equatorLength / 256;
//        var zoomLevel = 0;
//        var widthInM = radius*2000;
//        while ((metersPerPixel * widthInPixels) > widthInM) {
//            zoomLevel++;
//            console.log("width in meter",widthInM);
//            console.log("width for pixel",metersPerPixel*widthInPixels);
//            metersPerPixel = metersPerPixel/2;
//            console.log("zoom level",zoomLevel);
//        }
//        console.log(" zoom level = "+zoomLevel);
//        return zoomLevel;
//    }
    
    function screenWidth(){
        return(window.innerWidth)?
        window.innerWidth:
        document.documentElement.clientWidth||document.body.clientWidth||0;
    }
    function screenHeight(){
      return(window.innerHeight)?
      window.innerHeight:
      document.documentElement.clientHeight||document.body.clientHeight||0;
    }
    function getTimeStamp(){
        var d=new Date();
        var month = d.getMonth()+1;
        var timestamp = (d.getDate()+':'+month+':'+d.getFullYear()+':'+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds());
        return timestamp;
    }
    showNotification = function(text){
        jQuery.facebox(ich.notificationTemplate({'text':text},true));
        closefacebox = function(){
            jQuery(document).trigger('close.facebox');  
        };
        var t=setTimeout("closefacebox()",2500);
    };
    showErrorNotification = function(text){
        jQuery.facebox(ich.errorNotificationTemplate({'text':text},true));
        closefacebox = function(){
            jQuery(document).trigger('close.facebox');  
        };
        var t=setTimeout("closefacebox()",2500);
    };
