const express = require('express');

const bodyParser = require('body-parser')

const path = require('path')

const db = require('./db')

const PORT = process.env.PORT || 8000;

const auth = require('./auth')

const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//host react app as static files
app.use(express.static(path.resolve(__dirname, '../client/build')))

app.use('/', auth)

app.get('/*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.get('/links', db.getLinks)
app.get('/links/:id', db.getLinkById)
app.post('/links', db.createLink)
app.put('/links/:id', db.updateLink)
app.delete('/links/:id', db.deleteLink)

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})