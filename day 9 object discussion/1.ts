// objects
const chai = {
    name : "masala chai",
    price : 20, 
    isHot : true
}

// typescript behind the scene hamesha infeer karega
// {
//     name : string;
//     price : string;
//     isHot : boolean;
// }


//PART 2 — Explicit Object Typing
let tea: {
    name : string;
    price : number;
    isHot : boolean;
}

tea = {
    name :" ginger tea",
    price : 23,
    isHot : true
}

//PART 3 — Type Alias (type)
type Tea = {
    name : string;
    price : number;
    ingredients : string[];
}

const adrakchai : Tea = {
    name : "adrakchai",
    price : 34,
    ingredients : ['ginger', 'tea leaves']
}


//PART 4 — Structural Typing (MOST IMPORTANT)
type cup = {size : string};
let smallcup : cup = {
    size : "200ml"
}
let bigcup = {
    size: "500ml",
    material: "steel"
}

smallcup = bigcup



type brew = {brewtime : number}
const coffee = {brewtime : 5, beans : "arabica"}
const chaibrew : brew = coffee


type user = {
    username : string,
    password : string
}

const u : user = {
    username : "BhaviBanga",
    password : "1234"
}


type item = {name : string, quantity : number}
type Address = {street : string, pin : number}

type order = {
    id : string;
    items : item[];
    address : Address
}


// type chai = {
//     name : string;
//     price : number;
//     isHot : boolean
// }
// const updatedchai = (updates: Partial<chai>) => {
//     console.log('updateing chai with ', updates);
// }
// updatedchai({price: 25})   
// updatedchai({isHot: false})   
// updatedchai({})   


type chaiorder = {
    name? : string;
    quantity?:number;

}

const placeorder = (order : Required<chaiorder>) =>{
    console.log(order);
    
}

placeorder({
    name : "masala chai",
    quantity : 2
})

type chai = {
    name : string;
    price : number;
    isHot : boolean;
    ingridients: string[]
}


type basicchaiinfo = Pick<chai, "name" | "price">;

const chaiInfo : basicchaiinfo = {
    name : "lemon tea",
    price : 30
}


type Chainew = {
    name : string;
    price : number;
    isHot : boolean;
    secretIngredients: string;

};

type PublicChai = Omit<chai, "secretIngredients">;