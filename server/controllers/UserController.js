
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const GetUser= async (req, res) => {
    const {id}=req.params
  try {
    const user = await User.findById(id);
    res.send({ name: user.name, email: user.email });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

const UpdateUser= async (req, res) => {
    const {id}=req.params
  try {
    const { name, email, oldPassword, newPassword } = req.body;
    const user = await User.findById(id);
    
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).send({ error: 'Old password is incorrect' });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();
    res.send({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

module.exports={GetUser, UpdateUser}