import 'ag-grid-enterprise'

import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AgGridModule } from 'ag-grid-angular'

import { AppComponent } from './app.component'
import { CustomPanelComponent } from './components/custom-panel/custom-panel.component'
import { ImageCellComponent } from './components/image-cell/image-cell.component'
import { MainViewComponent } from './components/main-view/main-view.component'
import { CustomDatePipe } from './shared/pipes/custom-date.pipe'
import { MissionService } from './shared/services/mission/mission.service'

@NgModule({
  declarations: [
    AppComponent,
    ImageCellComponent,
    MainViewComponent,
    CustomPanelComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([ImageCellComponent]),
  ],
  providers: [CustomDatePipe, MissionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
