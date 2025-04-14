import React from "react";
import { useContext } from "react";
import { createContext, useState } from "react";

const StoreContext = createContext();
export const StoreProvider =  ({ children }) => {
    const [doctors, setDoctors] = useState([]);
    console.log(doctors);
    return (
        <StoreContext.Provider value={{ doctors, setDoctors }}>
            {children}
        </StoreContext.Provider>
    );
}

export const useStore = () => {
    return useContext(StoreContext)
}
