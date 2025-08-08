
import { useAuth } from '../context/Authcontext';
import { Navigate } from 'react-router';

const PrivateRouters = ({children}) => {
    const {  currentUser,isloading } = useAuth();
    if(isloading) return <div className='min-h-screen flex items-center justify-center'>Loading...</div>
    if(currentUser)
    {
        return children; 
    }
    return <Navigate to='/login' replace={true} /> 
}
export default PrivateRouters
