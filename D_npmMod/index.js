import chalk from 'chalk'
import validator from 'validator'

console.log(chalk.blue('hello'))
console.log(chalk.red.italic("ayush"))
console.log(chalk.green.underline.inverse("false"))
console.log(chalk.yellow.inverse("Ayush"))

const res = validator.isEmail('23bce033@nith.ac.in')
console.log(res ? chalk.green.inverse(res) : chalk.red.inverse(res))
