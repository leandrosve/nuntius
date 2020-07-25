import React, {useState} from 'react';
import Modal from './util/Modal';

import Contacts from './contacts/Contacts';


function Develop() {
    

    const [showModal, setShowModal] = useState({
        open: false,
        content: "",
      });

     

    
      const handleClose = () => {
        setShowModal({open:false});
      };
  return (
    
    <div>
      <button type="button" onClick={()=>setShowModal({open:true, content:<Contacts/>})}>
        react-transition-group
      </button>
      <Modal
      open={true}
      handleClose={handleClose}
      content={showModal.content}
      hasCloseButton={true} 
      confirmClose={true}
      >
        <Contacts/>  
      </Modal>
      
    </div>
  );
}

export default Develop;
