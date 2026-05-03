let users = [
  {
    id: 1,
    name: "adwoa",
    email: "adwoa@example.com"
  },
  {
    id: 2,
    name: "Kojo",
    email: "kojo@example.com"
  }
];

/*
    GET ALL USERS
*/
const getUsers = (req, res) => {
  res.status(200).json(users);
};

/*
    GET SINGLE USER
*/
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.status(200).json(user);
};

/*
    CREATE USER
*/
const createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required"
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    data: newUser
  });
};

/*
    UPDATE USER
*/
const updateUser = (req, res) => {
  const id = parseInt(req.params.id);

  const { name, email } = req.body;

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  users[userIndex] = {
    ...users[userIndex],
    name,
    email
  };

  res.status(200).json({
    message: "User updated successfully",
    data: users[userIndex]
  });
};

/*
    DELETE USER
*/
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  const userExists = users.find((user) => user.id === id);

  if (!userExists) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  users = users.filter((user) => user.id !== id);

  res.status(200).json({
    message: "User deleted successfully"
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
