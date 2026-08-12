/* TO-DO: 
PRIORITA
1) Storing data z lokalu = udelat tak, aby ty hodnoty tam porad zustali
^^^Funguje pro muj budget zatim (udelal bych pak hodne velkou podminku pro to vevnitr formu)

2) Pak kdyz se to bude ukladat, tak udelat refresh button na to, aby se to vsechno tam smazalo
3) Udelat, ze nemuzu jit do minusu s hodnotami myho budgetu 

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
firstForm.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkInput();
    const myBudgetValue = myBudget.value;
    addTextBudget.textContent = "Můj budget: " + myBudgetValue + " kč";
    sessionStorage.setItem("myBudget", myBudgetValue);
    card.prepend(addTextBudget);
    getBudget = totalBudget(parseInt(myBudgetValue));
  });
});
loadForm();

const secondForm = document.querySelectorAll(".submit1");
secondForm.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const addItem = document.createElement("p");
    let numItemValue = parseInt(myNumItem.value);
    const itemValue = myItem.value;

    addItem.textContent = itemValue + `: ${numItemValue} kč`;
    sessionStorage.setItem(itemValue, numItemValue);

    removeItem(addItem, getBudget, itemValue, numItemValue);
    getBudget.deductedTotalBudget(numItemValue);
  });
});

function removeItem(addItem, getBudget, itemValue, numItemValue) {
  const getButton = document.getElementById(".buttonItem");
  let button = document.createElement("button");
  button.innerText = "Smazat";
  button.addEventListener("click", () => {
    button.remove();
    addItem.remove();
    getBudget.refundTotalBudget(numItemValue);
    sessionStorage.removeItem(itemValue);
  });
  remaining.prepend(addItem, button);
}

function totalBudget(budget) {
  const remainingBelow = document.createElement("p");
  card.append(remainingBelow);
  function checkBelow() {
    if (budget < 0) {
      return (remainingBelow.textContent = `Jsi pod nulou!`);
    } else return (remainingBelow.textContent = "");
  }

  function deductedTotalBudget(item) {
    budget -= item;
    checkBelow();
    remainingText.textContent = `Zbylá částka: ${budget} kč`;
    sessionStorage.setItem("BudgetLeft", budget);
  }

  function refundTotalBudget(item) {
    budget += item;
    checkBelow();
    remainingText.textContent = `Zbylá částka: ${budget} kč`;
    sessionStorage.setItem("BudgetLeft", budget);
  }

  return { deductedTotalBudget, refundTotalBudget };
}

function loadForm() {
  let storedBudget = sessionStorage.getItem("myBudget");
  // console.log(storedBudget);

  window.addEventListener("load", () => {
    if (storedBudget) {
      addTextBudget.textContent = `Můj budget: ${storedBudget} kč (ulozeny)`;
    } else {
      addTextBudget.textContent = "";
    }
    card.prepend(addTextBudget);
  });

  //  let storedItem = sessionStorage.getItem(myNumItem);

  // let storedBudgetLeft = sessionStorage.getItem("BudgetLeft");
}
