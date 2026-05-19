// Generics Templates hote hai
// reusable code bna dete hai

import Module = require("module");

function wrapinarray<T>(item : T) : T[] {
    return [item]
}



wrapinarray("masala");
// console.log('ans', ans);

// return 
wrapinarray(12);

wrapinarray({flavour : "ginger"})




function pair<A, B>(a : A  , b : B)  : [A, B] {
    // return [b, a] //error
    return [a, b]
}

// pair("masala", "test")
// pair("masala", 23)
pair("masala", {flavour : "ginger"})


// BIG IDEA
// Interface bhi reusable type template ban gaya
interface Box<T> {
    content : T
}

const numberbox : Box<number> = {content : 10}
const numberboxcup : Box<string> = {content : "10"}
// generics ki classes bhi banti ahi

// generics support parital

interface apipromise<T>{
    status : number,
    data : T
}

const res : apipromise<{flavour: string}> = {
    status: 200,
    data : {flavour : "masala"}
}


