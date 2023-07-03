const fs = require('fs')

fs.readFile("test1.txt", "utf8", (err, data) => {
  if (err) return console.log(err)
  
  console.log(data)
})