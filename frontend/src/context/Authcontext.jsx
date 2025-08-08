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

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();

// Auth provider
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Register a user 
    const registerUser = async(email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    const loginUser = async(email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = async () => {
        return signInWithPopup(auth, googleProvider);
    }

    // Logout
    const logOut = () => {
        return signOut(auth);
    }
    
    // Manage user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            if(user) {
                const { email, displayName, photoURL } = user;
                const userData = {
                    email,
                    username: displayName,
                    photo: photoURL,
                };
                // You can use userData here if needed
            }
        });
        return () => unsubscribe();
    }, []);
    
    const value = {
        currentUser,
        isloading : loading, // For backward compatibility
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

// ✅ Add PropTypes validation for children
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;