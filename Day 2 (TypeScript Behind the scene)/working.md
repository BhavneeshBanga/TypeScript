# TypeScript Kaise Kaam Karti Hai — Poora Flow

> **Ek complete guide Hindi mein** — Scanner se lekar JavaScript output tak

---

## Table of Contents

1. [Overview — Bada Picture](#1-overview--bada-picture)
2. [Step 1 — Scanner](#2-step-1--scanner)
3. [Step 2 — Parser](#3-step-2--parser)
4. [Step 3 — Binder](#4-step-3--binder)
5. [Step 4 — Type Checker](#5-step-4--type-checker)
6. [Step 5 — Emitter](#6-step-5--emitter)
7. [Step 6 — JavaScript Chalta Hai](#7-step-6--javascript-chalta-hai)
8. [Poora Flow Ek Saath](#8-poora-flow-ek-saath)
9. [Real World Example](#9-real-world-example)
10. [Important Files in TS Compiler](#10-important-files-in-ts-compiler)

---

## 1. Overview — Bada Picture

Jab aap TypeScript likhte ho aur `tsc` command chalate ho, tab andar bahut kuch hota hai. Seedha JS nahi banta — pehle kai saare stages se guzarta hai:

```
Aapka Code (.ts)
        |
        v
  +----------+
  |  Scanner | <-- Characters padhta hai, tokens banata hai
  +----------+
        |
        v
  +----------+
  |  Parser  | <-- Tokens se AST (tree) banata hai
  +----------+
        |
        v
  +----------+
  |  Binder  | <-- Tree mein symbols aur scopes jodhta hai
  +----------+
        |
        v
  +-----------+
  |  Checker  | <-- Types check karta hai, errors deta hai
  +-----------+
        |
        v
  +-----------+
  |  Emitter  | <-- AST ko JavaScript mein convert karta hai
  +-----------+
        |
        v
  Output (.js + .d.ts + .js.map)
```

**Simple rule:**
- TypeScript khud **nahi chalta**
- Pehle JavaScript banta hai
- Phir JavaScript chalta hai (Node.js ya Browser mein)

---

## 2. Step 1 — Scanner

**File:** `scanner.ts`

### Kya karta hai?
Source code ke characters ko padh ke chhote chhote **tokens** mein todhta hai.

### Token kya hota hai?
Har ek meaningful unit — jaise ek keyword, ek naam, ek symbol.

### Example:

**Input (aapka code):**
```typescript
const age: number = 25 + 5;
```

**Scanner ka Output (Tokens):**
```
Token 1:  ConstKeyword      → "const"
Token 2:  Identifier        → "age"
Token 3:  ColonToken        → ":"
Token 4:  NumberKeyword     → "number"
Token 5:  EqualsToken       → "="
Token 6:  NumericLiteral    → "25"
Token 7:  PlusToken         → "+"
Token 8:  NumericLiteral    → "5"
Token 9:  SemicolonToken    → ";"
```

### Scanner kya ignore karta hai?
- Whitespace (spaces, tabs)
- Newlines
- Comments (`//` aur `/* */`)

Ye cheezein output mein nahi aatein (unless source maps ke liye chahiye).

### Scanner Error Example:
```typescript
const x = @hello;
// ❌ Scanner Error: Invalid character '@'
```

---

## 3. Step 2 — Parser

**File:** `parser.ts`

### Kya karta hai?
Scanner ke tokens ko lekar ek **tree structure** (AST) banata hai jise samajha ja sake.

### AST kya hota hai?
**Abstract Syntax Tree** — code ka ek tree representation jisme har node ek meaningful piece hai.

### Example:

**Input (Scanner ke tokens):**
```
[const] [age] [:] [number] [=] [25] [+] [5] [;]
```

**Parser ka Output (AST):**
```
SourceFile
└── VariableStatement
    └── VariableDeclarationList  (const)
        └── VariableDeclaration
            ├── name:        Identifier       → "age"
            ├── type:        NumberKeyword    → "number"
            └── initializer: BinaryExpression
                                ├── left:     NumericLiteral → 25
                                ├── operator: PlusToken      → "+"
                                └── right:    NumericLiteral → 5
```

### Parser ke Andar Functions:

```
parseSourceFile()
  └── parseStatement()
        ├── parseVariableStatement()    → const/let/var
        ├── parseFunctionDeclaration()  → function
        ├── parseClassDeclaration()     → class
        ├── parseIfStatement()          → if/else
        ├── parseForStatement()         → for loop
        └── parseReturnStatement()      → return
```

Har statement type ke liye alag parsing function hota hai.

### Parser Error Example:
```typescript
function foo( {
//            ^ ❌ Parser Error: ')' expected
```

---

## 4. Step 3 — Binder

**File:** `binder.ts`

### Kya karta hai?
AST ke nodes ko **aapas mein connect** karta hai. Symbols banata hai, scopes set karta hai, aur control flow samajhta hai.

### Binder ke 3 Main Kaam:

---

#### Kaam 1 — Symbols banana

Har declared cheez ka ek **Symbol** banta hai:

```typescript
const x = 10;           // → Symbol { name: "x", kind: Variable }
function greet() {}     // → Symbol { name: "greet", kind: Function }
class Dog {}            // → Symbol { name: "Dog", kind: Class }
interface Animal {}     // → Symbol { name: "Animal", kind: Interface }
```

Symbol ek record hota hai jo batata hai:
- Naam kya hai
- Kahan declare hua
- Kaunsi tarah ki cheez hai (variable, function, class, etc.)

---

#### Kaam 2 — Scopes banana (Symbol Tables)

```typescript
const x = 10;               // Global scope ka x

function foo() {
    const x = 20;           // foo ka apna x — alag hai!
    
    function bar() {
        const x = 30;       // bar ka apna x — aur alag!
        console.log(x);     // → 30 (apna scope dekha)
    }
    
    console.log(x);         // → 20 (foo ka scope dekha)
}

console.log(x);             // → 10 (global scope dekha)
```

**Binder ne scope tree banaya:**
```
Global Scope
├── x → Symbol (value: 10)
└── foo → Symbol (Function)
      └── foo's Local Scope
          ├── x → Symbol (value: 20)
          └── bar → Symbol (Function)
                └── bar's Local Scope
                    └── x → Symbol (value: 30)
```

---

#### Kaam 3 — Control Flow Analysis

```typescript
function process(value: string | null) {
    
    if (value === null) {
        return;
        // Yahan value = null
    }
    
    // Yahan binder jaanta hai:
    // value = string (null wala path return ho chuka)
    console.log(value.toUpperCase()); // ✅ Safe hai!
}
```

**Flow graph:**
```
[Start: value = string | null]
          |
    [if value === null]
         / \
        /   \
  [return]  [console.log]
             value = string ✓
```

### Binder Error Example:
```typescript
const y = 5;
const y = 10;
// ❌ Binder Error: Cannot redeclare block-scoped variable 'y'
```

---

## 5. Step 4 — Type Checker

**File:** `checker.ts` (sabse badi file — 50,000+ lines!)

### Kya karta hai?
Ye check karta hai ki **types sahi hain ya nahi**. Agar galat type use ki hai toh error deta hai — lekin JavaScript banane se **nahi rokta** (sirf batata hai).

### Type Checking ke Examples:

**Basic Type Mismatch:**
```typescript
const age: number = "twenty-five";
//    ❌ Error: Type 'string' is not assignable to type 'number'
```

**Function Arguments:**
```typescript
function add(a: number, b: number): number {
    return a + b;
}

add(5, "hello");
//      ❌ Error: Argument of type 'string' is not
//                assignable to parameter of type 'number'
```

**Object Properties:**
```typescript
interface User {
    name: string;
    age: number;
}

const user: User = {
    name: "Rahul",
    // ❌ Error: Property 'age' is missing in type
};
```

**Null Safety:**
```typescript
function greet(name: string | null) {
    console.log(name.toUpperCase());
    // ❌ Error: Object is possibly 'null'
}
```

**Sahi karna:**
```typescript
function greet(name: string | null) {
    if (name !== null) {
        console.log(name.toUpperCase()); // ✅ OK
    }
}
```

### Checker kya karta hai andar?

```
1. Har node ka type determine karta hai
2. Assignment check karta hai
3. Function calls check karta hai
4. Return types check karta hai
5. Generic types resolve karta hai
6. Type narrowing karta hai (if/else ke baad)
7. Overload resolution karta hai
```

### Checker Error ≠ Build Fail

```bash
# Errors hone ke bawajood JS ban sakta hai!
tsc --noEmitOnError false myfile.ts

# Errors pe rokna hai toh:
tsc --noEmitOnError true myfile.ts
```

---

## 6. Step 5 — Emitter

**File:** `emitter.ts` (jo file aapne share ki thi)

### Kya karta hai?
Type-checked AST ko lekar **JavaScript code likhta hai** — saari TypeScript-specific cheezein hata deta hai.

### Emitter 3 cheezein banata hai:

| Output File | Kya hota hai |
|-------------|--------------|
| `.js`       | Actual JavaScript code |
| `.d.ts`     | Type declarations (dusron ke liye) |
| `.js.map`   | Source map (debugging ke liye) |

---

### TypeScript → JavaScript Transformation:

**Type Annotations hatana:**
```typescript
// TypeScript
const name: string = "Rahul";
const age: number = 25;

// JavaScript (output)
const name = "Rahul";
const age = 25;
```

**Interface hatana (JS mein hoti nahi):**
```typescript
// TypeScript
interface Animal {
    name: string;
    sound(): string;
}

// JavaScript (output)
// [NOTHING — interface completely hata di]
```

**Enum ko object mein convert karna:**
```typescript
// TypeScript
enum Direction {
    Up,
    Down,
    Left,
    Right
}

// JavaScript (output)
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
```

**Generic types hatana:**
```typescript
// TypeScript
function identity<T>(arg: T): T {
    return arg;
}

// JavaScript (output)
function identity(arg) {
    return arg;
}
```

**Decorators transform karna:**
```typescript
// TypeScript
@Injectable()
class UserService {
    getUser() { ... }
}

// JavaScript (output)
UserService = __decorate([Injectable()], UserService);
```

### Emitter Pipeline (jo emitter.ts mein tha):

```
AST Node
   |
   v
[Notification Phase]  → Plugins/Transforms ko batao
   |
   v
[Substitution Phase]  → Node ko replace karo agar zarurat ho
   |
   v
[Comments Phase]      → Comments sahi jagah lagao
   |
   v
[Source Maps Phase]   → Position mapping karo
   |
   v
[Emit Phase]          → Actually text likho
   |
   v
JavaScript Output
```

---

## 7. Step 6 — JavaScript Chalta Hai

### Node.js mein:

```
.js file
   |
   v
[Node.js] 
   |
   v
[V8 JavaScript Engine]
   |
   v
[JIT Compilation]        → Just-In-Time compile
   |
   v
[Machine Code]
   |
   v
[CPU pe chalta hai] ✅
```

### Browser mein:

```
.js file (CDN ya server se aaya)
   |
   v
[Browser ka JS Engine]
   Chrome  → V8
   Firefox → SpiderMonkey
   Safari  → JavaScriptCore
   |
   v
[Parse → Compile → Execute]
   |
   v
[Web Page pe dikhta hai] ✅
```

---

## 8. Poora Flow Ek Saath

**Input code:**
```typescript
function greet(name: string): string {
    return "Hello, " + name;
}

const result: string = greet("Rahul");
console.log(result);
```

---

### Scanner Output:
```
[function] [greet] [(] [name] [:] [string] [)] [:] [string] [{]
[return] ["Hello, "] [+] [name] [;]
[}]
[const] [result] [:] [string] [=] [greet] [(] ["Rahul"] [)] [;]
[console] [.] [log] [(] [result] [)] [;]
```

---

### Parser Output (AST):
```
SourceFile
├── FunctionDeclaration
│   ├── name: "greet"
│   ├── parameters:
│   │   └── Parameter
│   │       ├── name: "name"
│   │       └── type: StringKeyword
│   ├── returnType: StringKeyword
│   └── body: Block
│       └── ReturnStatement
│           └── BinaryExpression
│               ├── left:  StringLiteral ("Hello, ")
│               ├── op:    PlusToken
│               └── right: Identifier (name)
│
├── VariableStatement
│   └── VariableDeclaration
│       ├── name: "result"
│       ├── type: StringKeyword
│       └── initializer: CallExpression
│           ├── expression: Identifier (greet)
│           └── arguments: [StringLiteral ("Rahul")]
│
└── ExpressionStatement
    └── CallExpression
        ├── expression: PropertyAccess (console.log)
        └── arguments: [Identifier (result)]
```

---

### Binder Output (Symbols + Scopes):
```
Global Scope Symbol Table:
├── "greet"  → { kind: Function, params: [name:string], returns: string }
├── "result" → { kind: Variable, type: string }
└── "console"→ { kind: Variable, type: Console (built-in) }

greet's Local Scope:
└── "name" → { kind: Parameter, type: string }

Links:
result.initializer → calls greet ✓
console.log → built-in function ✓
```

---

### Checker Output:
```
greet("Rahul")
  → argument "Rahul" is string ✓
  → parameter expects string ✓
  → return type is string ✓

result: string = greet("Rahul")
  → greet returns string ✓
  → result is declared as string ✓

console.log(result)
  → result is string ✓
  → log accepts any ✓

✅ No errors found!
```

---

### Emitter Output (JavaScript):
```javascript
function greet(name) {
    return "Hello, " + name;
}

const result = greet("Rahul");
console.log(result);
```

**Kya hata:**
- `: string` type annotations
- Return type annotation

---

### Runtime Output:
```
Hello, Rahul
```

---

## 9. Real World Example

### TypeScript Project ka poora flow:

```
project/
├── tsconfig.json       ← Compiler settings
├── src/
│   ├── index.ts        ← Entry point
│   ├── user.ts         ← User module
│   └── utils.ts        ← Utility functions
└── dist/               ← Output folder
    ├── index.js
    ├── user.js
    └── utils.js
```

### tsconfig.json:
```json
{
  "compilerOptions": {
    "target": "ES2020",        // Kaun sa JS version banana hai
    "module": "commonjs",       // Module system
    "outDir": "./dist",         // Output folder
    "strict": true,             // Strict type checking
    "sourceMap": true,          // .js.map files banana
    "declaration": true         // .d.ts files banana
  },
  "include": ["src/**/*.ts"]
}
```

### Command:
```bash
tsc                    # Poora project compile karo
tsc --watch            # Changes pe automatically compile
tsc --noEmit           # Sirf type check karo, JS mat banao
tsc src/index.ts       # Sirf ek file compile karo
```

---

## 10. Important Files in TS Compiler

| File | Kaam |
|------|------|
| `scanner.ts` | Characters → Tokens |
| `parser.ts` | Tokens → AST |
| `binder.ts` | AST → Symbols + Scopes |
| `checker.ts` | Type checking (sabse badi file) |
| `emitter.ts` | AST → JavaScript (jo aapne dekhi) |
| `program.ts` | Sabko coordinate karta hai |
| `utilities.ts` | Helper functions |
| `types.ts` | TypeScript ke internal types |
| `diagnosticMessages.json` | Saare error messages |

---

## Quick Summary

```
1. Scanner    → Code ke characters padhe, tokens banaye
               "const age = 5" → [const][age][=][5]

2. Parser     → Tokens se tree banaya (AST)
               [const][age][=][5] → VariableDeclaration { name: age, value: 5 }

3. Binder     → Tree ke nodes ko connect kiya
               age ka symbol banaya, scope set kiya

4. Checker    → Types check kiye
               "kya age ko number chahiye tha?" — Error ya OK

5. Emitter    → AST se JavaScript likhi
               const age: number = 5 → const age = 5

6. Runtime    → JavaScript chali (Node.js ya Browser)
               CPU pe actual execution ✅
```

---

> **Key Insight:** TypeScript ek **compile-time tool** hai.
> Runtime pe sirf JavaScript chalta hai.
> TypeScript ka kaam build time pe hi khatam ho jaata hai.

---

*TypeScript Compiler Source: github.com/microsoft/TypeScript*