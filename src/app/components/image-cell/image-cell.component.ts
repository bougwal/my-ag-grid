import { Component } from '@angular/core'

@Component({
  selector: 'app-image-cell',
  templateUrl: './image-cell.component.html',
  styleUrls: ['./image-cell.component.css'],
})
export class ImageCellComponent {
  params: any
  agInit(params: any) {
    this.params = params
  }
  constructor() {}
}
