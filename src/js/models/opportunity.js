var Model = require("clay-model");
var ClayVfr = require("clay-model-vfr");

var Opportunity = Model.setup("Opportunity", ["Id", "Name", "AccountSource", "Type", "CloseDate","Amount"] );
Opportunity.ajax = ClayVfr;
Opportunity.ajax.namespace = '';

module.exports= Opportunity;
