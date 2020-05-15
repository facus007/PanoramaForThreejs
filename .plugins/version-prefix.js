var fs = require("fs")

let path = process.cwd() + '/package.json'
let config = fs.readFileSync(path);

config = JSON.parse(config.toString())
let version = config.version.split('.')

version[2]++
config.version = version.join('.')
config = JSON.stringify(config, null, 2)

fs.writeFile(path, config, {flag:'w'},err=>err&&console.error(err))
