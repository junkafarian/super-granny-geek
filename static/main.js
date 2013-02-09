var thefocus = null;
var column_map = {1: 'first', 2: 'second', 3: 'third'};
var columns = {1: null, 2: null, 3: null};  // 3 columns
var max_columns = 2; // 0-indexed
var delta = 0;
var debug;
var index = 0;
var context = 0;
var products;
var base_url = 'http://floating-caverns-7726.herokuapp.com';

var item_module = function() {

var selected = 0,
node = null,
position = 0,
items = null;


return {
    init : function(name, column) {
        node = document.getElementById(column_map[column]);
        node.innerHTML = '';  // wipe existing elements
        jQuery.getJSON(base_url + '/'+name+'/children/', function(data) {
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

        columns[column] = this;

    },
    setPosition : function(dx) {
        position += dx;
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

    },
    getSelectedItem : function() {
        return items[selected];
    }
};

};


function loadProducts(category) {
    var node = document.getElementById('images');
    node.innerHTML = '';
    jQuery.getJSON(base_url + '/'+category+'/products/', function(data) {
        products = data;
        for(var i=0; i<data.length; i++) {
            var item = document.createElement("div");
            item.className = "item";
            item.innerHTML = data[i].name;
            products[i].node = item;
            node.appendChild(item);
        }
    });
}


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
    columns[index].setPosition(delta);
    return false;

}

jQuery(document).ready(function () {

window.oncontextmenu = function() {
    context = 1;
    window.onclick();
    return false;
};

window.onclick = function(e) {

    var current_col,
        item,
        column;

    if(context == 1) {
        index ++;
    } else {
        index --;
    }
    if(index < 0) {
        index = 0;
    }
    if(index > max_columns) {
        // get the last column
        index = max_columns;
    }
    context = 0;


    current_col = columns[index];
    item = current_col.getSelectedItem();

    if (index < max_columns) {
        // load the next column
        column = item_module().init(item.slug, index + 1);
    }

    // load the products for this category
    loadProducts(item.slug);

};


debug = document.getElementById("debug");

root = item_module().init('root', 1);
loadProducts('root');

document.onmousewheel = scroll_handler;

});