import {
  deleteCommand,
  getCommandById,
  saveCommand,
  updateCommand,
} from "./sockets.js";

const CommandsList = document.querySelector("#Commands");
const code = document.querySelector("#code");
const quantity = document.querySelector("#quantity");
const price = document.querySelector("#price");
const order_type = document.querySelector("#order_type");

let savedId = "";

const CommandUI = (Command, a,index) => {
  // console.log(Command)
  const div = document.createElement("tr");
  div.innerHTML = `
      <td>${Command.code}</td>
      <td>${Command.quantity}</td>
      <td>${Command.price}</td>
      <td>${Command.order_type}</td>
      <td>${a == undefined ? "Pending" : a}</td>
      <td>
      <button class="btn btn-danger delete" data-id="${Command._id}">Delete</button>
      <button class="btn btn-secondary update" data-id="${Command._id}">View</button>
      </td>

`;
const btnDelete = div.querySelector(".delete");
const btnUpdate = div.querySelector(".update");
console.log(btnUpdate);
btnDelete.addEventListener("click", () => deleteCommand(btnDelete.dataset.id));
btnUpdate.addEventListener("click", () => getCommandById(btnDelete.dataset.id));
  return div;
};

export const renderCommands = (Commands) => {
  var a = Array.apply(null, { length: Commands.length });

  for (var i = 0; i < Commands.length; i++) {
    for (var j = i + 1; j < Commands.length; j++) {
      if (Commands[i].code === Commands[j].code) {
        if (Commands[i].order_type !== Commands[j].order_type) {
          if (
            (Commands[i].price >= Commands[j].price &&
              Commands[i].order_type === "Buy") ||
            (Commands[j].price >= Commands[i].price &&
              Commands[i].order_type === "Sell")
          ) {
            if (Commands[i].quantity === 0 || Commands[j].quantity === 0) {
              break;
            }
            a[i] = Math.min(Commands[i].quantity, Commands[j].quantity);
            a[j] = a[i];
            Commands[i].quantity = Commands[i].quantity - a[i];
            Commands[j].quantity = Commands[j].quantity - a[i];
          }
        }
      }
    }
  }
  // console.log(a);
  savedId = "";
  CommandsList.innerHTML = "";
  Commands.forEach((Command, index) =>
    CommandsList.append(CommandUI(Command, a[index],index))
  );
};

export const appendCommand = (Command) => {
  CommandsList.append(CommandUI(Command));
};

export const fillForm = (Command) => {
  code.value = Command.code;
  quantity.value = Command.quantity;
  price.value = Command.price;
  order_type.value = Command.order_type;

  savedId = Command._id;
};

export const onHandleSubmit = (e) => {
  e.preventDefault();
  if (savedId) {
    updateCommand(
      savedId,
      code.value,
      quantity.value,
      price.value,
      order_type.value
    );
  } else {
    saveCommand(code.value, quantity.value, price.value, order_type.value);
  }

  code.value = "";
  quantity.value = "";
  price.value = "";
  order_type.value = "";
};
