import { Pipe, PipeTransform } from '@angular/core';

/**
 * DateFormatPipe - أنبوب مخصص لتنسيق التواريخ
 * 
 * @example
 * {{ date | dateFormat }}                    // تنسيق افتراضي
 * {{ date | dateFormat:'short' }}            // تنسيق قصير
 * {{ date | dateFormat:'long' }}             // تنسيق طويل
 * {{ date | dateFormat:'time' }}             // الوقت فقط
 * {{ date | dateFormat:'date' }}             // التاريخ فقط
 * {{ date | dateFormat:'relative' }}         // تنسيق نسبي (منذ ساعة، منذ يوم)
 */
@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  
  transform(value: Date | string | number | null | undefined, format: 'short' | 'long' | 'time' | 'date' | 'relative' = 'short'): string {
    if (!value) {
      return '';
    }

    const date = this.parseDate(value);
    if (!date || isNaN(date.getTime())) {
      return '';
    }

    switch (format) {
      case 'short':
        return this.formatShort(date);
      case 'long':
        return this.formatLong(date);
      case 'time':
        return this.formatTime(date);
      case 'date':
        return this.formatDate(date);
      case 'relative':
        return this.formatRelative(date);
      default:
        return this.formatShort(date);
    }
  }

  private parseDate(value: Date | string | number): Date {
    if (value instanceof Date) {
      return value;
    }
    return new Date(value);
  }

  private formatShort(date: Date): string {
    // Format: DD/MM/YYYY HH:MM
    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  private formatLong(date: Date): string {
    // Format: اليوم، DD الشهر YYYY الساعة HH:MM
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const months = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());

    return `${dayName}، ${day} ${monthName} ${year} الساعة ${hours}:${minutes}`;
  }

  private formatTime(date: Date): string {
    // Format: HH:MM:SS
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    
    return `${hours}:${minutes}:${seconds}`;
  }

  private formatDate(date: Date): string {
    // Format: DD/MM/YYYY
    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1);
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }

  private formatRelative(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSeconds < 60) {
      return 'الآن';
    } else if (diffMinutes < 60) {
      return `منذ ${diffMinutes} ${diffMinutes === 1 ? 'دقيقة' : 'دقائق'}`;
    } else if (diffHours < 24) {
      return `منذ ${diffHours} ${diffHours === 1 ? 'ساعة' : 'ساعات'}`;
    } else if (diffDays < 7) {
      return `منذ ${diffDays} ${diffDays === 1 ? 'يوم' : 'أيام'}`;
    } else if (diffWeeks < 4) {
      return `منذ ${diffWeeks} ${diffWeeks === 1 ? 'أسبوع' : 'أسابيع'}`;
    } else if (diffMonths < 12) {
      return `منذ ${diffMonths} ${diffMonths === 1 ? 'شهر' : 'أشهر'}`;
    } else {
      return `منذ ${diffYears} ${diffYears === 1 ? 'سنة' : 'سنوات'}`;
    }
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
