const express = require('express');
const cors = require('cors');
const {agregarPosts, traerPosts, modificarLike, deletePost} = require('./consultas');

const PORT = 3000;

const app = express();

app.use(express.json())
app.use(cors());

app.listen(PORT, ()=> console.log(`Servidor iniciado en puerto ${PORT}`));

app.get("/posts", async (req, res) =>{
  try{
    const posts = await traerPosts();
    res.status(200).send(posts);
  }catch(error){
    res.status(404).send(error);
  }
})

app.post("/posts", async (req, res) =>{
  try{
    const data = req.body;
    const newPost = await agregarPosts(data.titulo, data.img, data.descripcion);
    res.status(201).send(newPost);
  }catch(error){
    res.status(404).send(error);
  }
})

app.put("/posts/like/:id", async (req, res)=>{
 try{
    const {id} = req.params;
    modificarLike(id);
    res.status(201).send("Like modificado");
 }catch(error){
  res.status(404).send(error);
 }
})

app.delete("/posts/:id", async (req, res)=>{
  try{
    const {id} = req.params;
    deletePost(id);
    res.status(200).json("Post eliminado");
  }catch(error){
    res.status(404).send(error);
  }
})



