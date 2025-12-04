import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  HostListener,
  inject
} from '@angular/core';

/**
 * ClickOutsideDirective
 * 
 * Directive to detect clicks outside of an element.
 * Useful for closing dropdowns, modals, or menus when clicking outside.
 * 
 * @example
 * ```html
 * <div (clickOutside)="closeDropdown()">
 *   <button>Toggle Dropdown</button>
 *   <ul class="dropdown-menu">
 *     <li>Item 1</li>
 *     <li>Item 2</li>
 *   </ul>
 * </div>
 * ```
 */
@Directive({
  selector: '[clickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  private elementRef = inject(ElementRef);

  /**
   * Event emitted when a click occurs outside the element
   */
  @Output() clickOutside = new EventEmitter<MouseEvent>();

  /**
   * Listen for document clicks and check if the click is outside the element
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    
    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }

  /**
   * Prevent the directive from triggering on touch devices when scrolling
   */
  @HostListener('document:touchstart', ['$event'])
  onDocumentTouchStart(event: TouchEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    
    if (!clickedInside) {
      this.clickOutside.emit(event as any);
    }
  }
}
