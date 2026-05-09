# TypeScript Advanced Types Notes 🚀

# 1. Primitive Types

Basic single values.

```ts
let name: string = "Bhavi";
let age: number = 19;
let isLoggedIn: boolean = true;
```

Types:

* string
* number
* boolean
* null
* undefined
* symbol
* bigint

---

# 2. Array

Stores multiple values.

```ts
let nums: number[] = [1,2,3];
let names: string[] = ["a", "b"];
```

Real use:

* users list
* products
* messages

---

# 3. Tuple

Fixed order + fixed types.

```ts
let user: [string, number] = ["Bhavi", 19];
```

Use:

* coordinates
* API responses
* structured pairs

---

# 4. Object

Most important in web development.

```ts
let person: {
    name: string;
    age: number;
};
```

Used everywhere:

* users
* products
* posts
* APIs

---

# 5. Interface 🔥

Blueprint of objects.

```ts
interface User {
    name: string;
    age: number;
}
```

Usage:

```ts
let u: User = {
    name: "Bhavi",
    age: 19
};
```

Why important:

* consistency
* scalability
* reusable structure

Used heavily in:

* React
* backend APIs
* databases

---

# 6. Optional Properties

```ts
interface User {
    name: string;
    bio?: string;
}
```

`?` means optional.

---

# 7. Readonly

Cannot modify later.

```ts
interface User {
    readonly id: number;
}
```

Use:

* database IDs
* immutable data

---

# 8. Type Alias

Custom reusable type.

```ts
type User = {
    name: string;
    age: number;
};
```

---

# 9. Union Types 🔥

Multiple allowed types.

```ts
let id: string | number;
```

Literal unions:

```ts
type Status = "loading" | "success" | "error";
```

Very common in:

* APIs
* frontend state
* backend responses

---

# 10. Function Types

Functions also have types.

```ts
type Add = (a: number, b: number) => number;
```

Used in:

* callbacks
* event handlers
* React props

---

# 11. Generics 🚀

Reusable type-safe code.

```ts
function identity<T>(value: T): T {
    return value;
}
```

Usage:

```ts
identity<string>("hello");
identity<number>(10);
```

Why important:

* reusable logic
* scalable architecture
* type safety

Most important advanced TS concept.

---

# 12. Generic Interfaces

```ts
interface ApiResponse<T> {
    success: boolean;
    data: T;
}
```

Usage:

```ts
ApiResponse<User>
ApiResponse<Product>
```

Real use:

* APIs
* backend responses
* database queries

---

# 13. Record

Dynamic object structure.

```ts
type Scores = Record<string, number>;
```

Example:

```ts
{
   "bhavi": 90,
   "rahul": 95
}
```

Used in:

* leaderboards
* caches
* dictionaries

---

# 14. Partial

Makes all properties optional.

```ts
Partial<User>
```

Equivalent to:

```ts
{
   name?: string;
   age?: number;
}
```

Used in:

* update APIs
* forms
* patch requests

---

# 15. Pick

Select specific fields.

```ts
Pick<User, "name">
```

Used when exposing limited data.

---

# 16. Omit

Remove specific fields.

```ts
Omit<User, "password">
```

Very common in backend/frontend.

---

# 17. Enum

Fixed constants.

```ts
enum Role {
    Admin,
    User,
    Moderator
}
```

Used in:

* permissions
* access control
* status systems

---

# 18. Promise<T> 🔥

Represents future value.

```ts
Promise<User>
```

Meaning:
Future mai User object milega.

Used in:

* APIs
* database calls
* async operations

---

# 19. Any ⚠️

Disables type safety.

```ts
let data: any;
```

Avoid using.

---

# 20. Unknown

Safer version of any.

```ts
let value: unknown;
```

Need checking before usage.

---

# 21. Void

Function returns nothing.

```ts
function greet(): void {
    console.log("hello");
}
```

---

# 22. Never

Function never finishes.

```ts
function crash(): never {
    throw new Error();
}
```

---

# 23. Discriminated Unions 🚀

Advanced enterprise TypeScript.

```ts
type Result =
 | { status: "success"; data: string }
 | { status: "error"; message: string };
```

Used in:

* Redux
* APIs
* state management

---

# 24. Type Inference

TS automatically detects type.

```ts
let age = 19;
```

Internally:

```ts
let age: number = 19;
```

---

# 25. Type Annotation

Manually specifying type.

```ts
let age: number = 19;
```

---

# Interface vs Type Alias

Interface:

* best for objects/classes

Type:

* more flexible
* unions
* advanced compositions

---

# Most Important Types To Master 🚀

Priority:

1. interface
2. type alias
3. unions
4. generics
5. Promise<T>
6. function types
7. Partial / Pick / Omit

---

# Industry Philosophy

TypeScript goal:

"Catch bugs before runtime."

---

# Real Large Scale Usage

Frontend:

* React props
* API responses
* component states

Backend:

* database schemas
* request validation
* service layers

Full Stack:

* shared types between frontend/backend

---

# Golden Rule 🚀

Primitive types store simple data.

Advanced types model real-world systems.
