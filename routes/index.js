var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var Schema = require('protobuf').Schema;
var getRawBody = require('raw-body');

var readFileSyncRelative = function(file) {
	return fs.readFileSync(path.resolve(__dirname, file));
};

var schema = new Schema(readFileSyncRelative('../protos/defaults.desc'));
var TestDefaults = schema['TestDefaults'];

var serialize = function(obj) {
	var buffer;
	try {
		buffer = TestDefaults.serialize(obj);
	}
	catch (err) {
		console.error('Failed to Serialize', JSON.stringify(obj), ' error:', err);
		return;
	}
	console.log('Serialized', JSON.stringify(obj), 'length:', buffer.length);
	return buffer;
};

var deserialize = function(buffer) {
	var deserialized;
	try {
		deserialized = TestDefaults.parse(buffer);
	}
	catch (err) {
		console.error('Failed to Deserialize', buffer);
		return null;
	}
	console.log('Deserialized', buffer.length, 'bytes: ', JSON.stringify(deserialized));
	return deserialized;
};

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

// Response serialized binary data
router.post('/serialize', function(req, res) {
    var result = serialize(req.body);
    // send response
    res.type('application/octet-stream');
    res.send(200, new Buffer(result, 'binary'));
});

router.post('/deserialize', function(req, res) {
	getRawBody(req, {
        length: req.header('content-length'),
        limit: '500kb',
        encoding: 'binary'
	}, function(err, body) {
        if (err) {
            return res.send(err);
        }
        body = new Buffer(body, 'binary');
        var result = deserialize(body);
        res.send(result);
	});
});

router.post('/flow', function(req, res) {
	getRawBody(req, {
        length: req.header('content-length'),
        limit: '500kb',
        encoding: 'binary'
	}, function(err, body) {
        if (err) {
            return res.send(err);
        }
        body = new Buffer(body, 'binary');
        var result = serialize(deserialize(body));
        // send response
        res.type('application/octet-stream');
        res.send(200, new Buffer(result, 'binary'));
	});
});

/*
console.log('test 1');
deserialize(serialize({}));

console.log('test 2');
deserialize(serialize({
  mybool: true,
  myboolArray: [true, false, true, false],
  myuint32: 1,
  myuint32Array: [0, 1, 2, 1, 0],
  mystring: 'test',
  mystringArray: ['test', '', 'empty'],
  myobject: {mybool: true},
  myobjectArray: [{mybool: true}, {mybool: false}, {}, {myuint32: 1}]
}));

console.log('test 3');
// Exception: 'Error: Not an object' due to null in myobjectArray.
deserialize(serialize({
  mybool: true,
  myboolArray: [true, null, true, false],
  myuint32: 1,
  myuint32Array: [0, 1, null, 1, 0],
  mystring: 'test',
  mystringArray: ['test', null, 'empty'],
  myobject: {mybool: null},
  myobjectArray: [{mybool: true}, null, {}, {myuint32: 1}]
}));

console.log('test 4');
deserialize(serialize({
  mybool: true,
  myboolArray: [true, null, true, false],
  myuint32: 1,
  myuint32Array: [0, 1, null, 1, 0],
  mystring: 'test',
  mystringArray: ['test', null, 'empty'],
  myobject: {mybool: null},
  myobjectArray: [{mybool: true}, {}, {}, {myuint32: 1}]
}));

console.log('test 5');
deserialize(serialize({
  mybool: false,
  myboolArray: [],
  myuint32: 0,
  myuint32Array: [],
  mystring: '',
  mystringArray: [],
  myobject: {},
  myobjectArray: []
}));

console.log('test 6');
deserialize(serialize({
  mybool: null,
  myboolArray: null,
  myuint32: null,
  myuint32Array: null,
  mystring: null,
  mystringArray: null,
  myobject: null,
  myobjectArray: null
}));

*/

module.exports = router;
