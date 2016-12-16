export class BufferLoader {
    context;
    urlList;
    onload;
    bufferList;
    loadCount;

    constructor(context, urlList, callback) {
        this.context = context;
        this.urlList = urlList;
        this.onload = callback;
        this.bufferList = new Array();
        this.loadCount = 0;
    }

    loadBuffer(url, index) {
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

    load() {
        for (var i = 0; i < this.urlList.hours.length; ++i) {
            this.loadBuffer(this.urlList.hours[i], i);
        }
        for (var j = 0; j < this.urlList.quarters.length; ++j) {
            this.loadBuffer(this.urlList.quarters[j], j);
        }
    }
}
