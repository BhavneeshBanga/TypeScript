let nums: number[] = [1, 2, 3];


let names: string[] = ["bhavi", "rahul"];


// 2.Tuples
let user: [string, number] = ["Bhavi", 19];

// 3. Objects
let person: {
    name: string;
    age: number;
} = {
    name: "Bhavi",
    age: 19
};


// 4.enum
enum Direction {
    Up,
    Down,
    Left,
    Right
}


// 5.Union Type
let id: string | number;

// Ab:

id = 101;
id = "A101";




// 6. Literal Types

// Exact fixed value.

let status: "success" | "error";

// Ab sirf:

status = "success";

// ya

status = "error";


// 7. Any ⚠️

// “Type checking band karo.”

let data: any = 10;

data = "hello";
data = true;


// 8. Unknown

// any ka safer version.

let value: unknown;



// 9. Void

// Mostly functions mai.

// Matlab:

// “Kuch return nahi karega.”

function greet(): void {
    console.log("hello");
}


// 10. Null

// Intentional empty value.

// let data: null = null;


// 11. Undefined

// Value assign nahi hui.

let x: undefined = undefined;


// 12. Never 🔥 (Advanced)

// Aisa function jo kabhi end hi nahi hota.

function crash(): never {
    throw new Error("Error");
}

// Ya infinite loop.


// 13. Function Type

// Functions bhi variables ki tarah type hote hain.

let add: (a: number, b: number) => number;

// Very important in React/backend.


// 14. Type Alias

// Custom type banana.

type User = {
    name: string;
    age: number;
};

// Ab reuse:

let p1: User;



// 15. Interface 🔥

// Object structure define karna.

interface Student {
    name: string;
    marks: number;
}

// Large scale apps mai bahut use hota hai.


// 16. Generic Types 🚀

// Reusable types.

function identity<T>(value: T): T {
    return value;
}

// Advanced TypeScript ka heart.



// 17. Set

// Unique values only.

let numms = new Set([1,2,3]);

// Duplicate remove ho jate hain.

// 18. Map

// Key-value storage.

let userr = new Map();