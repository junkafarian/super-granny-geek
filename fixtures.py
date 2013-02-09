from models import Category, Product

fixtures = {
    Category: [
        {
            'slug': 'fresh-and-bakery',
            'title': 'Fresh & Bakery',
            'parent_category_slug': None,
        },
        {
            'slug': 'milk-eggs-and-butter',
            'title': 'Milk, Eggs & butter',
            'parent_category_slug': 'fresh-and-bakery',
        },
 	 {
            'slug': 'Bread',
            'title': 'Bread',
            'parent_category_slug': 'fresh-and-bakery',
        },
    ],
    Product: [
        {
            'name': 'Fresh Milk - 1 Pint',
            'amount': 0.49,
            'image_url': 'static/images/semi_skimmed_1pint.jpg',
            'category_slug': 'milk-eggs-and-butter',
        },
        {
            'name': 'Fresh Milk - 2 Pints',
            'amount': 0.89,
            'image_url': 'static/images/semi_skimmed_2pint.jpg',
            'category_slug': 'milk-eggs-and-butter',
        },
        {
            'name': 'Fresh Milk - 4 Pints',
            'amount': 1.39,
            'image_url': 'static/images/semi_skimmed_4pint.jpg',
            'category_slug': 'milk-eggs-and-butter',
        },
        {
            'name': 'Fresh Milk - 6 Pints',
            'amount': 1.69,
            'image_url': 'static/images/semi_skimmed_6pint.jpg',
            'category_slug': 'milk-eggs-and-butter',
        },
 	{
            'name': 'Eggs',
            'amount': 1.59,
            'image_url': 'static/images/eggs.jpg',
            'category_slug': 'milk-eggs-and-butter',
        },
 	{
            'name': 'Butter',
            'amount': 1.19,
            'image_url': 'static/images/butter.jpg',
            'category_slug': 'milk-eggs-and-butter',
        },
	{
            'name': 'Farmhouse Loaf',
            'amount': 1.19,
            'image_url': 'static/images/farmhouse_loaf.jpg',
            'category_slug': 'bread',
        },
	{
            'name': 'Bread Roll',
            'amount': 0.56,
            'image_url': 'static/images/bread_roll.jpg',
            'category_slug': 'bread',
        },
    ]
}

