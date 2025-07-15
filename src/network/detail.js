import { request } from "./request";

//得到首页所有数据
export function getDetailData(id){
    return request({
        url:`/api/goods/${id}`
    })
}