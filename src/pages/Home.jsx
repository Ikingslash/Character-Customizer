import React from "react";
import { Link } from "react-router-dom";
function Home({ onContinue }) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#FFC4D6]">
            <div className="flex flex-col items-center gap-3">
                <h1 className="text-lg font-medium text-neutral-950">
                    Pablo Jane Character Creator
                </h1>
                <Link
                    to="/menu"
                    className="rounded-md bg-[#FB59AA] px-4 py-2 text-lg text-white transition hover:bg-[#FB59AA]">
                    Click to Continue
                </Link>
            </div>
        </main>
    );
}

export default Home;