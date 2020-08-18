import * as actionTypes from "./chatActionTypes";

const initialState = {
  messages:[],
  id:null,
  userId:null,
  loading:false,
}

const currentChatReducer = (state = initialState, action)=>{
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHAT:
      return{
        messages:[],
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
    case actionTypes.SEND_MESSAGE_SUCCESS:
      return {...state, id: action.payload.chatId, messages:[...state.messages, action.payload]};
    case actionTypes.ADD_MESSAGE:
      return state.id === action.payload.chatId ? 
        {...state, messages:[...state.messages, action.payload]}
        : state;
    default:
      return state;
  }
}


export default currentChatReducer;
