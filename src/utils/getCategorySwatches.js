import { AVATAR_PARTS } from "../data/character/avatarParts";

export const getCategorySwatches = (category) => {
    const allColors = AVATAR_PARTS[category]
        ?.flatMap((item) => item.colors || [])
        .filter((c) => c && c.hex);

    return Array.from(new Map(allColors?.map((c) => [c.hex, c])).values());
};