import { useState } from "react";
import { dummy } from "../api/dummy";
import { useNavigate } from "react-router-dom";

export default function Dummy() {
    const [dum, setDummy] = useState(null);
    const navigate = useNavigate();
    const getDummy = async () => {
        setDummy(await dummy());
    };
    const handleGoHome = async () => {
        navigate("/");
    };
    return (
        <>
            <button type="button" onClick={handleGoHome}>
                Home
            </button>
            <button type="button" onClick={getDummy}>
                Get dummy
            </button>
            <h1>{dum}</h1>
        </>
    );
}
