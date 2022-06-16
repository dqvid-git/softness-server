const jwt = require('jsonwebtoken')
const {secret} = require('../config.js') 

module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {next()}
	try {
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			return res.status(403).json({message: 'User is not authorized'})
		}
		const decodedData = jwt.verify(token, secret)
		req.id = decodedData
		next()
	} catch (e) {
		console.log(e)
		return res.status(403).json({message: 'User is not authorized'})
	}
}
