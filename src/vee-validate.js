import { required, max, min, alpha, regex} from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'
import { setInteractionMode } from 'vee-validate'

import { configure } from 'vee-validate'
import { i18n } from "./i18n";

configure({
  defaultMessage: (field, values) => {
    // override the field name.
    values._field_ = i18n.t(`fields.${field}`);

    return i18n.t(`validations.${values._rule_}`, values);
  }
});

// import { localize } from 'vee-validate';
// import lang from './locales/localize'
// localize({
//     en: {
//         messages: {
//             required: lang.en.validations.required,
//             min: lang.en.validations.min,
//             max: lang.en.validations.max,
//             alpha: lang.en.validations.alpha,
//             regex: lang.en.validations.regex,
//         }
//     }
// });

setInteractionMode('eager')

extend('required', required);
extend('alpha', alpha)
extend('regex', regex)
extend('max', max)
extend('min', min)