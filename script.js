/* TO-DO: 
PRIORITA

MENSI PRIORITA
az dodelany, tak to udelat prehledneji ten kod
neni mozny kvuli backendu.
search engine, kde muzu vyhledat produkt, rozkliknout si, co chci a pridat to do potreby 
*/

const myBudget = document.querySelector(".budgetSubmit");
const myNumItem = document.querySelector(".needNumSubmit");
const myItem = document.querySelector(".needSubmit");

const card = document.querySelector(".card");
const remaining = document.querySelector(".remaining");
const remainingText = document.createElement("p");
card.append(remainingText);

function checkInput() {
  const button2 = document.querySelector(".buttonNeedSubmit");
  if (myBudget === "") {
    return (button2.disabled = true);
  } else {
    return (button2.disabled = false);
  }
}

const firstForm = document.querySelectorAll(".submit");
const addTextBudget = document.createElement("p");
let getBudget;
let getForm = loadForm();
firstForm.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkInput();
    const myBudgetValue = myBudget.value;
    addTextBudget.textContent = "Můj budget: " + myBudgetValue + " kč";
    localStorage.setItem("myBudget", myBudgetValue);
    card.prepend(addTextBudget);
    getBudget = totalBudget(parseInt(myBudgetValue));
  });
});

const secondForm = document.querySelectorAll(".submit1");
secondForm.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

      const addItem = document.createElement("p");
    let numItemValue = parseInt(myNumItem.value);
    const itemValue = myItem.value;

    addItem.textContent = itemValue + `: ${numItemValue} kč`;
    localStorage.setItem(itemValue, numItemValue);


    getBudget.deductedTotalBudget(numItemValue);
    getForm.removeItem(addItem, getBudget, itemValue, numItemValue);
    //    window.addEventListener("load", () => {
    //   console.log(storedItem)
    //   if (storedItem) {
    //     addItem.textContent = storedItem;
    //   } else {
    //     addItem.textContent = "";
    //   }
    //   remaining.prepend(addItem);
    // });

    //  let storedItem = localStorage.getItem(itemValue);
  });
});


// ============================

function totalBudget(budget) {
  const remainingBelow = document.createElement("p");
  card.append(remainingBelow);
  function checkBelow() {
    if (budget < 0) {
      remainingBelow.textContent = `Jsi pod nulou!`;
    } else if (budget < 1000) {
      remainingBelow.textContent = `Mas pod 1000!`;
    } else return (remainingBelow.textContent = "");
  }

  function deductedTotalBudget(item) {
    budget -= item;
    checkBelow();
    remainingText.textContent = `Zbylá částka: ${budget} kč`;
    localStorage.setItem("BudgetLeft", budget);
  }

  function refundTotalBudget(item) {
    budget += item;
    checkBelow();
    remainingText.textContent = `Zbylá částka: ${budget} kč`;
    localStorage.setItem("BudgetLeft", budget);
  }

  return { deductedTotalBudget, refundTotalBudget };
}

// ============================

function loadForm() {
  let storedBudget = localStorage.getItem("myBudget");
  window.addEventListener("load", () => {
    if (storedBudget) {
      addTextBudget.textContent = `Můj budget: ${storedBudget} kč (ulozeny)`;
    } else {
      addTextBudget.textContent = "";
    }
    card.prepend(addTextBudget);
    let storedBudgetLeft = localStorage.getItem("BudgetLeft");

    // TO-DO
    for (let i = 0; i < localStorage.length; i++) {
      console.log(localStorage.getItem(localStorage.key(i)));
      if (
        localStorage.key(i) == "BudgetLeft" ||
        localStorage.key(i) == "myBudget"
      ) {
        continue;
      }

      remaining.append(localStorage.key(i) + ": ");
      remaining.append(localStorage.getItem(localStorage.key(i)) + " kč (ulozeny)\r\n");
      remaining.setAttribute("style", "white-space: pre");

      let removeLoadItem = document.createElement("button");
        removeLoadItem.innerText = "Smazat";
    }

    if (storedBudgetLeft) {
      remainingText.textContent = `Zbylá částka: ${storedBudgetLeft} kč (ulozeny)`;
    } else {
      remainingText.textContent = "";
    }
    card.append(remainingText);

  });

  function removeItem(addItem, getBudget, itemValue, numItemValue) {
  let button = document.createElement("button");
  button.innerText = "Smazat";
  button.addEventListener("click", () => {
    button.remove();
    addItem.remove();
    getBudget.refundTotalBudget(numItemValue);
    localStorage.removeItem(itemValue);
  });
  remaining.prepend(addItem, button);
}

return ({ removeItem });

}
