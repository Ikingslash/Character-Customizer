import { useEffect, useState } from "react";

export const useFitScale = (naturalWidth, naturalHeight, reservedHeight = 96) => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const update = () => {
            const available = window.innerHeight - reservedHeight;
            if (available <= 0 || naturalHeight <= 0) return;
            const next = Math.min(1, available / naturalHeight);
            setScale(next);
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [naturalWidth, naturalHeight, reservedHeight]);

    return scale;
};