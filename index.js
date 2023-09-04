const express = require("express")
const mysql = require("mysql")
const port = process.env.PORT || 3000

const app = express();

app.get("/", (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database:  'node',
        socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
    });
    
    connection.connect((err) => {
        if(err){
            console.error("Erreur de connexion: "+err.stack)
            return;
        }
        console.log("Connexion réussi à la base de donnée !")
    });
    
    connection.query("SELECT * FROM utilisateurs", (err, rows, fields) => {
        if(err) throw err;
        res.json(rows)
    })

    connection.end();
})

app.get("/", (req, res) => {
    res.json({message: "API node JS !"})
})

const users = require("./routes/users")
app.use("/users", users)

app.listen(port, () => {
    console.log("Serveur est en ligne !");
})