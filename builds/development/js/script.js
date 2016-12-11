

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
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
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
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}


//-------------------------------
var context;
var bufferLoader;
var sources = [];
var sourcesQ = [];
window.addEventListener('load', init, false);

function init() {
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  var audioURLs = [];
  var audioURLsQ = ['audio/quarters/1_1.wav', 'audio/quarters/1_2.wav', 'audio/quarters/1_4.wav', 'audio/quarters/3_4.wav'];

  for(var i = 1; i <= 12; i++) {
      audioURLs.push('/audio/' + i + '.wav'); // like /audio/1.wav
  }

  bufferLoader = new BufferLoader(
      context,
      audioURLs,
      finishedLoading
  );

  bufferLoaderQ = new BufferLoader(
      context,
      audioURLsQ,
      finishedLoadingQ
  )

  bufferLoader.load();
  bufferLoaderQ.load();

  var currentHour = null;
  var currentQ = null;
  var quarters = [
      "00", "30", "15", "45"
  ]

  document.getElementById("random-sound").onclick = () => {
    console.log('random sound is playing');
    var randomNumber = Math.floor((Math.random() * 11) + 1);
    var randomNumberQ = Math.floor((Math.random() * 3));
    sourcesQ[randomNumberQ].start();

    setTimeout(function() {
        sources[randomNumber].start();
    }, 1200);
    currentHour = randomNumber + 1;
    currentQ = quarters[randomNumberQ];
    console.log("Hour: " + currentHour);
    console.log("Quarter: " + currentQ);
  }

  $("button#guess").click(() => {
      var guessHour = $("select#hour").val();
      var guessQ = $("select#quarters").val();

      if(guessHour == currentHour && guessQ == currentQ) {
          alert('Correct!');
      } else {
          alert('Not really... It was: ' + currentHour + ':' + currentQ);
      }
      console.log(guessHour + ':' + guessQ);
  })
}

function finishedLoading(bufferList) {
  for(var i = 0; i < bufferList.length; i++) {
    sources[i] = context.createBufferSource();
    sources[i].buffer = bufferList[i];
    sources[i].connect(context.destination);
    sources[i].onended = () => {

    }
  }
}

function finishedLoadingQ(bufferList) {
  for(var i = 0; i < bufferList.length; i++) {
    sourcesQ[i] = context.createBufferSource();
    sourcesQ[i].buffer = bufferList[i];
    sourcesQ[i].connect(context.destination);
    sourcesQ[i].onended = () => {

    }
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
