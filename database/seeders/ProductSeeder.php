<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Valencia Oranges',
                'slug' => 'valencia-oranges',
                'description' => 'Sweet, juicy, and perfect for morning refreshments. Sustainably grown in our local groves.',
                'price' => 12.50,
                'stock' => 50,
                'category' => 'Citrus',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ6C4tXcK6NCGMSHQY6aoYed2xsbKPNmz-CCPITB6_D-qkIIm_PtaPgMvO5xGsQ5lVe-msHEPt4FoWVBvNR1_laasgQz_Z-Hgrwi1zmzR5LHZJ_lCJzKbwdJ-KfU7ZrZlRd0SVVR_E7bzUQImSbSr5XI9UekeH1kv5765v9z7rqtyTkgwH1d5bKWRCwrKgEB8NnJNjqfXR7wVyRzN_at_Tro_fJ6x9reWnTwDR32o7Fzekwd4SUWyEkzvLbgd2RYi7eMGrznxvGnyY',
                'badge' => 'Organic',
            ],
            [
                'name' => 'Rainier Cherries',
                'slug' => 'rainier-cherries',
                'description' => 'Limited seasonal harvest with exceptional sugar content and firm texture.',
                'price' => 18.00,
                'stock' => 30,
                'category' => 'Berries',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtlIdL0T4mlomXM5b1c9bee0ijGMdp5uzHTUC6BcwWmRnvo-avNP_hWtGi6vRbNEw1H95ep1cOAfnN1DEVNJ_UkAYNjrUtyO_YV1H6eIdniq-cOkCwn1AU0mvQCsXsBQzYzWPtW2T_4RulVZdBfKxqGSknySnb6wm8_KaAVwGulJfaOfjwYHOWu5c0YgS3VwY4Vdlg_z0ujMjK7ZmDjOPxMa8a4XEhF5E6MQdTx4H6b-o8jnOvkj35-JVrYhqK35oDQbAXvQkAz8Ni',
                'badge' => 'Seasonal',
            ],
            [
                'name' => 'Baby Bananas',
                'slug' => 'baby-bananas',
                'description' => 'Creamy, small-batch bananas from tropical highlands. Perfect for healthy snacking.',
                'price' => 6.90,
                'stock' => 100,
                'category' => 'Tropical',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_Vq6S7nwLeUqxbaujomkcEM4M0yAxFuC5lRd8rGP1jsBYvJ-Ua4gaL-30ZSp_hCrYXtQUW7jxbeGT-KKXJyGPxCj2aAuxoUB2_NZ0CugI4pmElzg3RbimBBte2epE8PnqfwFMHVoZmJA7iMIWV538yW4WhrIp-udSQnh_jwSq_wn1C5LOVUKLwIu8uWrqdhAtZPJQyWdfVtpoCWAiO8k0iloIVFP6g_vdP_ekIQ-xoM3zpeKpEutOaDluOV7bguxajuakNUdFWzss',
                'badge' => 'Exotic',
            ],
            [
                'name' => 'Granny Smith Apples',
                'slug' => 'granny-smith-apples',
                'description' => 'Crisp, tart, and full of fiber. Freshly picked from our mountain orchards.',
                'price' => 9.00,
                'stock' => 75,
                'category' => 'Apples',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCdHN_C5pKzTwgG-hAwu9I0CMFqXshZoPqTJHEy1Q82cp6_i4XOQhyFhWVFlpQC4vPbTOuLHamYHPpxkv98F_G7ia1i95k4WsdmUQBlDr1i3jmNKk_7cgoEZT417t6BksWgY-MqsjMF0eMrRCnbI8JKanwZA2YDHS55Uwc4tPp-CPAcFHOj8XTtwDf8XK-UiB1HJaa8Db_NskNpJpFwRw0k2mdHSROElhcz9f3lMX32CN0bj1Ec8SbYUtj0oGvz8YEnZ1f_mHSockV',
                'badge' => 'Organic',
            ],
            [
                'name' => 'Pink Dragon Fruit',
                'slug' => 'pink-dragon-fruit',
                'description' => 'A visually stunning superfruit rich in antioxidants. Direct from tropical farms.',
                'price' => 14.25,
                'stock' => 40,
                'category' => 'Tropical',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPCh9GEfckkouvfR9BYoocNw_c1ETUiZEEfMMYxiO1_MFaAszotjxM_nnp5V7h82Fqf0b2siH-KuA0sLHYLA8F-LtPwCB-3h420R5TdIzCMskYrbcGhJthPlWmmfq2Sm4R_AQMI0MfrvAnwLYXdwaf8_LlCHtUidy7fAqWDry71PZdHA-5_rqQxclgov_7YrpP9tYWvJMCwo-YXZyijFz1somaDMCwt_qF0oKXtgPJbV7CH1GHPc5ODTXT9zvpu8unzMH_flflRKWn',
                'badge' => 'Exotic',
            ],
            [
                'name' => 'Wild Berry Mix',
                'slug' => 'wild-berry-mix',
                'description' => 'Hand-picked wild berries delivered fresh. Perfect for smoothies or baking.',
                'price' => 11.80,
                'stock' => 45,
                'category' => 'Berries',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV4BTfqzjTpFg-kZFH9d4yA8wp3W3A2jU4jy5sKbVv4ZXJsRemh1OMFNcDL0StpRAue2vMMn1wGPlHYKW6jYilNC0F1ossF1jn5NFPgaAbUNHnEQ9rSMs9_i6S-x6l3X3KwRyjs2p_HeI-vYlHrIR3pbVgpS8NuUH1le-lsF6AN0ks-nkFvHroxRX7sF-soi6sj8ok-8GgYqCG-PbMVIGDRFx9E1IUqtALPC2euSjU-Q58uVhhz6kjEore3dvvdptx4hTpZie9w9Iz',
                'badge' => 'Seasonal',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
