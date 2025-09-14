import { connectDb } from "@/utils/dbconnect";
import { Product } from "@/utils/models/product.model";
import { NextResponse } from "next/server";

const sampleProducts = [
  {
    name: "Fresh Mango Cup",
    price: 129,
    nutrients: [
      { name: "Vitamin C", quantity: 36 },
      { name: "Fiber", quantity: 2.6 },
      { name: "Calories", quantity: 60 }
    ],
    description: "Hand-cut ripe mango slices, perfect for a tropical boost. Seasonal and juicy.",
    images: [
      { url: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1592928303348-54d6d92c4e63?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Energy Booster",
    type: "fruit"
  },
  {
    name: "Mixed Berry Cup",
    price: 149,
    nutrients: [
      { name: "Antioxidants", quantity: 85 },
      { name: "Vitamin C", quantity: 50 },
      { name: "Calories", quantity: 80 }
    ],
    description: "A vibrant mix of strawberries, blueberries, and raspberries for antioxidant power.",
    images: [
      { url: "https://images.unsplash.com/photo-1572441710519-51e4f3c1d7d4?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1580052614034-dbaef0b1a4f0?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Immunity Booster",
    type: "fruit"
  },
  {
    name: "Watermelon Refresh Cup",
    price: 99,
    nutrients: [
      { name: "Hydration", quantity: 92 },
      { name: "Vitamin A", quantity: 569 },
      { name: "Calories", quantity: 30 }
    ],
    description: "Juicy watermelon chunks to keep you hydrated all day long.",
    images: [
      { url: "https://images.unsplash.com/photo-1592928303348-54d6d92c4e63?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Hydration Hero",
    type: "fruit"
  },
  {
    name: "Pineapple Tropical Cup",
    price: 139,
    nutrients: [
      { name: "Vitamin C", quantity: 47.8 },
      { name: "Bromelain", quantity: 1 },
      { name: "Calories", quantity: 50 }
    ],
    description: "Sweet pineapple pieces with digestive enzymes for a fresh start.",
    images: [
      { url: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Digestive Aid",
    type: "fruit"
  },
  {
    name: "Papaya Enzyme Cup",
    price: 119,
    nutrients: [
      { name: "Vitamin C", quantity: 60 },
      { name: "Fiber", quantity: 1.7 },
      { name: "Calories", quantity: 43 }
    ],
    description: "Fresh papaya slices rich in enzymes for better digestion.",
    images: [
      { url: "https://images.unsplash.com/photo-1613145993482-bf9d6d6b6d10?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1582251259004-5e7e4e4a8b2c?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Digestive Booster",
    type: "fruit"
  },
  {
    name: "Banana Potassium Cup",
    price: 89,
    nutrients: [
      { name: "Potassium", quantity: 358 },
      { name: "Fiber", quantity: 2.6 },
      { name: "Calories", quantity: 89 }
    ],
    description: "Creamy banana slices for sustained energy and muscle health.",
    images: [
      { url: "https://images.unsplash.com/photo-1617191510513-1b7a3f1df2a6?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1582251259004-5e7e4e4a8b2c?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Energy Sustainer",
    type: "fruit"
  },
  {
    name: "Strawberry Vitamin Cup",
    price: 159,
    nutrients: [
      { name: "Vitamin C", quantity: 59 },
      { name: "Antioxidants", quantity: 90 },
      { name: "Calories", quantity: 32 }
    ],
    description: "Sweet strawberries loaded with antioxidants for skin health.",
    images: [
      { url: "https://images.unsplash.com/photo-1572441710519-51e4f3c1d7d4?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Skin Glow",
    type: "fruit"
  },
  {
    name: "Orange Citrus Cup",
    price: 109,
    nutrients: [
      { name: "Vitamin C", quantity: 53 },
      { name: "Fiber", quantity: 3.1 },
      { name: "Calories", quantity: 47 }
    ],
    description: "Zesty orange segments for immune support.",
    images: [
      { url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1502741126161-b048400d2b8b?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Immunity Booster",
    type: "fruit"
  },
  {
    name: "Kiwi Superfood Cup",
    price: 149,
    nutrients: [
      { name: "Vitamin C", quantity: 93 },
      { name: "Vitamin K", quantity: 40 },
      { name: "Calories", quantity: 61 }
    ],
    description: "Fuzzy kiwi slices packed with super nutrients.",
    images: [
      { url: "https://images.unsplash.com/photo-1578920038418-825b3e5a4e6a?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1582251259004-5e7e4e4a8b2c?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Superfood Boost",
    type: "fruit"
  },
  {
    name: "Apple Crisp Cup",
    price: 79,
    nutrients: [
      { name: "Fiber", quantity: 4.4 },
      { name: "Vitamin C", quantity: 14 },
      { name: "Calories", quantity: 52 }
    ],
    description: "Crunchy apple slices for daily fiber intake.",
    images: [
      { url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd7?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1571902943204-3c11a8f7e4d1?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Daily Fiber",
    type: "fruit"
  },
  {
    name: "Mango Shake",
    price: 99,
    nutrients: [
      { name: "Vitamin A", quantity: 54 },
      { name: "Calories", quantity: 150 },
      { name: "Protein", quantity: 2 }
    ],
    description: "Creamy mango shake blended with milk for a refreshing drink.",
    images: [
      { url: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Energy Drink",
    type: "shake"
  },
  {
    name: "Banana Protein Shake",
    price: 89,
    nutrients: [
      { name: "Potassium", quantity: 358 },
      { name: "Protein", quantity: 5 },
      { name: "Calories", quantity: 120 }
    ],
    description: "Banana shake with protein powder for post-workout recovery.",
    images: [
      { url: "https://images.unsplash.com/photo-1617191510513-1b7a3f1df2a6?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Protein Shake",
    type: "shake"
  },
  {
    name: "Dry Fruit Milkshake",
    price: 129,
    nutrients: [
      { name: "Protein", quantity: 8 },
      { name: "Fiber", quantity: 3 },
      { name: "Calories", quantity: 180 }
    ],
    description: "Rich dry fruit shake with almonds, cashews, and dates.",
    images: [
      { url: "https://images.unsplash.com/photo-1604908177522-6c7b4b0ec6b7?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Nutrient Dense",
    type: "shake"
  },
  {
    name: "Almond Dry Fruit Mix",
    price: 199,
    nutrients: [
      { name: "Vitamin E", quantity: 25 },
      { name: "Protein", quantity: 21 },
      { name: "Calories", quantity: 579 }
    ],
    description: "Premium almond and mixed dry fruits for snacking.",
    images: [
      { url: "https://images.unsplash.com/photo-1604908177522-6c7b4b0ec6b7?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Healthy Snack",
    type: "dry-fruit"
  },
  {
    name: "Cashew Nut Cup",
    price: 179,
    nutrients: [
      { name: "Magnesium", quantity: 292 },
      { name: "Protein", quantity: 18 },
      { name: "Calories", quantity: 553 }
    ],
    description: "Roasted cashews for a crunchy protein boost.",
    images: [
      { url: "https://images.unsplash.com/photo-1604908177522-6c7b4b0ec6b7?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Protein Power",
    type: "dry-fruit"
  },
  {
    name: "Mixed Dry Fruits Pack",
    price: 249,
    nutrients: [
      { name: "Fiber", quantity: 10 },
      { name: "Antioxidants", quantity: 80 },
      { name: "Calories", quantity: 600 }
    ],
    description: "Assorted dry fruits including raisins, walnuts, and pistachios.",
    images: [
      { url: "https://images.unsplash.com/photo-1604908177522-6c7b4b0ec6b7?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Antioxidant Mix",
    type: "dry-fruit"
  },
  {
    name: "Walnut Brain Food Cup",
    price: 189,
    nutrients: [
      { name: "Omega-3", quantity: 9 },
      { name: "Protein", quantity: 15 },
      { name: "Calories", quantity: 654 }
    ],
    description: "Walnuts for brain health and omega-3 benefits.",
    images: [
      { url: "https://images.unsplash.com/photo-1604908177522-6c7b4b0ec6b7?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Brain Booster",
    type: "dry-fruit"
  },
  {
    name: "Raisin Energy Cup",
    price: 99,
    nutrients: [
      { name: "Iron", quantity: 1.88 },
      { name: "Fiber", quantity: 3.7 },
      { name: "Calories", quantity: 299 }
    ],
    description: "Sweet raisins for quick energy and iron boost.",
    images: [
      { url: "https://images.unsplash.com/photo-1604908177522-6c7b4b0ec6b7?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Quick Energy",
    type: "dry-fruit"
  },
  {
    name: "Pistachio Nut Mix",
    price: 169,
    nutrients: [
      { name: "Vitamin B6", quantity: 1.7 },
      { name: "Protein", quantity: 20 },
      { name: "Calories", quantity: 560 }
    ],
    description: "Roasted pistachios for vitamin B6 and protein.",
    images: [
      { url: "https://images.unsplash.com/photo-1604908177522-6c7b4b0ec6b7?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Vitamin Boost",
    type: "dry-fruit"
  },
  {
    name: "Date Sweet Cup",
    price: 119,
    nutrients: [
      { name: "Fiber", quantity: 8 },
      { name: "Potassium", quantity: 696 },
      { name: "Calories", quantity: 277 }
    ],
    description: "Natural sweetness from dates for a healthy treat.",
    images: [
      { url: "https://images.unsplash.com/photo-1604908177522-6c7b4b0ec6b7?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Natural Sweetener",
    type: "dry-fruit"
  },
  {
    name: "Apple Mango Shake",
    price: 109,
    nutrients: [
      { name: "Vitamin C", quantity: 25 },
      { name: "Calories", quantity: 140 },
      { name: "Protein", quantity: 3 }
    ],
    description: "Blended apple and mango for a refreshing shake.",
    images: [
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Refresh Shake",
    type: "shake"
  },
  {
    name: "Berry Yogurt Shake",
    price: 139,
    nutrients: [
      { name: "Protein", quantity: 10 },
      { name: "Probiotics", quantity: 1 },
      { name: "Calories", quantity: 160 }
    ],
    description: "Mixed berries with yogurt for gut health.",
    images: [
      { url: "https://images.unsplash.com/photo-1582251259004-5e7e4e4a8b2c?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1572441710519-51e4f3c1d7d4?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Gut Health",
    type: "shake"
  },
  {
    name: "Pineapple Coconut Shake",
    price: 119,
    nutrients: [
      { name: "Vitamin C", quantity: 40 },
      { name: "Electrolytes", quantity: 1 },
      { name: "Calories", quantity: 130 }
    ],
    description: "Tropical pineapple and coconut for hydration.",
    images: [
      { url: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Tropical Refresh",
    type: "shake"
  },
  {
    name: "Mixed Nut Trail Mix",
    price: 159,
    nutrients: [
      { name: "Healthy Fats", quantity: 45 },
      { name: "Protein", quantity: 15 },
      { name: "Calories", quantity: 500 }
    ],
    description: "Trail mix with mixed nuts and seeds for on-the-go snacking.",
    images: [
      { url: "https://images.unsplash.com/photo-1604908177522-6c7b4b0ec6b7?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Trail Snack",
    type: "dry-fruit"
  },
  {
    name: "Raisin Walnut Cup",
    price: 139,
    nutrients: [
      { name: "Iron", quantity: 2 },
      { name: "Omega-3", quantity: 5 },
      { name: "Calories", quantity: 450 }
    ],
    description: "Raisins and walnuts for iron and omega-3 benefits.",
    images: [
      { url: "https://images.unsplash.com/photo-1604908177522-6c7b4b0ec6b7?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Iron Boost",
    type: "dry-fruit"
  },
  {
    name: "Pistachio Raisin Mix",
    price: 149,
    nutrients: [
      { name: "Vitamin B6", quantity: 1.5 },
      { name: "Fiber", quantity: 4 },
      { name: "Calories", quantity: 480 }
    ],
    description: "Pistachios and raisins for a sweet and nutty mix.",
    images: [
      { url: "https://images.unsplash.com/photo-1604908177522-6c7b4b0ec6b7?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Nutty Sweet",
    type: "dry-fruit"
  },
  {
    name: "Date Almond Cup",
    price: 169,
    nutrients: [
      { name: "Magnesium", quantity: 270 },
      { name: "Fiber", quantity: 7 },
      { name: "Calories", quantity: 520 }
    ],
    description: "Dates and almonds for natural sweetness and magnesium.",
    images: [
      { url: "https://images.unsplash.com/photo-1604908177522-6c7b4b0ec6b7?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Magnesium Mix",
    type: "dry-fruit"
  },{
    name: "Mixed Fruit Shake",
    price: 119,
    nutrients: [
      { name: "Vitamin C", quantity: 45 },
      { name: "Calories", quantity: 135 },
      { name: "Fiber", quantity: 2 }
    ],
    description: "A blend of seasonal fruits for a nutritious shake.",
    images: [
      { url: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Fruit Fusion",
    type: "shake"
  },
  {
    name: "Coconut Water Shake",
    price: 99,
    nutrients: [
      { name: "Potassium", quantity: 250 },
      { name: "Calories", quantity: 120 },
      { name: "Electrolytes", quantity: 1 }
    ],
    description: "Refreshing coconut water shake for hydration.",
    images: [
      { url: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Hydration Shake",
    type: "shake"
  },
  {
    name: "Almond Cashew Mix",
    price: 189,
    nutrients: [
      { name: "Vitamin E", quantity: 20 },
      { name: "Protein", quantity: 19 },
      { name: "Calories", quantity: 575 }
    ],
    description: "A premium mix of almonds and cashews for a healthy snack.",
    images: [
      { url: "https://images.unsplash.com/photo-1604908177522-6c7b4b0ec6b7?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Healthy Nuts",
    type: "dry-fruit"
  },
  {
    name: "Kiwi Berry Shake",
    price: 129,
    nutrients: [
      { name: "Vitamin C", quantity: 80 },
      { name: "Antioxidants", quantity: 70 },
      { name: "Calories", quantity: 145 }
    ],
    description: "Kiwi and mixed berries for a nutrient-packed shake.",
    images: [
      { url: "https://images.unsplash.com/photo-1578920038418-825b3e5a4e6a?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1572441710519-51e4f3c1d7d4?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Antioxidant Shake",
    type: "shake"
  },
  {
    name: "Pecan Nut Cup",
    price: 199,
    nutrients: [
      { name: "Antioxidants", quantity: 60 },
      { name: "Protein", quantity: 10 },
      { name: "Calories", quantity: 691 }
    ],
    description: "Rich pecans for heart health and antioxidants.",
    images: [
      { url: "https://images.unsplash.com/photo-1604908177522-6c7b4b0ec6b7?w=800&h=600&fit=crop", position: 0 },
      { url: "https://images.unsplash.com/photo-1551024506-0b1a7b4a4d8a?w=800&h=600&fit=crop", position: 1 }
    ],
    tag: "Heart Health",
    type: "dry-fruit"
  }
];
export async function GET(res) {
    await connectDb();
    try {
       let a = await Product.insertMany(sampleProducts);
    // let a = await Product.deleteMany({});
        return NextResponse.json({message:'Success', a})
    } catch (error) {
        return NextResponse.json({msg:error.message, error})
    }
}
