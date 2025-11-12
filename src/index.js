// const fs = require("fs");

// fs.readFile("test.txt", "utf-8", (err, data) => {
//     if (err) {
//         console.log("File cannot read successfully");
//     }
//     else {
//         console.log("file content: " + data);
//     }
// });

// const content = "This is content for file";
// fs.writeFile("test.txt", content, (err) => {
//     if (err) {
//         console.log("Error is occurred during writing");
//     }
//     else {
//         console.log("Write was success");
//     }
// });

const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

const server = app.listen(port, () => {
    const servername = server.address().address;
    const serverport = server.address().port;
    console.log("The server is running");
    console.log("http://%s:%s", servername, serverport);
});
// http://127.0.0.1:3000