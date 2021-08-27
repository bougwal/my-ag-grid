import { Injectable } from '@angular/core'
import { Observable, ReplaySubject, timer } from 'rxjs'
import { concatMapTo } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class CustomOperatorsService {
  constructor() {}

  /** A custom rxjs operator to cache api http response */
  cacheAPIResponse<T>(o: Observable<T>): Observable<T> {
    let replay = new ReplaySubject<T>(1)
    o.subscribe(
      (x) => replay.next(x),
      (x) => replay.error(x),
      () => replay.complete()
    )
    return replay.asObservable()
  }

  /** Custom Operator to automate calls to API every one hour and get a fresh data */
  CustomFetchOperator<T>(stream: Observable<T>, period: number, initialDelay = 0) {
    return timer(initialDelay, period).pipe(concatMapTo(stream))
  }
}
