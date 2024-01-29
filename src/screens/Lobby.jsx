import { useCallback, useEffect, useState } from "react"
import { useSocket } from "../providers/socketProvider";
import { useNavigate } from "react-router-dom";

export default function Lobby () {

    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    const socket = useSocket();
    const navigate = useNavigate();

    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        // console.log({email, number});
        socket.emit("room:join", { email, number })
    }, [email, number, socket]);

    const handleJoinRoom = useCallback((data) => {
        // console.log("from handleJoinRoom", data);
        const { email, number } = data;
        // console.log(email, number);
        navigate(`/room/${number}`);
    }, [])

    useEffect(() => {
        socket.on('room:join', handleJoinRoom);

        return () => {
            socket.off('room:join', handleJoinRoom);
        }
    }, [socket, handleJoinRoom]);

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