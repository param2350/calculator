function getHisory() {
    return document.getElementById("history-value").innerText;
}

function printHistory(val) {
    document.getElementById("history-value").innerText = val;
}

function getOutput(){
    return document.getElementById("output-value").innerText;
}

function printOutput(val){
    if(val==""){
        document.getElementById("output-value").innerText = val;
    }
    else {
        document.getElementById("output-value").innerText = getFormatted(val);
    }
    
}

function getFormatted(val){
    if(val == "-"){
        return "";
    }
    var n = Number(val);
    return Number(val).toLocaleString("en");
}


function reverseNumberFormat(val){
    return Number(val.replace(/,/g,''));
}
var operators = document.getElementsByClassName("operator");
for(var i=0;i<operators.length;i++){
    operators[i].addEventListener('click', function() {
        if(this.id=="clear"){
            printHistory("");
            printOutput("");
        } else if(this.id == "backspace"){

            var output = reverseNumberFormat(getOutput()).toString();

            if(output){
                output = output.substr(0,output.length-1)
                printOutput(output);
            }
        }
        else{

            var output = getOutput();
            var history = getHisory();

            if(output == "" && history == "" && this.id == "-"){
                printHistory("0-");
            }

            if(output == "" && history != ""){
                // change operator
                if(isNaN(history[history.length - 1])){
                    history = history.substr(0,history.length -1);
                }
            }



            if(output != "" || history != ""){
                output = output == "" ? output : reverseNumberFormat(output);
                history = history + output;
                if(this.id == "="){
                    printOutput(eval(history));
                    printHistory("");
                }
                else {
                    history += this.id;
                    printHistory(history);
                    printOutput("");
                }

            }
        }
    })
}

var nums = document.getElementsByClassName("number");
for (var i=0;i<nums.length;i++){
    nums[i].addEventListener('click', function() {
        var output = reverseNumberFormat(getOutput());
        if(output != NaN){
            output += this.id;
            printOutput(output);
        }
    })
}