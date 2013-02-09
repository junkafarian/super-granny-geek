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
    init : function(name, column) {
        node = document.getElementById(name);
        jQuery.getJSON('/'+name+'/children/', function(data) {
            items = data;
            for(var i=0; i<data.length; i++) {
                var item = document.createElement("div");
                item.className = "item";
                item.innerHTML = data[i].title;
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
        };

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
    lists[index].setPosition(delta);
    return false;

}

jQuery(document).ready(function () {

window.oncontextmenu = function() {
    context = 1;
    return false;
}

window.onclick = function(e) {
    if(context == 1) {
        index --;
    } else {
        index ++;
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

root = item_module().init('root');
lists.push(root);


document.onmousewheel = scroll_handler;

});