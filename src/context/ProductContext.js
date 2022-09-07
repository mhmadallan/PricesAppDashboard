import { createContext } from "react";
import { useState,useEffect } from "react";

// context is to pass the props of the Context.Provider component through the value property in this example the data,setData array i.e the global state
export const Context = createContext();

// the component that will wrap the app component to get access to the global state where children is everything in our app
export const ProductContextProvider = ({children}) => {

    const [data,setData] = useState(null);
    useEffect(() => {
        fetch('http://localhost:4000/api/products')
            .then(res => res.json())
            .then(res => setData(res))

        //console.log(data)

    }, [])
    return(
        <Context.Provider value={[data,setData]}>
            {children}
        </Context.Provider>
    )
}