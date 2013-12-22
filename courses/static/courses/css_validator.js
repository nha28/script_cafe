//error codes
var error_code_0 = "Oops, try again! You did not type anything!";

function css_lesson1(str)
{
	if (str.length == 0){
		return error_code_0;
	}
	
	else{
		var answer1_regex = /^[\s]*h1[\s]*\{[\s]*color[\s]*\:[\s]*blue[\s]*\;[\s]*\}[\s]*$/i;
		if (answer1_regex.test(str)){
			return true;
		}
		else{
			if (!str.match("h1")){
				return "Oops, try again! Make sure you put \"h1\" accordingly.";
			}
			else if (!str.match("color")){
				return "Oops, try again! Make sure you put \"color\" accordingly.";
			}
			else if (!str.match("blue")){
				return "Oops, try again! Make sure you put \"blue\" accordingly.";
			}
			else if (!str.match("{")){
				return "Oops, try again! Make sure you put have your \"{\" in the script.";
			}
			else if (!str.match("}")){
				return "Oops, try again! Make sure you put have your \"}\" in the script.";
			}
			else if (!str.match(":")){
				return "Oops, try again! Make sure you put have your \":\" in the script.";
			}
			else if (!str.match(";")){
				return "Oops, try again! Make sure you put have your \";\" in the script.";
			}
			else{
				return "Oops, looks like the sequence of the tags is not right or you have put some unnecessary script in the box. Please double check!";
			}
		}
	}
}

function css_lesson2(str)
{
	if (str.length == 0){
		return error_code_0;
	}
	
	else{
		var answer1_regex = /^[\s]*span[\s]*\{[\s]*font-family[\s]*\:[\s]*cursive[\s]*\;[\s]*\}[\s]*$/i;
		if (answer1_regex.test(str)){
			return true;
		}
		else{
			if (!str.match("span")){
				return "Oops, try again! Make sure you put \"span\" accordingly.";
			}
			else if (!str.match("font-family")){
				return "Oops, try again! Make sure you put \"font-family\" accordingly.";
			}
			else if (!str.match("cursive")){
				return "Oops, try again! Make sure you put \"cursive\" accordingly.";
			}
			else if (!str.match("{")){
				return "Oops, try again! Make sure you put have your \"{\" in the script.";
			}
			else if (!str.match("}")){
				return "Oops, try again! Make sure you put have your \"}\" in the script.";
			}
			else if (!str.match(":")){
				return "Oops, try again! Make sure you put have your \":\" in the script.";
			}
			else if (!str.match(";")){
				return "Oops, try again! Make sure you put have your \";\" in the script.";
			}
			else{
				return "Oops, looks like the sequence of the tags is not right or you have put some unnecessary script in the box. Please double check!";
			}
		}
	}
}

function css_lesson3(str)
{	
	if (str.length == 0){
		return error_code_0;
	}
	
	else{
		var answer1_regex = /^[\s]*\/\*[\s]*COMMENT[\s]*\*\/[\s]*$/i;
		if (answer1_regex.test(str)){
			return true;
		}
		else{
			if (!str.match(/\/\*/)){
				return "Oops, try again! Make sure you put \"/*\" accordingly.";
			}
			else if (!str.match(/\*\//)){
				return "Oops, try again! Make sure you put \"*/\" accordingly.";
			}
			else if (!str.match(/comment/i)){
				return "Oops, try again! Make sure you put \"COMMENT\" in between.";
			}
			else{
				return "Oops, looks like the sequence is not right or you have put some unnecessary script in the box. Please double check!";
			}
		}
	}
}