import React, { useState, useEffect, useCallback } from "react";
import Alert from "./Alert";
import { useSelector, useDispatch } from "react-redux";
import { getRequestSuccessMessage } from "../../redux/notification/successReducer";
import { getRequestError } from "../../redux/notification/errorReducer";
import { clearNotifications as clearNotificationsAction} from "../../redux/notification/notificationActions";
import { isRequestLoading } from "../../redux/notification/loadingReducer";
import { useTranslation } from "react-i18next";

const SmartAlert = ({concerns=[], children, ...props}) =>{
    const { t } = useTranslation();
    const success = useSelector((state)=> getRequestSuccessMessage(state.success, concerns));
    const error = useSelector((state)=> getRequestError(state.error, concerns));
    const loading = useSelector((state) => isRequestLoading(state.loading, concerns));
    const dispatch = useDispatch();
    const clearNotifications = useCallback(()=>{dispatch(clearNotificationsAction(concerns))},[concerns, dispatch]);
    const [displayNotification, setDisplayNotification] = useState({text:null, type:"info"});

    useEffect(()=>{     
        if(!!success || !!error){
            setDisplayNotification({text: success ? success : error, type:success? "success" : error})          
            clearNotifications();
        }
    },[success, error, clearNotifications])

    
    return(
        <Alert
            {...props}
            open={!loading && !!displayNotification.text}
            severity={displayNotification.type}
            onClick={() => setDisplayNotification({text:null})}       
        >
            {displayNotification.type === "success" ? t(displayNotification.text) : displayNotification.text }
            {children}
      </Alert>
    )
}

export default SmartAlert;