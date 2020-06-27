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
          name:'Name',
          password:'Password',
          password_repeat:'Repeat password',
          password_remember: 'Remember me',
          password_forgot: 'Forgot password?',
          alias:'Alias',
          "optional" : "Optional",
          contact_add:'Add contact',
          contact_detail:'Contact details',
          "username or email" : 'Username or email',
          save:"Save",
          info:'Info.',
          language:'Language',
          image_adjust:'Adjust image',
          welcome_message:'Welcome, please select chat to start messaging. Have a nice day!',
          watch:'Watch',
        },
        error: {
          "passwords_must_match" : "Passwords must match",
          "password_weak": 'Must contain {{cant}} characters, one uppercase, one lowercase and one number',
          "username_short": 'Usernames must be between {{min}} and {{max}} characters',
          "username_long": 'Usernames must be between {{min}} and {{max}} characters',
          "email_invalid": 'Please enter a valid email.',
          "required_field": 'This field is obligatory',
          "no_spaces": 'This field cannot have spaces',
        },
        success: {
          saved: 'Saved!',
          contact_removed: 'Contact removed!',
        },
        confirmation:{
          "accept":'Accept',
          "cancel":'Cancel',
          "contact_delete": 'Are you sure you want to remove {{name}} from your list of contacts?',
          "exit_without_saving": 'Exit without saving?',
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
          name:'Nombre',
          password:'Contraseña',
          password_repeat:'Repetir contraseña',
          password_remember: 'Recordar',
          password_forgot: '¿Olvidó su contraseña?',
          alias:'Alias (nombre visible)',       
          "optional" : "Opcional",
          contact_add:'Agregar contacto',  
          contact_detail:'Detalles del contacto',    
          "username or email" : 'Nombre de usuario o correo electrónico',
          save:"Guardar",
          info:'Info.',
          language:'Idioma',
          image_adjust:'Ajustar imágen',
          welcome_message:'Bienvenido, selecciona un chat para empezar a hablar. Ten un buen día!',
          watch:'Ver',
        },
        error: {
          "passwords_must_match" : "Las contraseñas no coinciden",
          "password_weak": 'Debe contener {{cant}} carácteres, una mayúscula, una minúscula y un número',
          "username_short": 'Debe tener entre {{min}} y {{max}} carácteres',
          "username_long": 'Debe tener entre {{min}} y {{max}} carácteres',
          "email_invalid": 'Ingrese un email válido',
          "required_field": 'Este campo es obligatorio',
          "no_spaces": 'No puede contener espacios',
        },
        success: {
          saved: 'Guardado!',
          contact_removed: 'Contacto eliminado!',
        },
        confirmation:{
          "accept":'Aceptar',
          "cancel":'Cancelar',
          "contact_delete": '¿Confirma que desea eliminar a {{name}} de su lista de contactos?',
          "exit_without_saving": '¿Desea salir sin guardar los cambios?',
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