const compiler = require("@vue/compiler-core")

const template = `
    <div>hi</div>
`

const ast = compiler.baseParse(template)

function getWords(key, lang = "EN") {
    const map = new Map([
         ["CN", {
            hi: "你好",
          }],
         ["EN", {
            hi: "hello"
         }]
     ])
     
     return map.get(lang)[key]
 }

// const lang = "CN"
const lang = "EN"

const myTransfrom = (rootNode) => {
    if (rootNode.type === 2) {
        rootNode.content = getWords([rootNode.content], lang)
    }
}

const [nodeTransforms] = compiler.getBaseTransformPreset(true)
console.log(nodeTransforms)

compiler.transform(ast, {
    nodeTransforms: [
        ...nodeTransforms,
        myTransfrom
    ]
})

const render = compiler.generate(ast)
// console.log(ast)
console.log(render)