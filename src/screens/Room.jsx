import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../providers/socketProvider";
import ReactPlayer from 'react-player';

const RoomPage = () => {

    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState(null);
    
    const params = useParams();
    const paramsData = JSON.stringify(params, null, 2);

    const handleUserJoined = useCallback(({ email, id }) => {
        console.log(`Email ${email} joined the room`);
        setRemoteSocketId(id);
    }, [])
    useEffect(() => {
        socket.on('user:joined', handleUserJoined);

        return () => {
            socket.off('user:joined', handleUserJoined);
        }
    }, [socket, handleUserJoined]);

    const handleCallUser = useCallback(async() => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        })

        setMyStream(stream);
    }, [])

    return(
        <div>
            <h1>This is my room page</h1>
            <p>{paramsData}</p>
            <h4>{remoteSocketId ? 'Connected' : "No one in the room"}</h4>
            {remoteSocketId &&
            <button onClick={handleCallUser}>Call</button>
            }
            {
                myStream && 
                <>
                <h2>My Stream</h2>
                <ReactPlayer playing height={'300px'} width={'500px'} url={myStream}/>
                </>
            }
        </div>
    )
}

export default RoomPage;