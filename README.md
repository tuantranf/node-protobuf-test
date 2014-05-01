Simple api server for Protocol buffer testing

# protobuf
https://github.com/chrisdew/protobuf/

# Init
* npm install

# Test run
Execution of ```npm start``` results in:
Run up on 3000 port
http://localhost:3000

# API
## serialize JSON to  binary
POST http://localhost:3000/serialize

## deserialize JSON to  binary
POST http://localhost:3000/deserialize

## flow post with binary and get binary response
POST http://localhost:3000/flow

## Other
We have some test when startup
```
test 1
Serialized {} length: 0
Deserialized 0 bytes:  {}
test 2
Serialized {"mybool":true,"myboolArray":[true,false,true,false],"myuint32":1,"myuint32Array":[0,1,2,1,0],"mystring":"test","mystringArray":["test","","empty"],"myobject":{"mybool":true},"myobjectArray":[{"mybool":true},{"mybool":false},{},{"myuint32":1}]} length: 61
Deserialized 61 bytes:  {"mybool":true,"myboolArray":[true,false,true,false],"myuint32":1,"myuint32Array":[0,1,2,1,0],"mystring":"test","mystringArray":["test","","empty"],"myobject":{"mybool":true},"myobjectArray":[{"mybool":true},{"mybool":false},{},{"myuint32":1}]}
test 3
Failed to Serialize {"mybool":true,"myboolArray":[true,null,true,false],"myuint32":1,"myuint32Array":[0,1,null,1,0],"mystring":"test","mystringArray":["test",null,"empty"],"myobject":{"mybool":null},"myobjectArray":[{"mybool":true},null,{},{"myuint32":1}]}  error: [Error: Not an object]
Failed to Deserialize undefined
test 4
Serialized {"mybool":true,"myboolArray":[true,null,true,false],"myuint32":1,"myuint32Array":[0,1,null,1,0],"mystring":"test","mystringArray":["test",null,"empty"],"myobject":{"mybool":null},"myobjectArray":[{"mybool":true},{},{},{"myuint32":1}]} length: 61
Deserialized 61 bytes:  {"mybool":true,"myboolArray":[true,false,true,false],"myuint32":1,"myuint32Array":[0,1,0,1,0],"mystring":"test","mystringArray":["test","null","empty"],"myobject":{},"myobjectArray":[{"mybool":true},{},{},{"myuint32":1}]}
test 5
Serialized {"mybool":false,"myboolArray":[],"myuint32":0,"myuint32Array":[],"mystring":"","mystringArray":[],"myobject":{},"myobjectArray":[]} length: 8
Deserialized 8 bytes:  {"mybool":false,"myuint32":0,"mystring":"","myobject":{}}
test 6
Serialized {"mybool":null,"myboolArray":null,"myuint32":null,"myuint32Array":null,"mystring":null,"mystringArray":null,"myobject":null,"myobjectArray":null} length: 0
Deserialized 0 bytes:  {}
```
