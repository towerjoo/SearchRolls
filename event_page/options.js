// Saves options to localStorage.
function save_options() {
	var urls = [];
	for(var i=1; i<=10; i++){
		var se = $("#se" + i).val().trim();
		var query = $("#query" + i).val().trim();
		if (se == ""){
			continue;
		}
		if (!query || query.length <= 4 || query.indexOf("[KEYWORD]") == -1 || query.substr(0, 4) != "http") {
			continue;
		}
		urls.push({"se" : se, "query" : query});
	}
	localStorage["urls"] = JSON.stringify(urls);
	$(".alert").show();
}

document.addEventListener('DOMContentLoaded', load_user_ses);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#reset').addEventListener('click', reset_options);
var allbtns = document.querySelectorAll('.btn-clear');
for(var i=0; i<allbtns.length; i++){
	allbtns[i].addEventListener('click', clear);
}

var inputs = document.querySelectorAll('input');
for(var i=0; i<inputs.length; i++){
	inputs[i].addEventListener('focus', hide_alert);
}

function load_user_ses(){
	var defaults = default_search_enginees;
	var urls = JSON.parse(localStorage["urls"]) || defaults;
	var idx = 1;
	for (var se in urls) {
		var url = urls[se];
		$("#se" + idx).val(url.se);
		$("#query" + idx).val(url.query);
		idx ++;
	}
}

function clear(ob){
	var inputs = ob.toElement.parentElement.querySelectorAll("input");
	for (var input in inputs){
		input = inputs[input];
		$(input).val("");
	}
	$(inputs[0]).focus();
}

function reset_options(){
	localStorage["urls"] = JSON.stringify(default_search_enginees);
	location.href = location.href;
}

function hide_alert(){
	$(".alert").hide();
}
