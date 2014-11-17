//offers and deal are used interchangeably in the application 
var Category = Backbone.Model.extend({
    initialize:function(){
    }
});

var CategoryCollection = Backbone.Collection.extend({
    model: Category,
    initialize: function(){
        // do something
    }
});

var SuperCategory = Backbone.Model.extend({
    initialize:function(){
    }
});

var SuperCategoryCollection = Backbone.Collection.extend({
    model: SuperCategory,
    initialize: function(){
        // do something
    }
});
