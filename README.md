super-granny-geek
=================

`/root/children/` - all top level categories
`/<category_slug>/children/` - all categories with `category_slug` as a parent
`/<category_slug>/products/` - the products associated with `category_slug`
`/purchased/` - all categories with purchased products associated with them
`/purchase/<product_id>/` - mark the product `product_id` as purchased


dev commands
------------

`/reset_purchases/` - mark all products as unpurchased
`/reset_db/` - drop and recreate the database with fixtures