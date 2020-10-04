import { doOperation, onNumberAction, printOnScreen } from "./src/operations.js";

let isLastKeyOperation = false;

console.log("inside op")
window.addEventListener("click", (e) => {
  const el = e.target;
  const isOperator = el.classList.contains("operator");
  const isNumber = el.classList.contains("number");

  isLastKeyOperation = false;
  if (isOperator === false && isNumber === false) {
    return;
  }

  switch (true) {
    case isOperator: {
      isLastKeyOperation = true;
      doOperation(el.id);
      break;
    }

    case isNumber: {
      onNumberAction(el.id);
      break;
    }
  }

  printOnScreen();
});
