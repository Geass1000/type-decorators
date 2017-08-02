import "reflect-metadata";

export type Metakey = string | symbol;
export type PropertyHandler = (data : any, index ?: number) => any;
export type PropertyDecorator = (target : Object, propertyKey : Metakey, parameterIndex : number) => void;

interface IMDProperty {
	method : PropertyHandler;
	data : Array<number>;
}

/**
 * fnProperty - call for metadata registration
 *
 * @param  {string|symbol} mkProperty - property metakey
 * @param  {function} fn - function for handling
 * @return {function} - function decorator
 */
export function fnProperty (mkProperty : Metakey, fn : PropertyHandler) :	PropertyDecorator {
	return (target : Object, propertyKey : Metakey, parameterIndex : number) : void => {
		let mdProperty : IMDProperty = <IMDProperty>Reflect.getOwnMetadata(mkProperty, target, propertyKey);
		mdProperty = Object.assign({
			method : fn,
			data : []
		}, mdProperty);
		mdProperty.data = [...mdProperty.data, parameterIndex];
	  Reflect.defineMetadata(mkProperty, mdProperty, target, propertyKey);
	}
}

export function validator (target : any, propertyKey : string, descriptor : PropertyDescriptor) {
	console.log('---- Method');
	console.log(target);
	console.log(propertyKey);
	console.log(descriptor);

	const method = descriptor.value;
	descriptor.value = function () {
		let keys : Array<string|symbol> = Reflect.getMetadataKeys(target, propertyKey);
		console.log(keys);
		keys = keys.filter((data : string|symbol) => {
			return typeof data === 'symbol';
		});
		console.log(keys);
		return method.apply(this, arguments);
	}
}
