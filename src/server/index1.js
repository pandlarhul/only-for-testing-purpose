const fs = require("fs");
const package = require('../server/ipl');
const http = require('http');
const pathModule = require("path");
const mysql = require("mysql");
const { rejects } = require("assert");
const pwd = __dirname;
// const {PORT,HOST_NAME,USER,PASSWORD,DATABASE_NAME}
//         = require(pwd+"/config");



const extractMatchesData = package.extractMatchesData;


// importing all required modules 
const matchesPerYear = package.matchesPerYear;
const teamsWithWinningMatchesPerYear = package.teamsWithWinningMatchesPerYear;
const extraRunsPerTeamIn2016 = package.extraRunsPerTeamIn2016;
const topTenEconomicalBowler = package.topTenEconomicalBowler;
const executeQuery = package.executeQuery;
const loadDataQuery = package.loadDataQuery;



function writeDataToJsonFile(data,targetFile){
    let jsonString = JSON.stringify(data);
    fs.writeFile(targetFile, jsonString, (err) => {
        if (err) {  console.error(err);  return; };
    });
}

// const PORT = "3306";
// const HOST_NAME = "us-cdbr-east-02.cleardb.com"
// const USER = "b258267de28220";
// const PASSWORD= "850330cb";
// const DATABASE_NAME = "heroku_9936182822b94a5";


const PORT = "3306";
const HOST_NAME = "localhost"
const USER = "rahul";
const PASSWORD= "rahul";
const DATABASE_NAME = "udar";


const config = {
  host:HOST_NAME,
  user : USER,
  password: PASSWORD,
  database: DATABASE_NAME,
  port: PORT
};


console.log("config= "+config);
let connection  = mysql.createConnection(config);
//console.log(connection);

const played_matches_query = `create table if not exists played_matches(
id int(11) primary key,
season varchar(4) not null,
city varchar(30) not null,
date date not null,
team1 varchar(100) not null,
team2 varchar(100) not null,
toss_winner varchar(100) not null,
toss_decision varchar(30) not null,
result  varchar(30) not null,
dl_applied int(11) not null,
winner varchar(100) not null,
win_by_runs int(11) default 0 not null,
win_by_wickets int(11) default 0 not null,
player_of_match varchar(50) not null,
venue varchar(100) not null,
umpire1 varchar(40) not null,
umpire2 varchar(40) not null,
umpire3 varchar(40) not null
)`


const match_deliveries_query =`create table if not exists match_deliveries(
match_id int not null,
inning int not null,
batting_team varchar(100),
bowling_team varchar(100),
over int not null,
ball int not null,
batsman varchar(50) not null,
non_striker varchar(50) not null,
bowler varchar(50) not null,
is_super_over int not null,
wide_runs int not null default 0,
bye_runs int not null default 0,
legbye_runs int not null default 0,
noball_runs int not null default 0,
penalty_runs int not null default 0,
batsman_runs int not null default 0,
extra_runs int not null default 0,
total_runs int not null default 0,
player_dismissed varchar(50),
dismissal_kind varchar(30),
fielder varchar(50)
)`;
const played_match_file_path = 
 "./../data/datasets_323_7768_matches.csv";

//const loadData = `LOAD DATA local INFILE '/home/rahul/drive e/mountblue-carriculam/secondweek/ipl-data-project2/src/data/datasets_323_7768_matches.csv' INTO TABLE played_matches  FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS`

let loadData = `insert into played_matches values ?`;

//__________created table for played_matches
// executeQuery(connection,played_matches_query).then((result)=>{
//   console.log(result);  
// }).then(()=>{
//   connection = mysql.createConnection(config);
//   let filePath = __dirname + "/../data/datasets_323_7768_matches.csv"
//   let played_matches = extractMatchesData(filePath);
//   played_matches = played_matches.slice(2);
//     let values = played_matches.reduce((accumulator,element)=>{
//       accumulator.push(Object.values(element));
//       return accumulator;
//     },[]);
//     console.log(values);
//         loadDataQuery(connection,loadData,[values]);
      

// }).
// catch((err)=>{
//   console.log(err);
// });

//__________load data into played_matches
// executeQuery(connection,loadData).then((result)=>{
//     console.log(result);
//     }).catch((err)=>{
//     console.log(err);
//   });



let queryForMatchesPerYear = `select season,
count(id) matches from played_matches group by season`;

// //______________winning matches per year per team
let queryForWinningMatchesPerYearPerTeam = `select season,winner,
count(id) matches from played_matches group by season,
winner order by season,winner`;


// played matches per year
// let result1 = matchesPerYear(connection,queryForMatchesPerYear);
// result1.then(((matchesPerYear)=>{
//   console.log(matchesPerYear);
// //  writeDataToJsonFile(matchesPerYear,pwd+"/../output/matchesPerYear.json");
// })).catch((error)=>{
//   console.log(error.message);
// });



// let winningMatchesPerYearData = 
//   teamsWithWinningMatchesPerYear(connection,queryForWinningMatchesPerYearPerTeam);
// winningMatchesPerYearData.then(((matchesPerYear)=>{
//   //writeDataToJsonFile(matchesPerYear,pwd+"/../output/winMatchesPerYearPerTeam.json");
// console.log(matchesPerYear);
// })).catch((error)=>{
//   console.log(error.message);
// });


// //______________extra run conceded per team in year 2016
// let queryForExtraRunConceded = `select batting_team,
// sum(extra_runs) as extra_conceded_runs from match_deliveries 
// where exists 
// (select id from played_matches where season=2016 and id=match_id)
// group by batting_team;
// `;
// extraRunsPerTeamIn2016(connection,queryForExtraRunConceded).
// then(((extraRunConceded)=>{
//   writeDataToJsonFile(extraRunConceded,pwd+"/../output/extraRunPerTeamIn2016.json");
// })).catch((error)=>{
//   console.log(error.message);
// });
// ;


// //_______________top ten economical bowler in 2015
// let queryForEconomicalBowler = `select bowler,
// sum(total_runs-penalty_runs-bye_runs-legbye_runs)/(count(ball)/6)
//  economical_rate 
// from match_deliveries where exists 
// (select id from played_matches where season=2015 and id=match_id)
//  group by bowler 
// order by economical_rate limit 10;`;

// topTenEconomicalBowler(connection,queryForEconomicalBowler)
// .then(((topTenBowler)=>{
//    writeDataToJsonFile(topTenBowler,pwd+"/../output/top_ten_economical_bowler_2015");
// })).catch((error)=>{
//   console.log(error.message);
// });



// let filePath1 = path + "matchesPerYear.json";
// let filePath2 = path + "winMatchesPerYearPerTeam.json";
// let filePath3 = path + "extraRunPerTeamIn2016.json";
// let filePath4 = path + "topTenEcnomicalBowlerIn2015.json";

const errorOutput = `<html>
<body>
<center>
<h1>404 error</h1>
</center>
</body>
</html>`;
// let path = pwd +  "/../output/";

// //create a server
// http.createServer((request,response)=>{
//   let urlParameter = request.url;
//   response.setHeader("Content-Type", "application/json");
//   response.setHeader('Access-Control-Allow-Origin',"*");
//   console.log(urlParameter);
  
//   if(urlParameter === "/match_per_year"){
//     fs.readFile(filePath1 , 'utf-8',(error,data)=>{
//       if(error){
//         response.writeHead(404);
//       }else {
//         response.writeHead(200);
//         response.write((data));
//         response.end();
//       }
//     });  
//   }else if(urlParameter === '/winning_matches_per'){
//     fs.readFile(filePath2 , 'utf-8',(error,data)=>{
//       if(error){
//         response.writeHead(404);
//       }else {
//         response.writeHead(200);
//         response.write((data));
//         response.end();
//       }
//     });
//   }else if(urlParameter === '/extra_run_conceded_per_team_2016'){
//     fs.readFile(filePath3 , 'utf-8',(error,data)=>{
//       if(error){
//         response.writeHead(404);
//       }else {
//         response.writeHead(200);
//         response.write((data));
//         response.end();
//       }
//     });
//   }else if(urlParameter === '/top_ten_economical_bowler_2015'){
//     fs.readFile(filePath4 , 'utf-8',(error,data)=>{
//       if(error){
//         response.writeHead(404);
//         response.write("file not found");
//       }else {
//         response.writeHead(200);
//         response.write((data));
//         response.end();
//       }
//     });
//   }else{
//   }
// }).listen(8080);



http.createServer((request,response)=>{
  let urlParameter = request.url;
  response.setHeader("Content-Type", "application/json");
  response.setHeader('Access-Control-Allow-Origin',"*");
  console.log(urlParameter);
  
  if(urlParameter === "/match_per_year"){
    connection = mysql.createConnection(config);
      matchesPerYear(connection,queryForMatchesPerYear)
      .then(((matchesPerYear)=>{
      response.writeHead(200);
      response.write(JSON.stringify(matchesPerYear));
      response.end();
  
})).catch((error)=>{
  console.log(error.message);
});

         
  }else if(urlParameter === '/winning_matches_per'){
    connection = mysql.createConnection(config);
      teamsWithWinningMatchesPerYear(connection,queryForWinningMatchesPerYearPerTeam)
      .then(((winMatchesPerYear)=>{
      response.writeHead(200);
      response.write(JSON.stringify(winMatchesPerYear));
      response.end();
  
  })).catch((error)=>{
    console.log(error.message);
  });
}else if(urlParameter === '/extra_run_conceded_per_team_2016'){
        response.writeHead(200);
    //    response.write((data));
        response.end();
  }else if(urlParameter === '/top_ten_economical_bowler_2015'){
        response.writeHead(200);
     //   response.write((data));
        response.end();
  }else{
        response.setHeader("Content-Type", "text/html");
        response.writeHead(204);
        response.write(errorOutput);
        response.end();
    
  }
}).listen(8080);

