/// <reference path="Content/js/underscore.js" />
/// <reference path="Content/js/backbone.js" />

var Metric = Backbone.Model.extend({
    defaults: {
        MetricName: "Metric",
        Percentage: ""
    }
});