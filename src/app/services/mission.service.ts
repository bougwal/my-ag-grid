import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  // Observable string sources
  private numberOfRecords = new Subject<number>()
  private numberOfChecked = new Subject<number>()

  // Observable string streams
  numberOfRecords$ = this.numberOfRecords.asObservable()
  numberOfChecked$ = this.numberOfChecked.asObservable()

  // Service message commands
  sendTotal(total: number) {
    this.numberOfRecords.next(total)
  }

  sendChecks(checked: number) {
    this.numberOfChecked.next(checked)
  }
}
