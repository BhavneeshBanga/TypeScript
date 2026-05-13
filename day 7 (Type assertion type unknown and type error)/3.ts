const multiply = (a: number) => {
    return (b: string) => {
        return {b:a};
    };
};


// let ans = multiply(5)
// console.log('ans', ans);


console.log(multiply(5)("bhavi"));

