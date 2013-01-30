if(typeof Object.create!=='function'){
	Object.create = function(o){
		function F(){};
		F.prototype = o;
		return new F();
	}
}
if(typeof document.getElementsByClassName !=='function'){
	document.getElementsByClassName = function(searchClass){
		var els = document.getElementsByTagName('*'),
			elsLen = els.length,
			classElements = [],
			pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
        for (i = 0, j = 0; i < elsLen; i++) {
                if ( pattern.test(els[i].className) ) {
                        classElements[j] = els[i];
                        j++;
                }
        }
        return classElements;
	}
}
var base = {
	extend : function(oObj,nObj){
		for(var key in nObj){
			oObj[key] = nObj[key];
		}
	}
}
var Class = function () {
	var klass = function(){
		this.init.apply(this,arguments);
	}
	klass.fn = klass.prototype;
	klass.init = function(){
		var instance =  Object.create(klass.prototype);
		instance.init.apply(instance,arguments);
		return instance;
	}
	klass.extend = function(obj){
		for(var key in obj){
			klass[key] = obj[key];
		}
	}
	klass.include = function(obj){
		for(var key in obj){
			klass.fn[key] = obj[key];
		}
	}
	klass.extend({
		proxy:function(fn){
			var self = this;
			return (function(){
				return fn.apply(self,arguments);
			})
		}
	});
	klass.fn.proxy = klass.proxy;
	klass.fn.include = klass.include;
	klass.fn.init=function(){};
	return klass;
}