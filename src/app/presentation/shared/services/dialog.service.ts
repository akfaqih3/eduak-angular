import { Injectable, signal, Type, ComponentRef, ViewContainerRef, ApplicationRef, createComponent, EnvironmentInjector } from '@angular/core';
import { Subject, Observable, firstValueFrom } from 'rxjs';

/**
 * Dialog configuration options
 */
export interface DialogConfig {
  /** Dialog title */
  title?: string;
  /** Dialog message or content */
  message?: string;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Show cancel button */
  showCancel?: boolean;
  /** Dialog width */
  width?: string;
  /** Close on backdrop click */
  closeOnBackdrop?: boolean;
  /** Custom CSS class */
  customClass?: string;
}

/**
 * Dialog result
 */
export interface DialogResult<T = any> {
  /** Whether the dialog was confirmed */
  confirmed: boolean;
  /** Optional data returned from the dialog */
  data?: T;
}

/**
 * Dialog reference
 * Represents an open dialog instance
 */
export class DialogRef<T = any> {
  private resultSubject = new Subject<DialogResult<T>>();
  
  /** Observable that emits when the dialog is closed */
  readonly afterClosed$ = this.resultSubject.asObservable();

  constructor(
    public id: string,
    private onCloseCallback: (id: string) => void
  ) {}

  /**
   * Close the dialog with a result
   * @param result - The dialog result
   */
  close(result: DialogResult<T>): void {
    this.resultSubject.next(result);
    this.resultSubject.complete();
    this.onCloseCallback(this.id);
  }

  /**
   * Confirm and close the dialog
   * @param data - Optional data to return
   */
  confirm(data?: T): void {
    this.close({ confirmed: true, data });
  }

  /**
   * Cancel and close the dialog
   */
  cancel(): void {
    this.close({ confirmed: false });
  }

  /**
   * Get the result as a promise
   */
  async getResult(): Promise<DialogResult<T>> {
    return firstValueFrom(this.afterClosed$);
  }
}

/**
 * Internal dialog data
 */
interface DialogData {
  id: string;
  config: DialogConfig;
  ref: DialogRef;
  componentRef?: ComponentRef<any>;
}

/**
 * DialogService
 * Manages modal dialogs throughout the application
 * - Opens confirmation dialogs
 * - Opens custom component dialogs
 * - Returns dialog results via promises or observables
 * 
 * @example
 * ```typescript
 * class MyComponent {
 *   private dialogService = inject(DialogService);
 * 
 *   async confirmDelete() {
 *     const result = await this.dialogService.confirm({
 *       title: 'تأكيد الحذف',
 *       message: 'هل أنت متأكد من حذف هذا العنصر؟',
 *       confirmText: 'حذف',
 *       cancelText: 'إلغاء'
 *     });
 * 
 *     if (result.confirmed) {
 *       // Perform delete
 *     }
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly _dialogs = signal<DialogData[]>([]);
  readonly dialogs = this._dialogs.asReadonly();

  private idCounter = 0;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  /**
   * Open a confirmation dialog
   * @param config - Dialog configuration
   * @returns DialogRef that can be used to get the result
   */
  confirm(config: DialogConfig): DialogRef {
    const defaultConfig: DialogConfig = {
      title: 'تأكيد',
      message: '',
      confirmText: 'تأكيد',
      cancelText: 'إلغاء',
      showCancel: true,
      closeOnBackdrop: true,
      width: '400px',
      ...config
    };

    return this.openDialog(defaultConfig);
  }

  /**
   * Open an alert dialog (no cancel button)
   * @param config - Dialog configuration
   * @returns DialogRef that can be used to get the result
   */
  alert(config: DialogConfig): DialogRef {
    const defaultConfig: DialogConfig = {
      title: 'تنبيه',
      message: '',
      confirmText: 'حسناً',
      showCancel: false,
      closeOnBackdrop: true,
      width: '400px',
      ...config
    };

    return this.openDialog(defaultConfig);
  }

  /**
   * Open a custom component dialog
   * @param component - The component to display in the dialog
   * @param config - Dialog configuration
   * @returns DialogRef that can be used to get the result
   */
  openComponent<T>(component: Type<T>, config: DialogConfig = {}): DialogRef {
    const defaultConfig: DialogConfig = {
      closeOnBackdrop: true,
      width: '600px',
      ...config
    };

    const dialogRef = this.openDialog(defaultConfig);
    
    // Create and attach the component
    // Note: In a real implementation, you would need to:
    // 1. Create a dialog container component
    // 2. Attach the custom component to it
    // 3. Provide the DialogRef to the custom component via injection
    
    return dialogRef;
  }

  /**
   * Internal method to open a dialog
   * @param config - Dialog configuration
   * @returns DialogRef
   */
  private openDialog(config: DialogConfig): DialogRef {
    const id = `dialog-${++this.idCounter}`;
    const dialogRef = new DialogRef(id, (dialogId) => this.closeDialog(dialogId));

    const dialogData: DialogData = {
      id,
      config,
      ref: dialogRef
    };

    this._dialogs.update(dialogs => [...dialogs, dialogData]);

    return dialogRef;
  }

  /**
   * Close a dialog by ID
   * @param id - Dialog ID to close
   */
  private closeDialog(id: string): void {
    this._dialogs.update(dialogs => {
      const dialog = dialogs.find(d => d.id === id);
      if (dialog?.componentRef) {
        dialog.componentRef.destroy();
      }
      return dialogs.filter(d => d.id !== id);
    });
  }

  /**
   * Close all open dialogs
   */
  closeAll(): void {
    this._dialogs().forEach(dialog => {
      dialog.ref.cancel();
    });
  }

  /**
   * Get the number of open dialogs
   */
  getOpenDialogCount(): number {
    return this._dialogs().length;
  }
}
