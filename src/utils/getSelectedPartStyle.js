import { AVATAR_PARTS } from "../data/character/avatarParts";

export const getSelectedPartStyle = (category, selectedParts) => {
    const styleIndex = selectedParts[category];
    if (styleIndex === null || styleIndex === undefined) return null;

    return AVATAR_PARTS[category]?.[styleIndex] || null;
};