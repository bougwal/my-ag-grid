import { IToolPanelParams } from '@ag-grid-community/all-modules'
import { Component } from '@angular/core'
import { MissionService } from 'src/app/services/mission.service'

@Component({
  selector: 'app-custom-panel',
  templateUrl: './custom-panel.component.html',
  styleUrls: ['./custom-panel.component.css'],
})
export class CustomPanelComponent {
  public params: IToolPanelParams

  public totalCounts: number
  public totalChecks: number = 0

  constructor(private missionService: MissionService) {
    this.missionService.numberOfRecords$.subscribe((res) => {
      console.log(res)
      this.totalCounts = res
    })
    this.missionService.numberOfChecked$.subscribe((res) => {
      console.log(res)
      this.totalChecks = res
    })
  }
  agInit(params: IToolPanelParams): void {
    this.params = params
  }
}
