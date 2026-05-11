const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname,"frontend")));
app.use(express.static(path.join(__dirname,"styles")));
app.use(express.static(path.join(__dirname,"assets","favicon")));
app.use(express.static(path.join(__dirname,"assets","images")));
app.use(express.static(path.join(__dirname,"assets","resources")));
app.use(express.static(path.join(__dirname,"assets","fonts")));
app.use(express.static(path.join(__dirname,"assets","icons")));


app.get("/",async(req,res)=>{
    /*res.setHeaders({
        "cache-control":"public,max-age=3600",
    });*/
    res.sendFile(path.join(__dirname,"frontend","home.html"));
});

app.get("/resume",async(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,"assets","resources","resume.pdf"));
})

app.listen(PORT,"localhost", () => {
    console.log(`Server is running on port ${PORT}`);
});