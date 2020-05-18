import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GridsterConfig, GridsterItem, GridType, CompactType, DisplayGrid} from 'angular-gridster2';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-angular-gridster',
  templateUrl: './gridster.component.html',
  styleUrls: ['./gridster.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridsterComponent implements OnInit {
  options: GridsterConfig;
  dashboard: Array<GridsterItem> = [];
  loaded = false;

  constructor() {
    console.log('constructor');
  }

  ngOnInit() {
    this.options = {
      itemChangeCallback: (item, itemComponent) => this.itemChange(item, itemComponent),
      itemResizeCallback: (item, itemComponent) => this.itemResize(item, itemComponent),
      pushItems: true,
      swap: false,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: DisplayGrid.Always,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false,
      minCols: 1,
      maxCols: 100,
      minRows: 1,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      setGridSize: true,
      mobileBreakpoint: 640,
      gridType: GridType.Fit,
      compactType: CompactType.None,
      resizable: {
        enabled: true
      },
      draggable: {
        enabled: true
      }
    };

    this.dashboard = [
      {x: 0, y: 0, cols: 6, rows: 2},
      {x: 0, y: 0, cols: 6, rows: 2},
      {x: 0, y: 8, cols: 6, rows: 2},
      {x: 6, y: 8, cols: 6, rows: 2},
      {x: 12, y: 0, cols: 4, rows: 2}
    ];

    // hiding the gridster untill positions are loaded
    this.loaded = false;

    this.getPositions().subscribe((positions) => {
      this.dashboard = positions;
      this.loaded = true;
    });
  }

  itemChange(item, itemComponent) {
    console.log(`state: ${JSON.stringify(this.dashboard, null, 5)}`);
    this.savePositions(this.dashboard);
  }

  itemResize(item, itemComponent) {
     console.log('itemResized', item, itemComponent);
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(item) {
    this.dashboard.push(item);
  }

  getPositions(): Observable<any> {
    return new Observable(observer => {
      setTimeout(() => {
        if (localStorage.getItem('positions')) {
          observer.next(JSON.parse(localStorage.getItem('positions')));
        } else {
          // default data

          observer.next([
            {x: 0, y: 0, cols: 6, rows: 2},
            {x: 0, y: 0, cols: 6, rows: 2},
            {x: 0, y: 8, cols: 6, rows: 2},
            {x: 6, y: 8, cols: 6, rows: 2},
            {x: 12, y: 0, cols: 4, rows: 2}
          ]);
        }
      }, 1000);
    });
  }

  savePositions(positions) {
    localStorage.setItem('positions', JSON.stringify(positions));
  }
}
