const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://192.168.1.73')

var mysql = require('mysql');
 
 // create a connection variable with the required details
 var con = mysql.createConnection({
   host: "localhost",    // ip address of server running mysql
   user: "root",    // user name to your mysql database
   password: "171118", // corresponding password
   database: "mqttjs" // use the specified database
 });
  
 // make to connection to the database.
 con.connect(function(err) {
   if (err) throw err;
   // if connection is successful
   con.query("INSERT INTO mqttjs (topic,message) values ('Ani','hola')", 
   function (err, result, fields) {
    
    
     if (err) throw err;
     console.log(result);
   })
   
   ;
 });


function EventoConectar() {//conecta
    client.subscribe('Circuitec/#', function (err) {//Suscribe
        //  if (!err) {
        //    client.publish('Temperatura', '30')
        //  }
    })
}

client.on('connect', function () {
  client.subscribe('Circuitec/#', function (err) {
    
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  if (topic == "Circuitec/ON") {
    console.log("El topico se ha prendido " + message.toString());
}
  console.log(topic + " - " +message.toString())
  
})