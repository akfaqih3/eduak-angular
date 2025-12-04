import { Pipe, PipeTransform } from '@angular/core';

/**
 * TruncatePipe - أنبوب مخصص لاختصار النصوص الطويلة
 * 
 * @example
 * {{ text | truncate }}                          // اختصار افتراضي (50 حرف)
 * {{ text | truncate:100 }}                      // اختصار إلى 100 حرف
 * {{ text | truncate:50:'...' }}                 // مع نقاط افتراضية
 * {{ text | truncate:50:'... اقرأ المزيد' }}     // مع نص مخصص
 * {{ text | truncate:50:'...':true }}            // اختصار عند كلمة كاملة
 */
@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  
  transform(
    value: string | null | undefined,
    limit: number = 50,
    completeWords: boolean = false,
    ellipsis: string = '...'
  ): string {
    if (!value) {
      return '';
    }

    if (value.length <= limit) {
      return value;
    }

    if (completeWords) {
      return this.truncateAtWord(value, limit, ellipsis);
    }

    return this.truncateAtCharacter(value, limit, ellipsis);
  }

  private truncateAtCharacter(value: string, limit: number, ellipsis: string): string {
    return value.substring(0, limit).trim() + ellipsis;
  }

  private truncateAtWord(value: string, limit: number, ellipsis: string): string {
    if (value.length <= limit) {
      return value;
    }

    // Find the last space before the limit
    let truncated = value.substring(0, limit);
    const lastSpace = truncated.lastIndexOf(' ');

    if (lastSpace > 0) {
      truncated = truncated.substring(0, lastSpace);
    }

    return truncated.trim() + ellipsis;
  }
}
