import { Request, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class MockXHRBackend {
  constructor() {
  }

  createConnection(request: Request) {
    var response = new Observable((responseObserver: Observer<Response>) => {
      var responseData;
      var responseOptions;
      switch (request.method) {
        case RequestMethod.Get:
          if (request.url.indexOf('learn?step=') >= 0 || request.url === 'learn') {
            var step;
            if (request.url.indexOf('?') >= 0) {
              step = request.url.split('=')[1];
              if (step === 'undefined' || step === 'start') step = '';
            }
            var clocks;
            if (step) {
              clocks = this._clocks.filter(clock => { clock.id === step });
              console.log(clocks);
            } else {
              clocks = this._clocks;
            }
            responseOptions = new ResponseOptions({
              body: { clocks: JSON.parse(JSON.stringify(clocks)) },
              status: 200
            });
          }
          break;
        case RequestMethod.Post:
          var clock = JSON.parse(request.text().toString());
          clock.id = this._getNewId();
          this._clocks.push(clock);
          responseOptions = new ResponseOptions({ status: 201 });
          break;
        case RequestMethod.Delete:
          var id = parseInt(request.url.split('/')[1]);
          this._deleteClock(id);
          responseOptions = new ResponseOptions({ status: 200 });
      }

      var responseObject = new Response(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => { };
    });
    return { response };
  }

  _deleteClock(id) {
    var clock = this._clocks.find(clock => clock.id === id);
    var index = this._clocks.indexOf(clock);
    if (index >= 0) {
      this._clocks.splice(index, 1);
    }
  }

  _getNewId() {
    if (this._clocks.length > 0) {
      return Math.max.apply(Math, this._clocks.map(clock => clock.id)) + 1;
    }
  }

  _clocks = [
    {
      id: 1,
      name: "Firebug",
      medium: "Series",
      category: "Science Fiction",
      year: 2010,
      watchedOn: 1294166565384,
      isFavorite: false
    },
    {
      id: 2,
      name: "The Small Tall",
      medium: "Movies",
      category: "Comedy",
      year: 2015,
      watchedOn: null,
      isFavorite: true
    }, {
      id: 3,
      name: "The Redemption",
      medium: "Movies",
      category: "Action",
      year: 2016,
      watchedOn: null,
      isFavorite: false
    }, {
      id: 4,
      name: "Hoopers",
      medium: "Series",
      category: "Drama",
      year: null,
      watchedOn: null,
      isFavorite: true
    }, {
      id: 5,
      name: "Happy Joe: Cheery Road",
      medium: "Movies",
      category: "Action",
      year: 2015,
      watchedOn: 1457166565384,
      isFavorite: false
    }
  ];
}
