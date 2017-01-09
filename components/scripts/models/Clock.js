var app = app || {};

app.Clock = Backbone.Model.extend({

  defaults: {
    hour: null,
    quarters: null,
    soundHour: null,
    soundQuarters: null,
  },

  initialize: function() {
    this.loadSounds();
  },

  loadSounds: function() {
    var hour = this.get('hour');
    var quarters = this.get('quarters');

    this.loadBuffer('audio/' + hour + '.wav', 'soundHour');
    this.loadBuffer('audio/quarters/' + quarters + '_4.wav', 'soundQuarters');
  },

  loadBuffer: function(url, sound) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    var that = this;

    // Decode asynchronously
    request.onload = function() {
      window.context.decodeAudioData(request.response, function(buffer) {
        that.set(sound, buffer);
      }, function() {
        console.error('Something bad happened.');
      });
    }
    request.send();
  },

  playSounds: function() {
    var source = window.context.createBufferSource();
    source.buffer = this.get('soundQuarters');
    source.connect(window.context.destination);
    source.start(0);

    var that = this;

    setTimeout(function() {
      var source = window.context.createBufferSource();
      source.buffer = that.get('soundHour');
      source.connect(window.context.destination);
      source.start(0);
    }, 1800);
  },

});
