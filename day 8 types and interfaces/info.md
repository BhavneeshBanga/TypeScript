# TypeScript — Interfaces, Union, Intersection & Literal Types

> Ab tum TypeScript ke aur bhi deep concepts touch kar rahe ho — yehi real TypeScript ka core hai jo React, Next.js, backend APIs, aur large projects me heavily use hota hai.

---

## Part 1 — Function Parameter Typing

```ts
type chaiorder = {
    type: string;
    sugar: number;
    strong: boolean;
};

function makechai(order: chaiorder) {
    console.log(order);
}
```

TypeScript keh raha hai: *"makechai function sirf wahi object accept karega jo `chaiorder` structure follow kare."*

```ts
makechai({ type: "masala", sugar: 2, strong: true }) // ✅ Allowed

makechai({ type: "masala" }) // ❌ Error — sugar aur strong missing
```

> **Key Idea:** Function parameter typing ka matlab hai — *"Input ka shape define karna."*

---

## Part 2 — Same Type, Multiple Functions

```ts
function makechai(order: chaiorder) { ... }
function serveChai(order: chaiorder) { ... }
```

Dono functions same structure use kar rahe hain.

### Real Life Analogy

> Restaurant me kitchen, billing, delivery — sabko same order format chahiye. Isliye ek shared structure banaya: `type chaiorder`. Exactly isi liye types banaye jaate hain.

---

## Part 3 — Interface

```ts
interface tearecipe {
    water: number;
    milk: number;
}
```

### `type` vs `interface` — Kya Fark Hai?

90% cases me dono similar kaam karte hain:

```ts
// Dono valid hain:
type TeaRecipe = { water: number }
interface TeaRecipe { water: number }
```

**Fark:**
- `interface` specially **objects/classes** ke liye design hua tha
- `interface` extend aur implement karne me zyada powerful hota hai

---

## Part 4 — `implements`

```ts
interface cupsize {
    size: "small" | "large";
}

class chai implements cupsize {
    size: "small" | "large" = "large";
}
```

### `implements` Kya Hota Hai?

*"Ye class promise karti hai ki interface ka structure follow karegi."*

```ts
class chai implements cupsize {
    color = "red"; // ❌ Error — interface ka required `size` missing hai
}
```

### Real Life Analogy

| | |
|---|---|
| **Interface** | Contract |
| **Class** | Employee |

> Contract kehta hai `size` required hai — employee ko woh follow karna hi padega.

---

## Part 5 — String Literal Types

```ts
// Normal string — kuch bhi allowed
size: string  // "hello", "abc", "large" — sab valid

// Literal Union — sirf specific values
size: "small" | "large"  // bas yahi do
```

TypeScript ka brain ise **enum-like restriction** ki tarah treat karta hai.

### Real Life Uses

```ts
theme: "dark" | "light"
status: "loading" | "success" | "error"
button: "primary" | "secondary"
```

---

## Part 6 — Union Types (`|`)

```ts
type response = { ok: true } | { ok: false }
```

**OR condition** — response do shapes me se koi ek ho sakta hai.

```ts
{ ok: true }   // ✅
{ ok: false }  // ✅
```

TypeScript smart **narrowing** karta hai:

```ts
if (response.ok) {
    // success case — TypeScript jaanta hai
} else {
    // failure case — TypeScript jaanta hai
}
```

---

## Part 7 — Literal Function Arguments

```ts
type teatype = "masala" | "ginger" | "lemon"

function orderchai(t: teatype) { ... }
```

```ts
orderchai("masala")    // ✅ Allowed
orderchai("coldrink")  // ❌ Error
```

**Real Benefit:** Typos avoid hote hain. `"masla"` likha? TypeScript turant pakad lega.

---

## Part 8 — Intersection Types (`&`)

```ts
type basechai = { tealeaves: number }
type extra    = { masala: number }

type masalachai = basechai & extra
```

`&` matlab — *"Dono combine karo."*

**Final structure:**
```ts
{
    tealeaves: number;
    masala: number;
}

const cup: masalachai = { tealeaves: 2, masala: 1 } // ✅
```

### Real Life Analogy

> Base pizza `{ dough }` + Extra toppings `{ cheese }` = `PizzaWithCheese`

---

## Part 9 — Optional Properties (`?`)

```ts
bio?: string
```

Property ho bhi sakti hai, nahi bhi.

```ts
{ username: "bhavi" }               // ✅ Allowed
{ username: "bhavi", bio: "ClarityAI" } // ✅ Allowed
```

---

## Part 10 — `readonly`

```ts
readonly appname: string
```

Property initially set ho sakti hai — lekin baad me **change nahi ho sakti**.

```ts
const cfg = { appname: "ClarityAI" }

cfg.appname = "BhavAI" // ❌ Error — readonly hai
```

### Kahan Use Hota Hai?

```ts
readonly apiKey: string
readonly id: string
readonly createdAt: Date
```

> Ye cheezein accidental change nahi honi chahiye — `readonly` mutation rok deta hai.

---

## Part 11 — `type` vs `interface` — Final Understanding

| | `type` | `interface` |
|---|---|---|
| **Best for** | Unions, intersections, primitives, tuples | Object shapes, OOP, class contracts |
| **Unions** | ✅ | ❌ |
| **Extends** | Limited | ✅ Powerful |
| **Implements** | ❌ | ✅ |

```ts
// type — advanced combinations ke liye
type status = "loading" | "success" | "error"

// interface — objects/classes ke liye
interface User { name: string }
```

**Simple Rule:** Most developers use `interfaces` for objects/classes, `types` for advanced combinations.

---

## Big Picture — Concepts Summary

TypeScript actually **JavaScript ke upar ek safety layer** hai. Ye ensure karta hai:

- Galat data na aaye
- Typo na ho
- Missing properties na ho
- Functions wrong input na le
- Objects predictable rahein

---

## Real Professional Connection

Jo concepts tumne seekhe, yeh directly in sab me use honge:

| Use Case | Concepts |
|---|---|
| **React Props** | type, interface, optional |
| **API Responses** | union types, readonly |
| **Next.js Backend** | interfaces, intersection |
| **Database Models** | readonly, required |
| **Redux State** | union, literal types |
| **Auth Systems** | readonly, implements |

---

> **Aur ek important baat:**
> Tum ab syntax se upar uthkar TypeScript ka *"thinking model"* samajhna start kar rahe ho — aur wahi actual mastery hoti hai. 🎯





| Concept      | Purpose                 |
| ------------ | ----------------------- |
| type         | custom structure        |
| interface    | object/class contract   |
| union        | multiple allowed values |
| intersection | combine structures      |
| optional (?) | optional field          |
| readonly     | immutable field         |
| implements   | class follows rules     |

