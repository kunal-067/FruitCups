import {
  connectDb
} from "@/utils/dbconnect";
import {
  Product
} from "@/utils/models/product.model";
import {
  NextResponse
} from "next/server";

const sampleProducts = [{
    name: "Mango Delight Cup",
    price: 150,
    discount: "10%",
    nutrients: [{
        name: "Vitamin C",
        quantity: 30
      },
      {
        name: "Calories",
        quantity: 120
      }
    ],
    description: "Fresh mango cubes with honey and mint leaves.",
    images: [{
      url: "https://images.pexels.com/photos/5945906/pexels-photo-5945906.jpeg?auto=compress&cs=tinysrgb&w=800",
      position: 0
    }],
    highlighs: ["Refreshing", "Healthy", "Natural Flavor"],
    ingridients: ["Mango", "Honey", "Mint"],
    tag: "Energy Booster",
    type: "fruit"
  },
  {
    name: "Apple Mango Fusion",
    price: 180,
    discount: "0",
    nutrients: [{
        name: "Vitamin C",
        quantity: 40
      },
      {
        name: "Calories",
        quantity: 130
      }
    ],
    description: "Combination of fresh apple and mango for a healthy snack.",
    images: [{
      url: "https://images.pexels.com/photos/5945901/pexels-photo-5945901.jpeg?auto=compress&cs=tinysrgb&w=800",
      position: 0
    }],
    highlighs: ["Immune Booster", "Low Sugar"],
    ingridients: ["Apple", "Mango"],
    tag: "Immunity Booster",
    type: "fruit"
  },
  {
    name: "Mixed Fruit Cup",
    price: 200,
    discount: "5%",
    nutrients: [{
        name: "Vitamin A",
        quantity: 50
      },
      {
        name: "Fiber",
        quantity: 5
      }
    ],
    description: "A mix of seasonal fruits for a refreshing taste.",
    images: [{
      url: "https://images.pexels.com/photos/5938/fruit-dessert-sweet-tasty.jpg?auto=compress&cs=tinysrgb&w=800",
      position: 0
    }],
    highlighs: ["Refreshing", "High Fiber", "Vitamin Rich"],
    ingridients: ["Mango", "Apple", "Strawberry", "Banana"],
    tag: "Healthy Snack",
    type: "fruit"
  },
  {
    name: "Banana Smoothie",
    price: 120,
    discount: "0",
    nutrients: [{
        name: "Potassium",
        quantity: 450
      },
      {
        name: "Calories",
        quantity: 150
      }
    ],
    description: "Creamy banana shake with almond milk.",
    images: [{
      url: "https://images.pexels.com/photos/1294947/pexels-photo-1294947.jpeg?auto=compress&cs=tinysrgb&w=800",
      position: 0
    }],
    highlighs: ["Creamy Texture", "Healthy"],
    ingridients: ["Banana", "Almond Milk"],
    tag: "Energy Booster",
    type: "shake"
  },
  {
    name: "Strawberry Shake",
    price: 140,
    discount: "0",
    nutrients: [{
        name: "Vitamin C",
        quantity: 35
      },
      {
        name: "Calories",
        quantity: 160
      }
    ],
    description: "Fresh strawberries blended with milk and honey.",
    images: [{
      url: "https://images.pexels.com/photos/1458676/pexels-photo-1458676.jpeg?auto=compress&cs=tinysrgb&w=800",
      position: 0
    }],
    highlighs: ["Sweet & Healthy", "Refreshing"],
    ingridients: ["Strawberries", "Milk", "Honey"],
    tag: "Immune Booster",
    type: "shake"
  },
  {
    name: "Mango Lassi",
    price: 150,
    discount: "0",
    nutrients: [{
        name: "Vitamin C",
        quantity: 35
      },
      {
        name: "Protein",
        quantity: 4
      }
    ],
    description: "Classic mango lassi with yogurt and honey.",
    images: [{
      url: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=800",
      position: 0
    }],
    highlighs: ["Probiotic", "Refreshing", "Creamy"],
    ingridients: ["Mango", "Yogurt", "Honey"],
    tag: "Digestive Booster",
    type: "shake"
  },
  {
    name: "Dry Fruit Mix",
    price: 250,
    discount: "0",
    nutrients: [{
        name: "Protein",
        quantity: 20
      },
      {
        name: "Calories",
        quantity: 300
      }
    ],
    description: "Healthy mix of almonds, cashews, and raisins.",
    images: [{
      url: "https://images.pexels.com/photos/302478/pexels-photo-302478.jpeg?auto=compress&cs=tinysrgb&w=800",
      position: 0
    }],
    highlighs: ["Protein Rich", "Healthy Fat", "Energy Boost"],
    ingridients: ["Almonds", "Cashews", "Raisins"],
    tag: "Energy Booster",
    type: "dry-fruit"
  },
  {
    name: "Almond Milkshake",
    price: 160,
    discount: "0",
    nutrients: [{
        name: "Protein",
        quantity: 8
      },
      {
        name: "Calories",
        quantity: 180
      }
    ],
    description: "Creamy almond milkshake with honey.",
    images: [{
      url: "https://images.pexels.com/photos/302478/pexels-photo-302478.jpeg?auto=compress&cs=tinysrgb&w=800",
      position: 0
    }],
    highlighs: ["Protein Rich", "Vegan", "Refreshing"],
    ingridients: ["Almonds", "Milk", "Honey"],
    tag: "Energy Booster",
    type: "shake"
  },
  {
    name: "Pineapple Cup",
    price: 170,
    discount: "0",
    nutrients: [{
        name: "Vitamin C",
        quantity: 50
      },
      {
        name: "Calories",
        quantity: 120
      }
    ],
    description: "Fresh pineapple cubes with mint leaves.",
    images: [{
      url: "https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?auto=compress&cs=tinysrgb&w=800",
      position: 0
    }],
    highlighs: ["Refreshing", "Tropical Flavor", "Vitamin Rich"],
    ingridients: ["Pineapple", "Mint"],
    tag: "Immunity Booster",
    type: "fruit"
  },
  {
    name: "Apple Cinnamon Shake",
    price: 150,
    discount: "0",
    nutrients: [{
        name: "Fiber",
        quantity: 4
      },
      {
        name: "Calories",
        quantity: 160
      }
    ],
    description: "Apple shake with a hint of cinnamon and milk.",
    images: [{
      url: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=800",
      position: 0
    }],
    highlighs: ["Digestive Friendly", "Fiber Rich"],
    ingridients: ["Apple", "Cinnamon", "Milk"],
    tag: "Digestive Booster",
    type: "shake"
  },
  {
    name: "Mango Pineapple Shake",
    price: 180,
    discount: "0",
    nutrients: [{
        name: "Vitamin C",
        quantity: 45
      },
      {
        name: "Calories",
        quantity: 180
      }
    ],
    description: "Tropical shake with mango and pineapple.",
    images: [{
      url: "https://images.pexels.com/photos/302478/pexels-photo-302478.jpeg?auto=compress&cs=tinysrgb&w=800",
      position: 0
    }],
    highlighs: ["Tropical Flavor", "Refreshing"],
    ingridients: ["Mango", "Pineapple", "Milk"],
    tag: "Energy Booster",
    type: "shake"
  },
  // Add 10 more products similarly with fruit cups, shakes, dry fruits
  {
    name: "Kiwi Fruit Cup",
    price: 160,
    discount: "0",
    nutrients: [{
        name: "Vitamin C",
        quantity: 35
      },
      {
        name: "Calories",
        quantity: 110
      }
    ],
    description: "Fresh kiwi slices with mint and honey.",
    images: [{
      url: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=800",
      position: 0
    }],
    highlighs: ["Refreshing", "Healthy"],
    ingridients: ["Kiwi", "Honey", "Mint"],
    tag: "Immunity Booster",
    type: "fruit"
  },
  {
    name: "Papaya Cup",
    price: 150,
    discount: "0",
    nutrients: [{
        name: "Vitamin A",
        quantity: 50
      },
      {
        name: "Calories",
        quantity: 100
      }
    ],
    description: "Fresh papaya cubes for a vitamin boost.",
    images: [{
      url: "https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?auto=compress&cs=tinysrgb&w=800",
      position: 0
    }],
    highlighs: ["Vitamin Rich", "Healthy Snack"],
    ingridients: ["Papaya", "Mint"],
    tag: "Energy Booster",
    type: "fruit"
  },
  {
    name: "Mixed Dry Fruit Box",
    price: 300,
    discount: "0",
    nutrients: [{
        name: "Protein",
        quantity: 25
      },
      {
        name: "Calories",
        quantity: 350
      }
    ],
    description: "Box of assorted dry fruits including almonds, cashews, and raisins.",
    images: [{
      url: "https://images.pexels.com/photos/302478/pexels-photo-302478.jpeg?auto=compress&cs=tinysrgb&w=800",
      position: 0
    }],
    highlighs: ["Protein Rich", "Healthy Snack", "Energy Booster"],
    ingridients: ["Almonds", "Cashews", "Raisins", "Walnuts"],
    tag: "Energy Booster",
    type: "dry-fruit"
  },
  {
    name: "Strawberry Banana Shake",
    price: 170,
    discount: "0",
    nutrients: [{
        name: "Vitamin C",
        quantity: 35
      },
      {
        name: "Calories",
        quantity: 170
      }
    ],
    description: "Blend of fresh strawberries and banana with milk.",
    images: [{
      url: "https://images.pexels.com/photos/1294947/pexels-photo-1294947.jpeg?auto=compress&cs=tinysrgb&w=800",
      position: 0
    }],
    highlighs: ["Sweet & Healthy", "Energy Booster"],
    ingridients: ["Strawberries", "Banana", "Milk"],
    tag: "Energy Booster",
    type: "shake"
  },
  {
    name: "Apple Pineapple Cup",
    price: 180,
    discount: "0",
    nutrients: [{
        name: "Vitamin C",
        quantity: 45
      },
      {
        name: "Fiber",
        quantity: 4
      }
    ],
    description: "Fresh apple and pineapple cubes mixed in a cup.",
    images: [{
      url: "https://images.pexels.com/photos/5945901/pexels-photo-5945901.jpeg?auto=compress&cs=tinysrgb&w=800",
      position: 0
    }],
    highlighs: ["Refreshing", "Vitamin Rich"],
    ingridients: ["Apple", "Pineapple"],
    tag: "Immunity Booster",
    type: "fruit"
  },
  {
    name: "Mango Cashew Shake",
    price: 200,
    discount: "0",
    nutrients: [{
        name: "Protein",
        quantity: 10
      },
      {
        name: "Calories",
        quantity: 180
      }
    ],
    description: "Creamy mango shake with cashews for energy.",
    images: [{
      url: "https://images.pexels.com/photos/302478/pexels-photo-302478.jpeg?auto=compress&cs=tinysrgb&w=800",
      position: 0
    }],
    highlighs: ["Protein Boost", "Energy", "Creamy"],
    ingridients: ["Mango", "Cashews", "Milk"],
    tag: "Energy Booster",
    type: "shake"
  },
  {
    name: "Tropical Fruit Cup",
    price: 220,
    discount: "0",
    nutrients: [{
        name: "Vitamin C",
        quantity: 50
      },
      {
        name: "Calories",
        quantity: 120
      }
    ],
    description: "Mixed tropical fruits like mango, pineapple, and kiwi.",
    images: [{
      url: "https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?auto=compress&cs=tinysrgb&w=800",
      position: 0
    }],
    highlighs: ["Tropical", "Vitamin Rich", "Refreshing"],
    ingridients: ["Mango", "Pineapple", "Kiwi"],
    tag: "Immunity Booster",
    type: "fruit"
  }
];

async function fetchImage(query) {
  const res = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=5`, {
    headers: { Authorization: process.env.PEXELS_API_KEY }
  });
  const data = await res.json();
  if (!data.photos?.length) return data;
  const randomPhoto = data.photos[Math.floor(Math.random() * data.photos.length)];
  return randomPhoto.src;
}

export async function GET(res) {
  // await connectDb();
  try {
    // const products = await Promise.all(
    //   sampleProducts.map(async (elem) => {
    //     const query = `${elem.name} ${elem.type === "shake" ? "drink" : elem.type}`;
    //     const img = await fetchImage(query);
    //     console.log(img.portrait, 'image here ')
    //     return {
    //       ...elem,
    //       images: [{ url: img.large || elem.images[0].url, portrait:img.portrait || '', landScape:img.landscape || '', position: 0 }]
    //     };
    //   })
    // );

    // let data = await Product.insertMany(products);
    let data = await fetchImage('mixed berries')

    return NextResponse.json({ message: "Success", data });
  } catch (error) {
    return NextResponse.json({ msg: error.message, error });
  }
}
