console.log(process.argv)

const args = process.argv.slice(2)

const name = args[0].split('=')[1]

const age = args[1].split('=')[1]

console.log(`Meu nome é ${name} e minha idade é ${age}`)
