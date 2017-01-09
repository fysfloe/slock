var app = app || {};

app.LearnStepsCollectionView = Backbone.View.extend({

  tagName: 'ul',
  className: 'learn-steps row',

  render: function() {
    this.collection.each(this.addLearnStep, this);
    return this;
  },

  addLearnStep: function(learnStep) {
    var learnStepView = new app.LearnStepView({ model: learnStep });
    this.$el.append(learnStepView.render().el);
  },

});
