class Users {
	constructor() {
		this.users = [];
	}
	
	addUser(id, name, room) {
		const newUser = {id, name, room};
		this.users.push(newUser);
		return newUser;
	}
	
	removeUser(id) {
		var userToBeRemoved = this.users.filter(x => x.id === id).shift();		
		this.users = this.users.filter(x => x.id !== id );
		return userToBeRemoved;
	}
	
	getUser(id) {
		return this.users.filter(x => x.id === id).shift();	
	}
	
	getUserList(room) {
		return this.users.filter(x => x.room === room).map(x => x.name);		
	}
	
}


module.exports = {Users};