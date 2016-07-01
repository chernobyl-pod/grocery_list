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
