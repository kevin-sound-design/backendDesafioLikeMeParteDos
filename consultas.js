const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'likeme',
  allowExitOnIdle: true
})

const traerPosts = async ()=>{
  const {rows} = await pool.query("SELECT * FROM posts");
  return rows;
}

const agregarPosts = async (titulo, img, descripcion)=>{
  const consulta = "INSERT INTO posts (id, titulo, img, descripcion) VALUES (DEFAULT, $1, $2, $3) Returning *";
  const datos = [titulo, img, descripcion];
  const resultado = await pool.query(consulta, datos);
  return resultado.rows[0]
}

const modificarLike = async (id) =>{
  const likesActuales = await numeroDeLikesActuales(id);
  const consulta = `UPDATE posts SET likes = $1 WHERE id = $2`;
  const datos = [likesActuales[0].likes + 1, id]
  await pool.query(consulta, datos);
}

const deletePost = async (id) =>{
  const consulta = "DELETE FROM posts WHERE id = $1"
  const datos = [id];
  await pool.query(consulta, datos);
}

const numeroDeLikesActuales = async (id) =>{
  const likesActual = "SELECT likes FROM posts WHERE id = $1";
  const datos = [id];
  const {rows} = await pool.query(likesActual, datos);
  return rows;
}

module.exports = {traerPosts, agregarPosts, modificarLike, deletePost};