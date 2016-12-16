import { Pipe } from '@angular/core';

@Pipe({
  name: 'hour'
})
export class HourPipe {
    transform(hour) {
        if(hour <= 8) {
            hour += 1;
        } else {
            hour += 2;
        }

        if(hour < 10) {
            return '0' + hour;
        } else {
            return hour;
        }
    }
}
