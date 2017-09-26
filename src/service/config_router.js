import axios from 'axios'
import { setStore,getStore } from '@/config/storage'

export const Login = (prop) => {
     
    
    // return new Promise((resolve,reject) => {
    //     resolve([200])
    // })
    // console.log(prop)
    return  axios({
                    method:'POST',
                    url:'/user-center/login',
                    params:prop
            }).then((res) => {
                if(res.data.state == 'SUCCESS'){
                    setStore('username',prop)
                    return true
                }else{
                    return false
                }
                 
                // return true
                // if(res.data != '权限不够'){
                //     setStore('username',prop)
                //     return true
                // }else{
                //     return false
                // }
            }).catch((res) => {
                console.log(res)
            })
}
export const getAdd = () => {
    return axios({
        method:'post',
        url:'/test2'
    }).then(res => {
        console.log(res)
    })
}