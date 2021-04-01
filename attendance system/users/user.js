let destination = "http://localhost:8080/confirmation";
let endpoint = "http://localhost:3000/employees";


const queryString = window.location.search;

var getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};
let param = getParams(queryString);
let username = param.username;

document.getElementsByClassName("attendance-count")[0].innerHTML = param.attendancecount;
document.getElementsByClassName("late-count")[0].innerHTML = param.latecount;
document.getElementsByClassName("excuse-count")[0].innerHTML = param.excusecount;


$.get(endpoint+"?username="+username, async function(data){
    console.log(data);
    document.getElementsByClassName("fullname")[0].innerHTML = data[0].first_name +" "+ data[0].last_name;
    document.getElementsByClassName("name")[0].innerHTML = data[0].first_name +" "+ data[0].last_name;
    document.getElementsByClassName("username")[0].innerHTML = param.username;
    document.getElementsByClassName("email")[0].innerHTML = data[0].email;
    document.getElementsByClassName("age")[0].innerHTML = data[0].age;
    document.getElementsByClassName("address")[0].innerHTML = data[0].address;
    document.getElementsByClassName("address-info")[0].innerHTML = data[0].address;




    // document.getElementsByClassName("late-count")[0].innerHTML = param.latecount;
    // document.getElementsByClassName("excuse-count")[0].innerHTML = param.excusecount;
     
 });






