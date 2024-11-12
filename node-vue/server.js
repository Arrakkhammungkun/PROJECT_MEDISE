const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./route/routes');  
const productRouter = require('./route/product');
const { router: categories } = require('./route/categories');
var session = require('express-session')
var stripe=require('stripe')('sk_test_51PvixoRoShI4RoXMUOYR74l82l8NzXGb2TxcLNUITcDp250EsOx8t3VCXuGXaZmuN93pCIPMPhYRraBRSJsET3eE00LdlCFPye');
const doctor =require('./route/docters')
const fs = require('fs');
const path = require('path'); 
const axios = require('axios');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const http = require('http');
const { PeerServer } = require('peer');
const peerServer = PeerServer({ port: 3001, path: '/' });
const Appointment =require('./route/Appointment')
const adminRoutes = require('./route/admin');
const app = express();

//ทดสอบ


const { Server } = require('socket.io');
const server = http.createServer(app);


const socketio = require('socket.io');
app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST','PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST'],
    credentials: true,
  }
});





















const users = {};

io.on('connection', (socket) => {
  // console.log('User connected:', socket.id);

  // เก็บ ID ของผู้ใช้
  socket.on('register', (userId) => {
    users[userId] = socket.id;
    // console.log(`User registered: ${userId} with socket ID: ${socket.id}`);
  });

  // รับข้อความจากผู้ใช้
  socket.on('private message', (data) => {
    const { recipientId, message } = data;
    const recipientSocketId = users[recipientId];
    
    if (recipientSocketId) {
      socket.to(recipientSocketId).emit('private message', {
        message,
        senderId: socket.id,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // ลบผู้ใช้ที่ตัดการเชื่อมต่อออก
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});








// const io = socketio(server, {
//   cors: {
//     origin: "http://localhost:5173", // URL ของ Vue.js Frontend
//     methods: ["GET", "POST"],
//   },
// });


// app.get('/api/room', (req, res) => {
//   try {
//     const roomId = uuidv4();
//     res.json({ roomId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });



// let currentRoomId;

// io.on('connection', (socket) => {
//   socket.on('join-room', (roomId, userId) => {
//     currentRoomId = roomId; // เก็บ roomId ที่เข้าร่วม
//     socket.join(roomId);
//     socket.broadcast.to(roomId).emit('user-connected', userId);


//     socket.on('disconnect', () => {
//       socket.broadcast.to(roomId).broadcast.emit('user-disconnected', userId);
//     });
//   });
// });










// const io=new Server(server,{
//   cors:{
//     origin:"http://localhost:5173",
//     methods: ['GET', 'POST'],
//     credentials: true,
//   }
// })
// app.get('/create-room', (req, res) => {
//   const roomId = uuidv4();  
//   res.json({ roomId });     
// });

// const users = {};

// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);
  
//   socket.on('joinRoom', (roomId) => {
//     socket.join(roomId); 
//     socket.roomId = roomId;
//     console.log(`User ${socket.id} joined room: ${roomId}`);
//     const usersInRoom = getUsersInRoom(roomId); 
//     socket.emit("existingUsers", usersInRoom);
//     socket.to(roomId).emit('newUser', socket.id); 
//     socket.on('signal', (data) => {
//       console.log(`Signal received from ${socket.id}:`, data);
//       socket.to(roomId).emit('signal', { ...data, userId: socket.id }); 
//     });
//   });
//   socket.on('startCall', (data) => {
  
//     socket.broadcast.emit('receiveCall', data);
//   });
//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);

//     socket.to(socket.roomId).emit('userDisconnected', socket.id);
//   });
//   function getUsersInRoom(roomId) {
//     return users[roomId] || [];
//   }

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
    
    
//     if (users[socket.roomId]) {
//       users[socket.roomId] = users[socket.roomId].filter(userId => userId !== socket.id);
//     }

//     socket.to(socket.roomId).emit('userDisconnected', socket.id);
//   });
// });

//ทดสอบ

mongoose.set('strictQuery', false);

app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));





app.use(express.json());
app.use(express.urlencoded({ extended: true }));
  app.use(session({
    secret: 'your-secret', 
    resave: false,         
    saveUninitialized: false, 
    cookie: { 
      secure: process.env.NODE_ENV === 'production' || process.env.USE_HTTPS === 'true', 
      httpOnly: true,   
      sameSite: 'Lax'  ,
      maxAge: 24 * 60 * 60 * 1000 
    }
  }));







app.use(routes);
app.use('/api/categories', categories); 
app.use('/api/product', productRouter); 
app.use('/api/doctors', doctor); 
app.use('/api/',Appointment); 
app.use('/admin', (req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`); 
  next();
}, adminRoutes);





// Start the server
server.listen(3000, function check(err) {
  if (err) console.log("Error......!!!");
  else console.log("Started......!!!");
});



mongoose.connect('mongodb://localhost:27017/abs', {

})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB', err);
});
app.get('/session', (req, res) => {
  res.json(req.session);
});



app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body; 
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, 
      currency: 'thb', 
      payment_method_types: ['card'],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});



const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Uploads folder created');
}

const getAccessToken = async (code) => {
  const response = await axios.post('https://zoom.us/oauth/token', null, {
    params: {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.ZOOM_REDIRECT_URI,
    },
    auth: {
      username: process.env.ZOOM_CLIENT_ID,
      password: process.env.ZOOM_CLIENT_SECRET,
    },
  });
  return response.data.access_token; // คืนค่า Access Token ที่ใช้ในการเรียก API
};



// Route สำหรับรับ authorization code และแลกเป็น Access Token
app.get('/auth/zoom/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const accessToken = await getAccessToken(code);
    req.session.accessToken = accessToken; // ตรวจสอบว่าถูกตั้งค่าใน session หรือไม่
    req.session.refreshToken = accessToken.refresh_token;
    res.send('Access Token received!');
  } catch (error) {
    console.error('Error getting access token:', error.response?.data || error.message);
    res.status(500).send('Error getting access token');
  }
});

app.post('/create-meeting', async (req, res) => {
  const { topic, startTime, duration } = req.body;
  let accessToken = req.headers.authorization?.split(' ')[1];
  let refreshToken = req.session.refreshToken; // เก็บ Refresh Token ไว้ด้วย

  if (!accessToken) {
    return res.status(401).send('Access token not found');
  }

  try {
    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        topic,
        type: 2, // Scheduled meeting
        start_time: startTime,
        duration: duration,
        settings: {
          host_video: true,
          participant_video: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // ถ้า Access Token หมดอายุ, ทำการรีเฟรชโทเค็น
      try {
        const tokens = await refreshAccessToken(refreshToken);
        accessToken = tokens.accessToken;
        refreshToken = tokens.refreshToken;

        // เก็บ Access Token และ Refresh Token ใหม่ลงใน session
        req.session.accessToken = accessToken;
        req.session.refreshToken = refreshToken;

        // ลองสร้าง meeting อีกครั้งด้วย Access Token ใหม่
        const retryResponse = await axios.post(
          'https://api.zoom.us/v2/users/me/meetings',
          {
            topic,
            type: 2,
            start_time: startTime,
            duration,
            settings: {
              host_video: true,
              participant_video: true,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        res.json(retryResponse.data);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError.response?.data || refreshError.message);
        res.status(500).send(`Error refreshing access token: ${refreshError.response?.data || refreshError.message}`);
      }
      
    } else {
      console.error('Error creating meeting:', error.response?.data || error.message);
      res.status(500).send('Error creating meeting');
    }
  }
});
app.get('/test-session', (req, res) => {
  res.json({ accessToken: req.session.accessToken });
});
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post('https://zoom.us/oauth/token', null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      auth: {
        username: process.env.ZOOM_CLIENT_ID,
        password: process.env.ZOOM_CLIENT_SECRET,
      },
    });
    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    };
  } catch (error) {
    console.error('Error refreshing token:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);


    throw error;
  }
};

