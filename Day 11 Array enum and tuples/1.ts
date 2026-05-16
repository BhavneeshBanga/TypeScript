// Array enum and tuples

// array 
const chaiflavours : string[] = ["masala", "adrak", "faltu"]

const chaiPrice : number[] = [10, 20]

const rating : Array<number> = [4.5, 2.5, 5.0]

type Chai = {
    name : string;
    price : number;

}


const menu : Chai[] = [
    {name : "masala", price : 34},
    {name : "ginger", price : 45}
]


// read only Array
const cities: readonly string[] = ['delhi', 'jaipur']
// cities.push("pune")


// multidimensional arrays

const table : number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]



// tuples

let chaiTuple : [string, number];
chaiTuple = ['masala', 20]
// chaiTuple = [20, 'masala']

let userInfo : [string, number, boolean]
userInfo = [
    "bhavai", 100, true
]


// readonly tuples
const locations : readonly [number, number] = [23.45, 56.78]

const chaiitemss : [name : string , price : number] = ['masala', 23]



// enums
enum cupsize {
    SMALL,
    MEDIUM,
    LARGE
}

const size = cupsize.LARGE

enum stuatus {
    PENDING = 100,
    SERVED,        //101
    CANCELLED      //102
}


enum chaiType  {
    MASALA = 'masala',
    GINGER = 'ginger',

}


function makechai(type : chaiType) {
    console.log('making', type);
    
}


makechai(chaiType.GINGER)
// makechai("masala")



enum RandomEnum {
    ID = 1,
    NAME = "chai"
}


// ya toh pura enum numbers ka ho ya pura strings ka ho
const enum sugar {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3
}

const s = sugar.MEDIUM


let t : [string, number] = ['chai', 10]
t.push('extra')