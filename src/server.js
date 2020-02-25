const app = require('./app')
require('dotenv').config()

app.listen(process.env.PORT || 3000, function() {
	console.log(`Server is listening on Port: ${process.env.PORT}`)
})