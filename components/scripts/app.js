window.AudioContext = window.AudioContext || window.webkitAudioContext;
window.context = new AudioContext();

var steps = [
  new app.LearnStep({
    step: 1,
    name: 'Learn the Basics',
    description: 'Learn slocks basics by listening to some times.',
    longDescription: 'You will see the time and can hear the corresponding sounds.',
    link: 'learn-the-basics',
  }),
  new app.LearnStep({
    step: 2,
    name: 'Try it Yourself',
    description: 'Listen to some times and guess.',
    link: 'try-it-yourself',
  }),
  new app.LearnStep({
    step: 3,
    name: 'Become an Expert',
    description: 'Test your knowledge and become a slock expert!',
    link: 'become-an-expert',
  }),
];

var learnSteps = new app.LearnStepsCollection(steps);
var learnStepsView = new app.LearnStepsCollectionView({ collection: learnSteps });

// add steps to learnSteps
learnSteps.each(function(learnStep) {
  for(var i = 0; i < learnStep.get('score').possible; i++) {
    var childStep = new app.LearnSingleStep({
      difficulty: learnStep.get('step'),
      parent: learnStep,
    });
    learnStep.get('steps').add(childStep);
    learnStep.includeChildStep(childStep);
  }
})

$('#learn-steps').html(learnStepsView.render().el);

var appRouter = new app.Router(learnSteps);

Backbone.history.start();
