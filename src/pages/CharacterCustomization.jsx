import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import CharacterZoom, { FRAME_VERTICAL_ROOM } from "../components/CharacterZoom";
import { AVATAR_PARTS, PART_SCALE, PART_SCALE_OVERRIDES } from "../data/character/avatarParts";
import { BASE_CHARACTERS } from "../data/character/baseCharacters";
import { CATEGORIES } from "../data/character/categories";
import { STAGE_GEOMETRY } from "../data/character/stageGeometry";
import { SKIN_COLORS } from "../data/character/skinColors";
import { getSvgSize } from "../utils/svgSize";
import { getCategorySwatches } from "../utils/getCategorySwatches";
import { getSelectedPartImage } from "../utils/getSelectedPartImage";
import { getSelectedPartStyle } from "../utils/getSelectedPartStyle";
import { useFitScale } from "../utils/useFitScale";

const FACE_ORDER = ["eyebrows", "eyes", "nose", "mouth", "hair"];
const FACE_Z = { eyebrows: 10, eyes: 20, nose: 30, mouth: 40, hair: 50 };

const HAIR_OVERRIDE = {
    angel: "angelDreads",
    dreads: "angelDreads",
    rihanna: "rihanna",
};

const MOUTH_PAGE_SIZE = 5;

function PartLayer({ image, centerX, anchor, zIndex, sizeScale = 1 }) {
    const [size, setSize] = useState(null);

    useEffect(() => {
        let alive = true;
        getSvgSize(image).then((measured) => {
            if (alive) setSize(measured);
        });
        return () => {
            alive = false;
        };
    }, [image]);

    if (!size || !anchor) return null;

    const offsetX = anchor.offsetX || 0;
    const width = size.width * sizeScale;
    const height = size.height * sizeScale;

    return (
        <img
            src={image}
            alt=""
            aria-hidden="true"
            draggable="false"
            className="pointer-events-none absolute select-none"
            style={{
                width,
                height,
                left: centerX + offsetX - width / 2,
                top: anchor.y - height / 2,
                zIndex,
            }}
        />
    );
}

function CharacterCustomization() {
    const [selectedSkinIndex, setSelectedSkinIndex] = useState(0);
    const { gender } = useParams();
    const activeGender = gender && STAGE_GEOMETRY[gender] ? gender : "male";
    const genderList = BASE_CHARACTERS[gender] || BASE_CHARACTERS.male;
    const characterImage = genderList[selectedSkinIndex];
    const [activeCategory, setActiveCategory] = useState("skin");

    const [selectedParts, setSelectedParts] = useState({
        skin: 0,
        hair: null,
        eyebrows: null,
        eyes: null,
        nose: null,
        mouth: null,
        clothing: null,
        pants: null,
    });

    const [selectedColorIndices, setSelectedColorIndices] = useState({
        hair: 0,
        eyebrows: 0,
        eyes: 0,
        mouth: 0,
        pants: 0,
    });

    const [mouthPage, setMouthPage] = useState(0);

    const mouthItems = AVATAR_PARTS.mouth || [];
    const mouthPageCount = Math.max(1, Math.ceil(mouthItems.length / MOUTH_PAGE_SIZE));
    const safeMouthPage = Math.min(mouthPage, mouthPageCount - 1);
    const visibleMouthItems = mouthItems.slice(
        safeMouthPage * MOUTH_PAGE_SIZE,
        safeMouthPage * MOUTH_PAGE_SIZE + MOUTH_PAGE_SIZE,
    );

    const stage = STAGE_GEOMETRY[activeGender];
    const scale = useFitScale(stage.width, stage.height, 96 + FRAME_VERTICAL_ROOM * 2);
    const faceFocusY = (stage.face.hair.y + stage.face.mouth.y) / 2;
    const zoomToFace = FACE_ORDER.includes(activeCategory);

    const handleSelectPart = (category, index) => {
        setSelectedParts((prev) => ({
            ...prev,
            [category]: prev[category] === index ? null : index,
        }));
    };

    const handleSelectSkin = (index) => {
        setSelectedSkinIndex(index);
    };

    const handleSelectColor = (category, colorIndex) => {
        setSelectedColorIndices((prev) => ({ ...prev, [category]: colorIndex }));
    };

    const selectedHairStyle =
        selectedParts.hair !== null && selectedParts.hair !== undefined
            ? AVATAR_PARTS.hair[selectedParts.hair]
            : null;
    const activeHairOverride = selectedHairStyle ? HAIR_OVERRIDE[selectedHairStyle.id] : null;

    const hairAnchor =
        (activeHairOverride && stage.hairOverrides?.[activeHairOverride]) || stage.face.hair;

    const clothingStyle = getSelectedPartStyle("clothing", selectedParts);
    const clothingImage = getSelectedPartImage("clothing", selectedParts, selectedColorIndices);
    const clothingAnchor = clothingStyle?.slot
        ? {
            ...stage.clothing[clothingStyle.slot],
            ...clothingStyle.anchor,
            ...stage.clothingOverrides?.[clothingStyle.id],
        }
        : null;

    const pantsStyle = getSelectedPartStyle("pants", selectedParts);
    const pantsImage = getSelectedPartImage("pants", selectedParts, selectedColorIndices);
    const pantsAnchor = pantsStyle?.slot
        ? { ...stage.clothing[pantsStyle.slot], ...pantsStyle.anchor }
        : null;

    return (
        <main className="relative min-h-screen bg-[#FFC4D6]">
            <BackButton />

            <div className="grid min-h-screen grid-cols-1 items-center px-8 md:grid-cols-2">
                {/* Left Column: Character Preview Stack at native asset scale */}
                <div className="flex h-full items-center justify-center p-6">
                    <CharacterZoom
                        width={stage.width}
                        height={stage.height}
                        scale={scale}
                        focusY={faceFocusY}
                        active={zoomToFace}
                    >
                        <div
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            style={{
                                width: stage.width,
                                height: stage.height,
                                transform: `scale(${scale})`,
                            }}
                        >
                            {/* 1. Base Skin */}
                            <img
                                src={characterImage}
                                alt="Character Base"
                                draggable="false"
                                className="absolute inset-0 z-0 select-none object-contain drop-shadow-md"
                                style={{ width: stage.width, height: stage.height }}
                            />

                            {/* 2. Pants Layer */}
                            {pantsImage && pantsAnchor && (
                                <PartLayer
                                    image={pantsImage}
                                    centerX={stage.centerX}
                                    anchor={pantsAnchor}
                                    zIndex={9}
                                    sizeScale={PART_SCALE.pants ?? 1}
                                />
                            )}

                            {/* 3. Clothing Layer */}
                            {clothingImage && clothingAnchor && (
                                <PartLayer
                                    image={clothingImage}
                                    centerX={stage.centerX}
                                    anchor={clothingAnchor}
                                    zIndex={10}
                                    sizeScale={PART_SCALE.clothing ?? 1}
                                />
                            )}

                            {/* 4. Face Layers */}
                            {FACE_ORDER.map((category) => {
                                const style = getSelectedPartStyle(category, selectedParts);
                                const image = getSelectedPartImage(
                                    category,
                                    selectedParts,
                                    selectedColorIndices,
                                );
                                if (!image) return null;

                                const base = category === "hair" ? hairAnchor : stage.face[category];
                                const anchor = style?.anchor
                                    ? { ...base, ...style.anchor }
                                    : base;

                                return (
                                    <PartLayer
                                        key={category}
                                        image={image}
                                        centerX={stage.centerX}
                                        anchor={anchor}
                                        zIndex={FACE_Z[category]}
                                        sizeScale={
                                            PART_SCALE_OVERRIDES[style?.id] ??
                                            PART_SCALE[category] ??
                                            1
                                        }
                                    />
                                );
                            })}
                        </div>
                    </CharacterZoom>
                </div>

                {/* Right Column: Controls Panel */}
                <div className="flex h-full flex-col items-center justify-start gap-12 px-6 pt-16">
                    <div className="flex w-full flex-col items-center justify-center">
                        <div className="flex w-full max-w-md items-center justify-between rounded-3xl bg-[#FB59AA] px-6 py-3">
                            {CATEGORIES.map((cat) => {
                                const isActive = activeCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            setActiveCategory(cat.id);
                                            setMouthPage(0);
                                        }}
                                        className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-150 ${isActive
                                            ? "bg-white/30 shadow-sm"
                                            : "hover:bg-white/15 opacity-80 hover:opacity-100"
                                            }`}
                                        aria-label={cat.label}
                                        aria-pressed={isActive}
                                    >
                                        <img
                                            src={cat.icon}
                                            alt={cat.label}
                                            className={`h-8 w-8 object-contain transition-transform ${cat.className}`}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {activeCategory === "mouth" ? (
                        <div className="relative w-full max-w-md pt-12">
                            <div className="flex flex-wrap justify-center gap-6">
                                {visibleMouthItems.map((style, i) => {
                                    const index = safeMouthPage * MOUTH_PAGE_SIZE + i;
                                    const activeColorIdx = selectedColorIndices.mouth || 0;
                                    const previewImg = style.colors?.[activeColorIdx]?.image || style.colors?.[0]?.image;
                                    const isSelected = selectedParts.mouth === index;

                                    return (
                                        <button
                                            key={style.id || index}
                                            onClick={() => handleSelectPart("mouth", index)}
                                            className={`flex h-28 w-28 items-center justify-center rounded-2xl bg-white/30 p-2 transition-all hover:bg-white/50 ${isSelected ? "ring-4 ring-white bg-white/60 shadow-lg"
                                                : ""
                                                }`}
                                            aria-pressed={isSelected}
                                        >
                                            {previewImg && (
                                                <img
                                                    src={previewImg}
                                                    alt={style.name}
                                                    className="h-full w-full object-contain"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {safeMouthPage > 0 && (
                                <button
                                    onClick={() => setMouthPage(safeMouthPage - 1)}
                                    className="absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#FB59AA] shadow-lg transition hover:scale-105"
                                    aria-label="Previous"
                                >
                                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                                </button>
                            )}

                            {safeMouthPage < mouthPageCount - 1 && (
                                <button
                                    onClick={() => setMouthPage(safeMouthPage + 1)}
                                    className="absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#FB59AA] shadow-lg transition hover:scale-105"
                                    aria-label="Next"
                                >
                                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="flex max-w-md flex-wrap justify-center gap-6 pt-12">
                            {activeCategory === "skin"
                                ? SKIN_COLORS.map((color, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSelectSkin(index)}
                                        style={{ backgroundColor: color }}
                                        className={`h-28 w-28 rounded-2xl transition-all ${selectedSkinIndex === index
                                            ? "ring-4 ring-white shadow-lg"
                                            : "opacity-90"
                                            }`}
                                        aria-label={`Skin color ${index + 1}`}
                                        aria-pressed={selectedSkinIndex === index}
                                    />
                                ))
                                : AVATAR_PARTS[activeCategory]?.map((style, index) => {
                                    const activeColorIdx = selectedColorIndices[activeCategory] || 0;
                                    const previewImg = style.colors?.[activeColorIdx]?.image || style.colors?.[0]?.image;
                                    const isSelected = selectedParts[activeCategory] === index;

                                    return (
                                        <button
                                            key={style.id || index}
                                            onClick={() => handleSelectPart(activeCategory, index)}
                                            className={`flex h-28 w-28 items-center justify-center rounded-2xl bg-white/30 p-2 transition-all hover:bg-white/50 ${isSelected ? "ring-4 ring-white bg-white/60 shadow-lg"
                                                : ""
                                                }`}
                                            aria-pressed={isSelected}
                                        >
                                            {previewImg && (
                                                <img
                                                    src={previewImg}
                                                    alt={style.name}
                                                    className="h-full w-full object-contain"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                        </div>
                    )}

                    {activeCategory !== "skin" && activeCategory !== "clothing" && activeCategory !== "pants" && (() => {
                        const uniqueColors = getCategorySwatches(activeCategory);

                        if (uniqueColors.length === 0) return null;

                        return (
                            <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl bg-black/20 px-6 py-3 backdrop-blur-sm">
                                {uniqueColors.map((colorObj, index) => {
                                    const isSelected = (selectedColorIndices[activeCategory] || 0) === index;

                                    return (
                                        <button
                                            key={colorObj.id || index}
                                            onClick={() => handleSelectColor(activeCategory, index)}
                                            style={{ backgroundColor: colorObj.hex }}
                                            className={`h-8 w-8 rounded-lg transition-all ${isSelected ? "ring-2 ring-white shadow-md"
                                                : "opacity-80 hover:opacity-100"
                                                }`}
                                            aria-label={`Select color ${colorObj.id}`}
                                            aria-pressed={isSelected}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })()}
                </div>
            </div>
        </main>
    );
}

export default CharacterCustomization;