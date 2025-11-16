import axios from "axios";
import { API_URL } from '@env';

export class ExecuteHttpRequest{

    static #baseUrl = API_URL;

    static async callout({url = "", method = "GET", body = null, param = {}, headers = {}}) {
        try {

            const requestUrl = this.#baseUrl + url;
            console.log(requestUrl);
            
            const functionType = this.requestType[method.toUpperCase()];


            if(["GET", "DELETE"].includes(method.toUpperCase())){
                return await functionType(requestUrl, {
                    params : param,
                    headers : headers,
                    timeout: 10000,
                    responseType: 'json'
                });
            }

            else{
                return await functionType(requestUrl, body, {
                    params : param,
                    headers : headers,
                    timeout : 10000,
                    responseType : 'json'
                });
            }



        } 
        catch (error) {
            const status = error.response?.status;
            const data = error.response?.data;

            console.log("Erro na requisição:", status, data);

            return error.response;
        }

    }

    static requestType = {    
        "GET" : axios.get,
        "POST" : axios.post,
        "PATCH" : axios.patch,
        "PUT" : axios.put,
        "DELETE" : axios.delete
    
    }


}
