import { request } from "./request";

export function getCartAllData(){
    return request({
        url:'/api/carts'
    })
}