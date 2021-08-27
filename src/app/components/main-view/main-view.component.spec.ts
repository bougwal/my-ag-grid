import { HttpClientTestingModule } from '@angular/common/http/testing'
import { Self } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CustomDatePipe } from '../../shared/pipes/custom-date.pipe'
import { HttpService } from '../../shared/services/http/http.service'

import { ImageCellComponent } from '../image-cell/image-cell.component'
import { MainViewComponent } from './main-view.component'

describe('MainViewComponent', () => {
  let component: MainViewComponent
  let fixture: ComponentFixture<MainViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MainViewComponent, ImageCellComponent],
      providers: [{ provide: HttpService, deps: [[new Self()]] }, CustomDatePipe],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MainViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
