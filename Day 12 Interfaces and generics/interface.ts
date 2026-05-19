// Interface and Generics

import process = require("process")


// main goal hai data ko shape dena
interface chai{
    flavour : string 
    price : number
    milk?: boolean
}
// object ka structure define karte hai 
// js generate nahi karte hai

const masala : chai = {
    flavour  : "masala",
    price : 40
}

interface shop {
    name : string
    readonly id : number
}

const s : shop = {
    id  : 1,
    name : "chaicode cafe"
}

// allow nahi kar sakteee
// s.id = 2

// INTERFACE SIRF OBJECTS KE LIYE NAHI HOTA

// Function ka structure bhi define kar sakta hai.
interface Discountcalculator {
    (price: number ) : number
}

const apply50 : Discountcalculator = (p) => p*0.5


interface Teamachine {
    // start(price : number) : void 
    start() : void ;
    stop(): void 
}


const machine : Teamachine = {
    start(){
        console.log('start');
        
    },
    stop() {
        console.log('stop');
        
    },
}

// index signature
interface chairating {
    [flavour : string] : number
}

const ratings : chairating = {
    // masala : "4.5",
    masala : 4.5,
    ginger : 4.5,

}

interface User {
    name : string
}

interface User {
    age : number
}

// const u : User  = {
//     name : "Bhavneesh"
// }



// interfaces merge ho jaate hai
const u : User  = {
    name : "Bhavneesh",
    age : 20
}


interface A {a : string}
interface B {b : string}

interface C extends A, B {}


