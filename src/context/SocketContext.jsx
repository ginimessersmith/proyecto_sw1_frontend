import { createContext, useEffect } from 'react';
import { useSocket } from '../hook/useSocket'
import { useAuthStore } from '../hook';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket,desconectarSocket } = useSocket('http://localhost:8080');

    const {status,user} = useAuthStore();

    useEffect(() => {
      if(status === 'authenticated'){
        conectarSocket();
      }
    }, [user, conectarSocket])
    useEffect(() => {
      if(status !== 'authenticated'){
        desconectarSocket();
      }
    }, [user, desconectarSocket])
    
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}