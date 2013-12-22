//javascript lesson validator

var error_code_0 = "Oops, try again! You did not type anything!";

function js_lesson1(str){

	if (str.length == 0){
		return error_code_0;
	}
	
	else{
		var answer1_regex = /^[\s]*"[a-z,\s]*"[\s]*$/i;
		if (answer1_regex.test(str)){
			return true;
		}
		else{
			return "Oops, try again! There was a problem with your syntax.";
		}
	}
}

function js_lesson2(str){

	if (str.length == 0){
		return error_code_0;
	}
	
	else{
		var answer1_regex = /^[\s]*"[a-z,\s]*"\.length[\s]*$/i;
		if (answer1_regex.test(str)){
			return true;
		}
		else{
			return "Oops, try again! Did you write \"yourName\".length correctly?";
		}
	}
}

function js_lesson3(str){
	if (str.length == 0){
		return error_code_0;
	}
	
	else{
		var answer1_regex = /^[\s]*alert\("[a-z,0-9,\s]*"\)[\s]*$/i;
		if (answer1_regex.test(str)){
			return true;
		}
		else{
			return "Oops, try again! Did you write alert(\"yourInput\") correctly?";
		}
	}
}