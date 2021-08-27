import { DatePipe } from '@angular/common'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string): string {
    let dateFormat = new DatePipe('en-US')
    value = dateFormat.transform(value, 'MMM-dd-yyyy')
    return value
  }
}
