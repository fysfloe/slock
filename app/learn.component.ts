import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LearnService } from './learn.service'

@Component({
  selector: 'sl-learn',
  templateUrl: 'app/learn.component.html',
  // styleUrls: ['app/media-item-list.component.css']
})
export class LearnComponent {
  step = '';
  clocks = null;
  paramsSubscription;

  constructor(
    private learnService: LearnService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
      this.learnService.init();
      this.paramsSubscription = this.activatedRoute.params
        .subscribe(params => {
            let step = params['step'];
            if(step === 'start') {
                step = '';
            }
            this.getClocks(step);
        });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  onClockGuess(clock) {
      this.learnService.guess(clock);
  }

  onClockPlay() {
      this.learnService.play();
  }

  onStepChange(step) {
      console.log('foo');
  }

  getClocks(step) {
      this.step = step;
      this.clocks = this.learnService.get(step);
  }
}
