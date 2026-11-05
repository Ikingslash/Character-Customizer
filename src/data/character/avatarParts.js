// Scale of each part when rendered (1 = original size). Edit these to size parts up/down.
export const PART_SCALE = {
    hair: 1.02,
    eyebrows: 0.45,
    eyes: 0.4,
    nose: 0.35,
    mouth: 0.30,
    clothing: 1,
    pants: 1,
};

export const PART_SCALE_OVERRIDES = {
    "mouth-1": 0.24,
    "mouth-2": 0.24,
};

export const AVATAR_PARTS = {
    hair: [
        {
            id: "rihanna",
            name: "Rihanna",
            colors: [
                { id: "black", hex: "#000000", image: "/game assets/hair/Black Hair 1.svg" },
                { id: "brown", hex: "#B08968", image: "/game assets/hair/Brown Hair 1.svg" },
                { id: "blue", hex: "#1A8FE3", image: "/game assets/hair/Blue Hair 1.svg" },
                { id: "green", hex: "#2DBD6E", image: "/game assets/hair/Green Hair 1.svg" },
                { id: "purple", hex: "#564592", image: "/game assets/hair/Purple Hair 1.svg" },
                { id: "red", hex: "#DF2935", image: "/game assets/hair/Red Hair 1.svg" },
            ],
        },
        {
            id: "pixie",
            name: "Pixie",
            colors: [
                { id: "black", hex: "#000000", image: "/game assets/hair/Black Hair 2.svg" },
                { id: "brown", hex: "#B08968", image: "/game assets/hair/Brown Hair 2.svg" },
                { id: "blue", hex: "#1A8FE3", image: "/game assets/hair/Blue Hair 2.svg" },
                { id: "green", hex: "#2DBD6E", image: "/game assets/hair/Green Hair 2.svg" },
                { id: "purple", hex: "#564592", image: "/game assets/hair/Purple Hair 2.svg" },
                { id: "red", hex: "#DF2935", image: "/game assets/hair/Red Hair 2.svg" },
            ],
        },
        {
            id: "nakamura",
            name: "Nakamura",
            colors: [
                { id: "black", hex: "#000000", image: "/game assets/hair/Black Hair 3.svg" },
                { id: "brown", hex: "#B08968", image: "/game assets/hair/Brown Hair 3.svg" },
                { id: "blue", hex: "#1A8FE3", image: "/game assets/hair/Blue Hair 3.svg" },
                { id: "green", hex: "#2DBD6E", image: "/game assets/hair/Green Hair 3.svg" },
                { id: "purple", hex: "#564592", image: "/game assets/hair/Purple Hair 3.svg" },
                { id: "red", hex: "#DF2935", image: "/game assets/hair/Red Hair 3.svg" },
            ],
        },
        {
            id: "angel",
            name: "Angel",
            colors: [
                { id: "black", hex: "#000000", image: "/game assets/hair/Black Hair 4.svg" },
                { id: "brown", hex: "#B08968", image: "/game assets/hair/Brown Hair 4.svg" },
                { id: "blue", hex: "#1A8FE3", image: "/game assets/hair/Blue Hair 4.svg" },
                { id: "green", hex: "#2DBD6E", image: "/game assets/hair/Green Hair 4.svg" },
                { id: "purple", hex: "#564592", image: "/game assets/hair/Purple Hair 4.svg" },
                { id: "red", hex: "#DF2935", image: "/game assets/hair/Red Hair 4.svg" },
            ],
        },
        {
            id: "dreads",
            name: "Dreads",
            colors: [
                { id: "black", hex: "#000000", image: "/game assets/hair/Black Hair 5.svg" },
                { id: "brown", hex: "#B08968", image: "/game assets/hair/Brown Hair 5.svg" },
                { id: "blue", hex: "#1A8FE3", image: "/game assets/hair/Blue Hair 5.svg" },
                { id: "green", hex: "#2DBD6E", image: "/game assets/hair/Green Hair 5.svg" },
                { id: "purple", hex: "#564592", image: "/game assets/hair/Purple Hair 5.svg" },
                { id: "red", hex: "#DF2935", image: "/game assets/hair/Red Hair 5.svg" },
            ],
        },
        {
            id: "afro",
            name: "Afro",
            colors: [
                { id: "black", hex: "#000000", image: "/game assets/hair/Black Hair 6.svg" },
                { id: "brown", hex: "#B08968", image: "/game assets/hair/Brown Hair 6.svg" },
                { id: "blue", hex: "#1A8FE3", image: "/game assets/hair/Blue Hair 6.svg" },
                { id: "green", hex: "#2DBD6E", image: "/game assets/hair/Green Hair 6.svg" },
                { id: "purple", hex: "#564592", image: "/game assets/hair/Purple Hair 6.svg" },
                { id: "red", hex: "#DF2935", image: "/game assets/hair/Red Hair 6.svg" },
            ],
        },
    ],

    eyebrows: [
        {
            id: "thin",
            name: "Thin",
            colors: [
                { id: "default", hex: null, image: "/game assets/eyebrowns/Eyebrown 1.svg" },
            ],
        },
        {
            id: "arched",
            name: "Arched",
            colors: [
                { id: "default", hex: null, image: "/game assets/eyebrowns/Eyebrown 2.svg" },
            ],
        },
        {
            id: "thick",
            name: "Thick",
            colors: [
                { id: "black", hex: "#000000", image: "/game assets/eyebrowns/Black Eyebrown 1.svg" },
                { id: "brown", hex: "#81523F", image: "/game assets/eyebrowns/Brown Eyebrown 1.svg" },
                { id: "blue", hex: "#1A8FE3", image: "/game assets/eyebrowns/Blue Eyebrown 1.svg" },
                { id: "green", hex: "#2DBD6E", image: "/game assets/eyebrowns/Green Eyebrown 1.svg" },
                { id: "purple", hex: "#564592", image: "/game assets/eyebrowns/Purple Eyebrown 1.svg" },
                { id: "red", hex: "#DF2935", image: "/game assets/eyebrowns/Red Eyebrown 1.svg" },
            ],
        },
        {
            id: "thick-2",
            name: "Thick 2",
            colors: [
                { id: "black", hex: "#000000", image: "/game assets/eyebrowns/Black Eyebrown 2.svg" },
                { id: "brown", hex: "#81523F", image: "/game assets/eyebrowns/Brown Eyebrown 2.svg" },
                { id: "blue", hex: "#1A8FE3", image: "/game assets/eyebrowns/Blue Eyebrown 2.svg" },
                { id: "green", hex: "#2DBD6E", image: "/game assets/eyebrowns/Green Eyebrown 2.svg" },
                { id: "purple", hex: "#564592", image: "/game assets/eyebrowns/Purple Eyebrown 2.svg" },
                { id: "red", hex: "#DF2935", image: "/game assets/eyebrowns/Red Eyebrown 2.svg" },
            ],
        },
    ],

    eyes: [
        {
            id: "round",
            name: "Round",
            colors: [
                { id: "default", hex: null, image: "/game assets/eyes/Eye 1.svg" },
            ],
        },
        {
            id: "almond",
            name: "Almond",
            colors: [
                { id: "default", hex: null, image: "/game assets/eyes/Eye 2.svg" },
            ],
        },
        {
            id: "wide",
            name: "Wide",
            colors: [
                { id: "black", hex: "#000000", image: "/game assets/eyes/Black Eye 1.svg" },
                { id: "brown", hex: "#81523F", image: "/game assets/eyes/Brown Eye 1.svg" },
                { id: "blue", hex: "#1A8FE3", image: "/game assets/eyes/Blue Eye 1.svg" },
                { id: "green", hex: "#2DBD6E", image: "/game assets/eyes/Green Eye 1.svg" },
                { id: "purple", hex: "#564592", image: "/game assets/eyes/Purple Eye1.svg" },
                { id: "red", hex: "#DF2935", image: "/game assets/eyes/Red Eye 1.svg" },
            ],
        },
        {
            id: "deep",
            name: "Deep",
            colors: [
                { id: "black", hex: "#000000", image: "/game assets/eyes/Black Eye 2.svg" },
                { id: "brown", hex: "#81523F", image: "/game assets/eyes/Brown Eye 2.svg" },
                { id: "blue", hex: "#1A8FE3", image: "/game assets/eyes/Blue Eye 2.svg" },
                { id: "green", hex: "#2DBD6E", image: "/game assets/eyes/Green Eye 2.svg" },
                { id: "purple", hex: "#564592", image: "/game assets/eyes/Purple Eye 2.svg" },
                { id: "red", hex: "#DF2935", image: "/game assets/eyes/Red Eye 2.svg" },
            ],
        },
        {
            id: "sharp",
            name: "Sharp",
            colors: [
                { id: "black", hex: "#000000", image: "/game assets/eyes/Black Eye 3.svg" },
                { id: "brown", hex: "#81523F", image: "/game assets/eyes/Brown Eye 3.svg" },
                { id: "blue", hex: "#1A8FE3", image: "/game assets/eyes/Blue Eye 3.svg" },
                { id: "green", hex: "#2DBD6E", image: "/game assets/eyes/Green Eye 3.svg" },
                { id: "purple", hex: "#564592", image: "/game assets/eyes/Purple Eye 3.svg" },
                { id: "red", hex: "#DF2935", image: "/game assets/eyes/Red Eye 3.svg" },
            ],
        },
    ],

    nose: [
        {
            id: "small",
            name: "Small",
            colors: [
                { id: "default", hex: null, image: "/game assets/nose/Nose 1.svg" },
            ],
        },
        {
            id: "medium",
            name: "Medium",
            colors: [
                { id: "default", hex: null, image: "/game assets/nose/Nose 2.svg" },
            ],
        },
        {
            id: "wide",
            name: "Wide",
            colors: [
                { id: "default", hex: null, image: "/game assets/nose/Nose 3.svg" },
            ],
        },
        {
            id: "pointed",
            name: "Pointed",
            colors: [
                { id: "default", hex: null, image: "/game assets/nose/Nose 4.svg" },
            ],
        },
        {
            id: "broad",
            name: "Broad",
            colors: [
                { id: "default", hex: null, image: "/game assets/nose/Nose 5.svg" },
            ],
        },
    ],

    mouth: [
        {
            id: "mouth-1",
            name: "Mouth 1",
            colors: [
                { id: "default-1", hex: "#000000", image: "/game assets/mouth/Mouth 1.svg" },
            ],
        },
        {
            id: "mouth-2",
            name: "Mouth 2",
            colors: [
                { id: "default-2", hex: "#000000", image: "/game assets/mouth/Mouth 2.svg" },
            ],
        },
        {
            id: "full",
            name: "Full",
            colors: [
                { id: "blue-1", hex: "#1A8FE3", image: "/game assets/mouth/Blue Mouth 1.svg" },
                { id: "brown-1", hex: "#B08968", image: "/game assets/mouth/Brown Mouth 1.svg" },
                { id: "green-1", hex: "#2DBD6E", image: "/game assets/mouth/Green Mouth 1.svg" },
                { id: "pink-1", hex: "#FF69B4", image: "/game assets/mouth/Pink Mouth 1.svg" },
                { id: "purple-1", hex: "#564592", image: "/game assets/mouth/Purple Mouth 1.svg" },
            ],
        },
        {
            id: "wide",
            name: "Wide",
            colors: [
                { id: "blue-2", hex: "#1A8FE3", image: "/game assets/mouth/Blue Mouth 2.svg" },
                { id: "brown-2", hex: "#B08968", image: "/game assets/mouth/Brown Mouth 2.svg" },
                { id: "green-2", hex: "#2DBD6E", image: "/game assets/mouth/Green Mouth 2.svg" },
                { id: "pink-2", hex: "#FF69B4", image: "/game assets/mouth/Pink Mouth 2.svg" },
                { id: "purple-2", hex: "#564592", image: "/game assets/mouth/Purple Mouth 2.svg" },
            ],
        },
        {
            id: "small",
            name: "Small",
            colors: [
                { id: "blue-3", hex: "#1A8FE3", image: "/game assets/mouth/Blue Mouth 3.svg" },
                { id: "brown-3", hex: "#B08968", image: "/game assets/mouth/Brown Mouth 3.svg" },
                { id: "green-3", hex: "#2DBD6E", image: "/game assets/mouth/Green Mouth 3.svg" },
                { id: "pink-3", hex: "#FF69B4", image: "/game assets/mouth/Pink Mouth 3.svg" },
                { id: "purple-3", hex: "#564592", image: "/game assets/mouth/Purple Mouth 3.svg" },
                { id: "red-3", hex: "#DF2935", image: "/game assets/mouth/Red Mouth 3.svg" },
            ],
        },
        {
            id: "thin",
            name: "Thin",
            colors: [
                { id: "blue-4", hex: "#1A8FE3", image: "/game assets/mouth/Blue Mouth 4.svg" },
                { id: "brown-4", hex: "#B08968", image: "/game assets/mouth/Brown Mouth 4.svg" },
                { id: "green-4", hex: "#2DBD6E", image: "/game assets/mouth/Green Mouth 4.svg" },
                { id: "pink-4", hex: "#FF69B4", image: "/game assets/mouth/Pink Mouth 4.svg" },
                { id: "purple-4", hex: "#564592", image: "/game assets/mouth/Purple Mouth 4.svg" },
                { id: "red-4", hex: "#DF2935", image: "/game assets/mouth/Red Mouth 4.svg" },
            ],
        },
        {
            id: "pouty",
            name: "Pouty",
            colors: [
                { id: "blue-5", hex: "#1A8FE3", image: "/game assets/mouth/Blue Mouth 1.svg" },
                { id: "brown-5", hex: "#B08968", image: "/game assets/mouth/Brown Mouth 1.svg" },
                { id: "green-5", hex: "#2DBD6E", image: "/game assets/mouth/Green Mouth 1.svg" },
                { id: "pink-5", hex: "#FF69B4", image: "/game assets/mouth/Pink Mouth 1.svg" },
                { id: "purple-5", hex: "#564592", image: "/game assets/mouth/Purple Mouth 1.svg" },
            ],
        },
        {
            id: "smile",
            name: "Smile",
            colors: [
                { id: "blue-6", hex: "#1A8FE3", image: "/game assets/mouth/Blue Mouth 2.svg" },
                { id: "brown-6", hex: "#B08968", image: "/game assets/mouth/Brown Mouth 2.svg" },
                { id: "green-6", hex: "#2DBD6E", image: "/game assets/mouth/Green Mouth 2.svg" },
                { id: "pink-6", hex: "#FF69B4", image: "/game assets/mouth/Pink Mouth 2.svg" },
                { id: "purple-6", hex: "#564592", image: "/game assets/mouth/Purple Mouth 2.svg" },
            ],
        },
    ],

    clothing: [
        {
            id: "jersey-green",
            name: "Green Jersey",
            slot: "torso",
            colors: [
                { id: "large", hex: "#06D6A0", image: "/game assets/clothing/green jersey large.svg" },
                { id: "small", hex: "#06D6A0", image: "/game assets/clothing/green jersey small.svg" },
            ],
        },
        {
            id: "jersey-orange",
            name: "Orange Jersey",
            slot: "torso",
            colors: [
                { id: "large", hex: "#EA683F", image: "/game assets/clothing/orange jersey large.svg" },
                { id: "small", hex: "#EA683F", image: "/game assets/clothing/orange jersey small.svg" },
            ],
        },
        {
            id: "pablo-tee",
            name: "Pablo Tee",
            slot: "torso",
            colors: [
                { id: "large", hex: "#FFFFFF", image: "/game assets/clothing/pablo tee large.svg" },
                { id: "small", hex: "#FFFFFF", image: "/game assets/clothing/pablo tee small.svg" },
            ],
        },
    ],

    pants: [
        {
            id: "jeans",
            name: "Jeans",
            slot: "legs",
            colors: [
                { id: "large", hex: "#457B9D", image: "/game assets/clothing/jeans large.svg" },
                { id: "small", hex: "#457B9D", image: "/game assets/clothing/jeans small.svg" },
            ],
        },
    ],
};