function calculate() {
	
	var errorcounter = 0;
	var errorcount2 = 0;
	var errormessage = "";
	var errors = "";

	var inclusion = document.getElementById("inputbox").value.split("\n");
	
	
	for (var j = 0; j < inclusion.length; j++){
		
		var incl = "";
		//incl = inclusion[j].replace(/Parse\(/g, "Parse");
		incl = inclusion[j].replace(/\)\)\)\)/g, ")");
		incl = inclusion[j].replace(/\)\)\)/g, ")");
		incl = inclusion[j].replace(/\)\)/g, ")");
		incl = inclusion[j].replace(/\(\(\(\(/g, "(");
		incl = inclusion[j].replace(/\(\(\(/g, "(");
		incl = inclusion[j].replace(/\(\(/g, "(");
		
		
		var arr = incl.match(/\(.*?\)/g);
		alert(arr);
		var linenum = j + 2;
		var questError = 0;
		var colonError = 0;
		var missingExpError = 0;
		var extraExpError = 0;
		var openParaError = 0;
		var closeParaError = 0;
		var quoteError = 0;
		
		for (var i = 0; i < arr.length; i++){
			//check if ? and : match up
			if ((arr[i].match(/\?/g)||[]).length > (arr[i].match(/\:/g)||[]).length){
				errorcounter++;
				errorcount2++;
				questError = 1;
				
			}
			else if ((arr[i].match(/\?/g)||[]).length < (arr[i].match(/\:/g)||[]).length){
				errorcounter++;
				errorcount2++;
				colonError = 1;
				
			}
			
			//check if expressions match up
			var allExpressions = (arr[i].match(/==/g)||[]).length + (arr[i].match(/>/g)||[]).length + (arr[i].match(/</g)||[]).length + (arr[i].match(/!=/g)||[]).length + (arr[i].match(/false/g)||[]).length + (arr[i].match(/true/g)||[]).length + (arr[i].match(/Parse/g)||[]).length;
			
			if(arr[i] == ""){
				allExpressions = 1;
			}
			
			var andOr = (arr[i].match(/\&\&/g)||[]).length + (arr[i].match(/\|\|/g)||[]).length;
			
			if (andOr > allExpressions - 1){
				errorcounter++;
				errorcount2++;
				missingExpError = 1;
				
			}
			else if (andOr < allExpressions - 1){
				errorcounter++;
				errorcount2++;
				extraExpError = 1;
				
			}
			
			//check if parentheses match up
			if ((arr[i].match(/\)/g)||[]).length > ((arr[i].match(/\(/g)||[]).length - (arr[i].match(/Parse/g)||[]).length)){
				errorcounter++;
				errorcount2++;
				closeParaError = 1;
				
			}
			else if ((arr[i].match(/\)/g)||[]).length < ((arr[i].match(/\(/g)||[]).length - (arr[i].match(/Parse/g)||[]).length)){
				errorcounter++;
				errorcount2++;
				openParaError = 1;
				
			}
			
			//check if quotation marks match up
			if ((arr[i].match(/\"/g)||[]).length % 2 != 0){
				errorcounter++;
				errorcount2++;
				quoteError = 1;
				
			}
			
			
		}
		
		
		if (questError == 1){
			errors = errors + "extra \"?\", ";
		}
		if (colonError == 1){
			errors = errors + "extra \":\", ";
		}
		if (missingExpError == 1){
			errors = errors + "missing expressions (==, >, etc.), ";
		}
		if (extraExpError == 1){
			errors = errors + "extra expressions (==, >, etc.), ";
		}
		if (openParaError == 1){
			errors = errors + "extra \")\", ";
		}
		if (closeParaError == 1){
			errors = errors + "extra \"(\", ";
		}
		if (quoteError == 1){
			errors = errors + "quotation mark mismatch, ";
		}
		
		questError = 0;
		colonError = 0;
		missingExpError = 0;
		extraExpError = 0;
		openParaError = 0;
		closeParaError = 0;
		quoteError = 0;
		
		
		if (errorcount2 > 0){
			
			errormessage = errormessage + "Line " + linenum + ": " + errors + "<br>";
			
		}
		errorcount2 = 0;
		errors = "";
		
		if (errorcounter == 0){
			document.getElementById("outputbox").style.color = "green";
			document.getElementById("outputbox").innerHTML = "No errors found";
		}
		else{
			document.getElementById("outputbox").style.color = "red";
			document.getElementById("outputbox").innerHTML = errormessage;
		}
	}
	
	
}

function clearall(){
    document.getElementById("inputbox").value = "";
}