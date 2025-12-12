import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  route?: string;
  icon?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent {
  items = input<BreadcrumbItem[]>([]);
  separator = input<string>('/');
  showHome = input<boolean>(true);

  /**
   * TrackBy function for breadcrumb items optimization
   * 
   * @param index - Index of the item
   * @param item - Breadcrumb item
   * @returns Unique identifier for the item
   */
  trackByItemLabel(index: number, item: BreadcrumbItem): string {
    return item.label;
  }
}
