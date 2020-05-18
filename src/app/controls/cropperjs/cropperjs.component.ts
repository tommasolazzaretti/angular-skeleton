import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { CropperComponent, ImageCropperResult } from 'angular-cropperjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'cropperjs',
  templateUrl: './cropperjs.component.html',
  styleUrls: ['./cropperjs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CropperjsComponent implements OnInit {
  @ViewChild('angularCropper') public angularCropper: CropperComponent;
  config: any;
  imageUrl: any;
  resultResult: any;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.config = {
      viewMode: 3,
      movable: true,
      zoomOnWheel: true,
      zoomable: true
    };

    this.uploadChange();
  }

  CropMe() {
    this.angularCropper.exportCanvas();
  }

  reset() {
    this.angularCropper.cropper.reset();
  }

  resultImageFun(event: ImageCropperResult) {
    this.resultResult = this.angularCropper.cropper
      .getCroppedCanvas()
      .toDataURL('image/jpeg');
  }

  checkstatus(event: any) {
    console.log(event.blob);
    if (event.blob === undefined) {
      return;
    }
    let urlCreator = window.URL;
    this.resultResult = this.sanitizer.bypassSecurityTrustUrl(
      urlCreator.createObjectURL(new Blob(event.blob))
    );
  }

  uploadChange() {
    const _self = this;
    document.querySelector('#myfile').addEventListener('change', () => {
      let input = document.getElementById('myfile') as HTMLInputElement;
      if (input.files && input.files[0]) {
        _self.imageUrl = null;
        let reader = new FileReader();
        reader.onload = e => {
          _self.imageUrl = reader.result.toString();
        };
        reader.readAsDataURL(input.files[0]);
      }
    });
  }
}
