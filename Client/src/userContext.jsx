import {useState, useContext, useEffect, createContext } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user, setUser] = useState({})
    const [username, setUsername] = useState(null);
    const [id, setId] = useState(null);
    useEffect(()=>{
        axios.get('/api/v1/auth/profile').then((response) => {
            setUser(response.data.data)
            setUsername(response.data.data.username)
            setId(response.data.data._id)
        })
    }, []);
    return(
        <UserContext.Provider value={{user, setUser, username, setUsername, id, setId}}>
            {children}
        </UserContext.Provider>
    )
}