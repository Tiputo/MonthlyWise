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

    removeItem(addItem, getBudget, itemValue, numItemValue);
    getBudget.deductedTotalBudget(numItemValue);

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
loadForm();

function removeItem(addItem, getBudget, itemValue, numItemValue) {
  const getButton = document.getElementById(".buttonItem");
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

function totalBudget(budget) {
  const remainingBelow = document.createElement("p");
  card.append(remainingBelow);
  function checkBelow() {
    if (budget < 0) {
     (remainingBelow.textContent = `Jsi pod nulou!`);
    } 
    else if (budget < 1000) {
           (remainingBelow.textContent = `Mas pod 1000!`);
    }
    else 
     return (remainingBelow.textContent = "");
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
  });

  // TO-DO
  window.addEventListener("load", () => {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.length === 0) {
        continue;
      }
      console.log(localStorage.getItem(localStorage.key(i)));

      remaining.append(localStorage.key(i));
    }
  });

  let storedBudgetLeft = localStorage.getItem("BudgetLeft");
  window.addEventListener("load", () => {
    if (storedBudgetLeft) {
      remainingText.textContent = `Zbylá částka: ${storedBudgetLeft} kč (ulozeny)`;
    } else {
      remainingText.textContent = "";
    }
    card.append(remainingText);
  });
}
