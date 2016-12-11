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
