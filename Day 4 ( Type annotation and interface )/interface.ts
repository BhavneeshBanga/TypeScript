interface User {
    name: string;
    age: number;
}


let user: User = {
    name: "Bhavi",
    age: 19
};



interface APIUser {
    id: number;
    username: string;
    email: string;
    isVerified: boolean;
}


interface User {
    name: string;
    bio?: string;
}


interface User {
    readonly id: number;
    name: string;
}



type Result =
  | { status: "success"; data: string }
  | { status: "error"; message: string };