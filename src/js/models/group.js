var Model = require("clay-model");
var ClayVfr = require("clay-model-vfr");

var Group = Model.setup("Group", ["Id", "Name", "Amount__c", "Type__c"] );
Group.ajax = ClayVfr;
Group.ajax.namespace = '';

Group.selectByType = function(type){
	return Group.findAllByAttribute("Type__c", type);
}

module.exports= Group;
