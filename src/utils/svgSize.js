const sizeCache = new Map();

// Reads an SVG's size from its own width/height or viewBox — no per-asset table needed.
export const getSvgSize = (src) => {
    if (!sizeCache.has(src)) {
        sizeCache.set(
            src,
            fetch(src)
                .then((res) => res.text())
                .then((text) => {
                    const svg = new DOMParser()
                        .parseFromString(text, "image/svg+xml")
                        .documentElement;
                    if (!svg || svg.nodeName === "parsererror") return null;

                    const width = parseFloat(svg.getAttribute("width"));
                    const height = parseFloat(svg.getAttribute("height"));
                    if (width && height) return { width, height };

                    const viewBox = svg
                        .getAttribute("viewBox")
                        ?.trim()
                        .split(/[\s,]+/)
                        .map(Number);
                    if (viewBox && viewBox.length === 4 && viewBox[2] && viewBox[3]) {
                        return { width: viewBox[2], height: viewBox[3] };
                    }
                    return null;
                })
                .catch(() => null),
        );
    }
    return sizeCache.get(src);
};

export default getSvgSize;
