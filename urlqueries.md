recipe query to include:

number of options: int,
non-licensed: boolean,
intolerance: string,
dietary restrictions(paleo, vegan, etc): string,
cuisine(style): string,
type of dish(side, main, dessert): string

sample:

<!-- https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?excludeIngredients=coconut&intolerances=egg%2C+gluten&limitLicense=false&number=10&offset=0&query=burger&type=main+course -->



grocery list query to include:

query: actual search term
offset:
number: number of results, int

sample:

<!-- https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/search?number=10&offset=0&query=pasta -->




<!-- TODO this is the set header template for the api QUERY -->
var request = require('request');

var options = {
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete?metaInformation=false&number=25&query=por',
  headers: {
    'X-Mashape-Key': 'WZlhmsK0m4mshHdDeHvnP8841dmdp1P8HzBjsnlXv0k9tJoybe',
    'Accept': 'application/json'
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info);
  }
}

request(options, callback);
