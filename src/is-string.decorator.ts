import { fnProperty, PropertyDecorator } from './validator.decorator';

const mkIsString : symbol = Symbol('isString');

/**
 * isString - does registration all property decorators
 *
 * @param  {Object} target - reference to the object (Class)
 * @param  {string|symbol} propertyKey - property name (method name) in the target
 * @param  {number} parameterIndex - param index in the method
 * @return {function} - function decorator
 */
export function isString () : PropertyDecorator {
	return fnProperty(mkIsString, fnValidator);
}

function fnValidator (data : any, index ?: number) {
	if (typeof data !== 'string') {
		throw new TypeError(`The operand ${index} must have type string`);
	}
}
