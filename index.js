const http = require("http");
const port = process.env.PORT || 3000;
const mysql = require('mysql');

const errorOutput = `<html>
<body>
<center>
<h1>404 error</h1>
</center>
</body>
</html>`;

	
function performQuery(request,response,connection){
	 	
	  const mysql = require('mysql')
			connection.connect((error)=>{
				if(error)
				{
					console.log("error is found="+error.message);
						throw new Error(error);
				}
				else{
				connection.query("create table if not exists t1(id int,name varchar(40))",(error)=>{
					if(error){
						console.log("error is found at 5656"+error);
						throw error;
					}
					else{
						response.writeHead(200);
					response.write("connection successful");
					response.end();
					connection.end();
					}
					});
			}
    	});
		
}	


const server = http.createServer((request, response) => {
	let urlParameter = request.url;
	response.setHeader("Content-Type", "text/html");
	response.setHeader("Access-Control-Allow-Origin", "*");
	// const config = {
	// 	    user: 'rahul',
  //       host: 'localhost',
  //       database: 'practice',
  //       password: 'rahul',
	// 			port: 3306,
				
	// }

const config = {
		    user: 'b258267de28220',
        host: 'us-cdbr-east-02.cleardb.com',
        database: 'heroku_9936182822b94a5',
        password: '850330cb',
				port: 3306,
				
	}


	const connection  = mysql.createConnection(config);

if (urlParameter === "/task1") {
	try{
	performQuery(request,response,connection);
	}catch(error){
		console.log("calling="+error);
	}
}else{
	response.writeHead(200);
					response.write("connection Error");
					response.end();
}	
	//mysql://b258267de28220:850330cb@us-cdbr-east-02.cleardb.com/heroku_9936182822b94a5?reconnect=true

	

				// response.writeHead(200);
				// response.write("<h1>Hi this is data<h1>");
        // response.end();
  
	// } else if (urlParameter === "/winning_matches_per") {
	// 	fs.readFile(filePath2, "utf-8", (error, data) => {
	// 		if (error) {
	// 			response.writeHead(404);
	// 		} else {
	// 			response.writeHead(200);
	// 			response.write(data);
	// 			response.end();
	// 		}
	// 	});
	// } else if (urlParameter === "/extra_run_conceded_per_team_2016") {
	// 	fs.readFile(filePath3, "utf-8", (error, data) => {
	// 		if (error) {
	// 			response.writeHead(404);
	// 		} else {
	// 			response.writeHead(200);
	// 			response.write(data);
	// 			response.end();
	// 		}
	// 	});
	// } else if (urlParameter === "/top_ten_economical_bowler_2015") {
	// 	fs.readFile(filePath4, "utf-8", (error, data) => {
	// 		if (error) {
	// 			response.writeHead(404);
	// 			response.write("file not found");
	// 		} else {
	// 			response.writeHead(200);
	// 			response.write(data);
	// 			response.end();
	// 		}
	// 	});
  // }
  //  else {
	// 	response.setHeader("Content-Type", "text/html");
	// 	response.writeHead(404);
	// 	response.write(errorOutput);
	// 	response.end();
	// }

	// fs.readFile(filePath1, "utf-8", (error, data) => {
	// 	console.log(data);
	// 	if (error) {
	// 		res.writeHead(404);
	// 	} else {
	// 		res.setHeader("Content-Type", "application/json");
	// 		res.writeHead(200);
	// 		res.write(data);
	// 		res.end();
	// 	}
	// });
});

server.listen(port, () => {
	try{
		console.log(`Server running at port ` + port);
	} catch(error){
		console.log("error");
	}
});