/* افزودن جداکننده سه‌رقمی و ارقام فارسی هنگام تایپ در پلنر */
(function () {
  const selector = '.money-input, .count-input';
  const toLatin = s => String(s || '')
    .replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

  document.addEventListener('input', function (event) {
    const el = event.target;
    if (!el || !el.matches || !el.matches(selector)) return;

    const oldValue = el.value;
    const oldPos = el.selectionStart == null ? oldValue.length : el.selectionStart;
    const digitsBefore = toLatin(oldValue.slice(0, oldPos)).replace(/\D/g, '').length;
    const digits = toLatin(oldValue).replace(/\D/g, '');
    const formatted = digits
      ? new Intl.NumberFormat('fa-IR-u-nu-arabext', { maximumFractionDigits: 0 }).format(Number(digits))
      : '';

    el.value = formatted;

    let newPos = 0, seen = 0;
    while (newPos < formatted.length && seen < digitsBefore) {
      if (/[۰-۹]/.test(formatted[newPos])) seen++;
      newPos++;
    }
    try { el.setSelectionRange(newPos, newPos); } catch (_) {}
  }, true);
})();
