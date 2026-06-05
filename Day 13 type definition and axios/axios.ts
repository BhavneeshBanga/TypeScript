// npm i some-library
// npm i -D @types/some-library
//.d.ts


import axios, { AxiosResponse } from "axios"
import type { BlobOptions } from "buffer";
import { CLIENT_RENEG_LIMIT } from "tls";


interface Todo {
    userid : number;
    id : number;
    title : string; 
    completed : boolean;
}


// axios.get('https:example.com/data')
// .then(response => {
//     console.log(response.data);
// })
  

const fetchdata = async () => {

    try {
        const respoonse : AxiosResponse<Todo> = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
        console.log("Todo", respoonse.data);
        
    } catch (error : any){
        // console.log('error', error.message);
        if(axios.isAxiosError(error)){
            console.log('error', error.message);
            if(error.response) {
                console.log('error', error.response);
            }
        }
    }
}