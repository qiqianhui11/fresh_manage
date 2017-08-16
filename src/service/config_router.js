import axios from 'axios'
import { setStore,getStore } from '@/config/storage'

export const Login = (prop) => {
    return  axios({
                    methods:'get',
                    url:'/login',
                    params:prop
            }).then((res) => {
                if(res.data != '权限不够'){
                    setStore('username',prop)
                    return true
                }else{
                    return false
                }
            }).catch(() => {

            })
}