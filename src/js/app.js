var Layout = require("./layout");
document.querySelector(".container").innerHTML = Layout();

var Group = require("./models/group");

Group.query("select id , Name, Type__c, Amount__c from Group__c")
.done()

var Graph = require("./controllers/graph");
var Detail = require("./controllers/detail");


new Graph( document.querySelector(".graph") );
new Detail( document.querySelector(".detail") );