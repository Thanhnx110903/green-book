import { decode, encode } from 'js-base64';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
export const cookies = () => {
    const cookies = parseCookies()
    const Get = (name) => {
        if (cookies[name]) {
            return decode(cookies[name])
        }
        return null
    }
    const Set = (name, values, experied) => {
        setCookie(null, name , encode(values), { 
            maxAge: experied,
            path: '/', 
            secure: true ,
        })
    }
    const Delete = (name) => {
        destroyCookie(null, name, {
            maxAge: 0, 
            path: '/' , 
            secure: true,
        })
    }
    return {
        Get,
        Set,
        Delete
    }
}