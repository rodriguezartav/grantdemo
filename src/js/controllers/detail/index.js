var Layout = require("./layout");

var Placeholder = require("./placeholder");

var Group = require("../../models/group");

function Detail(container){
	var _this = this;
	this.container = container;
	this.container.innerHTML = Placeholder();
	Group.bind("SELECT", function(group){ _this.render(group); });
}

Detail.prototype.render = function(group){
	var groups = Group.selectByType(group.type);
	this.container.innerHTML = Layout( {group: group, groups: groups } );
}

module.exports = Detail