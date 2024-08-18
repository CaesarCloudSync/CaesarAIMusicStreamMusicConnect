import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { io } from "socket.io-client";
import mqtt from "mqtt";
import HookMqtt from "./Hook";
export default function Home(){
    const navigate = useNavigate();

    return (
        <div>
            <HookMqtt />

        </div>
    )
}

/*

            <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
                <a onClick={() =>{navigate("/")}} style={{cursor:"pointer"}}>Home</a>
                <a onClick={() =>{navigate("/firstpage")}} style={{cursor:"pointer"}}>To FirstPage</a>
                <a onClick={() =>{navigate("/secondpage")}} style={{cursor:"pointer"}}>To SecondPage</a>
            </div>*/