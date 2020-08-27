import * as actionTypes from "./chatActionTypes";

const initialState = {
  messages:[],
  id:null,
  userId:null,
  loading:false,
}

const currentChatReducer = (state = initialState, action)=>{
  switch (action.type) {
    case actionTypes.LEAVE_CHAT_SUCCESS:
      return action.payload.id === state.id ?  initialState : state; 
    case actionTypes.FETCH_CHAT_SUCCESS:
      const chat= action.payload;
      if(state.userId){
        if(!chat.groupal && chat.userIds.find((c)=> c === state.userId) !== null)
          return{...state, messages:[], id: chat.id, userId:null}
      }
      return {...state, id:action.payload.id}
    case actionTypes.SET_CURRENT_CHAT:
      return{
        messages: state.id === action.payload.id ? state.messages : initialState.messages,
        id:action.payload.id,
        userId:action.payload.userId,
        loading:false,
      }
    case actionTypes.FETCH_MESSAGES_SUCCESS:
      const messages=action.payload;
      return {
        id:messages[0]? messages[0].chatId : null ,
         loading:false,
          messages:action.payload
        };
    case actionTypes.FETCH_MESSAGES_FAILURE:
      return initialState;
    case actionTypes.ADD_MESSAGE:
      return state.id === action.payload.chatId ? 
        {...state, messages:[...state.messages, action.payload]}
        : state;
    default:
      return state;
  }
}


export default currentChatReducer;
