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
          title:"Title", 
          "optional" : "Optional",
          contact_add:'Add contact',
          contacts_add:'Add contacts',
          contact_detail:'Contact details',
          contacts_empty:'Ups! Looks like you have no contacts...',
          contacts_search_new:"Search for new contacts",   
          user_detail:'User details',   
          group_detail:'Group details',  
          group_add:'Add group',
          group_add_to:"Add to this group",
          participants_cant:"{{cant}} participant[s]",
          participants:"Participants",
          participants_add:"Add participants",  
          participants_add_full:"Looks like all of your contacts belong to this group...",
          current_participants:"Current participant[s]",
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
          you: "You",
          kick:"Kick",
        },
        error: {
          "passwords_must_match" : "Passwords must match",
          "password_weak": 'Must contain {{cant}} characters, one uppercase, one lowercase and one number',
          "username_short": 'Usernames must be between {{min}} and {{max}} characters',
          "username_long": 'Usernames must be between {{min}} and {{max}} characters',
          "email_invalid": 'Please enter a valid email.',
          "required_field": 'This field is obligatory',
          "no_spaces": 'This field cannot have spaces',
          login_failed: 'Username and password do not match',     
          chat_not_found: "Chat not found, you may have been removed from it...",
        },
        success: {
          saved: 'Saved!',
          contact_removed: 'Contact removed!',        
          contact_saved: 'Contact saved!',
          group_saved: 'Group saved!',
          signup:'Account registered, please log in!',
          participant_delete: "User removed from chat!",
          participant_add: "Participant added!",
        },
        confirmation:{
          "accept":'Accept',
          "cancel":'Cancel',
          "contact_delete": 'Are you sure you want to remove {{name}} from your list of contacts?',
          "participant_add" : 'Are you sure you want to add {{name}} to this group?',     
          "conversation_leave": "Are you sure you want to leave this conversation?",
          "chat_delete": 'Are you sure you want to delete this conversation? It will be gone for everyone.',
          "participant_delete" : 'Are you sure you want to kick {{name}} from this group?',
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
          title:"Título",    
          "optional" : "Opcional",
          contact_add:'Agregar contacto',      
          contacts_add:'Agregar contactos',
          contact_detail:'Detalles del contacto',
          contacts_empty:'Ups! Parece que no tienes contactos...',   
          contacts_search_new:"Buscar nuevos contactos",        
          participants_add_full:"Parece que todos tus contactos pertenecen a este grupo...",       
          user_detail:'Detalles del usuario',  
          group_add:'Nuevo grupo',   
          group_detail:'Detalles del grupo', 
          group_add_to:"Añadir a este grupo",
          participants_cant:"{{cant}} participante[s]",
          participants:"Participantes",
          participants_add:"Añadir participantes",  
          current_participants:"Participantes actuales",
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
          you: "Tú",
          kick:"Expulsar",
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
          chat_not_found: "No se ha encontrado el chat, quizas te hayan eliminado...",
        },
        success: {
          saved: 'Guardado!',
          contact_removed: 'Contacto eliminado!',
          contact_saved: 'Contacto guardado!',
          group_saved: 'Grupo guardado!',
          participant_delete: "Participante eliminado!",
          participant_add: "Participante agregado!",
          signup:'Registro exitoso, inicie sesión para continuar!',
        },
        confirmation:{
          "accept":'Aceptar',
          "cancel":'Cancelar',
          "contact_delete": '¿Confirma que desea eliminar a {{name}} de su lista de contactos?',   
          "participant_delete" : '¿Estás seguro que quieres eliminar a {{name}} de este grupo?',
          "participant_add" : '¿Estás seguro que quieres añadir a {{name}} a este grupo?',
          "chat_delete": '¿Confirma que desea eliminar esta conversación? Se borrará para todos sus integrantes.',
          "exit_without_saving": '¿Desea salir sin guardar los cambios?',
          "conversation_leave": "¿Estás seguro que quieres abandonar el chat?",
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

  i18n.on('languageChanged', ()=>{
    moment.locale(i18n.language)
  })


 
export default i18n;
