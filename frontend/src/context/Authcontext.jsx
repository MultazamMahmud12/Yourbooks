
import { useContext, useEffect } from "react";
import { createContext } from "react"; 
import PropTypes from "prop-types";
import { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword ,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import { set } from "react-hook-form";

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();
//auth provider
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
     // register a user 
     const registerUser = async(EmailAuthCredential,password) => {
        return createUserWithEmailAndPassword(auth, EmailAuthCredential, password);
     }
     const loginUser = async(EmailAuthCredential,password) => {
        return signInWithEmailAndPassword(auth, EmailAuthCredential, password);
     }

     const signInWithGoogle = async () => {
        return signInWithPopup(auth, googleProvider);
     }

     //logout
     const logOut = ()  => {
        return signOut(auth);
    }
    //manage user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            if(user)
            {
                const { email, displayName, photoURL } = user;
                const userData = {
                    email,
                    username: displayName,
                    photo : photoURL,
                };
                // You can use userData here if needed
            }
        });
        return () => unsubscribe();
    }, []);
    
    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logOut 
    }
    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    )
}