var express = require('express')
const bodyParser = require('body-parser')
const starCoordinatesFinder = require('./starCoordinatesFinder')
const mainService = require('./mainService')

var app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))

app.post('/', async function(req, res) {
	let resBody = starCoordinatesFinder.start(req.body)
	await mainService.findRealStars(resBody)
	.then(response => {

		res.status(200).send(response)
	})
	.catch(err => {
		res.status(400).send(err)
	})
	

})
app.listen(1100, async function(){
 	mainService.main()
})
