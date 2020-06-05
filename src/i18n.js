import Vue from 'vue'
import VueI18n from 'vue-i18n'
import localize from './locales/localize';

Vue.use(VueI18n)

function loadLocaleMessages () {
  const messages = localize;
  return messages
}

function getLang(){
  if(!localStorage.language){
    var lang = navigator.language || "pl-PL";
    lang = lang.slice(0,2);
    if(lang != "pl"){
      if(lang == "pl-PL") return "pl";
      else if(lang == "en") return "en";
      else return "en"
    }
  } else return localStorage.language;
}

export const i18n = new VueI18n({
  locale: getLang(),
  fallbackLocale: getLang(),
  messages: loadLocaleMessages()
});

// export default new VueI18n({
//   locale: process.env.VUE_APP_I18N_LOCALE ||  getLang(),
//   silentTranslationWarn: true,
//   fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || getLang(),
//   messages: loadLocaleMessages()
// })

export default new VueI18n({
  locale: getLang(),
  fallbackLocale: getLang(),
  messages: loadLocaleMessages()
})