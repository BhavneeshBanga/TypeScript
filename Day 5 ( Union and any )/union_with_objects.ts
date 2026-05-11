// type Admin = {
//     name: string;
//     role: string;
// };



// type User = {
//     name: string;
//     email: string;
// };

// let person: Admin | User;

// person.name = "Bhavi";



function login(identifier: string | number) {
    console.log(identifier);
}


type ApiResponse =
    | "success"
    | "error"
    | "loading";


type PaymentStatus =
| "pending"
| "completed"
| "failed";




type Dog = {
    bark: () => void;
};

type Cat = {
    meow: () => void;
};

function sound(animal: Dog | Cat) {

}