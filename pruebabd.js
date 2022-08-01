const mysql = require("mysql");
  
var db_con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "171118",
    database: "gfg_db"
});
  
let output;
  
const setOutput = (rows) => {
    output = rows;
    console.log(output);
}
  
db_con.connect(async(err) => {
    if (err) {
        console.log("Database Connection Failed !!!", err);
        return;
    }
  
    console.log("Connected to Database");
  
    let query = 'SELECT * FROM users';
    db_con.query(query, (err, rows) => {
        if (err) {
            console.log("internal error", err);
            return;
        }
          
        // This is the important function
        setOutput(rows);
    });
});