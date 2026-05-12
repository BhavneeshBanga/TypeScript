// type narrowing
// let foo: unknown = 1234;


function getchai(kind: string | number) {
    if (typeof kind === 'string') {
        return `making ${kind} chai...`
    }
    return `chai order : ${kind}`
}

function servechai(msg?: string) {
    if (msg) {
        return `serving ${msg}`
    }
    return `serving default masala chai`;
}


function orderchai(size: "small" | "medium" | "large" | number) {
    if (size == "small") {
        return `small cutting chai...`
    }
    if (size === "medium" || size === "large") {
        return `make extra chai`;
    }
    return `chai order ${size}`
}


class KulhadChai {
    serve() {
        return `serving kulhad chai`
    }
}

class Cutting {
    serve() {
        return `serving cutting chai`
    }
}


function serve(chai: KulhadChai | Cutting) {
    if (chai instanceof KulhadChai) {
        return chai.serve
    }

}


type chaiorder = {
    type: string
    sugar: number
}

function ischaiorder(obj: any): obj is chaiorder {
    return {
        typeof obj === "object" &&
            obj !== null &&
            typeof obj.type === "string" &&
            typeof obj.sugar === "number"
    }
}

function serveOrder(item: chaiorder | string) {
    if (ischaiorder(item)) {
        return `serving ${item.type} chai with ${item.sugar}`
    }
    return `serving custom chai : ${item}`
}


type MasalaChai = { type: "masala "; spiceleve: number };
type gingerchai = { type: "ginger "; amount: number };
type elaichichai = { type: "elaichi "; aroma: number };

type chai = MasalaChai | gingerchai | elaichichai


function makechai(order : chai){
    switch ( order.type){
        case "masala ":
            return `masala chai`
            break
        case "elaichi ":
            return 'elaichi chai'
            break
        case "ginger ":
            return `ginger chai`
            break
    }
}


function brew(order: MasalaChai | gingerchai ){
    if("spicelevel" in order){

    }
}


function isstringarray(arr : unknown) : arr is string[]{
    
}