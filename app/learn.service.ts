import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { BufferLoader } from './buffer-loader';
import 'rxjs/add/operator/map';
import { lookupListToken } from './providers';

@Injectable()
export class LearnService {
    context;
    current;
    bufferLoader;
    bufferList;
    currentlyPlaying = null;
    audioURLs = {
        'hours': [],
        'quarters': [
            'audio/quarters/1_1.wav',
            'audio/quarters/1_2.wav',
            'audio/quarters/1_4.wav',
            'audio/quarters/3_4.wav'
        ]
    };

    constructor(private http: Http, @Inject(lookupListToken) public lookupLists) {
        this.current = {
            h: null,
            q: null
        };
    }

    init() {
        // Fix up prefixing
        // window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.context = new AudioContext();

        for(var i = 1; i <= 12; i++) {
            this.audioURLs.hours.push('/audio/' + i + '.wav'); // like /audio/1.wav
        }

        this.bufferLoader = new BufferLoader(
            this.context,
            this.audioURLs,
            this.finishedLoading
        );

        this.bufferLoader.load();
    }

    get(step) {
        return this.randomSound(step);
    }

    randomSound(step) {
        var randomNumber = Math.floor((Math.random() * 11));
        var randomNumberQ = Math.floor((Math.random() * 3));

        this.current.h = randomNumber;
        this.current.q = randomNumberQ;
        console.log("Hour: " + (this.current.h <= 8 ? this.current.h + 1 : this.current.h + 2));
        console.log("Minutes: " + this.lookupLists.quarters[randomNumberQ]);

        return [{
            h: this.current.h,
            q: this.current.q
        }];
    }

    play() {
        console.log(this.bufferList);
        this.playSound(this.current.q + 12);

        /*setTimeout(function() {
            this.playSound(this.current.h);
        }, 1200);*/
    }

    playSound(i) {
        console.log(this.bufferList);
        if(this.bufferList) {
            this.currentlyPlaying = this.context.createBufferSource();
            this.currentlyPlaying.buffer = this.bufferList[i];
            this.currentlyPlaying.connect(this.context.destination);
            this.currentlyPlaying.start();
            this.currentlyPlaying.onended = () => {
                this.currentlyPlaying = null;
            }
        }
    }

    guess(clock) {
        console.log('guessed');
    }

    finishedLoading(_bufferList) {
        this.bufferList = _bufferList;
    }

}
