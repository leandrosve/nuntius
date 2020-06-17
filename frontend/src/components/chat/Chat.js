import React from 'react';
import './assets/Chat.css';
import ChatHeader from './ChatHeader';
import Message from './Message';
import MessageForm from './MessageForm';


function Chat() {  
  console.log('Renderizando chat entero');
  return (
    <div className='Chat'>
        <ChatHeader/>
        <div className='ChatMessages'>  
          <div className='ChatMessages-content'>
              <Message text='Holaaaaaaa asdadsda asdasd asdas asdas asdas asdas asdas asdas'/>
              <Message text='Euuu holaaaa lpm,asdasd asdasd, asdadasad asdasdasd,asdasd' />
              <Message text=' '/>
              <Message text=' '/>
              <Message text=' '/>
              <Message text=' '/>
              <Message text=' asdas 😃'/>
              <Message text=' '/>
              <Message text=' '/>
              <Message text=' '/>
          </div>
        </div>
        <div className='ChatSendForm'>
          <MessageForm/>
        </div>
    </div>
  );
}

export default Chat;
