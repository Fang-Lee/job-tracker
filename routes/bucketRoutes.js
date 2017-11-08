const requireLogin = require('../middlewares/requireLogin');
const fs = require('fs');
const keys = require('../config/keys');

const AWS = require('aws-sdk');
AWS.config.update({
	accessKeyId: keys.s3AccessKeyId,
	secretAccessKey: keys.s3SecretAccessKey,
	region: 'us-west-1'
});
const s3 = new AWS.S3();

module.exports = app => {
	app.get('/api/file', requireLogin, async (req, res) => {
		var fileParams = {
			Bucket: keys.s3Bucket,
			Key: req.query.path 
		}
		var pathArray = req.query.path.split('/');
		var fileName = pathArray[pathArray.length - 1];

		s3.getObject(fileParams, function(err, data) {
			if (err) {
				return err;
			}
			console.log('fetched file', data);
			res.writeHead(200, {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename=${fileName}`,
				'Content-Length': data.Body.length
			});
			res.end(data.Body);
		})
	})
}