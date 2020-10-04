import {
  printHist,
  printOutput,
  reverseNumberFormat,
  evaluate,
} from "./helper.js";

let output = "";
let hist = "";

export const  doOperation = (operation) => {
  if (operation === "clear") {
    output = "";
    hist = "";
    return;
  }

  if (operation === "backspace") {
    const newOutput = reverseNumberFormat(output).toString();

    if (newOutput) {
      output = newOutput.substr(0, newOutput.length - 1);
    }
    return;
  }

  let newHistory = hist;
  if (output == "" && newHistory == "" && operation == "-") {
    newHistory = "0";
  }

  if (output === "" && newHistory === "") {
    hist = "";
    return;
  }

  const newOutput = output == "" ? output : reverseNumberFormat(output);
  newHistory = newHistory + newOutput;

  if (operation !== "=") {
    hist = `${newHistory}${operation}`;
    output = "";
    return;
  }

  hist = newHistory;
  output = String(evaluate(hist));
  hist = "";
};

export const onNumberAction = (number) => {
  let len = output.length;
  let newOutput = reverseNumberFormat(output);
  if (newOutput != NaN && len < 11) {
    output = newOutput + number;
  }
};

export const printOnScreen = () => {
  printHist(hist);
  printOutput(output);
};
