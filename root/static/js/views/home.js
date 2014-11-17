//Remvoving unwanted App.Views.UpdatingRecentReviewCollectionView  on 30MAY

App.Views.PopularInFollowing= Backbone.View.extend({
    //this is for the following page . Pintrest style loadign
    initialize: function(){
        var that = this;
        this.popularDeals = this.options.popularDeals;
        this._popularDealViews = [];
        this.popularDeals.each(function(deal){
            that._popularDealViews.push(new App.Views.DealItemView (
                {
                    model:deal
                })
            );
        });
        this.render();
    },
    
    events: function(){
        
    },
    
    render: function(){
        var that = this;
        $(this.el).empty();
        $(that.el).append(ich.followingUnorderedList({'storeId':'popular'}));
        console.log("in render function for popular");
        _(this._popularDealViews).each(function(sv) {
             //console.log("the view is ", sv);
            $("#followingOfferUnorderedListpopular").append(sv.render().el);
        });
        //var showNumber =Math.floor(screenWidth()/229) - 1;   
        //$(".popularDealsHolderDiv").jCarouselLite({ 
        //                btnNext: "#popular_in_follow_right",
        //                btnPrev: "#popular_in_follow_left",
        //                visible: 3,
        //                scroll:3,
        //                vertical:true,
        //                circular:false
        //});
        var pageCount =  this.popularDeals.length;
        console.log("the following breadcrumb container is ",$("#following_breadcrumbs_popular"));
        
        ul = $("#followingOfferUnorderedListpopular") ;
        var elements_to_be_added = 5-(pageCount%5 );
        console.log("the elements to be added are ", elements_to_be_added);
        if(elements_to_be_added%5 != 0){
            for(i=0;i<elements_to_be_added;i++){
                ul.append(ich.followingEmptyTemplate());
            }
            pageCount = pageCount+elements_to_be_added;
            console.log("the pagecount is ",pageCount);
        }
        for (i=0;i<pageCount;i++)
        {
            if(i%5 == 0){
                console.log("adding the "+i+" button");
                $("#following_breadcrumbs_popular").append('<div class="popular_crumb" > </div>');
            }
            else{
                console.log("adding the "+i+" button");
                $("#following_breadcrumbs_popular").append('<div class="popular_crumb popular_crumb_hidden" > </div>');
            }
        }
        var pages = Math.ceil(pageCount/5);
        console.log("the text for count is ","1/"+pages)
        $('#following_page_count_popular').html("Page 1/"+pages);
        
        console.log("applying the jcarousal to " ,$("#followingOfferList_popular"));
        $("#followingOfferList_popular").jCarouselLite({
            btnNext: $(".follow_next_popular"),
            btnPrev:$(".follow_prev_popular"),
            circular: false,
            visible: 5,
            scroll: 5,
            btnGo:  $('div#following_breadcrumbs_popular').find('.popular_crumb'),
            circular:true,
            activeClass:'popular_crumb_selected',
            //mouseWheel:true,
            afterEnd:function(p){
                var index = $(p[0]).index();
                console.log("the div is ",p,index);
                var index = $(p[0]).index();
                console.log("the div is ",index);
                var i = index;
                if(index>pageCount){
                    i = index-pageCount;
                }
                else if(index<5){
                    i = pageCount-index;
                }
                    else if (index == pageCount){
                    i = pageCount;
                }
                else{
                    i = index
                }
                $('#following_page_count_popular').html("Page "+Math.floor(i/5)+"/"+pages);
                console.log("the text for count is pagecount i final value ",pageCount,i,(Math.floor(i/5))+"/"+pages)
            }
        });
    }
});

App.Views.PopularInFollowingItemView = Backbone.View.extend({
    //this is for the following page . Pintrest style loadign
        //className: "deal_div_top",
         tagName:'li',
    render: function(){
        this.el.innerHTML  = ich.dealsPreviewTemplate(this.model.toJSON(),true);
        return this;
    },
    events : {
        "click .deal_div" : "navigateUrl"
    },
    
    navigateUrl : function(){
        Backbone.history.navigate("#!/place/"+this.model.get("placeId")+"/offers/"+this.model.get("dealId"),true);
    }
    
});

App.Views.Popular = Backbone.View.extend({
    
    initialize: function(){
        var that = this;
        this.popularDeals = this.options.popularDeals;
        this._popularDealViews = [];
        this.popularDeals.each(function(deal){
            that._popularDealViews.push(new App.Views.PopularItemView(
                {
                    model:deal
                })
            );
        });
        this.render();
    },
    
    events: function(){
        
    },
    
    render: function(){
        var that = this;
        $(this.el).empty();
        console.log("in render function for popular");
        _(this._popularDealViews).each(function(sv) {
             //console.log("the view is ", sv);
            $(that.el).append(sv.render().el);
        });
        
        console.log("the count for popular deals is ",this._popularDealViews.length);
        pageCount = this._popularDealViews.length;
        var elements_to_be_added = 3-(pageCount%3 );
        //var elements_to_be_added = 5-(pageCount%5 );
        console.log("the elements to be added are ", elements_to_be_added);
        if(elements_to_be_added != 3){
        $(that.el).append( $(that.el).children('li').slice(0,elements_to_be_added).clone(true) );
        pageCount= pageCount+elements_to_be_added;
        }

        for (i=0;i<(pageCount);i++)
        {
            if(i%3 == 0){
                     console.log("adding the "+i+" button");
                    $('<div/>', {
                        "class": 'popular_crumb'
                    }).appendTo("#popular_breadcrumbs");
                
            }
            else{
                 $('<div/>', {
                        "class": 'popular_crumb popular_crumb_hidden'
                    }).appendTo("#popular_breadcrumbs");
            }
        }
        var pages = Math.ceil(pageCount/3);
        console.log("the text for count is ","1/"+pages)
        $('#popular_crumb_count').html("Page 1/"+pages);
        
        $(".popular_container").jCarouselLite({ 
            btnNext: "#pop_right_div",
            btnPrev: "#pop_left_div",
            visible: 3,
            scroll:3,
			auto: true,
			speed:800,
			timeout: 8000,
            circular:true,
            mouseWheel: true,
            btnGo: $('div#popular_breadcrumbs').find('.popular_crumb'),
            activeClass:'popular_crumb_selected',
            afterEnd:function(p){
                var index = $(p[0]).index();
                console.log("the div is ",index);
                var i = index;
                if(index>pageCount){
                    i = index-pageCount;
                }
                else if(index<3){
                    i = pageCount-index;
                }
                else if (index == pageCount){
                    i = pageCount;
                }
                else{
                    i = index
                }
                $('#popular_crumb_count').html("Page "+Math.floor(i/3)+"/"+pages);
                console.log("the text for count is ",Math.floor(i/3)+"/"+pages);
            }
        });
    }
});

App.Views.PopularItemView = Backbone.View.extend({
    tagName:'li',
    render: function(){
        this.el.innerHTML  = ich.popularPreviewTemplate(this.model.toJSON(),true);
        return this;
    },
    events : {
        "click .popular_item" : "navigateUrl"
        
    },
    
    navigateUrl : function(){
        Backbone.history.navigate("#!/place/"+this.model.get("placeId")+"/offers/"+this.model.get("dealId"),true);
    }
    
});
