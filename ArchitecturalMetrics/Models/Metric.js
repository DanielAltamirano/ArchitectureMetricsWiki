/// <reference path="Content/js/underscore.js" />
/// <reference path="Content/js/backbone.js" />

var app = app || {};

app.Metric = Backbone.Model.extend({
    defaults: {
        MetricName: "Metric",
        Percentage: "0"
    }
});

app.MetricCollection = Backbone.Collection.extend({
    model: app.Metric
});

var ADC = new app.Metric({
    MetricName: "Architectonic Documentation Quality",
    Percentage: 40
});

var DA = new app.Metric({
    MetricName: "Detailed Architecture",
    Percentage: 80
});

var DAS = new app.Metric({
    MetricName: "Detailed Architectonic Styles",
    Percentage: 60
});

var FR = new app.Metric({
    MetricName: "Functional Requirements",
    Percentage: 10
});

var PQS = new app.Metric({
    MetricName: "Prioritized Quality Scenarios",
    Percentage: 30
});

var TQSM = new app.Metric({
    MetricName: "Tactics to Quality Scenarios Mapping",
    Percentage: 55
});

var DSS = new app.Metric({
    MetricName: "Detailed Scenario Specification",
    Percentage: 100
});

app.metricGroup = new app.MetricCollection([
    ADC, DA, DAS, FR, PQS, TQSM, DSS
]);