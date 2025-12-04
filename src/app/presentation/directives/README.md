# Custom Directives

This directory contains custom Angular directives for common UI patterns and behaviors.

## Available Directives

### 1. ClickOutsideDirective

Detects clicks outside of an element. Useful for closing dropdowns, modals, or menus.

**Usage:**
```typescript
import { ClickOutsideDirective } from '@presentation/directives';

@Component({
  imports: [ClickOutsideDirective],
  // ...
})
```

```html
<div (clickOutside)="closeDropdown()">
  <button (click)="toggleDropdown()">Toggle Menu</button>
  <ul *ngIf="isOpen" class="dropdown-menu">
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
```

**Features:**
- Works with both mouse clicks and touch events
- Automatically detects if click is inside or outside the element
- Emits event only when clicking outside

---

### 2. PermissionDirective

Structural directive to show/hide elements based on user permissions and roles.

**Usage:**
```typescript
import { PermissionDirective } from '@presentation/directives';

@Component({
  imports: [PermissionDirective],
  // ...
})
```

```html
<!-- Show only for admin users -->
<button *appPermission="'admin'">Delete User</button>

<!-- Show for multiple roles -->
<div *appPermission="['admin', 'moderator']">
  Admin/Moderator Content
</div>

<!-- Inverse mode - show for non-admin users -->
<div *appPermission="'admin'; inverse: true">
  Content for regular users
</div>
```

**Features:**
- Integrates with AuthStore for reactive permission checking
- Supports single or multiple roles
- Inverse mode to show content when user doesn't have permission
- Automatically updates when user authentication state changes

---

### 3. LazyLoadDirective

Lazy loads images using the Intersection Observer API for better performance.

**Usage:**
```typescript
import { LazyLoadDirective } from '@presentation/directives';

@Component({
  imports: [LazyLoadDirective],
  // ...
})
```

```html
<!-- Basic usage -->
<img appLazyLoad [src]="imageUrl" alt="Product Image">

<!-- With custom placeholder -->
<img appLazyLoad 
     [src]="imageUrl" 
     [placeholder]="'/assets/placeholder.png'"
     alt="Product Image">

<!-- With custom threshold and root margin -->
<img appLazyLoad 
     [src]="imageUrl" 
     [lazyLoadThreshold]="0.5"
     [lazyLoadRootMargin]="'100px'"
     alt="Product Image">
```

**Features:**
- Uses Intersection Observer API for efficient viewport detection
- Configurable threshold and root margin
- Placeholder support while loading
- Automatic fallback for browsers without Intersection Observer support
- CSS classes for styling different states:
  - `.lazy-loading` - while image is loading
  - `.lazy-loaded` - after successful load
  - `.lazy-error` - if image fails to load

**CSS Example:**
```scss
img {
  &.lazy-loading {
    filter: blur(5px);
    transition: filter 0.3s;
  }
  
  &.lazy-loaded {
    filter: blur(0);
  }
  
  &.lazy-error {
    opacity: 0.5;
  }
}
```

---

## Best Practices

1. **Import only what you need**: These are standalone directives, so import them directly in your components.

2. **ClickOutsideDirective**: 
   - Be careful with nested elements that also use this directive
   - Consider debouncing if you have performance concerns

3. **PermissionDirective**: 
   - Ensure AuthStore is properly configured before using
   - Use inverse mode sparingly for better code readability

4. **LazyLoadDirective**: 
   - Always provide meaningful alt text for accessibility
   - Consider using appropriate placeholder images
   - Adjust threshold and rootMargin based on your use case

## Testing

When testing components that use these directives:

```typescript
// Example test for ClickOutsideDirective
it('should emit clickOutside when clicking outside element', () => {
  const fixture = TestBed.createComponent(TestComponent);
  const compiled = fixture.nativeElement;
  
  spyOn(fixture.componentInstance, 'onClickOutside');
  
  document.body.click();
  
  expect(fixture.componentInstance.onClickOutside).toHaveBeenCalled();
});
```
