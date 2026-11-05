const ZOOM_SCALE = 2.2;
const FRAME_WIDTH_MULTIPLIER = 1.35;
export const FRAME_VERTICAL_ROOM = 32;
const SPRING_EASE = "cubic-bezier(0.34, 1.56, 0.64, 1)";

function CharacterZoom({ width, height, scale, focusY, active, children }) {
    const translateY = active ? ZOOM_SCALE * scale * (height / 2 - focusY) : 0;

    return (
        <div
            className="relative shrink-0 overflow-hidden"
            style={{
                width: width * scale * FRAME_WIDTH_MULTIPLIER,
                height: height * scale + FRAME_VERTICAL_ROOM * 2,
            }}
        >
            <div
                className="absolute inset-0 transition-transform will-change-transform"
                style={{
                    transform: `translateY(${translateY}px) scale(${active ? ZOOM_SCALE : 1})`,
                    transitionDuration: active ? "850ms" : "500ms",
                    transitionTimingFunction: active ? SPRING_EASE : "ease-in-out",
                }}
            >
                {children}
            </div>
        </div>
    );
}

export default CharacterZoom;
