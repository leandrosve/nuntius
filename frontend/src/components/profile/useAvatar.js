import { useState, useEffect } from "react";
import ApiService from "../../ApiService";
import { useSelector, useDispatch } from "react-redux";
import {  getChatById } from "../../redux/chats/chatReducer";
import { SET_GROUP_AVATAR } from "../../redux/groups/groupActions";
import { getUserById } from "../../redux/user/userReducer";
import { SET_USER_AVATAR } from "../../redux/user/userActionTypes";

const useAvatar = ({ userId, chatId }) => {
  const [avatar, setAvatar] = useState(null);
  const chat= useSelector(state => chatId ? getChatById(state.chat, chatId) : null)
  const user= useSelector(state => userId ? getUserById(state.user, userId) : null)
  const currentUser = useSelector(state => state.session.currentUser);
  const dispatch = useDispatch();

  const isCurrentUser = ()=>{
    return currentUser.id == userId;
  }

  const shouldFetchProfileImage = ()=>{
    return (user && !user.avatar) || (isCurrentUser() && !currentUser.avatar);
  }

  useEffect(() => {
    if(chat){
      if(!chat.avatar)
      ApiService.getGroupImage(chatId).then((response) => {     
        if(response && !chat.avatar )dispatch({type:SET_GROUP_AVATAR, payload:{id:chatId, avatar:response}})
      })
      
    }
    if (shouldFetchProfileImage()){
        ApiService.getProfileImage(userId).then((response) => {
          if(response && shouldFetchProfileImage() )dispatch({type:SET_USER_AVATAR, payload:{id:userId, avatar:response}})
        });  
    }else{
     
    } 
  }, [userId, chatId, chat, dispatch, user]);

  if(isCurrentUser()) return currentUser.avatar; 
  return  chat ? chat.avatar : user ? user.avatar :  null;
};

export default useAvatar;
