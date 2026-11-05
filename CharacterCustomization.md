# CharacterCustomization.jsx — Code & Explanation

Full source and walkthrough of `src/pages/CharacterCustomization.jsx`.

---

## Explanation

### 1. Imports (lines 1–13)
- `useState` — all local state.
- `useParams` — grabs `:gender` from the URL (`/customize/male` or `/customize/female`).
- `BackButton` — back nav component.
- **Data**: `AVATAR_PARTS` (all styles per category), `BASE_CHARACTERS` (base body images per gender), `CATEGORIES` (tab bar items), `STAGE_GEOMETRY` (numbers that position everything), `SKIN_COLORS` (skin swatch hexes).
- **Utils**: `getAssetSize` (native px size of an SVG), `getCategorySwatches` (unique colors for a category), `getSelectedPartImage` / `getSelectedPartStyle` (resolve selected index → style object / image path), `useFitScale` (scales the stage to fit the window).

### 2. Module constants (lines 15–22)
- `FACE_ORDER` — render order for face layers: eyes → eyebrows → nose → mouth → hair.
- `FACE_Z` — z-index per layer so later items stack on top (hair = 50 is highest).
- `HAIR_OVERRIDE` — which hairstyles get their **own** geometry entry: `angel`/`dreads` → share `angelDreads`, `rihanna` → its own. Anything not listed (pixie, nakamura, afro) uses the default `face.hair`.

### 3. `PartLayer` component (lines 24–46)
Renders one positioned image:
- `getAssetSize(image)` → the SVG's natural width/height; if unknown or no anchor, render nothing.
- `offsetX` comes from the anchor (defaults to 0).
- **Horizontally centered** on `centerX + offsetX`, **vertically centered** on `anchor.y` (subtracts half the image size from each so the anchor point is the image's center).
- Absolutely positioned, `pointer-events-none` (clicks pass through), decorative (`alt=""`, `aria-hidden`).

### 4. State (lines 49–74)

| State | Purpose |
|---|---|
| `selectedSkinIndex` | Which base body image (0 = first) |
| `activeCategory` | Open tab, starts on `"skin"` |
| `selectedParts` | Chosen style index per category; `null` = nothing selected |
| `selectedColorIndices` | Chosen color index per category |

- `gender` from URL → `activeGender` falls back to `"male"` if invalid.
- `genderList` / `characterImage` → the base image for current gender + skin index.
- `stage` = geometry for this gender; `scale` = fit-to-window multiplier (recomputes on resize).

### 5. Handlers (lines 76–89)
- `handleSelectPart(category, index)` — **the toggle**: if that index is already selected → `null` (removes the part), otherwise → selects it. The React equivalent of `classList.add/remove`.
- `handleSelectSkin(index)` — plain select (bodies can't be "off").
- `handleSelectColor(category, colorIndex)` — plain select.

### 6. Hair override resolution (lines 91–98)
1. `selectedHairStyle` — look up the hair style object from its index (or `null`).
2. `activeHairOverride` — check `HAIR_OVERRIDE[style.id]` → `"angelDreads"`, `"rihanna"`, or `undefined`.
3. `hairAnchor` — if there's an override, pull `stage.hairOverrides.angelDreads` or `stage.hairOverrides.rihanna` (editable numbers in `stageGeometry.js`); otherwise fall back to `stage.face.hair`.

### 7. Clothing resolution (lines 100–104)
Gets clothing style + image, builds an anchor only if the style declares a `slot` (`torso`/`legs`). Stage slot geometry first, then the style's own `anchor` overrides any fields.

### 8. Left column — character preview (lines 111–174)
Two nested divs solve "draw at native size but fit on screen":
- **Outer div**: reserves layout space at `stage.width/height × scale`.
- **Inner div**: absolutely centered, drawn at **native** dimensions, then `transform: scale(scale)` shrinks it into place — all geometry numbers stay in original asset pixels.

Layers:
1. **Base skin** — z 0, full stage size.
2. **Clothing** — z 10, only if selected.
3. **Face layers** — loops `FACE_ORDER`:
   - Resolves style + image per category; skips if none selected.
   - Hair uses `hairAnchor` (the override path), everything else uses `stage.face[category]`.
   - A style can carry its own `anchor`, which merges over the base and wins on conflicts.
   - Renders a `PartLayer` with that anchor and the category's z-index.

### 9. Right column — controls panel (lines 176–271)

**a. Category tab bar** — pink pill (`#FB59AA`), one button per `CATEGORIES` entry. Active tab gets `bg-white/30`; inactive get hover states.

**b. Option grid**
- **Skin tab**: maps `SKIN_COLORS` to big colored squares; selected gets `ring-4 ring-white shadow-lg`.
- **Any other tab**: maps `AVATAR_PARTS[activeCategory]` to boxes showing the preview image in the active color (fallback to 0). Selected gets the white ring + `bg-white/60`; hover lightens. Click → `handleSelectPart` toggle.

**c. Color swatch bar** — an IIFE that skips the skin tab, gets unique colors for the active category (returns `null` if none, so categories like `nose` show no bar), and renders the dark translucent bar of small color circles.

### 10. Export (line 277)
Default export so the router can render it as a page.

**Data flow in one line:** URL gender + clicks → state → handlers resolve images/anchors from data files → preview layers and panel both re-render from the same state.

---

## Full code

```jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { AVATAR_PARTS } from "../data/character/avatarParts";
import { BASE_CHARACTERS } from "../data/character/baseCharacters";
import { CATEGORIES } from "../data/character/categories";
import { STAGE_GEOMETRY } from "../data/character/stageGeometry";
import { SKIN_COLORS } from "../data/character/skinColors";
import { getAssetSize } from "../utils/assetSizes";
import { getCategorySwatches } from "../utils/getCategorySwatches";
import { getSelectedPartImage } from "../utils/getSelectedPartImage";
import { getSelectedPartStyle } from "../utils/getSelectedPartStyle";
import { useFitScale } from "../utils/useFitScale";

const FACE_ORDER = ["eyes", "eyebrows", "nose", "mouth", "hair"];
const FACE_Z = { eyes: 10, eyebrows: 20, nose: 30, mouth: 40, hair: 50 };

const HAIR_OVERRIDE = {
    angel: "angelDreads",
    dreads: "angelDreads",
    rihanna: "rihanna",
};

function PartLayer({ image, centerX, anchor, zIndex }) {
    const size = getAssetSize(image);
    if (!size || !anchor) return null;

    const offsetX = anchor.offsetX || 0;

    return (
        <img
            src={image}
            alt=""
            aria-hidden="true"
            draggable="false"
            className="pointer-events-none absolute select-none"
            style={{
                width: size.width,
                height: size.height,
                left: centerX + offsetX - size.width / 2,
                top: anchor.y - size.height / 2,
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
    });

    const [selectedColorIndices, setSelectedColorIndices] = useState({
        hair: 0,
        eyebrows: 0,
        eyes: 0,
        mouth: 0,
    });

    const stage = STAGE_GEOMETRY[activeGender];
    const scale = useFitScale(stage.width, stage.height);

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
        ? { ...stage.clothing[clothingStyle.slot], ...clothingStyle.anchor }
        : null;

    return (
        <main className="relative min-h-screen bg-[#FFC4D6]">
            <BackButton />

            <div className="grid min-h-screen grid-cols-1 items-center px-8 md:grid-cols-2">
                {/* Left Column: Character Preview Stack at native asset scale */}
                <div className="flex h-full items-center justify-center p-6">
                    <div
                        className="relative shrink-0"
                        style={{
                            width: stage.width * scale,
                            height: stage.height * scale,
                        }}
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

                            {/* 2. Clothing Layer */}
                            {clothingImage && clothingAnchor && (
                                <PartLayer
                                    image={clothingImage}
                                    centerX={stage.centerX}
                                    anchor={clothingAnchor}
                                    zIndex={10}
                                />
                            )}

                            {/* 3. Face Layers */}
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
                                    />
                                );
                            })}
                        </div>
                    </div>
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
                                        onClick={() => setActiveCategory(cat.id)}
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

                    {activeCategory !== "skin" && (() => {
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
```
