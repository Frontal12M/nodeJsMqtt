const mqtt = require('mqtt') 
const client = mqtt.connect('mqtt://192.168.1.87') 
var mysql = require('mysql'); 
 
 
 var con = mysql.createConnection({
   host: "localhost",    // direccion de donde inicializamos myql(localhost o servidor )
   user: "root",    // usuario 
   password: "171118", // password que corresponde 
   database: "iot_control_devices" // base de datos en uso 
 });

 con.connect(function(err) {   // creamos un query a la base de datos el cual arroja los dispositivos 
  if (err) throw err;
  con.query("SELECT * FROM device", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  })
  
 // con.query("SELECT * FROM device d where d.no_serie = 'P-1234' " , function (err, result, fields) {
  //  if (err) throw err;
  //  console.log(result);
  //})
  ;
});


function EventoConectar() {//conecta
    client.subscribe('#', function (err) {//Suscribe al topico 
       
    })
}



function EventoMensaje(topic, message) {
 
  insert_message(topic,message);  // guarda el topico y mensaje en el metodo inser_message 
    //  condicion dependiendo el topico que llega 
    //if (topic == "Circuitec/ON") {
    //  insert_message(topic,message);
     //   console.log("El topico se ha prendido " + message.toString());
    //}
    let topics = topic;
    let cad = topics.indexOf('/');

    console.log(topics.substring(0, cad));
     
    console.log(topic + " - " + message.toString())

}

function insert_message(topic,message){  // una vez que llega al metodo inserta el topico y mnesaje en la base de datos creada 
  var severity= "client001";
  var message_type = "prueba"
  var sql = 'INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)';
  var params=['activity_log','topic','message','severity','message_type',topic,message,severity,message_type]; // datos a insertar (campos ) 
  // dipsositivo
  con.query("SELECT * FROM device d where d.no_serie = 'topics' " , function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    })

  sql = mysql.format(sql,params);
  con.query(sql, function (error, results) {
		if (error) throw error;
    
		console.log("1 record inserted");
	});
}

client.on('connect', EventoConectar) 
client.on('message', EventoMensaje)

