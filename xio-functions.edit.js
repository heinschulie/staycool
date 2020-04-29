/* 
    Note: This file is run as part of the deployment script when a Firebase project is deployed to hosting. It allows 
    for the dynamic update of the destination of a project dist folder so that a single firebase.json file in an NX
    repo will suffice.  
*/

const fs = require('fs');
const filepath = './firebase.json';

fs.readFile(filepath, 'utf8', (err,data) => {
  if (err) {
    return console.log(err);
  }

  let destination;
  process.argv.forEach((val, index, array) => {
    
    if(val.includes('destination')){
        destination = val.split('=')[1];
    }

  });
  
  if (!destination) {
    return console.error("Error! You have to provide a new deployment destination for your Firebase project. Use the '--destination' flag.");
  }

  const result = data.replace(/.*public.*/, `"public": "dist/${destination}",`);

  fs.writeFile(filepath, result, 'utf8', (err) => {
     if (err) return console.log(err);
  });

});