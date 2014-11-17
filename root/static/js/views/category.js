App.Views.SuperCategoryListView= Backbone.View.extend({
	 initialize: function(){
        var self = this;
        this.superCategoryCollection = this.options.superCategoryCollection;
        
        this._categoryListViews = [];
        this.superCategoryCollection.each(function(supercategory){
            self._categoryListViews.push(new App.Views.SuperCategoryItemView ({
                    model:supercategory
                }));
        });
        this.render();
    },
    
    events: function(){
        
    },
	
	render: function(){
		var self = this;
		$(this.el).empty();
        $(self.el).append(ich.autoSuperCategoryCollectionDisplayTemplate());
        console.log("in render function for category list");
        _(this._categoryListViews).each(function(categoryItemView) {
             //console.log("the view is ", categoryItemView);
            $("#superCategoryItemDisplay").append(categoryItemView.render().el);
        });        
	}
})

App.Views.SuperCategoryItemView= Backbone.View.extend({
	initialize : function(){
        var self = this;
        this.supercategory = this.options.supercategory;
	},
    render: function(){	
		var self = this;
		$(this.el).empty();
		$(self.el).append(ich.autoSuperCategoryItemDisplayTemplate(this.model.toJSON(),true));
        return this;
    },
    events : {
    },

})

App.Views.UserDefinedCategoryListView= Backbone.View.extend({
	initialize: function(){
        var self = this;
        this.userdefinedSuperCategory = this.options.userdefinedSuperCategory;
        this.render();
    },
    
    events: function(){
        
    },
	
	render: function(){
		var self = this;
		$(this.el).empty();
        $(self.el).append(ich.userSuperCategoryItemDisplayTemplate(this.userdefinedSuperCategory.toJSON(),true));
        console.log("in render function for user super category display");
        return this;
	}
})
