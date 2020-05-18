import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-spinner-img',
  templateUrl: './spinner-img.component.html',
  styleUrls: ['./spinner-img.component.scss', '../user-list/ghost/ghost-item.component.scss']
})
export class SpinnerImgComponent implements OnInit {

  @Input() imgSrc: string;
  @Input() spinnerSrc: string;
  @Input() imgContainerClass: string;
  @Input() width: number = 150;
  @Input() height: number = 150;
  @Input() lazyLoadImage = false;

  loading: boolean = true;

  onLoad() {
    // setTimeout(() => {
    console.log('caricata');
    this.loading = false;
    // },2000)
  }

  reload() {
    this.loading = true;
    this.onLoad();
  }

  constructor() {
    console.log('constructor');
  }

  ngOnInit() {
    console.log('init');
  }

}
