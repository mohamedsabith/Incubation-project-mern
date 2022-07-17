import {createContext,useState} from 'react';

export const usernameContext = createContext(null)

function Username({children}){
    const [username,setUsername] = useState("INCUBATION")
        return (
            <usernameContext.Provider value={{username,setUsername}}>
                {children}
            </usernameContext.Provider>
        )
    
    
}
export default Username