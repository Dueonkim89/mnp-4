const expect = require('expect');

const { generateMessage } = require('./../message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		var message = generateMessage('tester', 'testing this code');
		expect(message.from).toBe('tester');
		expect(message.text).toBe('testing this code');
		expect(typeof (message.createdAt)).toBe('number');
	});
});