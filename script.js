/* TO-DO: 
az dodelany, tak to udelat prehledneji ten kod
- osetrit podminky
- nejakej warning toho, ze jsem sel pod nulou nebo tak
CSS
- symboly povoleny do inputu
- search engine, kde muzu vyhledat produkt, rozkliknout si, co chci a pridat to do potreby 
*/

const myBudget = document.querySelector(".budgetSubmit");
const myItem = document.querySelector(".needSubmit");
const myNumItem = document.querySelector(".needNumSubmit");

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
firstForm.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkInput();
    const myBudgetValue = myBudget.value;
    addTextBudget.textContent = "Můj budget: " + myBudgetValue + " kč";
    card.prepend(addTextBudget);
    getBudget = totalBudget(parseInt(myBudget.value));
  });
});

const secondForm = document.querySelectorAll(".submit1");
secondForm.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const addItem = document.createElement("p");
    const itemValue = myItem.value;
    let numItemValue = parseInt(myNumItem.value);
    addItem.textContent = itemValue + `: ${numItemValue} kč`;

    // button element
    const getButton = document.getElementById(".buttonItem");
    let button = document.createElement("button");

    button.innerText = "Smazat";
    button.addEventListener("click", () => {
      button.remove();
      addItem.remove();
      getBudget.refundTotalBudget(numItemValue);
    });
    remaining.prepend(addItem, button);
    getBudget.deductedTotalBudget(numItemValue);
  });
});

function totalBudget(budget) {
  function deductedTotalBudget(item) {
    budget -= item;
    return (remainingText.textContent = `Zbylá částka: ${budget} kč`);
  }

  function refundTotalBudget(item) {
    budget += item;
    return (remainingText.textContent = `Zbylá částka: ${budget} kč`);
  }

  return { deductedTotalBudget, refundTotalBudget };
}

// ============ API FETCH

