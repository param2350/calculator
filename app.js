var hist = "";
var output = "";

function getHist() {
  return (hist = document.getElementById("history-value").innerText);
}

function printHist() {
  document.getElementById("history-value").innerText = hist;
}

function getOutput() {
  return (output = document.getElementById("output-value").innerText);
}

function printOutput() {
  if (output == "") {
    document.getElementById("output-value").innerText = output;
  } else {
    document.getElementById("output-value").innerText = getFormatted(output);
  }
}

function getFormatted(val) {
  if (val == "-") {
    return "";
  }
  var n = Number(val);
  if(n > 999999999){
      return n.toExponential(4).toString();
  }
  return Number(val).toLocaleString("en");
}

function evaluate() {
  console.log("evaluating", hist);
  return new Function("return " + hist)();
}

function reverseNumberFormat(val) {
  return Number(val.replace(/,/g, ""));
}
var operators = document.getElementsByClassName("operator");
for (var i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", function () {
    if (this.id == "clear") {
      output = "";
      hist = "";
      printHist();
      printOutput();
    } else if (this.id == "backspace") {
      output = reverseNumberFormat(getOutput()).toString();

      if (output) {
        output = output.substr(0, output.length - 1);
        printOutput();
      }
    } else {
      output = getOutput();
      hist = getHist();

      console.log(hist + " ----  " + output);

      if (output == "" && hist == "" && this.id == "-") {
        printHist("0-");
      }

      if (output == "" && hist != "") {
        // change operator
        if (isNaN(hist[hist.length - 1])) {
          hist = hist.substr(0, hist.length - 1);
        }
      }

      if (output != "" || hist != "") {
        output = output == "" ? output : reverseNumberFormat(output);
        hist = hist + output;
        if (this.id == "=") {
          output = evaluate();
          printOutput();
          hist = "";
          printHist();
        } else {
          hist += this.id;
          console.log(this.id, hist);
          printHist();
          output = "";
          printOutput();
        }
      }
    }
  });
}

var nums = document.getElementsByClassName("number");
for (var i = 0; i < nums.length; i++) {
  nums[i].addEventListener("click", function () {
    var len = output.length;
    output = reverseNumberFormat(getOutput());
    if (output != NaN && len < 11) {
      output += this.id;
      printOutput();
    }
  });
}
