const expect = require('expect');

const {Users} = require('./../users');

describe('Users', () => {
	var users;
	
	beforeEach( () => {
		users = new Users();
		users.users = [{id: '1', name: 'Mike', room: 'Node Course'},
			{id: '2', name: 'Bob', room: 'React Course'},
			{id: '3', name: 'Pete', room: 'Node Course'}
		];
	});
	
	
	it('should add a User', () => {
		const newUser = new Users();
		var testCase = newUser.addUser(12345, 'Dueon', 'Blockchain Learners');
		expect(newUser.users.length).toBe(1);
		expect(testCase.id).toBe(12345);
		expect(testCase.name).toBe('Dueon');
		expect(testCase.room).toBe('Blockchain Learners');
	});
	
	it('should return names for node course', () => {
		var userList = users.getUserList('Node Course');
		expect(userList.length).toBe(2);
	});
	
	it('should return names for React course', () => {
		var userList = users.getUserList('React Course');
		expect(userList.length).toBe(1);
	});	
	
	it('should remove a User', () => {
		var removeAUser = users.removeUser('1');
		expect(removeAUser.name).toBe('Mike');
		expect(users.users.length).toBe(2);
	});
	
	it('should not remove a User', () => {
		var removeAUser = users.removeUser('5');
		expect(removeAUser).not.toBeTruthy();
		expect(users.users.length).toBe(3);
	});
	
	it('should find a User', () => {
		var findUser = users.getUser('3');
		expect(findUser.name).toBe('Pete');
		expect(users.users.length).toBe(3);
	});
	
	it('should not find a User', () => {
		var findUser = users.getUser('7');
		expect(findUser).not.toBeTruthy();
		expect(users.users.length).toBe(3);
	});	
	
});












