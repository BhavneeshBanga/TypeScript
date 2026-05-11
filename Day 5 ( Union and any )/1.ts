// let subs : number | string = 10 ;
let subs : number | string = '1M' ;


let apirequeststatus : 'pending' | 'success' | 'error'  = 'pending'

apirequeststatus = 'success'

apirequeststatus = 'error'



let airlineseat : 'aisle' | 'window' | 'middle'

airlineseat = 'middle'
airlineseat = 'aisle'
airlineseat = 'window'


const orders = ['11', '29', '42']

// let currentorder : string | undefined;
let currentorder : string;
// let currentorder : any;
for(let order of orders){
   if(order==='29') {
        currentorder = order
        break;
   }
   currentorder = '11';
}

// currentorder = 42
console.log(currentorder)



