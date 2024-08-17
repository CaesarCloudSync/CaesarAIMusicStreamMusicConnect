import socketio
const socket = io.connect("http://localhost:4000");
# standard Python
sio = socketio.SimpleClient()
sio.connect('http://192.168.0.19:9090')
sio.emit('welcome', {'foo': 'bar'})
print('my sid is', sio.sid)