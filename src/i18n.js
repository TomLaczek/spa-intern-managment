import Vue from 'vue'
import VueI18n from 'vue-i18n'
import localize from './locales/localize';

Vue.use(VueI18n)

function loadLocaleMessages () {
  const messages = localize;
  return messages
}

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: loadLocaleMessages()
});

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
