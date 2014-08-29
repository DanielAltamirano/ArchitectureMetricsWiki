var app = app || {};

app.DashboardView = Backbone.View.extend({
    tagName: "div",

    render: function () {
        var aux = new app.MetricCollection();
        for (var i = 0; i < this.collection.length; i++) {
            if (i > 0) {
                if ((i % 3) == 0) {
                    var dashboardRow = new app.DashboardRowView({ model: aux });
                    this.$el.append(dashboardRow.render().el);
                    aux.reset();
                    aux.add(this.collection.models[i]);
                } else {
                    aux.add(this.collection.models[i]);
                }
            } else {
                aux.add(this.collection.models[i]);
            }
        }
        return this;
    }
});

app.DashboardRowView = Backbone.View.extend({
    tagName: "div",
    className: "row",

    render: function () {
        this.model.each(this.addMetric, this);
        return this;
    },

    addMetric: function (metric) {
        var metricViewWrapper = new app.MetricViewWrapper({ model: metric });
        this.$el.append(metricViewWrapper.render().el);
    }
});

app.MetricViewWrapper = Backbone.View.extend({
    tagName: "div",
    className: "col-lg-4",

    render: function () {
        var metricView = new app.MetricView({ model: this.model });
        this.$el.append(metricView.render().el);
        return this;
    }
});

app.MetricView = Backbone.View.extend({
    tagName: "div",
    className: "panel",
    template: _.template($("#metricElement").html()),

    render: function () {
        var metricTemplate = this.template(this.model.toJSON());
        this.$el.html(metricTemplate);
        this.$el.css({
            'padding-right': '15px',
            'padding-left': '15px',
            'right': '10px',
            'left': '10px'
        });

        this.$el.removeClass('panel-green');
        this.$el.removeClass('panel-yellow');
        this.$el.removeClass('panel-red');

        if (this.model.get('Percentage') > 80) {
            this.$el.addClass('panel-green');
        }
        else if (this.model.get('Percentage') > 30) {
            this.$el.addClass('panel-yellow');
        } else {
            this.$el.addClass('panel-red');
        }
        return this;
    },

    events: {
        'click': 'changePercentage'
    },

    changePercentage: function () {
        if (this.model.get('Percentage') > 80) {
            this.model.set('Percentage', 35);
        }
        else if (this.model.get('Percentage') > 30) {
            this.model.set('Percentage', 5);
        } else {
            this.model.set('Percentage', 85);
        }
    },

    initialize: function () {
        this.model.on('change', this.render, this);
    }
});

var metricsAllView = new app.DashboardView({ collection: app.metricGroup });

$("#app").html(metricsAllView.render().el);