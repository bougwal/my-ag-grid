import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { throwError } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  errorHandler(error) {
    let errorMessage = ''
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message
    }
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 400: {
          ;('Sequelize Database Error')
          break
        }
        case 401: {
          ;('You are not allowed to access this resource')
          break
        }
        case 403: {
          ;('You are not allowed to access this resource')
          break
        }
        case 404: {
          ;('Resource does not exist anymore')
          break
        }
        default: {
          console.log('error occured')
          break
        }
      }
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    console.log(errorMessage)
    return throwError(errorMessage)
  }
}
