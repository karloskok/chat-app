class UsersList {
    static users = [];
    static addUser = (user) => {
        this.users.push(user);
    }
    static removeUser = (id) => {
        this.users = this.users.filter(x => x.id !== id);
    }
}

module.exports = UsersList;