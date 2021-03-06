import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  //timeout: config.apiServer.timeout
});

instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("jwtToken"));
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    const lang = localStorage.getItem("i18nextLng");
    if (lang) {
      config.headers.common["Accept-Language"] = lang;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    let error;
    if (err.response) {
      error = err.response.data.message;
    } else{
      error = err.message;
    } 
    throw new Error(error);
  }
);

const ApiService = {
  get(url) {
    return instance
      .get(url)
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },

  post(url, data) {
    return instance
      .post(url, data)
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },

  put(url, data) {
    return instance
      .put(url, data)
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },

  patch(url, data) {
    return instance
      .patch(url, data)
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },

  delete(url, data) {
    return instance
      .delete(url, data)
      .then((res) => res)
      .catch((reason) => Promise.reject(reason));
  },

  getProfileImage(userId) {
    return this.getImage(`/users/${userId}/avatar`);       
  },

  getGroupImage(chatId) {
    return this.getImage(`/group/${chatId}/avatar`);       
  },

  getImage(url){
    return instance
      .get(url, { responseType: 'arraybuffer' })
      .then(response => {
        let blob = new Blob([response.data], 
        { type: response.headers['content-type'] }
      );
      let image = URL.createObjectURL(blob)
      return image}   
      )
      .catch(() => "not found"); 
  },

  putProfileImage(avatar) {
    return instance
      .put(`/profile/avatar`, avatar, { responseType: 'arraybuffer' } )
      .then(response => {
        let blob = new Blob([response.data], 
        { type: response.headers['content-type'] });
        let image = URL.createObjectURL(blob)
        return image}) 
      .catch((reason) => console.log(reason));   
  },

  
  putGroupImage(chatId, avatar) {
    return instance
      .put(`/group/${chatId}/avatar`, avatar )
      .then(res => res)
      .catch((reason) => console.log(reason));   
  },

};

export default ApiService;
