const socket = io.connect();

/**
 * create a new Command
 * @param {string} title a title for a new Command
 * @param {string} description a description for a new Command
 */
export const saveCommand = (code, quantity, price, order_type) => {
  socket.emit("client:newCommand", {
    code,
    quantity,
    price,
    order_type,
  });
};

/**
 * delete a Command based on an Id
 * @param {string} id a Command ID
 */
export const deleteCommand = (id) => {
  socket.emit("client:deleteCommand", id);
};

/**
 *
 * @param {string} id Command ID
 * @param {string} title Command title
 * @param {string} description Command description
 */
export const updateCommand = (_id, code, quantity, price, order_type) => {
  socket.emit("client:updateCommand", {
    _id,
    code,
    quantity,
    price,
    order_type,
  });
};

/**
 * Load an Array of Commands
 * @param {function} callback A function to render Commands
 */
export const loadCommands = (callback) => {
  socket.on("server:loadCommands", callback);
};

export const onNewCommand = (callback) => {
  socket.on("server:newCommand", callback);
};

export const onSelected = (callback) => {
  socket.on("server:selectedCommand", callback);
};

export const getCommandById = (CommandId) => {
  socket.emit("client:getCommand", CommandId);
};
