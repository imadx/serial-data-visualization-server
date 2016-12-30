var max_length = 0;
module.exports = function(){

	if(arguments.length == 0){
		console.log(" ");
		return;
	}

	var tag = arguments[0];
	var tag_length = tag.length;

	if(tag_length > max_length) {
		max_length = tag_length;
	} else {
		for (var i = max_length - tag_length-1 ; i >= 0; i--) {
			tag  = ' ' + tag;
		}
	}

	var str = ' [' + tag.toUpperCase() + ']  ';
	for(var i=1; i< arguments.length; i++){
		str += arguments[i] + ' ';
	}
	console.log(str);
}