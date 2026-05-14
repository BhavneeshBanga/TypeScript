type chaiorder = {
    type: string;
    sugar: number;
    strong: boolean;
};

function makechai(order:chaiorder){
    console.log(order);
}
// data ka signature samee hota hai


function serveChai(order:chaiorder){
    console.log(order);   
}


interface tearecipe{
    water: number;
    milk: number;
}

// type tearecipe= {
//     water: number;
//     milk: number;

// }

// class MasalaChai implements tearecipe {
//     water: 100;
//     milk: 50;
// }

interface cupsize {
    size : "small" | "large" 
}
// interface cupsize = "small" | "large" 

class chai implements cupsize{
size: "small" | "large" = "large";
}


type response = {ok : true} | {ok : false}




// class MyRes implements response{
//     ok : boolean = true;
// }


type teatype = "masala" | "ginger" | "lemon"
function orderchai(t: teatype){
    console.log(t);
}


type basechai = {
    tealeaves: number
}


type extra  = {masala : number}

type masalachai = basechai & extra


const cup : masalachai = {
    tealeaves: 2, 
    masala : 1
};

type user = {
    username : string;
    bio? : string;

}


const u1 : user = {username : "bhavi"}
const u2 : user = {username : "bhavi", bio : "CarityAI"}

type config = {
    readonly appname : string
    version : number

}


const cfg : config = {
    appname: "ClarityAI",
    version : 5
}

// cfg.appname = "BhavAI"
