require("dotenv").config()

const bcrypt = require("bcryptjs")

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST || "localhost",
    database: process.env.DATABASE_NAME || "favlinks",
    password: process.env.DATABASE_PASS,
    port: process.env.DATABASE_PORT || 5432,
})

const getLinks = (request, response) => {
    pool.query('SELECT * FROM links ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getLinkById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM links WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createLink = (request, response) => {
    console.log("request: ", request)
    const { name, url } = request.body
  
    pool.query('INSERT INTO links (name, url) VALUES ($1, $2) RETURNING *', [name, url], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Link added with ID: ${results.rows[0].id}`)
    })
  }

  const updateLink = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, url } = request.body
  
    pool.query(
      'UPDATE links SET name = $1, url = $2 WHERE id = $3',
      [name, url, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Link modified with ID: ${id}`)
      }
    )
  }

  const deleteLink = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM links WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Link deleted with ID: ${id}`)
    })
  }

  const usernameExists = async (username) => {
    const data = await pool.query("SELECT * FROM users WHERE username=$1", [
    username,
    ]);
  
    if (data.rowCount == 0) return false; 
    return data.rows[0];
  };

  const createUser = async (username, password) => {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      
      const data = await pool.query(
        "INSERT INTO users(username, password) VALUES ($1, $2) RETURNING id, username, password",
        [username, hash]
      );
       
      if (data.rowCount == 0) return false;
      return data.rows[0];
  };  

  const matchPassword = async (password, hashPassword) => {
    const match = await bcrypt.compare(password, hashPassword);
    return match
  };

  module.exports = {
    getLinks,
    getLinkById,
    createLink,
    updateLink,
    deleteLink,
    usernameExists,
    createUser,
    matchPassword,
  }