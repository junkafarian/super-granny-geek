var thefocus = null;
var lists = [];
var delta = 0;
var debug;
var index = 0;
var context = 0;

var item_module = function() {

var selected = 0,
node = null,
position = 0,
items = null;


return {
	init : function(name) {
		node = document.getElementById(name);
		jQuery.getJSON('static/'+name+'.json', function(data) {
			items = data;
			  for(var i=0; i<data.length; i++) {
			  	var item = document.createElement("div");
			  	item.className = "item";
			  	item.innerHTML = data[i].title;
			  	items[i].node = item;
			  	node.appendChild(item);
			  }
		items[0].node.style.background = "#999";
		items[0].node.style.color = "#fff";		

		});
	},
	setPosition : function(dx) {
		position -= dx;
		items[selected].node.style.background = "#fff";
		items[selected].node.style.color = "#000";
		selected = Math.floor(position/50);
		if(selected >= items.length) {
			selected = items.length - 1;
		} else if (selected < 0) {
			selected = 0;
		}
		items[selected].node.style.background = "#999";
		items[selected].node.style.color = "#fff";
		
		//debug.innerHTML = "position=" + position;
	

	}
	// selectItem : function(theindex) {
	// 	// items[selected].node.style.background = "#fff";
	// 	// items[selected].node.style.color = "#000";
	// 	selected = theindex;
	// 	items[selected].node.style.background = "#999";
	// 	items[selected].node.style.color = "#fff";

	// }
};

};


function scroll_handler(event) {

	var x;
    if (!event) event = window.event;
    // normalize the delta
    if (event.wheelDelta) {
        // IE and Opera
			x = event.wheelDelta / 30;
    } else if (event.detail) {
        // W3C
        	x = event.detail;
    }
    	delta = x;
	lists[index].setPosition(delta);
	return false;

}

jQuery(document).ready(function () {

window.oncontextmenu = function() {
	//alert("context");
	context = 1;
	window.onclick();
	return false;
}

window.onclick = function(e) {
	//alert(e.which);
	if(context == 1) {
		index ++; 
	} else {
		index --;
	}
	if(index < 0) {
		index = 0;
	}
	if(index >= lists.length) {
		index = lists.length - 1;
	}
	context = 0;
	debug.innerHTML = index;

}

debug = document.getElementById("debug");

lists.push(item_module());
lists.push(item_module());
lists.push(item_module());
//lists.push(item_module());


lists[0].init("first");
lists[1].init("second");
lists[2].init("third");
//lists[3].init("images");

// lists[0].selectItem(0);
// lists[1].selectItem(0);
// lists[2].selectItem(0);
//lists[0].selectItem(0):


//document.addEventListener('DOMMouseScroll', scroll_handler, false);

document.onmousewheel = scroll_handler;

});