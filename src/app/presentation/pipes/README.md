# Custom Pipes - الأنابيب المخصصة

هذا المجلد يحتوي على الأنابيب المخصصة (Custom Pipes) القابلة لإعادة الاستخدام في التطبيق.

## الأنابيب المتاحة

### 1. DateFormatPipe - تنسيق التواريخ

أنبوب لتنسيق التواريخ بطرق مختلفة مع دعم اللغة العربية.

#### الاستخدام

```typescript
import { DateFormatPipe } from '@presentation/pipes';

@Component({
  imports: [DateFormatPipe],
  template: `
    <!-- تنسيق قصير (افتراضي) -->
    <p>{{ date | dateFormat }}</p>
    <!-- Output: 15/03/2024 14:30 -->

    <!-- تنسيق طويل -->
    <p>{{ date | dateFormat:'long' }}</p>
    <!-- Output: الجمعة، 15 مارس 2024 الساعة 14:30 -->

    <!-- الوقت فقط -->
    <p>{{ date | dateFormat:'time' }}</p>
    <!-- Output: 14:30:45 -->

    <!-- التاريخ فقط -->
    <p>{{ date | dateFormat:'date' }}</p>
    <!-- Output: 15/03/2024 -->

    <!-- تنسيق نسبي -->
    <p>{{ date | dateFormat:'relative' }}</p>
    <!-- Output: منذ ساعتين -->
  `
})
```

#### الخيارات المتاحة

- `short` (افتراضي): DD/MM/YYYY HH:MM
- `long`: اليوم، DD الشهر YYYY الساعة HH:MM
- `time`: HH:MM:SS
- `date`: DD/MM/YYYY
- `relative`: منذ X (دقائق/ساعات/أيام/أسابيع/أشهر/سنوات)

---

### 2. CurrencyFormatPipe - تنسيق العملات

أنبوب لتنسيق الأرقام كعملات مع دعم عملات متعددة.

#### الاستخدام

```typescript
import { CurrencyFormatPipe } from '@presentation/pipes';

@Component({
  imports: [CurrencyFormatPipe],
  template: `
    <!-- تنسيق افتراضي (ريال سعودي) -->
    <p>{{ price | currencyFormat }}</p>
    <!-- Output: 1,250.00 ر.س -->

    <!-- دولار أمريكي -->
    <p>{{ price | currencyFormat:'USD' }}</p>
    <!-- Output: 1,250.00 $ -->

    <!-- مع كود العملة -->
    <p>{{ price | currencyFormat:'SAR':'code' }}</p>
    <!-- Output: 1,250.00 SAR -->

    <!-- مع اسم العملة -->
    <p>{{ price | currencyFormat:'SAR':'name' }}</p>
    <!-- Output: 1,250.00 ريال سعودي -->

    <!-- بدون رمز -->
    <p>{{ price | currencyFormat:'SAR':'none' }}</p>
    <!-- Output: 1,250.00 -->
  `
})
```

#### العملات المدعومة

- `SAR` - ريال سعودي (ر.س)
- `USD` - دولار أمريكي ($)
- `EUR` - يورو (€)
- `GBP` - جنيه إسترليني (£)
- `AED` - درهم إماراتي (د.إ)
- `EGP` - جنيه مصري (ج.م)
- `KWD` - دينار كويتي (د.ك)
- `BHD` - دينار بحريني (د.ب)
- `OMR` - ريال عماني (ر.ع)
- `QAR` - ريال قطري (ر.ق)
- `JOD` - دينار أردني (د.أ)

#### المعاملات

1. `value`: القيمة المراد تنسيقها (number | string)
2. `currencyCode`: كود العملة (افتراضي: 'SAR')
3. `display`: طريقة العرض ('symbol' | 'code' | 'name' | 'none')
4. `locale`: اللغة المحلية (افتراضي: 'ar-SA')

---

### 3. TruncatePipe - اختصار النصوص

أنبوب لاختصار النصوص الطويلة مع خيارات متقدمة.

#### الاستخدام

```typescript
import { TruncatePipe } from '@presentation/pipes';

@Component({
  imports: [TruncatePipe],
  template: `
    <!-- اختصار افتراضي (50 حرف) -->
    <p>{{ longText | truncate }}</p>
    <!-- Output: هذا نص طويل جداً يحتاج إلى اختصار لأنه يتجاوز... -->

    <!-- اختصار إلى 100 حرف -->
    <p>{{ longText | truncate:100 }}</p>

    <!-- اختصار عند كلمة كاملة -->
    <p>{{ longText | truncate:50:true }}</p>

    <!-- مع نص مخصص -->
    <p>{{ longText | truncate:50:false:'... اقرأ المزيد' }}</p>
  `
})
```

#### المعاملات

1. `value`: النص المراد اختصاره (string)
2. `limit`: الحد الأقصى للأحرف (افتراضي: 50)
3. `completeWords`: الاختصار عند كلمة كاملة (افتراضي: false)
4. `ellipsis`: النص الذي يضاف في النهاية (افتراضي: '...')

---

## الاستيراد الجماعي

يمكنك استيراد جميع الأنابيب دفعة واحدة:

```typescript
import { DateFormatPipe, CurrencyFormatPipe, TruncatePipe } from '@presentation/pipes';

@Component({
  imports: [DateFormatPipe, CurrencyFormatPipe, TruncatePipe],
  // ...
})
```

## أمثلة عملية

### مثال: عرض بطاقة منتج

```typescript
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [DateFormatPipe, CurrencyFormatPipe, TruncatePipe],
  template: `
    <div class="product-card">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description | truncate:100:true }}</p>
      <div class="price">{{ product.price | currencyFormat:'SAR':'symbol' }}</div>
      <small>تم الإضافة: {{ product.createdAt | dateFormat:'relative' }}</small>
    </div>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;
}
```

### مثال: جدول المعاملات

```typescript
@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [DateFormatPipe, CurrencyFormatPipe],
  template: `
    <table>
      <thead>
        <tr>
          <th>التاريخ</th>
          <th>المبلغ</th>
          <th>الحالة</th>
        </tr>
      </thead>
      <tbody>
        @for (transaction of transactions; track transaction.id) {
          <tr>
            <td>{{ transaction.date | dateFormat:'short' }}</td>
            <td>{{ transaction.amount | currencyFormat:transaction.currency }}</td>
            <td>{{ transaction.status }}</td>
          </tr>
        }
      </tbody>
    </table>
  `
})
export class TransactionsTableComponent {
  @Input() transactions: Transaction[] = [];
}
```

## ملاحظات

- جميع الأنابيب هي Standalone Pipes ويمكن استيرادها مباشرة
- الأنابيب تدعم القيم الفارغة (null/undefined) وتعيد سلسلة نصية فارغة
- يتم التحقق من صحة المدخلات تلقائياً
- الأنابيب محسّنة للأداء ولا تسبب مشاكل في Change Detection

## إضافة أنابيب جديدة

عند إضافة أنبوب جديد:

1. أنشئ ملف الأنبوب في هذا المجلد
2. تأكد من أن الأنبوب Standalone
3. أضف التصدير في `index.ts`
4. وثّق الاستخدام في هذا الملف
