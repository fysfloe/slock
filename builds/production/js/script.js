

//-------------------------------
var context;
var bufferLoader;
var bufferList;
var currentlyPlaying = null;

var audioURLs = {
    'hours': [],
    'quarters': [
        'audio/quarters/1_1.wav',
        'audio/quarters/1_2.wav',
        'audio/quarters/1_4.wav',
        'audio/quarters/3_4.wav'
    ]
};

window.addEventListener('load', init, false);

function init() {

    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();

    for(var i = 1; i <= 12; i++) {
        audioURLs.hours.push('/audio/' + i + '.wav'); // like /audio/1.wav
    }

    bufferLoader = new BufferLoader(
        context,
        audioURLs,
        finishedLoading
    );

    bufferLoader.load();

    var currentHour = null;
    var currentQ = null;

    let quarters = [
        00, 30, 15, 45
    ];

    document.getElementById("random-sound").onclick = () => {
        console.log('random sound is playing');
        var randomNumber = Math.floor((Math.random() * 11));
        var randomNumberQ = Math.floor((Math.random() * 3));
        playSound(randomNumberQ + 12);

        setTimeout(function() {
            playSound(randomNumber);
        }, 1200);
        currentHour = randomNumber;
        currentQ = randomNumberQ;
        console.log("Hour: " + (currentHour <= 8 ? currentHour + 1 : currentHour + 2));
        console.log("Minutes: " + quarters[randomNumberQ]);
    }

    $("button#guess").click(() => {
        var guessHour = $("select#hour").val();
        var guessQ = $("select#minutes").val();

        console.log("guessHour",guessHour);
        console.log("guessQ",guessQ);

        if(guessHour == (currentHour <= 8 ? currentHour + 1 : currentHour + 2) && guessQ == quarters[currentQ]) {
            alert('Correct!');
        } else {
            alert('Not really... It was: ' + (currentHour <= 8 ? currentHour + 1 : currentHour + 2) + ':' + quarters[currentQ]);
        }
        console.log(guessHour + ':' + guessQ);
    });

    $("button#repeat").click(() => {
        console.log('sound is replaying');
        playSound(currentQ + 12);

        setTimeout(function() {
            playSound(currentHour);
        }, 1200);
    });
}

function playSound(i) {
    currentlyPlaying = context.createBufferSource();
    currentlyPlaying.buffer = bufferList[i];
    currentlyPlaying.connect(context.destination);
    currentlyPlaying.start();
    currentlyPlaying.onended = () => {
        currentlyPlaying = null;
    }
}

function finishedLoading(_bufferList) {
    bufferList = _bufferList;
}


//-------------------------------
function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList.push(buffer);
        if (++loader.loadCount == (loader.urlList.hours.length + loader.urlList.quarters.length))
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
    for (var i = 0; i < this.urlList.hours.length; ++i) {
        this.loadBuffer(this.urlList.hours[i], i);
    }
    for (var j = 0; j < this.urlList.quarters.length; ++j) {
        this.loadBuffer(this.urlList.quarters[j], j);
    }

}


//-------------------------------
var listener = new webspeech.Listener();
// listener.listen("en", function(text) {
//   document.getElementById("text").value = text;
// });

var speaker = new webspeech.Speaker();
/*document.getElementById("read").onclick = () => {
  console.log('foo');
  speaker.speak("en", document.getElementById("text").value);
}
console.log();*/
