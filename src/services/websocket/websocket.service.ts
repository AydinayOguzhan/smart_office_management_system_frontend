import { Injectable } from '@angular/core';
import { delay, filter, map, Observable, of, retryWhen, switchMap } from 'rxjs';
// import * as Rx from "rxjs/Rx";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

  connection$: WebSocketSubject<any>;
  RETRY_SECONDS = 10;
  connect(): Observable<any> {
    return of('http://localhost:5001').pipe(
      filter(apiUrl => !!apiUrl),
      // https becomes wws, http becomes ws
      map(apiUrl => apiUrl.replace(/^http/, 'ws') + '/stream'),
      switchMap(wsUrl => {
        if (this.connection$) {
          return this.connection$;
        } else {
          this.connection$ = webSocket(wsUrl);
          return this.connection$;
        }
      }),
      retryWhen((errors) => errors.pipe(delay(this.RETRY_SECONDS)))
    );
  }

}
