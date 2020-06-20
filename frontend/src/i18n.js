import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      es: {
        translations: {
          start:'Start',
          login:'Log in',
          logout:'Logout',
          register:'Sign up',
          contacts:'Contacts',
          profile:'Profile',
          settings:'Settings',
          online:'Online',
          username:'Username',
          email:'Email address',
          password:'Password',
          password_repeat:'Repeat password',
          password_remember: 'Remember me',
          password_forgot: 'Forgot password?',
          alias:'Alias',
          "optional" : "Optional"
        },
        error: {
          "passwords_must_match" : "Passwords must match",
          "password_weak": 'Must contain {{cant}} characters, one uppercase, one lowercase and one number',
          "username_short": 'Usernames must be between {{min}} and {{max}} characters',
          "username_long": 'Usernames must be between {{min}} and {{max}} characters',
          "email_invalid": 'Please enter a valid email.',
          "required_field": 'This field is obligatory'
        }
      },
      en: {
        translations: {     
          start:'Comenzar',     
          login:'Iniciar Sesión',
          logout:'Cerrar Sesión',
          register:'Registrarse',
          contacts:'Contactos',
          profile:'Perfil',
          settings:'Ajustes',
          online:'En línea',
          username:'Nombre de usuario',
          email:'Correo electrónico',
          password:'Contraseña',
          password_repeat:'Repetir contraseña',
          password_remember: 'Recordar',
          password_forgot: '¿Olvidó su contraseña?',
          alias:'Alias (nombre visible)',       
          "optional" : "Opcional"         
        },
        error: {
          "passwords_must_match" : "Las contraseñas no coinciden",
          "password_weak": 'Debe contener {{cant}} carácteres, una mayúscula, una minúscula y un número',
          "username_short": 'Debe tener entre {{min}} y {{max}} carácteres',
          "username_long": 'Debe tener entre {{min}} y {{max}} carácteres',
          "email_invalid": 'Ingrese un email válido',
          "required_field": 'Este campo es obligatorio'
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
