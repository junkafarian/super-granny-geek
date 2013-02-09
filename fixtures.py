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
            'slug': 'fresh-milk-1',
            'title': 'Fresh Milk - 1 Pint',
            'parent_category_slug': 'milk-eggs-and-butter',
        },
        {
            'slug': 'fresh-milk-2',
            'title': 'Fresh Milk - 2 Pints',
            'parent_category_slug': 'milk-eggs-and-butter',
        },
        {
            'slug': 'fresh-milk-4',
            'title': 'Fresh Milk - 4 Pints',
            'parent_category_slug': 'milk-eggs-and-butter',
        },
        {
            'slug': 'fresh-milk-6',
            'title': 'Fresh Milk - 6 Pint',
            'parent_category_slug': 'milk-eggs-and-butter',
        },
    ],
    Product: [

    ]
}
