aapka_file.ts
      ↓
  [Scanner]     → Characters ko tokens banata hai
      ↓
  [Parser]      → Tokens se AST tree banata hai  
      ↓
 [Type Checker] → Types check karta hai, errors deta hai
      ↓
  [Emitter]     → AST ko JS code mein convert karta hai
      ↓
aapka_file.js
      ↓
 [Node/Browser] → Chalta hai!




 [const] [x] [:] [number] [=] [5] [+] [3] [;]

 VariableStatement
└── VariableDeclarationList
    └── VariableDeclaration
        ├── name: Identifier (x)
        ├── type: NumberKeyword
        └── initializer: BinaryExpression
                ├── left:  NumericLiteral (5)
                ├── operator: PlusToken (+)
                └── right: NumericLiteral (3)



Parser  = "Code ko tree mein todna"
Binder  = "Tree ke pieces ko aapas mein jodhna"
Checker = "Types sahi hain ya nahi dekhna"  
Emitter = "JavaScript banake likhna"