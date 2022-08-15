import Command from "./models/Command";

export default (io) => {
  io.on("connection", (socket) => {
    // console.log(socket.handshake.url);
    console.log(" New Socket Connected:", socket.id);

    // Send all messages to the client
    const emitCommands = async () => {
      const Commands = await Command.find();
      socket.emit("server:loadCommands", Commands);
    };
    emitCommands();

    socket.on("client:newCommand", async (data) => {
      const newCommand = new Command(data);
      const savedCommand = await newCommand.save();
      io.emit("server:newCommand", savedCommand);
      
    });

    socket.on("client:deleteCommand", async (CommandId) => {
      await Command.findByIdAndDelete(CommandId);
      emitCommands();
    });

    socket.on("client:getCommand", async (CommandId) => {
      const Command = await Command.findById(CommandId);
      socket.emit("server:selectedCommand", Command);
    });

    socket.on("client:updateCommand", async (updatedCommand) => {
      await Command.findByIdAndUpdate(updatedCommand._id, {
        code: updatedCommand.code,
        quantity: updatedCommand.quantity,
        price: updatedCommand.price,
        order_type: updatedCommand.order_type,
      });
      emitCommands();
    });

    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
};