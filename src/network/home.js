import { request } from "./request";

//得到首页所有数据
export function getHomeAllData(){
    return request({
        url:'/api/index'
    })
}

export function getHomeGoods(type='sales',page=1){
    return request({
        url:`/api/index?${type}=1&page=${page}`
    })
}