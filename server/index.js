const express = require('express');

const path = require('path')

const PORT = process.env.PORT || 8000;

const app = express();

//host react app as static files
app.use(express.static(path.resolve(__dirname, '../client/build')))

app.get('/', (request, response) =>{
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})