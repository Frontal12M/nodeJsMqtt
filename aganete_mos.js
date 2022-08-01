const mqtt = require('mqtt')
var Topic = '#'; //subscribe to all topics
var Broker_URL = 'mqtt://10.0.0.5';
//const client = mqtt.connect('mqtt://10.0.0.5')
var mysql = require('mysql');
 
var options = {
	clientId: 'MyMQTT',
	port: 1883,
	//username: 'mqtt_user',
	//password: 'mqtt_password',	
	keepalive : 60
};

var cliente  = mqtt.connect(Broker_URL, options);
cliente.on('connect', EventoConectar);
cliente.on('reconnect', mqtt_reconnect);
cliente.on('error', mqtt_error);
cliente.on('message', mqtt_messsageReceived);
cliente.on('close', mqtt_close);

function EventoConectar() {//conecta
    client.subscribe(Topic, mqtt_subscribe );//Suscribe
};

function mqtt_subscribe(err, granted) {
    console.log("suscrito a? " + Topic);
    if (err) {console.log(err);}
};

function mqtt_reconnect(err) {
    //console.log("Reconnect MQTT");
    //if (err) {console.log(err);}
	cliente  = mqtt.connect(Broker_URL, options);
};

function mqtt_error(err) {
    //console.log("Error!");
	//if (err) {console.log(err);}
};

function mqtt_messsageReceived(topic, message, packet) {
	var message_str = message.toString(); //convert byte array to string
	message_str = message_str.replace(/\n$/, ''); //remove new line
	//payload syntax: clientID,topic,message
	if (countInstances(message_str) != 1) {
		console.log("Invalid payload");
		} else {	
		insert_message(topic, message_str, packet);
		//console.log(message_arr);
	}
};

function mqtt_close() {
	//console.log("Close MQTT");
};

///////////////////////////////////////////////////
///////////////////// MYSQL ////////////////////////
////////////////////////////////////////////////////

 // create a connection variable with the required details
 var con = mysql.createConnection({
   host: "localhost",    // ip address of server running mysql
   user: "root",    // user name to your mysql database
   password: "171118", // corresponding password
   database: "iot_control_devices" // use the specified database
 });

 con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM device", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

function insert_message(topic, message_str, packet) {
	var message_arr = extract_string(message_str); //split a string into an array
	var clientID= message_arr[0];
	var message = message_arr[1];
	var sql = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
	var params = ['topicos', 'clientID', 'topic', 'message', clientID, topic, message];
	sql = mysql.format(sql, params);	
	
	connection.query(sql, function (error, results) {
		if (error) throw error;
		console.log("Message added: " + message_str);
	}); 
};	
var delimiter = ",";
function countInstances(message_str) {
	var substrings = message_str.split(delimiter);
	return substrings.length - 1;
};

function extract_string(message_str) {
	var message_arr = message_str.split(","); //convert to array	
	return message_arr;
};

function EventoMensaje(topic, message) {
  //COLOCAR DENTRO DEL IF 
    //Mensaje a condicion dependiendo el topico que llega 
    if (topic == "Circuitec/ON") {
      insert_message(topic,message);
        console.log("El topico se ha prendido " + message.toString());
    }
    console.log(topic + " - " + message.toString())
    //client.end()
}

function insert_message(topic,message){
  var clientID= "client001";
  //var sql = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
  var sql = 'INSERT INTO ?? (??,??,??) VALUES (?,?,?)';
  
  var params=['topicos','clientID','topic','message',clientID,topic,message];
  sql = mysql.format(sql, params);

  con.query(sql, function (error, results) {
		if (error) throw error;
		console.log("1 record inserted");
	});
}

client.on('connect', EventoConectar)
client.on('message', EventoMensaje)

