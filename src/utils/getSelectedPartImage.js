import { getSelectedPartStyle } from "./getSelectedPartStyle";

export const getSelectedPartImage = (category, selectedParts, selectedColorIndices) => {
    const style = getSelectedPartStyle(category, selectedParts);
    if (!style) return null;

    const colorIndex = selectedColorIndices[category] || 0;
    return style.colors?.[colorIndex]?.image || style.colors?.[0]?.image || null;
};