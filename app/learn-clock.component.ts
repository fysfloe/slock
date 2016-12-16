import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sl-learn-clock',
    templateUrl: 'app/learn-clock.component.html',
    // styleUrls: ['app/media-item.component.css']
})
export class LearnClockComponent {
    @Input() clock;
    @Output() guess = new EventEmitter();
    @Output() play = new EventEmitter();

    onGuess() {
        this.guess.emit(this.clock);
    }

    onPlay() {
        this.play.emit();
    }
}
