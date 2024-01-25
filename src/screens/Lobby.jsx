import { useCallback, useState } from "react"

export default function Lobby () {

    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        console.log({email, number});
    }, [email, number])

    return(
        <>
        Lobby Screen
        <form onSubmit={handleSubmitForm}>
            <label htmlFor="email">Email</label>
            <input type="Email" id="email" onChange={(e) => setEmail(e.target.value)}/>
            <br />
            <label htmlFor="number">Room Number</label>
            <input type="Number" id="number" onChange={(e) => setNumber(e.target.value)}/>
            <br />
            <button>Join</button>
        </form>
        </>
    )
}