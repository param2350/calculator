const getEl = (node) => document.getElementById(node);

const historyNode = getEl("history-value");
const outputNode = getEl("output-value");


export function printHist(hist) {
  historyNode.innerText = hist;
}

 export const printOutput = (output) => {
  if (output == "") {
    outputNode.innerText = output;
  } else {
    outputNode.innerText = getFormatted(output);
  }
}


export const getFormatted = (val) => {
  if (val == "-") {
    return "";
  }
  var n = Number(val);
  if(n > 999999999){
      return n.toExponential(4).toString();
  }
  return Number(val).toLocaleString("en");
}

export const evaluate = (hist) => {
  return new Function("return " + hist)();
}

export const reverseNumberFormat = (val) =>  {
  return Number(val.replace(/,/g, ""));
}
