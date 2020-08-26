import { useState, useEffect } from "react";
import ApiService from "../../ApiService";

const useProfileImage = (userId) => {

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if(!userId) setProfileImage(null)
    else 
        ApiService.getProfileImage(userId).then((response) => {setProfileImage(response)});     
  },[ userId]);

  return profileImage;
};

export default useProfileImage;
