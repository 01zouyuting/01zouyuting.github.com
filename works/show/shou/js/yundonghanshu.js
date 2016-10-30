
function getStyle(obj,name){
		if(obj.currentStyle){
			return obj.currentStyle[name];
		}else{
			return getComputedStyle(obj,false)[name];
		}
	}
function move(obj,json,duration,complete){
			var start = {};
			var dis = {};
			for(var name in json){
				start[name] = parseFloat(getStyle(obj,name));
				dis[name] = json[name] - start[name];
			}
			var count = Math.floor(duration/30);

			var n = 0;	
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
				n++;
				for(var name in json){
					var cur = n*dis[name]/count+start[name];
					if(name == 'opacity'){
						obj.style[name] = cur;
						obj.style.filter = 'alpha(opacity='+cur*100+')';
					}else{
						obj.style[name] = cur+'px';
					}
				}
			
				if(n == count){
					clearInterval(obj.timer);
					complete && complete();
				}
			},30)
		}
