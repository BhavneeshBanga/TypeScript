type chaiorder = {
    type: string;
    sugar: number;
    strong: boolean;
};

function makechai(order: chaiorder){
    console.log(order);
}
let o : chaiorder = {

    type : "bahvi",
    sugar :  1234,
    strong :  true
}
    
// makechai(o)
makechai({
    type: "masala",
    sugar: 2,
    strong: true
})