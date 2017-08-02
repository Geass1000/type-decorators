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
const arr : Array<any> = ['3', 2, '4', 1];
arr.map((data : any) => {
	tst.myMethod(data, 'b2');
});
