import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import { authService } from 'Services/Api/auth/general';
import en from './en';
import id from './id';

const loadResources = async (locale: string) => {
  return await authService
    .getLanguage(locale)
    .then((response) => {
      console.log(' loadResources response: ', response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

const backendOptions = {
  loadPath: '{{lng}}|{{ns}}',
  request: (options: any, url: any, payload: any, callback: any) => {
    try {
      console.log('get data: ', url);
      const [lng] = url.split('|');
      loadResources(lng).then((response) => {
        callback(null, {
          data: response,
          status: 200,
        });
      });
    } catch (e) {
      console.error(e);
      callback(null, {
        status: 500,
      });
    }
  },
};

i18n
  .use(HttpApi)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    backend: backendOptions,
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      ...en,
      ...id,
    },
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      // formatSeparator: ',',
    },
    debug: false,
    load: 'languageOnly',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: '.',
  });

export default i18n;
