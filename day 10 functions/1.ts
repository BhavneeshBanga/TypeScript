// functions

function makechai(type : string, cups : number) {
    console.log(`making ${cups } cups of ${type}`);
    
} 

makechai("masala", 34)


function getchaiprice(): number{
    return 34;
    // return "25 rupees";
}

console.log('the price of the chai is', getchaiprice());


function makeOrder(order : string) {
    if(!order) {
        return null;
    } else{
        return order;
    }
}


function logChai(): void {
    console.log('chai is ready');
}


// aise function ko end mai likha jaatw hai
// function orderChai(type? : string) {

// }
function orderChai(type : string = "Masala") {

}



function createChai(order: {
    type : string;
    sugar: number;
    size: "small" | "large" 
}) : number{
    return 5; 
}