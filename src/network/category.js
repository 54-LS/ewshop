import { request } from "./request";

//得到首页所有数据
export function getCategoryData(){
    return request({
        url:'/api/goods'
    })
}

export function getCategoryDataGoods(order='sales',cid=0,page=1){
    return request({
        url:`/api/goods?category_id=${cid}&page=${page}&${order}=1`
    })
}