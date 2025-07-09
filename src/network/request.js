import axios from "axios";

export function request(config){
    //创建一个实例，基础配置
    const instance = axios.create({
        baseURL: 'https://api.shop.eduwork.cn',  //请求域名
        timeout:5000  //请求时间
    })

    //请求拦截
    instance.interceptors.request.use(config=>{
        //直接放行
        return config;
    },err=>{
        //错误时统一处理
    })

    //响应拦截
    instance.interceptors.response.use(res=>{
        //直接放行
        return res.data ? res.data:res;//有data直接返回，没有就res 
    },err=>{
        //有错误要处理，根据状态码处理，显示错误信息

    })

    return instance(config);
}