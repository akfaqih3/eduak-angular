import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface SidebarItem {
  label: string;
  route?: string;
  icon?: string;
  badge?: string;
  children?: SidebarItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  items = input<SidebarItem[]>([]);
  isOpen = input<boolean>(true);
  collapsible = input<boolean>(true);
  
  close = output<void>();
  
  expandedItems = new Set<string>();

  toggleItem(label: string): void {
    if (this.expandedItems.has(label)) {
      this.expandedItems.delete(label);
    } else {
      this.expandedItems.add(label);
    }
  }

  isExpanded(label: string): boolean {
    return this.expandedItems.has(label);
  }

  onClose(): void {
    this.close.emit();
  }

  /**
   * TrackBy function for sidebar items optimization
   * 
   * @param index - Index of the item
   * @param item - Sidebar item
   * @returns Unique identifier for the item
   */
  trackByItemLabel(index: number, item: SidebarItem): string {
    return item.label;
  }
}
