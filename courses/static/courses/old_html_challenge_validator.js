//html_validator 

var doctype_match = /\<!DOCTYPE html\>/;
var html_match = /\<html\>/i;
var shtml_match = /\<\/html\>/i;
var head_match = /\<head\>/i;
var shead_match = /\<\/head\>/i;
var title_match = /\<title\>/i
var stitle_match = /\<\/title\>/i;
var body_match = /\<body\>/i;
var sbody_match = /\<\/body\>/i;
var p_match = /\<p\>/i;
var sp_match = /\<\/p\>/i;
var h1_match = /\<h1\>/i;
var sh1_match = /\<\/h1\>/i;

//error codes
var error_code_0 = "Oops, try again! You did not type anything!";
var error_code_1 = "Oops, try again! Your DOCTYPE tag doesn't look quite right. Did you type it like this: <!DOCTYPE html> ?";
var error_code_2 = "Oops, try again! Make sure you put in your open <html> tag!";
var error_code_3 = "Oops, try again! Make sure you put in your open </html> tag!";
var error_code_4 = "Oops, try again! Make sure you put in your open <head> tag!";
var error_code_5 = "Oops, try again! Make sure you put in your open </head> tag!";
var error_code_6 = "Oops, try again! Make sure you put in your open <title> tag!";
var error_code_7 = "Oops, try again! Make sure you put in your open </title> tag!";
var error_code_8 = "Oops, try again! Make sure you put in your open <body> tag!";
var error_code_9 = "Oops, try again! Make sure you put in your open </body> tag!";
var error_code_10 = "Oops, try again! Make sure you put in your open <p> tag!";
var error_code_11 = "Oops, try again! Make sure you put in your open </p> tag!";
var error_code_12 = "Oops, try again! Make sure you put in your open <h1> tag!";
var error_code_13 = "Oops, try again! Make sure you put in your open </h1> tag!";
var error_code_14 = "Oops, try again! Make sure you put in your open <h2> tag!";
var error_code_15 = "Oops, try again! Make sure you put in your open </h2> tag!";
var error_code_16 = "Oops, try again! Make sure you put in your open <h3> tag!";
var error_code_17 = "Oops, try again! Make sure you put in your open </h3> tag!";
var error_code_18 = "Oops, looks like the sequence of the tags is not right or you have put some unnecessary script in the box. Please double check!";

function no_doctype(str)
{
	if (str.match(doctype_match)){
		return false;
		}
	else{
		return true;
		}
}

function no_html(str)
{
	if (str.match(html_match)){
		return false;
		}
	else{
		return true;
		}
}

function no_shtml(str)
{
	if (str.match(shtml_match)){
		return false;
		}
	else{
		return true;
		}
}

function no_head(str)
{
	if (str.match(head_match)){
		return false;
		}
	else{
		return true;
		}
}

function no_shead(str)
{
	if (str.match(shead_match)){
		return false;
		}
	else{
		return true;
		}
}

function no_title(str)
{
	if (str.match(title_match)){
		return false;
		}
	else{
		return true;
		}
}

function no_stitle(str)
{
	if (str.match(stitle_match)){
		return false;
		}
	else{
		return true;
		}
}

function no_body(str)
{
	if (str.match(body_match)){
		return false;
		}
	else{
		return true;
		}
}

function no_sbody(str)
{
	if (str.match(sbody_match)){
		return false;
		}
	else{
		return true;
		}
}

function no_p(str)
{
	if (str.match(p_match)){
		return false;
		}
	else{
		return true;
		}
}

function no_sp(str)
{
	if (str.match(sp_match)){
		return false;
		}
	else{
		return true;
		}
}

function no_h1(str)
{
	if (str.match(h1_match)){
		return false;
		}
	else{
		return true;
		}
}

function no_sh1(str)
{
	if (str.match(sh1_match)){
		return false;
		}
	else{
		return true;
		}
}

function validating_html_1_1(str)
{
	if (str.length == 0){
		return error_code_0;
	}
	else{
		var lesson1_regex = /^[\s]*\<!DOCTYPE html\>[\s]*\<html\>[a-z,0-9,\s]*\<\/html\>[\s]*$/i;
		if (lesson1_regex.test(str)){
			return true;
		}
		else{
			if (no_doctype(str)){
				return error_code_1;
			}
			else if (no_html(str)){
				return error_code_2;
			}
			else if (no_shtml(str)){
				return error_code_3;
			}
			else{
				return error_code_18;
			}
		}
	}
}

function basic_lesson2(str)
{
	if (str.length == 0){
		return error_code_0;
	}
	else{
		var lesson2_regex = /^[\s]*\<!DOCTYPE html\>[\s]*\<html\>[\s]*\<head\>[\s]*\<title\>[a-z,0-9,\s]*\<\/title\>[\s]*\<\/head\>[\s]*\<\/html\>[\s]*$/i;
		if (lesson2_regex.test(str)){
			return true;
		}
		else{
			if (no_doctype(str)){
				return error_code_1;
			}
			else if (no_html(str)){
				return error_code_2;
			}
			else if (no_shtml(str)){
				return error_code_3;
			}
			else if (no_head(str)){
				return error_code_4;
			}
			else if (no_shead(str)){
				return error_code_5;
			}
			else if (no_title(str)){
				return error_code_6;
			}
			else if (no_stitle(str)){
				return error_code_7;
			}
			else{
				return error_code_18;
			}
		}
	}
}

function basic_lesson3(str)
{
	if (str.length == 0){
		return error_code_0;
	}
	else{
		var lesson2_regex = /^[\s]*\<!DOCTYPE html\>[\s]*\<html\>[\s]*\<head\>[\s]*\<title\>[a-z,0-9,\s]*\<\/title\>[\s]*\<\/head\>[\s]*\<body\>[\s]*\<p\>[a-z,0-9,\s]*\<\/p\>[\s]*\<\/body\>[\s]*\<\/html\>[\s]*$/i;
		
		if (lesson2_regex.test(str)){
			return true;
		}
		else{
			if (no_doctype(str)){
				return error_code_1;
			}
			else if (no_html(str)){
				return error_code_2;
			}
			else if (no_shtml(str)){
				return error_code_3;
			}
			else if (no_head(str)){
				return error_code_4;
			}
			else if (no_shead(str)){
				return error_code_5;
			}
			else if (no_title(str)){
				return error_code_6;
			}
			else if (no_stitle(str)){
				return error_code_7;
			}
			else if (no_body(str)){
				return error_code_8;
			}
			else if (no_sbody(str)){
				return error_code_9;
			}
			else if (no_p(str)){
				return error_code_10;
			}
			else if (no_sp(str)){
				return error_code_11;
			}
			else{
				return error_code_18;
			}
		}
	}
}
