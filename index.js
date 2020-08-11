const http = require("http");
const port = process.env.PORT || 3000;


const errorOutput = `<html>
<body>
<center>
<h1>404 error</h1>
</center>
</body>
</html>`;


const server = http.createServer((request, response) => {
	let urlParameter = request.url;
	response.setHeader("Content-Type", "text/html");
	response.setHeader("Access-Control-Allow-Origin", "*");

	if (urlParameter === "/task1") {
				response.writeHead(200);
				response.write("<h1>Hi this is data<h1>");
        response.end();
  }
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
   else {
		response.setHeader("Content-Type", "text/html");
		response.writeHead(404);
		response.write(errorOutput);
		response.end();
	}

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
	console.log(`Server running at port ` + port);
});