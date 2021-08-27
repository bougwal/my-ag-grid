import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { catchError, retry } from 'rxjs/operators'
import {CustomOperatorsService} from '../custom-operators/custom-operators.service'
import {ErrorHandlerService} from '../error-handling/error-handler.service'
import {IAGGridYouTubeAPI} from '../../utiles/interface'
import {environment} from '../../../../environments/environment'
import { Injectable } from '@angular/core'

@Injectable()
export class HttpService {
  private _cached: Observable<any>
  constructor(
    private http: HttpClient,
    private customOperatorsService: CustomOperatorsService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  getAPIResponse(): Observable<IAGGridYouTubeAPI> {
    if (this._cached) {
      return this._cached
    }
    return (this._cached = this.customOperatorsService
      .cacheAPIResponse<any>(
        this.http.get<IAGGridYouTubeAPI>(environment!.baseUrl!.baseUrl)
      )
      .pipe(retry(2), catchError(this.errorHandlerService.errorHandler)))
  }

  /** Call this method that uses the custom RxJS operator in the constructor of the component to get fresh data every 1 hour */
  scheduledCallToAPIEveryHour() {
    return this.customOperatorsService
      .CustomFetchOperator(this.getAPIResponse(), 3600000)
      .subscribe()
  }
}
