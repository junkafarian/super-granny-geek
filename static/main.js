var thefocus = null;
var lists = [];
var delta = 0;
var debug;

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
			  	// item.onmouseover = function() {
			  	// 	this.style.background = "#eee";
			  	// };
			  	// item.onmouseout = function() {
			  	// 	this.style.background = "#ddd";
			  	// };
			  	items[i].node = item;
			  	node.appendChild(item);
			  }
		});
		node.onclick = function(e) {
			var rightclick;
			if (!e) var e = window.event;
			if (e.which) rightclick = (e.which == 3);
			else if (e.button) rightclick = (e.button == 2);
			alert('Rightclick: ' + rightclick); // true or false
			}

	},
	setPosition : function(dx) {
		position += dx;
		items[selected].node.style.background = "#eee";
		selected = Math.floor(position/50);
		if(selected >= items.length) {
			selected = items.length - 1;
		} else if (selected < 0) {

			selected = 0;
		}
		items[selected].node.style.background = "#999";

	}
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
	debug.innerHTML = "delta" + delta;
	lists[0].setPosition(delta);
		preventDefault(event);

}

jQuery(document).ready(function () {

window.oncontextmenu = function() {
	//alert("cointex");
	return false;
}

debug = document.getElementById("debug");

lists.push(item_module());
lists.push(item_module());
lists.push(item_module());

lists[0].init("first");
lists[1].init("second");
lists[2].init("third");


//document.addEventListener('DOMMouseScroll', scroll_handler, false);

document.onmousewheel = scroll_handler;

});