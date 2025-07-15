import { use, useEffect } from "react"
import { socketConnection as socket } from "../socket/Socket";

export const useSocket = () => {
    
    return socket
}