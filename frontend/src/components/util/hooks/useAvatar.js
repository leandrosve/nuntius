import { useEffect } from "react";
import ApiService from "../../../ApiService";
import { useSelector, useDispatch } from "react-redux";
import {  getChatById } from "../../../redux/chats/chatReducer";
import { SET_GROUP_AVATAR } from "../../../redux/chats/groups/groupActionTypes";
import { getUserById } from "../../../redux/user/userReducer";
import { SET_USER_AVATAR } from "../../../redux/user/userActionTypes";

const useAvatar = ({ userId, chatId }) => {
  const chat= useSelector(state => chatId ? getChatById(state.chat, chatId) : null)
  const user= useSelector(state => userId ? getUserById(state.user, userId) : null)
  const currentUser = useSelector(state => state.session.currentUser);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const shouldFetchProfileImage = ()=>{
      return (user && !user.avatar) || (currentUser.id === userId && !currentUser.avatar);
    }
    if(chat){
      if(!chat.avatar)
      ApiService.getGroupImage(chatId).then((response) => {     
        if(response && !chat.avatar )dispatch({type:SET_GROUP_AVATAR, payload:{id:chatId, avatar:response ? response : true}})
      }).catch(()=>{dispatch({type:SET_GROUP_AVATAR, payload:{id:chatId, avatar: "not found"}})})
      
    }
    if (shouldFetchProfileImage()){
        ApiService.getProfileImage(userId).then((response) => {
          if(response && shouldFetchProfileImage() )dispatch({type:SET_USER_AVATAR, payload:{id:userId, avatar:response ? response : true}})
        }).catch(()=>dispatch({type:SET_USER_AVATAR, payload:{id:userId, avatar:"not found"}}))
    }else{
     
    } 
  }, [userId, chatId, chat, dispatch, user, currentUser]);

  if(currentUser.id === userId) return currentUser.avatar; 
  return  chat ? chat.avatar : user ? user.avatar :  null;
};

export default useAvatar;
