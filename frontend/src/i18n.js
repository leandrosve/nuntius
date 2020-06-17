import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          start:'Start',
          login:'Login',
          logout:'Logout',
          register:'Register',
          contacts:'Contacts',
          profile:'Profile',
          settings:'Settings',
          online:'Online'
        }
      },
      es: {
        translations: {     
          start:'Comenzar',     
          login:'Iniciar Sesión',
          logout:'Cerrar Sesión',
          register:'Registrarse',
          contacts:'Contactos',
          profile:'Perfil',
          settings:'Ajustes',
          online:'En línea'
        }
      }
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
