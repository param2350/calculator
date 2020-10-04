'use strict';

var getEl = function getEl(node) {
  return document.getElementById(node);
};

var historyNode = getEl("history-value");
var outputNode = getEl("output-value");
function printHist(hist) {
  historyNode.innerText = hist;
}
var printOutput = function printOutput(output) {
  if (output == "") {
    outputNode.innerText = output;
  } else {
    outputNode.innerText = getFormatted(output);
  }
};
var getFormatted = function getFormatted(val) {
  if (val == "-") {
    return "";
  }

  var n = Number(val);

  if (n > 999999999) {
    return n.toExponential(4).toString();
  }

  return Number(val).toLocaleString("en");
};
var evaluate = function evaluate(hist) {
  return new Function("return " + hist)();
};
var reverseNumberFormat = function reverseNumberFormat(val) {
  return Number(val.replace(/,/g, ""));
};

var output = "";
var hist = "";
var doOperation = function doOperation(operation) {
  if (operation === "clear") {
    output = "";
    hist = "";
    return;
  }

  if (operation === "backspace") {
    var _newOutput = reverseNumberFormat(output).toString();

    if (_newOutput) {
      output = _newOutput.substr(0, _newOutput.length - 1);
    }

    return;
  }

  var newHistory = hist;

  if (output == "" && newHistory == "" && operation == "-") {
    newHistory = "0";
  }

  if (output === "" && newHistory === "") {
    hist = "";
    return;
  }

  var newOutput = output == "" ? output : reverseNumberFormat(output);
  newHistory = newHistory + newOutput;

  if (operation !== "=") {
    hist = "".concat(newHistory).concat(operation);
    output = "";
    return;
  }

  hist = newHistory;
  output = String(evaluate(hist));
  hist = "";
};
var onNumberAction = function onNumberAction(number) {
  var len = output.length;
  var newOutput = reverseNumberFormat(output);

  if (newOutput != NaN && len < 11) {
    output = newOutput + number;
  }
};
var printOnScreen = function printOnScreen() {
  printHist(hist);
  printOutput(output);
};

console.log("inside op");
window.addEventListener("click", function (e) {
  var el = e.target;
  var isOperator = el.classList.contains("operator");
  var isNumber = el.classList.contains("number");

  if (isOperator === false && isNumber === false) {
    return;
  }

  switch (true) {
    case isOperator:
      {
        doOperation(el.id);
        break;
      }

    case isNumber:
      {
        onNumberAction(el.id);
        break;
      }
  }

  printOnScreen();
});
