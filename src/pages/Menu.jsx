import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

const characters = [
    {
        id: "male",
        label: "Male",
        image: "/game assets/base/male/Male Skin 1.svg",
    },
    {
        id: "female",
        label: "Female",
        image: "/game assets/base/female/Female Skin 1.svg",
    },
];

function Menu({ onSelect }) {
    return (
        <main className="relative min-h-screen bg-[#FFC4D6]">
            <BackButton />
            <div className="flex min-h-screen flex-col items-center justify-center">
                <h1 className="mb-6 text-2xl font-semibold text-neutral-950">
                    Pick a base character
                </h1>

                <div className="flex gap-4">
                    {characters.map((character) => (
                        <Link
                            key={character.id}
                            to={`/customize/${character.id}`}
                            onClick={() => onSelect(character.id)}
                            className="group flex flex-col items-center"
                        >
                            <div className="flex h-[400px] w-[400px] items-center justify-center bg-[#FFAFCC] transition-transform duration-200 group-hover:scale-[1.02] rounded-3xl">
                                <img
                                    src={character.image}
                                    alt={character.label}
                                    className="h-[326px] w-auto object-contain"
                                />
                            </div>

                            <span className="mt-2 text-xl font-medium text-neutral-950">
                                {character.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Menu;