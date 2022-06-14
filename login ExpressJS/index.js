const express = require('express');
const app = express();
const axios = require("axios");

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) =>{
    res.render("index");
});

app.post('/login', (req, res) =>{
    const {name, password} = req.body

    if (name === "admin" && password === "admin"){
        res.render("success", {
            username: name,
        })
    }else{
        res.render("faillure");
    }
})


app.get("/repos", async (req, res) => {
    const username = req.query.username || "myogeshchavan97";
    try {
      const result = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      const repos = result.data.map((repo) => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
      }));
      res.render("repos", {
        repos
      });
    } catch (error) {
      console.log(error);
      res.status(400).render("404");
    }
  });

app.listen(3000, () =>{

    console.log("listening on http://localhost3000")

});