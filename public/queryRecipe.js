"use strict";

var buttonName = document.getElementsByClassName("queryRecipeButton");

buttonName.eventListener('click', callback);


ajax("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + 227961 + "/analyzedInstructions?stepBreakdown=true", function(){

});





//

function ajax(method, url, handler, data) {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                handler(null, JSON.parse(this.responseText));
            } else {
                handler(this.statuscode, null);
            }
        }
    };

    req.open(method, url);
    if (method === 'POST') {
        req.setRequestHeader("Content-type", "application/JSON");
        req.setRequestHeader("Content-type", "application/JSON");
        req.send(data);
    } else {
        req.setRequestHeader("X-Mashape-Key", "WZlhmsK0m4mshHdDeHvnP8841dmdp1P8HzBjsnlXv0k9tJoybe");
        req.setRequestHeader("Accept", "application/JSON");
        req.send();
    }
}
