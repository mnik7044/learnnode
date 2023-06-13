const fs = require("fs");

// Synchronous
// fs.writeFileSync('./test.txt',"This is a text file I created using fs" )


//Asynchronous
//fs.writeFile('./test.txt',"This is a text file I created using fs but async",(err) =>{} );

//const result = fs.readFileSync("./contacts.txt", "utf-8")
//console.log(result);

//Asynchronous never returns any result

//fs.readFile("./contacts.txt", "utf-8", (err, result) =>{
  //  if(err)
 //   {
  //      console.log("Eroor", err);
   // }
  //  else{
  //      console.log(result);
   // }
//});

//fs.appendFileSync("./test.txt", 'Hey There\n')

const os = require("os");

console.log(os.cpus().length)