import axios from 'axios';

class Utils {
    async makeAPICall(obj) {
        try {
            var { dispatch, url, token, headers, type, successAction, defaultAction, failAction,params,callback,payload,history } = obj;
            if (token) headers = {...token }
            const config = {
                headers:headers
            }
            dispatch({ type: defaultAction })
            let response = type === "GET"? await axios[type.toLowerCase()](url,config) : await axios[type.toLowerCase()](url,params,config)
            dispatch({type:successAction,payload:payload?? response.data})
            if(callback)callback(response.data)
        } catch (error) {
            console.log("🚀 ~ file: index.js ~ line 16 ~ Utils ~ makeAPICall ~ error", error)
            if(error.response?.status === 401 && history) history.push('/login')
          console.log("🚀 ~ file: index.js ~ line 16 ~ Utils ~ makeAPICall ~ error", error)
          dispatch({type:failAction,payload:error.response?.data})
        }
    }
    validateFields(target){
        let error = '';
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if(target.value === '') return error = `${target.name} is required.`
        switch(target.name){
            case 'email':
            if(!emailRegex.test(target.value)) return error = 'Please Enter an Valid Email.'
            return error
            case 'password':
             if(!passwordRegex.test(target.value)) return error = 'Please Enter a valid Password.'
             return error
            default:
                return error       
        }
    }
}
export let utils = new Utils()