let sweets = [
  {
    id: 1,
    itemName: "Sweet Item",
    price: 5,
    imgUrl: "https://js-beginners.github.io/filter-project/img/sweets-1.jpeg",
  },
  {
    id: 2,
    itemName: "Cupcake Item",
    price: 5,
    imgUrl: "https://js-beginners.github.io/filter-project/img/cupcake-1.jpeg",
  },
  {
    id: 3,
    itemName: "Cake Item",
    price: 5,
    imgUrl: "https://js-beginners.github.io/filter-project/img/cake-1.jpeg",
  },
  {
    id: 4,
    itemName: "Dougnut Item",
    price: 5,
    imgUrl: "https://js-beginners.github.io/filter-project/img/doughnut-1.jpeg",
  },
  {
    id: 5,
    itemName: "Sweet Item",
    price: 10,
    imgUrl: "https://js-beginners.github.io/filter-project/img/sweets-2.jpeg",
  },
  {
    id: 6,
    itemName: "Cupcake Item",
    price: 10,
    imgUrl: "https://js-beginners.github.io/filter-project/img/cupcake-2.jpeg",
  },
  {
    id: 7,
    itemName: "Cake Item",
    price: 10,
    imgUrl: "https://js-beginners.github.io/filter-project/img/cake-2.jpeg",
  },
  {
    id: 8,
    itemName: "Dougnut Item",
    price: 10,
    imgUrl: "https://js-beginners.github.io/filter-project/img/doughnut-2.jpeg",
  },
  {
    id: 9,
    itemName: "Sweet Item",
    price: 15,
    imgUrl: "https://js-beginners.github.io/filter-project/img/sweets-3.jpeg",
  },

  {
    id: 10,
    itemName: "Cupcake Item",
    price: 15,
    imgUrl: "https://js-beginners.github.io/filter-project/img/cupcake-3.jpeg",
  },
  {
    id: 11,
    itemName: "Cake Item",
    price: 15,
    imgUrl: "https://js-beginners.github.io/filter-project/img/cake-3.jpeg",
  },
  {
    id: 12,
    itemName: "Dougnut Item",
    price: 15,
    imgUrl: "https://js-beginners.github.io/filter-project/img/doughnut-3.jpeg",
  },
];

let cardsSection = document.getElementById("cards");
let buttonsList = document.getElementById("searchButtons");
let search = document.getElementById("search");
//function that takes the list if cards and render it
function createCards(cards) {
  if (cardsSection.hasChildNodes()) {
    cardsSection.textContent = "";
  }
  cards.forEach((item) => {
    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardsSection.append(cardDiv);

    let cardImgDiv = document.createElement("div");
    cardImgDiv.className = "cardImgDiv";
    cardDiv.append(cardImgDiv);

    let cardImg = document.createElement("img");
    cardImg.className = "cardImg";
    cardImg.setAttribute("src", item.imgUrl);
    cardImgDiv.append(cardImg);

    let cartbutton = document.createElement("button");
    cartbutton.className = `cartbutton`;
    cartbutton.id = `${item.id}-cartbutton`;
    cardImgDiv.append(cartbutton);

    let cartbuttonI = document.createElement("i");
    cartbuttonI.className = "fas fa-shopping-cart";
    cartbutton.append(cartbuttonI);

    let cardTextDiv = document.createElement("div");
    cardTextDiv.className = "cardTextDiv";
    cardDiv.append(cardTextDiv);

    let cardTitle = document.createElement("p");
    cardTitle.innerText = item.itemName;
    cardTextDiv.append(cardTitle);

    let cardPrice = document.createElement("p");
    cardPrice.innerText = "$ " + item.price;
    cardTextDiv.append(cardPrice);

    cardDiv.classList.add("card");
  });
}
createCards(sweets);
addListenerForAddButtons(document.querySelectorAll(".cartbutton"));

// add an event listener to the buttons (filter by category)
buttonsList.childNodes.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target.id === "allItems") {
      createCards(sweets);
      addListenerForAddButtons(document.querySelectorAll(".cartbutton"));
    } else {
      let itemsList = sweets.filter((item) => {
        return item.itemName.includes(e.target.id);
      });
      createCards(itemsList);
    }
  });
});
// add an event listener to search for items (live)
search.addEventListener("input", (e) => {
  let foundedItems = sweets.filter((item) => {
    return (
      item.itemName.toLowerCase().includes(search.value.toLowerCase()) ||
      item.price == search.value
    );
  });
  createCards(foundedItems);
});
// CART
// create an array to save the items that user add to his cart
let cartArray = [];
//add an event listner to the buttons on each card
function addListenerForAddButtons(cartbutton) {
  cartbutton.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.hasChildNodes()) {
        createCartItems(sweets[e.target.id.split("-")[0] - 1]);
      } else {
        createCartItems(sweets[e.target.parentElement.id.split("-")[0] - 1]);
      }
    });
  });
}

// function that handles the added items
let total = document.createElement("pre");
let sum = 0;
let itemsDiv = document.querySelector(".itemsDiv");

function createCartItems(item) {
  if (cartArray.some((some) => some.id === item.id)) {
    return alert("Item is already added!");
  }

  let singleIitemDiv = document.createElement("div");
  singleIitemDiv.className = "singleIitemDiv";
  itemsDiv.append(singleIitemDiv);

  let itemImg = document.createElement("img");
  itemImg.setAttribute("src", item.imgUrl);
  itemImg.setAttribute("width", "50px");
  itemImg.style.borderRadius = "50%";
  singleIitemDiv.append(itemImg);

  let itemInfoDiv = document.createElement("div");
  itemInfoDiv.className = "itemInfoDiv";
  singleIitemDiv.append(itemInfoDiv);

  let itemTitle = document.createElement("p");
  itemTitle.innerText = item.itemName;
  itemInfoDiv.append(itemTitle);

  let itemPrice = document.createElement("p");
  itemPrice.innerText = "$ " + item.price;
  itemInfoDiv.append(itemPrice);

  let deleteButton = document.createElement("button");
  deleteButton.className = "deleteButton";
  deleteButton.style.backgroundColor = "transparent";
  deleteButton.style.border = "none";
  deleteButton.style.cursor = "pointer";

  let deleteButtonIcon = document.createElement("i");
  deleteButtonIcon.className = "fas fa-trash";
  deleteButton.append(deleteButtonIcon);

  singleIitemDiv.append(deleteButton);

  handleDelete(item, singleIitemDiv, deleteButton);

  handleCartButtonsDiv();

  sum += item.price;
  cartDetails.innerText = `  ${cartArray.length + 1} Items - $ ${sum} `;
  total.innerText = ` Total           $${sum}`;

  cartArray.push(item);
}
// create a div for total and buttons in the cart
function handleCartButtonsDiv() {
  if (cartSection.childElementCount == 1) {
    let totalDiv = document.createElement("div");
    totalDiv.className = "totalDiv";
    cartSection.append(totalDiv);
    totalDiv.append(total);

    let buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttonsDiv";
    cartSection.append(buttonsDiv);

    let clearCartButton = document.createElement("button");
    clearCartButton.className = "clearCartButton";
    clearCartButton.innerText = "CLEAR CART";
    buttonsDiv.append(clearCartButton);
    // add eventlistener to the clearCartButton
    clearCartButton.addEventListener("click", () => {
      display = false;
      cartArray = [];
      itemsDiv.textContent = "";
      cartSection.style.display = "none";
      sum = 0;
      cartDetails.innerText = `  ${cartArray.length} Items - $ ${sum} `;
      total.innerText = ` Total           $${sum}`;
    });
    let checkOutButton = document.createElement("button");
    checkOutButton.className = "checkOutButton";
    checkOutButton.innerText = "CHECKOUT";
    buttonsDiv.append(checkOutButton);
  }
}
//add event to the delete btn once created to handle the delete
function handleDelete(item, singleIitemDiv, deleteButton) {
  deleteButton.addEventListener("click", (e) => {
    cartArray.splice(
      cartArray.indexOf(cartArray.find((founded) => founded.id == item.id)),
      1
    );
    singleIitemDiv.remove();
    sum -= item.price;
    cartDetails.innerText = `  ${itemsDiv.childElementCount} Items - $ ${sum} `;
    total.innerText = ` Total           $${sum}`;
    if (!itemsDiv.hasChildNodes()) {
      cartSection.style.display = "none";
    }
  });
}
//toggle the cartSection
let display = false;
document.getElementById("displayCartButton").addEventListener("click", () => {
  console.log("display", display);
  if (!itemsDiv.hasChildNodes()) {
    alert("your cart is empty!, please add items");
    return;
  }
  if (!display) {
    display = true;
    cartSection.style.display = "block";
    cartSection.style.visibility = "visible";
    cartSection.style.transition = "0.5s linear";
    cartSection.style.transform = "rotateY(1turn)";
  } else {
    display = false;
    cartSection.style.visibility = "hidden";
    cartSection.style.transform = "none";
  }
});

document.querySelector(".menuIcon").addEventListener("click", () => {
  // droppedNavLinks.style.display = 'flex';
  if (
    droppedNavLinks.style.display == "" ||
    droppedNavLinks.style.display == "none"
  ) {
    droppedNavLinks.style.display = "flex";
    droppedNavLinks.style.flexDirection = "column";
  } else {
    droppedNavLinks.style.display = "none";
  }
});
