import { AllCommunityModules } from '@ag-grid-community/all-modules'
import { Component, OnInit, Self, ViewChild } from '@angular/core'
import { AgGridAngular } from 'ag-grid-angular'
import { CustomDatePipe } from 'src/app/pipes/custom-date.pipe'
import { HttpService } from 'src/app/services/http.service'
import { MissionService } from 'src/app/services/mission.service'

import { CustomPanelComponent } from '../custom-panel/custom-panel.component'
import { ImageCellComponent } from '../image-cell/image-cell.component'

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
  providers: [HttpService],
})
export class MainViewComponent {
  title = 'ag-grid'
  @ViewChild('agGrid') agGrid: AgGridAngular
  videoId
  rowData
  frameworkComponents
  gridColumnApi
  defaultColDef
  rowSelection
  sideBar
  components
  numSelectedItems = 0
  totalNumItems = 0
  public modules: any[] = AllCommunityModules

  toggleStatus: boolean = true

  columnDefs = [
    {
      headerName: '',
      field: '',
      minWidth: 30,
      resizable: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: (params) => {
        return params.data
      },
    },
    //{ headerName: '', width: 100, field: "Checkbox", cellRenderer: "CheckRendererComponent"},
    {
      headerName: '',
      field: 'thumbnails',
      width: 60,
      resizable: true,
      suppressColumnsToolPanel: true,
      cellRendererFramework: ImageCellComponent,
    },
    {
      headerName: 'Published on',
      width: 200,
      resizable: true,
      field: 'publishedAt',
      suppressColumnsToolPanel: true,
      valueFormatter: (params) => this.customPipe.transform(params.data.publishedAt),
    },

    {
      headerName: 'Video Title',
      width: 400,
      resizable: true,
      field: 'title',
      suppressColumnsToolPanel: true,
      cellRenderer: function (params) {
        let videoId = params?.data?.videoId
        return `<a href='https://www.youtube.com/watch?v=${videoId}' target="_blank">${params.value}</a>`
      },
    },
    {
      headerName: 'Description',
      width: 400,
      resizable: true,
      field: 'description',
      suppressColumnsToolPanel: true,
    },
  ]

  constructor(
    @Self() httpService: HttpService,
    private customPipe: CustomDatePipe,
    private missionService: MissionService
  ) {
    httpService.getAPIResponse().subscribe((res) => {
      console.log(res)
      let transformed = res.items.map((x) => {
        return {
          thumbnails: x?.snippet?.thumbnails?.default?.url,
          publishedAt: x?.snippet?.publishedAt,
          title: x?.snippet?.title,
          description: x?.snippet?.description,
          videoId: x?.id?.videoId,
        }
      })
      console.log(transformed)
      this.rowData = transformed
      console.log('FED DATA', this.rowData)
      this.totalNumItems = this.rowData.length
      this.missionService.sendTotal(this.totalNumItems)
    })
    //httpService.scheduledCallToAPIEveryHour()
    this.rowSelection = 'multiple'

    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      enableValue: true,
      enableRowGroup: true,
      enablePivot: true,
      sortable: true,
      filter: true,
    }

    this.sideBar = {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          toolPanelParams: {
            suppressRowGroups: true,
            suppressValues: true,
            suppressPivots: true,
            suppressPivotMode: true,
            suppressColumnFilter: true,
            suppressColumnSelectAll: true,
            suppressColumnExpandAll: true,
          },
        },
        {
          id: 'customStats',
          labelDefault: 'Stats',
          labelKey: 'customStats',
          iconKey: 'custom-stats',
          toolPanel: 'CustomPanelComponent',
        },
      ],
      defaultToolPanel: 'customStats',
    }
    this.frameworkComponents = { CustomPanelComponent: CustomPanelComponent }
  }

  getContextMenuItems(params) {
    var result = [
      {
        name: 'Copy',
        action: function () {
          window.alert('Copied')
        },
        cssClasses: ['blackFont', 'bold'],
      },
      {
        name: 'Cut',
        action: function () {
          window.alert('Cutted')
        },
        cssClasses: ['blackFont', 'bold'],
      },
    ]

    if (params?.column?.colId == 'title') {
      if (params?.node?.data?.videoId) {
        result.push({
          name: 'Open in new tab',
          action: function () {
            window.open(
              `https://www.youtube.com/watch?v=${params?.node?.data?.videoId}`,
              '_blank'
            )
          },
          cssClasses: ['blackFont', 'bold'],
        })
      }
    }
    return result
  }
  onRowSelected(params) {
    this.numSelectedItems = params.api.getSelectedRows().length
    this.missionService.sendChecks(this.numSelectedItems)
  }
}
