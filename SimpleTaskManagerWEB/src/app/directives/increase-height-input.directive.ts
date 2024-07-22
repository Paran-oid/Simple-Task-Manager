import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appIncreaseHeightInput]',
  standalone: true,
})
export class IncreaseHeightInputDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.Resize();
  }

  @HostListener('input') Resize() {
    const textArea = this.elementRef.nativeElement as HTMLTextAreaElement;
    this.renderer.setStyle(textArea, 'height', 'auto');
    this.renderer.setStyle(textArea, 'height', `${textArea.scrollHeight}px`);
  }
}
