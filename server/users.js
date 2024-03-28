const { trimStr } = require("./utils");

let users = [];

const addUser = (user) => {
    const userName = trimStr(user.name)
    const userRoom = trimStr(user.room)

    const isExits = users.find(
        (u) => trimStr(u.name) === userName && trimStr(u.room) === userRoom
    );
    
    !isExits && users.push(user);

    const currentUser = isExits || user;

    return { isExits: !!isExits, user: currentUser };
};

module.exports = { addUser }; 

