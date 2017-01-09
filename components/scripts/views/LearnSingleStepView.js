var app = app || {};

app.LearnSingleStepView = Backbone.View.extend({

  tagName: 'div',
  className: 'learn-single-step',

  template: _.template( $('#learnSingleStep').html() ),

  events: {
    'click #play-sound': 'playSound',
    'click .single-step-next': 'nextStep',
    'click .single-step-previous': 'prevStep',
    'click #guess': 'guess',
  },

  quarters: {
    1: '15',
    2: '30',
    3: '45',
    4: '00'
  },

  render: function() {
    var learnSingleStepTemplate = this.template(this.model.toJSON());
    this.$el.html(learnSingleStepTemplate);
    return this;
  },

  playSound: function() {
    var clock = this.model.get('clock');

    clock.playSounds();
  },

  nextStep: function(ev) {
    ev.preventDefault();
    if( (this.model.collection.indexOf(this.model) + 1) <= this.model.collection.length ) {
      appRouter.navigate(this.model.get('parent').get('link') + '/' + (this.model.collection.indexOf(this.model) + 1), true);
    } else {
      console.log('Can\'t go any further.');
    }
  },

  prevStep: function(ev) {
    ev.preventDefault();
    if( (this.model.collection.indexOf(this.model) - 1) >= 0 ) {
      appRouter.navigate(this.model.get('parent').get('link') + '/' + (this.model.collection.indexOf(this.model) - 1), true);
    } else {
      console.log('Can\'t go any further.');
    }
  },

  guess: function(ev) {
    var guessHour = $("input#hour").val();
    var guessQuarters = $("select#minutes").val();

    var $btn = $(ev.currentTarget);

    var $correct_time = $('<span class="correct-time"></span>');
    $correct_time.hide()

    if(guessHour == this.model.get('clock').get('hour') && guessQuarters == this.quarters[this.model.get('clock').get('quarters')]) {
      $btn.removeClass('btn-default');
      $btn.addClass('btn-success');
      this.model.set('correct', true);
      $correct_time.html('You are right! It was ' + this.model.get('clock').get('hour') + ':' + this.quarters[this.model.get('clock').get('quarters')] + '.&nbsp;');
    } else {
      $btn.removeClass('btn-default');
      $btn.addClass('btn-danger');
      this.model.set('correct', false);
      $correct_time.html('Oh snap! It was ' + this.model.get('clock').get('hour') + ':' + this.quarters[this.model.get('clock').get('quarters')] + '.&nbsp;');
      // alert('Not really... It was: ' + this.model.get('clock').get('hour') + ':' + this.quarters[this.model.get('clock').get('quarters')]);
    }

    $btn.prop('disabled', true);
    $('a.single-step-next').before($correct_time);
    $('a.single-step-next').fadeIn();
    $correct_time.fadeIn();
    this.model.set('finished', true);

    console.log(guessHour + ':' + guessQuarters);
  },

});
