var express = require('express'),
	bodyParser  = require('body-parser'),
    etsman = require('etsman'),
    fs = require('fs'),
    app = express();

exports.startManager = function(port,manageSystemMessage,manageExperimentMessage,monitorEnabled) {
  // Optional parameter: default set to false
  if (typeof monitorEnabled === 'undefined') { monitorEnabled = false; }

  console.info(""+new Date());
  console.info("+--------------------------------------+");
  console.info("|        Manager is starting...        |");
  console.info("+--------------------------------------+");
  
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.post('/', function(request, response) {
    var message = JSON.parse(request.body.message);
    if (message)
      if (message.sender == 'system'){
      	if(monitorEnabled) logToMonitor(response,message);
        manageSystemMessage(response, message);
      }else{
      	if(monitorEnabled) logToMonitor(response,message);
        manageExperimentMessage(response, message);
      }
    response.end();
  });

  app.listen(port);

  manageSystemMessage('resp', 'message YEA');
}

function logToMonitor(response,message) {
  console.log('Monitor: '+message);
}
//module.exports.logToMonitor = logToMonitor;

  //console.log("Instance "+message.instanceId+" User "+message.clientId+" Score "+message.params); 
  /*fs.appendFile('./guesswhere/result.txt',(new Date())+"Instance "+message.instanceId+" User "+message.clientId+" Score "+message.params+" \n", function (err) {
        if (err) throw err;
      });  */
/*
exports.logToMonitor = function(response,message) {
  console.log('Monitor: '+message);


}*/