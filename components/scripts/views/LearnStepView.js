var app = app || {};

app.LearnStepView = Backbone.View.extend({

  tagName: 'li',
  className: 'learn-step-item col',

  template: _.template( $('#learnStep').html() ),

  initialize: function() {
    _.bindAll(this, 'render');
    if (this.model) {
      this.model.on('change', this.render, this);
    }
  },

  render: function() {
    var learnStepTemplate = this.template(this.model.toJSON());
    this.$el.html(learnStepTemplate);
    return this;
  },

});
