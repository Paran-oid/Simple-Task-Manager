import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIncreaseHeightInput]',
  standalone: true,
})
export class IncreaseHeightInputDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('input') Resize() {
    const textArea = this.elementRef.nativeElement as HTMLTextAreaElement;
    this.renderer.setStyle(textArea, 'height', 'auto');
    this.renderer.setStyle(textArea, 'height', `${textArea.scrollHeight}px`);
  }
}
