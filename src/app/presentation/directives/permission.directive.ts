import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  OnDestroy,
  inject,
  effect
} from '@angular/core';
import { AuthStore } from '../features/auth/services/auth.store';

/**
 * PermissionDirective
 * 
 * Structural directive to show/hide elements based on user permissions.
 * Works with the AuthStore to check user roles and permissions.
 * 
 * @example
 * ```html
 * <!-- Show only for admin users -->
 * <button *appPermission="'admin'">Delete User</button>
 * 
 * <!-- Show for multiple roles -->
 * <div *appPermission="['admin', 'moderator']">
 *   Admin/Moderator Content
 * </div>
 * 
 * <!-- Hide if user has permission (inverse) -->
 * <div *appPermission="'admin'; inverse: true">
 *   Content for non-admin users
 * </div>
 * ```
 */
@Directive({
  selector: '[appPermission]',
  standalone: true
})
export class PermissionDirective implements OnInit, OnDestroy {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private authStore = inject(AuthStore);

  private hasView = false;
  private requiredPermissions: string[] = [];
  private inverseMode = false;

  /**
   * Set the required permission(s) to show the element
   * Can be a single permission string or an array of permissions
   */
  @Input() set appPermission(permissions: string | string[]) {
    this.requiredPermissions = Array.isArray(permissions) ? permissions : [permissions];
    this.updateView();
  }

  /**
   * If true, shows the element when user DOESN'T have the permission
   */
  @Input() set appPermissionInverse(inverse: boolean) {
    this.inverseMode = inverse;
    this.updateView();
  }

  constructor() {
    // React to changes in user authentication state
    effect(() => {
      // Trigger update when user or role changes
      this.authStore.user();
      this.authStore.userRole();
      this.updateView();
    });
  }

  ngOnInit(): void {
    this.updateView();
  }

  ngOnDestroy(): void {
    this.viewContainer.clear();
  }

  /**
   * Update the view based on user permissions
   */
  private updateView(): void {
    const hasPermission = this.checkPermission();
    const shouldShow = this.inverseMode ? !hasPermission : hasPermission;

    if (shouldShow && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!shouldShow && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  /**
   * Check if the current user has the required permission(s)
   */
  private checkPermission(): boolean {
    const userRole = this.authStore.userRole();
    
    if (!userRole) {
      return false;
    }

    // Check if user role matches any of the required permissions
    return this.requiredPermissions.some(permission => 
      userRole.toLowerCase() === permission.toLowerCase()
    );
  }
}
