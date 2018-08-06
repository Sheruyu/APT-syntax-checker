function calculate() {
	
	var errorcounter = 0;
	var errorcount2 = 0;
	var errormessage = "";
	var errors = "";

	var inclusion = document.getElementById("inputbox").value.split("\n");
	
	
	
	for (var i = 0; i < inclusion.length; i++){
		
		var arr = inclusion[i].match(/\(.*?\)/g);
				
		document.getElementById("instructions").innerHTML = arr;
		
		
		var linenum = i + 2;
		
		//check if ? and : match up
		if ((inclusion[i].match(/\?/g)||[]).length > (inclusion[i].match(/\:/g)||[]).length){
			errorcounter++;
			errorcount2++;
			errors = errors + "extra \"?\", ";
		}
		else if ((inclusion[i].match(/\?/g)||[]).length < (inclusion[i].match(/\:/g)||[]).length){
			errorcounter++;
			errorcount2++;
			errors = errors + "extra \":\", ";
		}
		
		//check if expressions match up
		var allExpressions = (inclusion[i].match(/==/g)||[]).length + (inclusion[i].match(/>/g)||[]).length + (inclusion[i].match(/</g)||[]).length + (inclusion[i].match(/!=/g)||[]).length + (inclusion[i].match(/false/g)||[]).length + (inclusion[i].match(/true/g)||[]).length;
		
		if(inclusion[i] == ""){
			allExpressions = 1;
		}
		
		var andOr = (inclusion[i].match(/\&\&/g)||[]).length + (inclusion[i].match(/\|\|/g)||[]).length;
		
		
		if (andOr > allExpressions - 1){
			errorcounter++;
			errorcount2++;
			errors = errors + "missing expressions (==, >, etc.), ";
		}
		else if (andOr < allExpressions - 1){
			errorcounter++;
			errorcount2++;
			errors = errors + "extra expressions (==, >, etc.), ";
		}
		
		//check if parentheses match up
		if ((inclusion[i].match(/\)/g)||[]).length > (inclusion[i].match(/\(/g)||[]).length){
			errorcounter++;
			errorcount2++;
			errors = errors + "extra \")\", ";
		}
		else if ((inclusion[i].match(/\)/g)||[]).length < (inclusion[i].match(/\(/g)||[]).length){
			errorcounter++;
			errorcount2++;
			errors = errors + "extra \"(\", ";
		}
		
		//check if quotation marks match up
		if ((inclusion[i].match(/\"/g)||[]).length % 2 != 0){
			errorcounter++;
			errorcount2++;
			errors = errors + "quotation mark mismatch, ";
		}
		
		if (errorcount2 > 0){
			
			errormessage = errormessage + "Line " + linenum + ": " + errors + "<br>";
			
		}
		
		errorcount2 = 0;
		errors = "";
	}
	
	
	if (errorcounter == 0){
		document.getElementById("outputbox").style.color = "green";
		document.getElementById("outputbox").innerHTML = "No errors found";
	}
	else{
		document.getElementById("outputbox").style.color = "red";
		document.getElementById("outputbox").innerHTML = errormessage;
	}
	
	
	
}

function clearall(){
    document.getElementById("inputbox").value = "";
}