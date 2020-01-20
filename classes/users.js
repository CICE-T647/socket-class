class Users {
  constructor() {
    this.users = [];
  }

  addUser({ name, id }) {
    const user = { name, id };

    this.users.push(user);

    return this.users;
  }

  deleteUser(id) {
    const user = this.getUser(id);

    this.users = this.users.filter(user => user.id !== id);

    console.log("this.users", this.users);

    return user;
  }

  getUser(id) {
    const user = this.users.find(user => user.id === id);
    return user;
  }
}

module.exports = Users;
