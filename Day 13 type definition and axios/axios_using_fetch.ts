// npm i some-library
// npm i -D @types/some-library
//.d.ts

import axios from "axios";
import type { AxiosResponse } from "axios";

interface Todo {
    userid : number;
    id : number;
    title : string; 
    completed : boolean;
}
const fetchdata = async () => {
    try {
        const respoonse = await fetch('https://jsonplaceholder.typicode.com/todos/1')

        if(!respoonse.ok){
            throw new Error(`Http error ${respoonse.status}`)
        }
        const data : Todo = await respoonse.json();

        



    } catch (error : any){

    }

}
        
        
    
 

