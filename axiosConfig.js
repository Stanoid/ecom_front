import axios from 'axios';

export default axios.create({
     baseURL: 'http://localhost:8000/',

     headers: {
        "X-Requested-with": "XMLHttpRequest",
        
      },
      withCredentials: true,
 });

