var app = app || {};

app.LearnSingleStep = Backbone.Model.extend({

  defaults: {
    finished: false,
    correct: false,
    clock: null,
    parent: null,
  },

  initialize: function() {
    this.addClock();
    switch(this.get('difficulty')) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        break;
    }

    this.on('change', () => {
      console.log('Model has changed.');
    });

    this.on('change:finished', function() {
      console.log('finished child step');
    });
  },

  addClock: function() {
    this.set('clock', new app.Clock({
      hour: Math.floor((Math.random() * 11)) + 1,
      quarters: Math.floor((Math.random() * 3)) + 1,
    }));
  },

});
