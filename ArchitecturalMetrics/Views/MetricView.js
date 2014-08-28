var app = app || {};

app.MetricView = Backbone.View.extend({
    tagName: "div",
    className: "panel-body",
    template: _.template($("#metricElement").html()),

    render: function() {
        var metricTemplate = this.template(this.model.toJSON());
        this.$el.html(metricTemplate);
        return this;
    }
});

app.AllMetricsView = Backbone.View.extend({
    tagName: "section",

    render: function() {
        this.collection.each(this.addMetric, this);
        return this;
    },

    addMetric: function(metric) {
        var metricView = new app.MetricView({ model: metric });
        this.$el.append(metricView.render().el);
    }
});

var metricsAllView = new app.AllMetricsView({collection: app.metricGroup});

console.log(app.metricGroup.toJSON());
$("#app").html(metricsAllView.render().el);