import {Component, Input} from '@angular/core';

export const AVATARS = [
  'boy',
  'girl',
  'man',
  'girl-1',
  'girl-2',
  'girl-3'
];

@Component({
  selector: 'app-svg-icon',
  styleUrls: [
    './svg-icon.component.scss'
  ],
  templateUrl: './svg-icon.component.html'
})

export class SvgIconComponent {
  @Input() icon: string;

  constructor() {
    console.log('constructor');
  }
}
