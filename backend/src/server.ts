import express from 'express';

const app = express();


app.get("/", (req, res) => {
  res.json({ msg: "OK" })
})

app.listen(3333, () => console.log("Server On"));