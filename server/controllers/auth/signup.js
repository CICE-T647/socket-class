const bcrypt = require("bcryptjs");
const User = require("../../models/User");

module.exports = async (req, res) => {
  const { username, password, email, name } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) return res.status(409).json({ error: "El usuario ya existe" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Hubo un error" });
  }

  try {
    console.log("Creando usuario");
    const hashPass = bcrypt.hashSync(password, 10);

    const user = new User({
      username,
      password: hashPass,
      email,
      name
    });
    await user.save();

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error" });
  }
};
