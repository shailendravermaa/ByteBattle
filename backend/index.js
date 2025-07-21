require('dotenv').config();
const express = require('express')
const app = express();

const main =  require('./src/config/db')
const cookieParser =  require('cookie-parser');
const authRouter = require("./src/routes/userAuth");
const redisClient = require('./src/config/redis');
const problemRouter = require("./src/routes/problemCreator");
const submitRouter = require("./src/routes/submit")
const aiRouter = require("./src/routes/aiChatting")
const videoRouter = require("./src/routes/videoCreator");
const cors = require('cors')

// console.log("Hello")

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://bytbattle.netlify.app',
      'https://byte-battle-t14d.vercel.app',
      'https://byte-battle-t14d-git-main-shailendra-s-projects-99ab3c11.vercel.app',
      'https://byte-battle-t14d-l4tinzot3-shailendra-s-projects-99ab3c11.vercel.app'
      
    ];
    
    console.log("Incoming origin:", origin); // 👈 LOG HERE
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Authorization", "Content-Type"],
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);
app.use('/ai',aiRouter);
app.use("/video",videoRouter);
app.get('/', (req, res)=>{
    res.send({
        activeStatus:true,
        error:false
    })
})


const InitalizeConnection = async ()=>{
    try{

        await Promise.all([main(),redisClient.connect()]);
        console.log("DB Connected");
        
        app.listen(process.env.PORT || 8000, ()=>{
            console.log("Server listening at port number: "+ process.env.PORT);
        })

    }
    catch(err){
        console.log("Error: "+err);
    }
}


InitalizeConnection();


module.exports = app;