const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./../message');
const { isRealString } = require('./../validation');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		var message = generateMessage('tester', 'testing this code');
		expect(message.from).toBe('tester');
		expect(message.text).toBe('testing this code');
		expect(typeof (message.createdAt)).toBe('number');
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var lat = 34.050364099999996;
		var long = -118.30799929999999;
		var url = `https://www.google.com/maps?q=${lat},${long}`
		var locMessage = generateLocationMessage('tester', lat, long);
		expect(locMessage.from).toBe('tester');
		expect(locMessage.url).toBe(url);
		expect(typeof (locMessage.createdAt)).toBe('number');
	});
});

describe('isRealString', () => {
	it('should reject non string values',() => {
		var res = isRealString(98);
		expect(res).toBe(false);
	});
	
	it('should reject string with only spaces',() => {
		var res = isRealString('  ');
		expect(res).toBe(false);
	});	
	
	it('should allow string with non-space characters',() => {
		var res = isRealString('abc');
		expect(res).toBe(true);
	});		
});