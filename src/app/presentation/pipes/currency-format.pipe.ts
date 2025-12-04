import { Pipe, PipeTransform } from '@angular/core';

/**
 * CurrencyFormatPipe - أنبوب مخصص لتنسيق العملات
 * 
 * @example
 * {{ price | currencyFormat }}                    // تنسيق افتراضي (SAR)
 * {{ price | currencyFormat:'USD' }}              // دولار أمريكي
 * {{ price | currencyFormat:'EUR' }}              // يورو
 * {{ price | currencyFormat:'SAR':'symbol' }}     // مع رمز العملة
 * {{ price | currencyFormat:'SAR':'code' }}       // مع كود العملة
 * {{ price | currencyFormat:'SAR':'name' }}       // مع اسم العملة
 */
@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  
  private readonly currencies: Record<string, { symbol: string; name: string; decimals: number }> = {
    'SAR': { symbol: 'ر.س', name: 'ريال سعودي', decimals: 2 },
    'USD': { symbol: '$', name: 'دولار أمريكي', decimals: 2 },
    'EUR': { symbol: '€', name: 'يورو', decimals: 2 },
    'GBP': { symbol: '£', name: 'جنيه إسترليني', decimals: 2 },
    'AED': { symbol: 'د.إ', name: 'درهم إماراتي', decimals: 2 },
    'EGP': { symbol: 'ج.م', name: 'جنيه مصري', decimals: 2 },
    'KWD': { symbol: 'د.ك', name: 'دينار كويتي', decimals: 3 },
    'BHD': { symbol: 'د.ب', name: 'دينار بحريني', decimals: 3 },
    'OMR': { symbol: 'ر.ع', name: 'ريال عماني', decimals: 3 },
    'QAR': { symbol: 'ر.ق', name: 'ريال قطري', decimals: 2 },
    'JOD': { symbol: 'د.أ', name: 'دينار أردني', decimals: 3 }
  };

  transform(
    value: number | string | null | undefined,
    currencyCode: string = 'SAR',
    display: 'symbol' | 'code' | 'name' | 'none' = 'symbol',
    locale: string = 'ar-SA'
  ): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(numValue)) {
      return '';
    }

    const currency = this.currencies[currencyCode.toUpperCase()] || this.currencies['SAR'];
    const formattedNumber = this.formatNumber(numValue, currency.decimals, locale);

    switch (display) {
      case 'symbol':
        return `${formattedNumber} ${currency.symbol}`;
      case 'code':
        return `${formattedNumber} ${currencyCode.toUpperCase()}`;
      case 'name':
        return `${formattedNumber} ${currency.name}`;
      case 'none':
        return formattedNumber;
      default:
        return `${formattedNumber} ${currency.symbol}`;
    }
  }

  private formatNumber(value: number, decimals: number, locale: string): string {
    try {
      return value.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    } catch (error) {
      // Fallback to manual formatting if locale is not supported
      return this.manualFormat(value, decimals);
    }
  }

  private manualFormat(value: number, decimals: number): string {
    const fixed = value.toFixed(decimals);
    const parts = fixed.split('.');
    
    // Add thousand separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return parts.join('.');
  }
}
