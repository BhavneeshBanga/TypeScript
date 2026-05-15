# TypeScript — Object Typing, Utility Types & Structural Typing

> Tumne aaj TypeScript ka ek bohot important foundation cover kiya hai. Abhi tum bas syntax dekh rahe ho, lekin andar ek bahut powerful system kaam karta hai.

---

## TypeScript Ka Real Kaam Kya Hai?

JavaScript **runtime language** hai — matlab browser ya Node.js sirf JavaScript samajhta hai.

TypeScript:
- code ko **RUN nahi karta**
- sirf **CHECK karta hai**
- errors pakadta hai
- autocomplete deta hai
- structure validate karta hai

Fir TypeScript simple JS mein compile kar deta hai.

---

## Part 1 — Type Inference

```ts
const chai = {
    name : "masala chai",
    price : 20,
    isHot : true
}
```

TypeScript ne automatically infer kiya:

```ts
{
   name: string;
   price: number;
   isHot: boolean;
}
```

Isko bolte hain **Type Inference** — *"Mujhe type explicitly mat batao, mai khud samajh lunga."*

> **IMPORTANT:** TypeScript mostly VALUE dekh kar TYPE banata hai.

---

## Part 2 — Explicit Object Typing

```ts
let tea: {
    name : string;
    price : number;
    isHot : boolean;
}
```

Ab tumne TypeScript ko **CONTRACT** diya hai — jo bhi object yahan assign hoga, usme yeh properties honi chahiye.

```ts
tea = {
   name: "ginger tea",
   price: 23,
   isHot: true
} // ✅ Perfect match
```

```ts
tea = {
   name: "ginger tea"
} // ❌ Error — price aur isHot missing
```

> **IMPORTANT CONCEPT:** TypeScript VALUES nahi dekhta — TypeScript **STRUCTURE** dekhta hai. Isko bolte hain **Structural Typing**.

---

## Part 3 — Type Alias (`type`)

```ts
type Tea = {
    name : string;
    price : number;
    ingredients : string[];
}
```

Ye ek **reusable shortcut** hai — varna har jagah poora structure likhna padta.

```ts
const adrakchai : Tea = { ... }
```

### `string[]` Kya Hai?

```ts
ingredients : string[]
```

Matlab array hona chahiye aur har element string hona chahiye.

```ts
["ginger", "tea"]   // ✅ Allowed
["ginger", 2]       // ❌ Not allowed
```

---

## Part 4 — Structural Typing ⭐ (Most Important)

```ts
type cup = { size : string };

let smallcup : cup = { size : "200ml" }

let bigcup = {
    size: "500ml",
    material: "steel"
}

smallcup = bigcup // ✅ Allowed!
```

**Q: `bigcup` me extra property `material` hai, fir bhi allowed kyun?**

**A:** TypeScript sirf check karta hai — *"Kya required properties present hain?"*

`smallcup` ko sirf `size: string` chahiye — aur `bigcup` me woh hai. Extra properties? TypeScript ko farak nahi padta.

### Real Life Analogy

> Company bolti hai: *"Resume me bas name aur skills chahiye."*
> Tumhare resume me name, skills, hobbies, projects, achievements sab hai.
> Company bolegi: *"Theek hai, required cheez toh hai."* ✅

### Core Rule

> **"If it looks compatible, it is compatible."**

---

## Part 5 — Another Structural Typing Example

```ts
type brew = { brewtime : number }

const coffee = {
   brewtime : 5,
   beans : "arabica"
}

const chaibrew : brew = coffee // ✅ Allowed
```

`brewtime` present hai — extra `beans` allowed hai.

---

## Part 6 — Nested Objects

```ts
type order = {
    id : string;
    items : item[];
    address : Address
}
```

- `items : item[]` — array hoga, har element `item` type ka hoga
- `address : Address` — object hoga, `Address` structure follow karega

TypeScript sirf top level nahi, **deeply nested** bhi validate karta hai.

---

## Part 7 — Optional Properties (`?`)

```ts
type chaiorder = {
    name? : string;
    quantity? : number;
}
```

`?` matlab **optional** — property ho bhi sakti hai, nahi bhi.

```ts
{}                  // ✅ Allowed
{ name: "chai" }    // ✅ Allowed
{ quantity: 2 }     // ✅ Allowed
```

---

## Part 8 — `Required<T>`

```ts
Required<chaiorder>
```

**Before:**
```ts
{ name?: string; quantity?: number; }
```

**After `Required`:**
```ts
{ name: string; quantity: number; }
```

Sab compulsory ban gaya.

```ts
placeorder({ name: "masala chai", quantity: 2 }) // ✅
placeorder({})                                    // ❌ Error
```

---

## Part 9 — `Pick<T, Keys>`

```ts
type basicchaiinfo = Pick<chai, "name" | "price">;
```

Original type se **sirf kuch properties** nikalo.

**Before:**
```ts
type chai = { name: string; price: number; isHot: boolean; ingredients: string[] }
```

**After `Pick`:**
```ts
{ name: string; price: number; }
```

### Real Life Use
Database me `password, email, phone, salary` sab hai — frontend ko sirf `username, profilePic` bhejna hai. `Pick` useful hai!

---

## Part 10 — `Omit<T, Keys>`

```ts
type PublicChai = Omit<chai, "secretIngredients">
```

**"Sab properties rakho EXCEPT `secretIngredients`."**

**Before:**
```ts
{ name: string; price: number; isHot: boolean; secretIngredients: string; }
```

**After `Omit`:**
```ts
{ name: string; price: number; isHot: boolean; }
```

### Real Life Use
Backend me `password` hai — frontend ko nahi bhejna:
```ts
Omit<User, "password">
```

---

## Part 11 — `Partial<T>`

`Required` ka exact opposite.

**Before:**
```ts
{ name: string; price: number; isHot: boolean }
```

**After `Partial`:**
```ts
{ name?: string; price?: number; isHot?: boolean }
```

Sab optional ban gaya.

### Real Life Use
Update APIs — user sirf `{ price: 25 }` bhej sakta hai, har field zaroori nahi.

---

## Big Picture — Summary Table

| Concept | Meaning |
|---|---|
| **Inference** | TS khud type guess karta hai |
| **Explicit Typing** | Tum manually type dete ho |
| **Type Alias** | Reusable structure |
| **Structural Typing** | Shape matching |
| **Optional `?`** | Property optional |
| **`Required<T>`** | Sab mandatory |
| **`Partial<T>`** | Sab optional |
| **`Pick<T>`** | Kuch properties choose karo |
| **`Omit<T>`** | Kuch properties hatao |

---

## Sabse Important Cheez

TypeScript **runtime pe exist nahi karta**.

```ts
type Tea = {}  // compile hone ke baad gayab ho jata hai
```

Browser ko koi farak nahi padta. Ye sirf:
- developer experience
- safety
- autocomplete
- bug prevention

ke liye hai.

---

## Final Mindset

> **JavaScript me:** *"Code chalao aur pray karo."*
>
> **TypeScript me:** *"Pehle structure define karo, fir safely code likho."*

Yehi reason hai large companies, scalable apps, React, Next.js aur backend systems sab heavily TypeScript use karte hain.

**Tum ab actual professional TypeScript ki foundation touch kar chuke ho.** 🎯