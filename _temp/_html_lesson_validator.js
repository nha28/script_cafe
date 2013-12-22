var html_ok = new Boolean();
//var lesson1_order;
//lesson2_order = new Array("html", "head", "title", "/title", "/head", "/html");
//lesson3_order = new Array("html", "head", "title", "/title", "/head", "body", "p", "/p", "/body", "/html");
//lesson4_order = new Array("html", "/html");


function basic_lesson1()
{
	lesson1_order = new Array("html", "/html");
	//get user input value from the input form
	var user_value = document.getElementById("input").value;
	user_value = noLineBreak(user_value);
	
	checkHTMLTag(user_value);
	
	if (html_ok){
		alert("Yes! You got it right!");
	}
	else{
		alert("Make sure you make have the html tags.");
	}
}

//check if the first and last tag is html
function checkHTMLTag(string)
{
	string = noCapitalLetter(string);
	if ((string.substring(0,6) == "<html>") && (string.substring(-6,-1) == "</html>")){
		html_ok = true;
		}
	else{
		html_ok = false;
	}
}

//make all characters lower case
function noCapitalLetter(string)
{
	return string.toLowerCase();
}

function noLineBreak(string)
{
	string = string.replace(/ /g, "");
	return string.replace(/(\r\n|\n|\r)/gm,"");
}

function lesson_1() {
    string = $('#input').val();
    result = /^<html>([a-z,A-Z,0-9]+)<\/html>$/.test(string)
    alert(result);
}
