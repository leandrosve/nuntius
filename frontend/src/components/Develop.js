import React, { useEffect } from 'react';
import { openLogin } from '../redux/modal/modalActions';
import {connect} from "react-redux";


function Develop({openLogin}) {

  useEffect(()=>{openLogin()},[openLogin]);     
  return (
    
    <div>
      
      
    </div>
  );
}

const mapDispatchToProps = dispatch =>{
  return{
  openLogin: ()=>dispatch(openLogin({success:"success:signup"}))
  }
}



export default connect(null, mapDispatchToProps)(Develop);
