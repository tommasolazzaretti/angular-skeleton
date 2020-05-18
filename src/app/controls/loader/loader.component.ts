import {Input, Component, ViewEncapsulation, ElementRef, OnChanges, SimpleChanges, Renderer2} from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoaderComponent implements OnChanges {

  @Input() show = true;
  @Input() message: string;

  public lottieConfig: object;
  private anim: any;

  constructor(public elementRef: ElementRef, public renderer: Renderer2) {

    this.lottieConfig = {
      path: 'assets/lottie/animation-w90-h90.json',
      autoplay: true,
      loop: true
    };

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.show.currentValue) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'z-index', 0);
      this.renderer.removeStyle(this.elementRef.nativeElement, 'top');
      this.renderer.removeStyle(this.elementRef.nativeElement, 'left');
      this.renderer.removeStyle(this.elementRef.nativeElement, 'bottom');
      this.renderer.removeStyle(this.elementRef.nativeElement, 'right');
    } else if (changes.show.currentValue) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'z-index', 1000);
      this.renderer.setStyle(this.elementRef.nativeElement, 'top', 0);
      this.renderer.setStyle(this.elementRef.nativeElement, 'left', 0);
      this.renderer.setStyle(this.elementRef.nativeElement, 'bottom', 0);
      this.renderer.setStyle(this.elementRef.nativeElement, 'right', 0);
    }
  }

  handleAnimation(anim: any) {
    this.anim = anim;
    this.anim.setSpeed(0.5);
  }

}
