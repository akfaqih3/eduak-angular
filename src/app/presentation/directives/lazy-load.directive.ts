import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  inject,
  Renderer2
} from '@angular/core';

/**
 * LazyLoadDirective
 * 
 * Directive to lazy load images using the Intersection Observer API.
 * Images are only loaded when they enter the viewport, improving initial page load performance.
 * 
 * @example
 * ```html
 * <!-- Basic usage -->
 * <img appLazyLoad [src]="imageUrl" alt="Description">
 * 
 * <!-- With placeholder -->
 * <img appLazyLoad 
 *      [src]="imageUrl" 
 *      [placeholder]="'/assets/placeholder.png'"
 *      alt="Description">
 * 
 * <!-- With custom threshold -->
 * <img appLazyLoad 
 *      [src]="imageUrl" 
 *      [lazyLoadThreshold]="0.5"
 *      alt="Description">
 * ```
 */
@Directive({
  selector: 'img[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  private observer?: IntersectionObserver;
  private isLoaded = false;

  /**
   * The actual image source to load
   */
  @Input() src?: string;

  /**
   * Optional placeholder image to show while loading
   */
  @Input() placeholder?: string = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3ELoading...%3C/text%3E%3C/svg%3E';

  /**
   * Threshold for when to start loading (0.0 to 1.0)
   * 0.0 = as soon as any part is visible
   * 1.0 = only when fully visible
   */
  @Input() lazyLoadThreshold: number = 0.1;

  /**
   * Root margin for the intersection observer
   * Allows loading images before they enter the viewport
   */
  @Input() lazyLoadRootMargin: string = '50px';

  ngOnInit(): void {
    // Set placeholder image initially
    if (this.placeholder) {
      this.renderer.setAttribute(
        this.elementRef.nativeElement,
        'src',
        this.placeholder
      );
    }

    // Add loading class for styling
    this.renderer.addClass(this.elementRef.nativeElement, 'lazy-loading');

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      this.setupIntersectionObserver();
    } else {
      // Fallback: load image immediately if IntersectionObserver is not supported
      this.loadImage();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  /**
   * Set up the Intersection Observer to detect when the image enters the viewport
   */
  private setupIntersectionObserver(): void {
    const options: IntersectionObserverInit = {
      root: null, // viewport
      rootMargin: this.lazyLoadRootMargin,
      threshold: this.lazyLoadThreshold
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isLoaded) {
          this.loadImage();
          
          // Stop observing after loading
          if (this.observer) {
            this.observer.unobserve(this.elementRef.nativeElement);
          }
        }
      });
    }, options);

    this.observer.observe(this.elementRef.nativeElement);
  }

  /**
   * Load the actual image
   */
  private loadImage(): void {
    if (!this.src || this.isLoaded) {
      return;
    }

    const img = this.elementRef.nativeElement as HTMLImageElement;

    // Create a new image to preload
    const tempImage = new Image();
    
    tempImage.onload = () => {
      // Set the actual source
      this.renderer.setAttribute(img, 'src', this.src!);
      
      // Update classes
      this.renderer.removeClass(img, 'lazy-loading');
      this.renderer.addClass(img, 'lazy-loaded');
      
      this.isLoaded = true;
    };

    tempImage.onerror = () => {
      // Handle error - keep placeholder or set error image
      this.renderer.removeClass(img, 'lazy-loading');
      this.renderer.addClass(img, 'lazy-error');
      
      console.error(`Failed to load image: ${this.src}`);
    };

    // Start loading
    tempImage.src = this.src;
  }
}
