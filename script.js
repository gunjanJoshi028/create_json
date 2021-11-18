const fs = require('fs');

//Read local Json Data
let fileContent = fs.readFileSync('./rawData.json',
            {encoding:'utf8', flag:'r'});

//loop through array of objects to get desired output
let output = JSON.parse(fileContent).data.map(item => 
    Object.assign({}, {
        "driverName":item.driver.name,
        "vehicles": (item.logMetaData.vehicles) ? item.logMetaData.vehicles.map(vehicle => Object.assign({}, { "id" : vehicle.id , "name" : vehicle.name })): [],
        "disctanceTravelled":item.distanceTraveled.driveDistanceMeters
}));            
output = {"data":output};
// console.log(JSON.stringify(output,null,2));

//Create a new Json
fs.writeFile('reqJson.json', JSON.stringify(output,null,2), function (err) {
    if (err) throw err;
    console.log('reqJson created!');
  });
