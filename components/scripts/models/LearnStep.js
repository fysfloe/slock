var app = app || {};

app.LearnStep = Backbone.Model.extend({

  defaults: {
    finished: false,
    score: {
      user: 0,
      possible: 10,
    },
    progress: 0,
    steps: []
  },

  includeChildStep: function(step) {
    step.bind('change:finished', this.onChildStepChange, this);
  },

  onChildStepChange: function(step) {
    var finishedSteps = this.get('steps').where({ 'finished': true });
    this.set('progress', (finishedSteps.length / this.get('steps').length * 100));
    console.log('foo');
    if(step.get('correct')) {
      this.set('score', {
        user: this.get('score').user + 1,
        possible: this.get('score').possible
      });
    }
  },

  initialize: function() {
    this.set('steps', new app.LearnSingleStepCollection());

    this.on('change', () => {
      console.log(this);
    });

    this.on('change:progress', () => {

    });
  }

});
