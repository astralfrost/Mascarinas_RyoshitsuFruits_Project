<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class OfferProductsSeeder extends Seeder
{
    public function run(): void
    {
        $offerProducts = [
            [
                'name' => 'Heirloom Peach Box',
                'slug' => 'heirloom-peach-box',
                'description' => 'Premium heirloom peaches in a signature gift box. Perfect for celebrations.',
                'price' => 25.00,
                'stock' => 25,
                'category' => 'Stone Fruit',
                'image_url' => '\images\peach.png',
                'badge' => '50% OFF',
            ],
            [
                'name' => 'Exotic Berry Trio',
                'slug' => 'exotic-berry-trio',
                'description' => 'Rare berry varietals: black sapphire, golden raspberry, alpine strawberry.',
                'price' => 28.00,
                'stock' => 35,
                'category' => 'Berries',
                'image_url' => '\images\berry.png',
                'badge' => 'B2G1',
            ],
            [
                'name' => 'Yuzu Citrus Pack',
                'slug' => 'yuzu-citrus-pack',
                'description' => 'Fresh Japanese yuzu and sudachi - the ultimate citrus experience.',
                'price' => 19.99,
                'stock' => 40,
                'category' => 'Citrus',
                'image_url' => '\images\citrus.png',
                'badge' => 'NEW',
            ],
        ];

        foreach ($offerProducts as $product) {
            Product::updateOrCreate(
                ['slug' => $product['slug']],
                $product
            );
        }
    }
}

