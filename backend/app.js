const http = require("http");
const Timer = require("./controllers/timerController");
const { getReqData } = require("./utils");
const { DatabaseTimer } = require("./models/timerModel");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
   
    
   
    if (req.method === 'OPTIONS') {
        res.writeHead(
            200,
            {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            }
        )
        res.end();
    } else if (req.url.match(/\api\/timers/) && req.method === "GET") {
        const token = req.url.split('=')[1];
        // let timer_data = await getReqData(req);
        // const  timer = JSON.parse(timer_data);
        const timers = await (new DatabaseTimer().GetTimers(token));
        // console.log(timers);
        res.writeHead(200,
            {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            });
        res.end(JSON.stringify(timers));
    }

    else if (req.url === "/api/CreateTimer" && req.method === "POST") {

        let timer_data = await getReqData(req);
        const  timer = JSON.parse(timer_data);
        console.log(timer);
        let newTimer = await new DatabaseTimer().CreateTimer(timer.timer_name, timer.timer_runnig_time, timer.token_user);
        res.writeHead(200, { 
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        });
        res.end(JSON.stringify({ message: newTimer }));
    }
    ///СТАРТ
    else if (req.url.match(/\/api\/Resume\/([0-9]+)/) && req.method === "POST") {
        const id_timer = req.url.split('/')[3];

        let timer_data = await getReqData(req);
        const  timer = JSON.parse(timer_data);
      
        let newTimer = await new DatabaseTimer().ResumeTime(id_timer, timer.token_user);
        res.writeHead(200, { 
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        });
        res.end(JSON.stringify({ message: "Таймер пошел" }));
    }
    //остатановка 
    else if (req.url.match(/\/api\/Pause\/([0-9]+)/) && req.method === "POST") {
        const id_timer = req.url.split('/')[3];

        let timer_data = await getReqData(req);
        const  timer = JSON.parse(timer_data);
      
        let newTimer = await new DatabaseTimer().PauseTime(id_timer, timer.token_user);
        res.writeHead(200, { 
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        });
        res.end(JSON.stringify({ message: "Таймер остановился" }));
    }

    else if (req.url === "/api/login" && req.method === "POST") {

        let user_data = await getReqData(req);
        const  user = JSON.parse(user_data);
        
        let LoginUser =  await new DatabaseTimer().LoginUser( user.Login, user.Password);
        res.writeHead(200, { 
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*' 
        });
        res.end(JSON.stringify({ token_user: LoginUser }));
    }

    else if (req.url.match(/\api\/logout/) && req.method === "GET") {

        const token = req.url.split('=')[1];

         await new DatabaseTimer().logout(token);
        res.writeHead(200, { 
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'

        });
        res.end();
    }

    else if (req.url === "/api/signup" && req.method === "POST") {
        try {

            let user_data = await getReqData(req);
            const user = JSON.parse(user_data);

            let newUser = await new DatabaseTimer().CreateUser(user.FirstName, user.LastName, user.Login, user.Password);
            res.writeHead(200, { 
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            });
            res.end(JSON.stringify({ message: 'Account created' }));
        } catch (error) {
            if (error.login !== undefined){
                res.writeHead(401, { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*',
                    'Access-Control-Allow-Headers': '*'
                 });
                res.end(JSON.stringify({ error }));
            }
        }
        
    }

    else {
        res.writeHead(404, { 
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});
