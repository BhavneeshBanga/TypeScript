let response : any = "42";


let numericlength : number = (response as string).length

type Book = {
    name: string
}

let Bookstring = '{"name":"who moved my cheese"}';
let bookObject = JSON.parse(Bookstring) as Book

console.log(bookObject)


const inputElement = document.getElementById("username") as HTMLInputElement

let value: any

value = "chai"
value = [1, 2, 3]
value = 2.4
value.toUpperCase()


let newvalue: unknown;

newvalue = "chai";
newvalue = [1, 2, 3];
newvalue = 2.4;
if (typeof newvalue === "string"){
    newvalue.toUpperCase();
}

// try {
    
// } catch (error:any) {
//     console.log(error.message);
    
// }

try {
    
} catch (error) {
    if(error instanceof Error){
        console.log(error.message);
        
    }  
    console.log("Error", error); 
}





const data: unknown = "chai aur code"
const strData : string = data as string


type Role = "admin" | "user" | "superadmin"
function redirectBAsedOnRole(role : Role) : void{
    if(role ===  "admin"){
        console.log('redirecting to admin dashboard');
        return;
        
    }
     if(role ===  "user"){
        console.log('redirecting to user dashboard');
        return;
    }
    role;
}



function newvereturn(): never{
    while(true){
        
    }  
}