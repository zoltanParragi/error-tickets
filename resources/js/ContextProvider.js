import { useContext } from "react";
import { createContext, useState } from "react";

const StateContext = createContext({
    user: null,
    setUser: () => {},
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState()

    return(
        <StateContext.Provider value={{
            user,
            setUser,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext) 
