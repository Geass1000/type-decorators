import { validator } from './validator.decorator';
import { isString } from './is-string.decorator';

class Test {
	constructor () {
		;
	}

	@validator
	myMethod (@isString() a : string, @isString() b : string) {
		console.log(`${a}, ${b}`);
	}
}

const tst : Test = new Test();
tst.myMethod('a1', 'b2');
