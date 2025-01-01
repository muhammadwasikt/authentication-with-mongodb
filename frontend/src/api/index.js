import axios from 'axios';
import { store } from '../redux/store';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    },
});

let token;
store.subscribe(()=>{
    const state = store.getState()
    token = state.user.token    
})

apiClient.interceptors.request.use(
    (config) => { 
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



export default apiClient;
