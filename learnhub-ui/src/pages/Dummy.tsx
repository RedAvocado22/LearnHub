import { useState } from "react";
import { dummy } from "../api/dummy";

export default function Dummy() {
    const [dum, setDummy] = useState(null);
    const getDummy = async () => {
        setDummy(await dummy());
    };
    return (
        <>
            <button type="button" onClick={getDummy}>
                Get dummy
            </button>
            <h1>{dum}</h1>
        </>
    );
}
