import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import moment from "moment";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
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
          user_detail:'User details',   
          group_detail:'Group details',    
          "search_username" : 'Search by username',
          save:"Save",
          bio:'Bio.',
          language:'Language',
          image_adjust:'Adjust image',
          welcome_message:'Welcome {{name}}, please select chat to start messaging. Have a nice day!',
          watch:'Watch',
          no_messages: "No messages yet...",
          group_untitled:"untitled group",  
          conversation_leave: "Leave conversation",
          chat_delete: "Delete chat",
          start_chatting: "Start chatting",
          undo:"Undo",
        },
        error: {
          "passwords_must_match" : "Passwords must match",
          "password_weak": 'Must contain {{cant}} characters, one uppercase, one lowercase and one number',
          "username_short": 'Usernames must be between {{min}} and {{max}} characters',
          "username_long": 'Usernames must be between {{min}} and {{max}} characters',
          "email_invalid": 'Please enter a valid email.',
          "required_field": 'This field is obligatory',
          "no_spaces": 'This field cannot have spaces',
          login_failed: 'Username and password do not match'
        },
        success: {
          saved: 'Saved!',
          contact_removed: 'Contact removed!',        
          contact_saved: 'Contact saved!',
          signup:'Account registered, please log in!',
        },
        confirmation:{
          "accept":'Accept',
          "cancel":'Cancel',
          "contact_delete": 'Are you sure you want to remove {{name}} from your list of contacts?',     
          "chat_delete": 'Are you sure you want to delete this conversation? It will be gone for everyone.',
          "exit_without_saving": 'Exit without saving?',
        },
        date:{
          today:"Today",
          yesterday:"Yesterday"
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
          user_detail:'Detalles del usuario',    
          group_detail:'Detalles del grupo',   
          "search_username" : 'Buscar por nombre de usuario',
          save:"Guardar",
          bio:'Bio.',
          language:'Idioma',
          image_adjust:'Ajustar imágen',
          welcome_message:'Bienvenido {{name}}, selecciona un chat para empezar a hablar. Ten un buen día!',
          watch:'Ver',     
          no_messages: "Aún no hay mensajes...",         
          group_untitled:"grupo sin nombre",
          conversation_leave: "Abandonar conversación",
          chat_delete: "Eliminar conversación",
          start_chatting: "Empezar a conversar",
          undo:"Deshacer",
        },
        error: {
          "passwords_must_match" : "Las contraseñas no coinciden",
          "password_weak": 'Debe contener {{cant}} carácteres, una mayúscula, una minúscula y un número',
          "username_short": 'Debe tener entre {{min}} y {{max}} carácteres',
          "username_long": 'Debe tener entre {{min}} y {{max}} carácteres',
          "email_invalid": 'Ingrese un email válido',
          "required_field": 'Este campo es obligatorio',
          "no_spaces": 'No puede contener espacios',
          login_failed: 'El nombre de usuario y contraseña no coinciden',
        },
        success: {
          saved: 'Guardado!',
          contact_removed: 'Contacto eliminado!',
          contact_saved: 'Contacto guardado!',
          signup:'Registro exitoso, inicie sesión para continuar!',
        },
        confirmation:{
          "accept":'Aceptar',
          "cancel":'Cancelar',
          "contact_delete": '¿Confirma que desea eliminar a {{name}} de su lista de contactos?',   
          "chat_delete": '¿Confirma que desea eliminar esta conversación? Se borrará para todos sus integrantes.',
          "exit_without_saving": '¿Desea salir sin guardar los cambios?',
        },
        date:{
          today:"Hoy",
          yesterday:"Ayer"
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
  }).then(()=>{ 
    
    moment.locale(i18n.language);
  });

 
export default i18n;
