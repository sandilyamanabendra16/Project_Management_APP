
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
// const addPeople= async(req, res)=>{
//     const {id}=req.params;
//     const {people}= req.body;
//     try{
//       const user = await User.findById(id);
//     if (user.peopleAdded.includes(people)) {
//       return res.status(400).json({ message: 'Person is already shared with this user' });
//     }
//     console.log(user);
//     user.peopleAdded.push(people);
//     await user.save();
//     res.status(200).json(user);
//   }catch (err) {
//     res.status(500).send({ error: err.message });
//   }
    
// }

const addPeople= async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { email } = req.body;
    if (user.peopleAdded.includes(email)) {
      return res.status(400).json({ message: 'Person already added' });
    }

    user.peopleAdded.push(email);
    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports={GetUser, UpdateUser, addPeople}