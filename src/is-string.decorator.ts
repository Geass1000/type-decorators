import { fnProperty } from './validator.decorator';

const mkIsString : symbol = Symbol('isString');

/**
 * isString - does registration all property decorators
 *
 * @param  {Object} target - Reference to the object (Class)
 * @param  {string|symbol} propertyKey - Property name (method name) in the target
 * @param  {number} parameterIndex - Index param in the method
 * @return {void}
 */
export function isString () :
 	(target : Object, propertyKey : string | symbol, parameterIndex : number) => void {
	return fnProperty(mkIsString, fnValidator);
}

function fnValidator (data : any) {
	if (typeof data !== 'string') {

	}
}
