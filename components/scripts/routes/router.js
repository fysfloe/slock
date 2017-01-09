var app = app || {};

app.Router = Backbone.Router.extend({

  routes: {
    '': 'home',
    'learn-the-basics': 'learnTheBasics',
    'learn-the-basics/:step': 'learnTheBasics',
    'try-it-yourself': 'tryItYourself',
    'try-it-yourself/:step': 'tryItYourself',
    'become-an-expert': 'becomeAnExpert',
    'become-an-expert/:step': 'becomeAnExpert',
  },

  home: function() {
    $('#learn-content').html('');
  },

  learnTheBasics: function(step) {
    var learnStep = this.collection.where({ 'step': 1 })[0];
    if(step === null) {
      var that = this;
      this.$learnContentDiv.slideUp(300, function() {
        that.$learnContentDiv.html('<h2>Learn the Basics</h2>');
        that.$learnContentDiv.append(learnStep.get('longDescription') + '&nbsp;<a href="#learn-the-basics/0">Start &rarr;</a>');
        that.$learnContentDiv.slideDown(300);
      });
    } else {
      this.$learnContentDiv.show();
      
      this.$learnContentDiv.html('<h2>Learn the Basics</h2>');
      var learnSingleStep = learnStep.get('steps').at(step);
      var learnSingleStepView = new app.LearnSingleStepView({ model: learnSingleStep });

      this.$learnContentDiv.append(learnSingleStepView.render().el);
    }
  },

  tryItYourself: function(step) {
    var learnStep = this.collection.where({ 'step': 2 })[0];
    if(step === null) {
      var that = this;
      this.$learnContentDiv.slideUp(300, function() {
        that.$learnContentDiv.html('<h2>Try it Yourself</h2>');
        that.$learnContentDiv.append(learnStep.get('longDescription') + '&nbsp;<a href="#try-it-yourself/0">Start &rarr;</a>');
        that.$learnContentDiv.slideDown(300);
      });
    } else {
      this.$learnContentDiv.show();

      this.$learnContentDiv.html('<h2>Try it Yourself</h2>');
      var learnSingleStep = learnStep.get('steps').at(step);
      var learnSingleStepView = new app.LearnSingleStepView({ model: learnSingleStep });

      this.$learnContentDiv.append(learnSingleStepView.render().el);
    }
  },

  becomeAnExpert: function(step) {
    var learnStep = this.collection.where({ 'step': 3 })[0];
    if(step === null) {
      var that = this;
      this.$learnContentDiv.slideUp(300, function() {
        that.$learnContentDiv.html('<h2>Become an Expert</h2>');
        that.$learnContentDiv.append(learnStep.get('longDescription') + '&nbsp;<a href="#become-an-expert/0">Start &rarr;</a>');
        that.$learnContentDiv.slideDown(300);
      });
    } else {
      this.$learnContentDiv.show();

      this.$learnContentDiv.html('<h2>Become an Expert</h2>');
      var learnSingleStep = learnStep.get('steps').at(step);
      var learnSingleStepView = new app.LearnSingleStepView({ model: learnSingleStep });

      this.$learnContentDiv.append(learnSingleStepView.render().el);
    }
  },

  initialize: function(learnStepsCollection) {
    this.collection = learnStepsCollection;
    this.$learnContentDiv = $('#learn-content');
  },

});
