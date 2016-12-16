import { Pipe, Inject } from '@angular/core';
import { lookupListToken } from './providers';

@Pipe({
  name: 'quarters'
})
export class QuartersPipe {
    constructor(@Inject(lookupListToken) public lookupLists) {}

    transform(index) {
        return this.lookupLists.quarters[index];
    }
}
