import axios from 'axios'
import qs from 'qs'
//import store from '@/store/index.js'
//import * as def from '@/store/def.js'
import * as UC from '@/js/urlConfig.js'

axios.defaults.baseURL= UC.BASEURL+UC.BASEPORT;
//axios.defaults.baseURL= "/api";

//axios.defaults.responseType= "json";


// 设置默认的请求超时时间
axios.defaults.timeout = 20000
// 支持跨域cookies
axios.defaults.withCredentials = true;
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // console.log(config.data)
    // config.data=config.data+"v=kkkkk"
    //config.data=JSON.stringify(config.data)
    // config.headers={
    //     "content-Type":'application/x-www-form-urlencoded; charset=UTF-8'
    // }
    //localStorage.token
    //config.headers.Authorization = `token 6cc502869d0c67a431fe4d532a0fac48955759bb`
    // config.headers.post={
    //     "content-Type":'application/json; '
    // }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
    return response
}, error => {
    return Promise.reject(error.response)
})

export {
    axios
}


export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err)        
        })    
    });
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
         axios.post(url, qs.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err)
        })
    });
}

export function postJson(url, params) {
    return new Promise((resolve, reject) => {
         axios.post(url,params)
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err)
        })
    });
}