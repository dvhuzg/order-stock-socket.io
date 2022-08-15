import { appendCommand, renderCommands, fillForm, onHandleSubmit } from "./ui.js";
import { loadCommands, onNewCommand, onSelected } from "./sockets.js";

// Load initial Commands
window.addEventListener("DOMContentLoaded", () => {
  loadCommands(renderCommands);
  onNewCommand(appendCommand);
  onSelected(fillForm);
});

// Save a new Command
const CommandForm = document.querySelector("#CommandForm");
CommandForm.addEventListener("submit", onHandleSubmit);
