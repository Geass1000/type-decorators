import "reflect-metadata";

const rgxDesign : RegExp = /^is.*$/;

interface IMDProperty {
	method : (data : any) => any;
	data : Array<number>;
}

export function fnProperty (mkProperty : string | symbol, fn : (data : any) => void) :
 	(target : Object, propertyKey : string | symbol, parameterIndex : number) => void {
	return (target : Object, propertyKey : string | symbol, parameterIndex : number) : void => {
		let mdProperty : IMDProperty = Reflect.getOwnMetadata(mkProperty, target, propertyKey);
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
