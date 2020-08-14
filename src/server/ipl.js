function extractMatchesData(fileName){
    let csvToJson = require('convert-csv-to-json');
    let json = csvToJson.fieldDelimiter(",").getJsonFromCsv(fileName);
    return json;
}


function executeQuery(connection,query){
return new Promise((resolve,reject)=>{
    connection.connect((error)=>{
    if(error){
      reject(error);
    }
    connection.query(query,(error,results,fields)=>{
      if(error) {
        reject(error);
      }
      console.log();
        resolve(results);
    });
    connection.end();
  });
});
}

function loadDataQuery(connection,query,values){
return new Promise((resolve,reject)=>{
    connection.connect((error)=>{
    if(error){
      reject(error);
    }
    connection.query(query,values,(error,results,fields)=>{
      if(error) {
        reject(error);
      }
      console.log();
        resolve(results);
    });
    connection.end();
  });
});
}


//_________________played matches per year
function matchesPerYear(connection,query){
    return executeQuery(connection,query)
    .then((resolve)=>{
        let value = {};
        value = resolve.reduce((accumulator,element)=>{
            accumulator[element.season] = element.matches;
            return accumulator;
        },value);
        return value;
    })
}

// winning matches per year per Team
function teamsWithWinningMatchesPerYear(connection, query){
    return executeQuery(connection,query)
    .then((resolve)=>{
         let value = {};
         value = resolve.reduce((accumulator,element)=>{
            let allTeam = {};
             if(accumulator[element.season] === undefined){
             }else{
                allTeam = accumulator[element.season];
             }
            allTeam[element.winner] = element.matches;
            accumulator[element.season] = allTeam;
             return accumulator;
         },value);
        return value;
    })
}

// Extra runs conceded per team in the year 2016
function extraRunsPerTeamIn2016(connection,query){
    return executeQuery(connection,query)
    .then((resolve)=>{
        let extraConcededRun = resolve.reduce((accumulator,element)=>{
            accumulator[element.batting_team] = element.extra_conceded_runs;
            return accumulator;
        },{});
        return extraConcededRun;
    })
}


//________________ Top 10 economical bowlers in the year 2015
function topTenEconomicalBowler(connection,query){
    return executeQuery(connection,query)
    .then((economyRate)=>{
         let topTenBowler = economyRate.reduce((accumulator,element)=>{
            accumulator[element.bowler] = element.economical_rate;
            return accumulator;
        },{});
        return topTenBowler;
    })
}




module.exports.extractMatchesData = extractMatchesData;
module.exports.matchesPerYear = matchesPerYear;
module.exports.teamsWithWinningMatchesPerYear = teamsWithWinningMatchesPerYear;
module.exports.extraRunsPerTeamIn2016 = extraRunsPerTeamIn2016;
module.exports.topTenEconomicalBowler = topTenEconomicalBowler;
module.exports.executeQuery = executeQuery;
module.exports.loadDataQuery = loadDataQuery;

