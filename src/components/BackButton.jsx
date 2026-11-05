import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function BackButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="absolute left-8 top-8 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FB59AA] text-white transition-all hover:bg-[#e04893] active:scale-95"
            aria-label="Go back"
        >
            <ArrowLeft size={28} />
        </button>
    );
}

export default BackButton;