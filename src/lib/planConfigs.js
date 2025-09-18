export const plans = [{
        id: '#PLAN1',
        name: "Basic",
        desc: "Perfect for starters - 3 days/week fruit delivery.",
        weekly: 149,
        monthly: 399,
        yearly: 3599,
        features: ["3 cups per week", "Morning/Evening delivery", "Basic support"],
    },
    {
        id: '#PLAN2',
        name: "Standard",
        desc: "Daily fruit cups, best for health lovers.",
        weekly: 249,
        monthly: 699,
        yearly: 6299,
        features: [
            "1 cup every day",
            "Flexible delivery slots",
            "Pause/skip days anytime",
            "Priority support",
        ],
        highlight: true,
    },
    {
        id: '#PLAN3',
        name: "Premium",
        desc: "Extra energy boost with 2 cups/day + perks.",
        weekly: 399,
        monthly: 1099,
        yearly: 9999,
        features: [
            "2 cups every day",
            "Custom scheduling",
            "Priority + WhatsApp support",
            "Exclusive seasonal fruits",
        ],
    },
];

export const defaultScheduledPlan = [{
        day: "monday",
        fruits: ["mango", "banana", "apple"],
        toppings: ["chia seeds", "honey"],
        cupName: "Mango Boost",
        cupImage:"https://images.pexels.com/photos/2064692/pexels-photo-2064692.jpeg?auto=compress&cs=tinysrgb&h=350"
    },
    {
        day: "tuesday",
        fruits: ["papaya", "grapes", "kiwi"],
        toppings: ["almonds"],
        cupName: "Tropical Mix",
        cupImage:"https://images.pexels.com/photos/4577656/pexels-photo-4577656.jpeg?auto=compress&cs=tinysrgb&h=350"
    },
    {
        day: "wednesday",
        fruits: ["apple", "orange", "pomegranate"],
        toppings: ["flax seeds"],
        cupName: "Vitamin C Cup",
        cupImage:"https://images.pexels.com/photos/4022107/pexels-photo-4022107.jpeg?auto=compress&cs=tinysrgb&h=350"
    },
    {
        day: "thursday",
        fruits: ["banana", "pineapple"],
        toppings: ["coconut flakes"],
        cupName: "Energy Bowl",
        cupImage:"https://images.pexels.com/photos/8179168/pexels-photo-8179168.jpeg?auto=compress&cs=tinysrgb&h=350"
    },
    {
        day: "friday",
        fruits: ["watermelon", "papaya"],
        toppings: [],
        cupName: "Hydration Mix",
        cupImage:"https://images.pexels.com/photos/5945726/pexels-photo-5945726.jpeg?auto=compress&cs=tinysrgb&h=350"
    },
    {
        day: "saturday",
        fruits: ["mango", "strawberry", "kiwi"],
        toppings: ["dark chocolate"],
        cupName: "Weekend Special",
        cupImage:"https://images.pexels.com/photos/4577656/pexels-photo-4577656.jpeg?auto=compress&cs=tinysrgb&h=350"
    },
    {
        day: "sunday",
        fruits: ["mixed berries", "banana"],
        toppings: ["peanut butter"],
        cupName: "Cheat Day Treat",
        cupImage:"https://images.pexels.com/photos/2635307/pexels-photo-2635307.jpeg?auto=compress&cs=tinysrgb&h=350"
    },
];