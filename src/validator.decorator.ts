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
	const method = descriptor.value;
	let keys : Array<Metakey> = Reflect.getMetadataKeys(target, propertyKey);

	const rgxDesign : RegExp = /^design:.*$/;
	keys = keys.filter((data : Metakey) => {
		return !rgxDesign.test(data.toString());
	});
	console.log('keys:', keys);

	descriptor.value = function () {
		const allArgs : IArguments = arguments;

		keys.map((data : Metakey) => {
			const metadata : IMDProperty = <IMDProperty>Reflect.getOwnMetadata(data, target, propertyKey);
			console.log('metadata:', metadata);

			if (!metadata) {
				return;
			}
			metadata.data.map((paramIndex : number) => {
				console.log('Checking property with index:', paramIndex);
				metadata.method(allArgs[paramIndex], paramIndex);
			});
		});

		return method.apply(this, allArgs);
	}
}
