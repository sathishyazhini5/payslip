const myArray = ["1", "2", "3", "2", "4", "2"];

const uniqueArray = [...new Set(myArray)]; 

console.log(uniqueArray); //output [ '1', '2', '3', '4' ]