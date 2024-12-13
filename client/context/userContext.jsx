import { createContext, useState } from "react";

export const UserContex = createContext({})
export const UserContextProvider = ({children})=> {
    // USERCONTEXT FOR LOGGEDIN USER DATA 
    const [loggedInUser, setloggedInUser] = useState({})
    const setloggedInUserData = (data)=> {
        setloggedInUser(data)
    }
    //  USECONTEXT FOR SHOWING POST 
    const [posts, setposts] = useState([{}])
    const setPostData = (data)=> {
        setposts(data)
    }
    // USECONTEXT FOR CREATEBOX FORM 
    const [createpostState, setcreatepostState] = useState(true)
    const handleCreatepostState = ()=> {
        setcreatepostState((prev)=> !prev)
    }
    return (
        <UserContex.Provider value={{setloggedInUserData,loggedInUser,setPostData,posts,createpostState,handleCreatepostState}}>
            {children}
        </UserContex.Provider>
    )
}