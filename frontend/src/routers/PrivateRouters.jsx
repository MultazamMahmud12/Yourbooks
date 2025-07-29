
import { useAuth } from '../context/Authcontext';
import { Navigate } from 'react-router';

const PrivateRouters = ({children}) => {
    const {  currentUser } = useAuth(); 
    if(currentUser)
    {
        return children; 
    }
    return <Navigate to='/login' replace={true} /> 
}
export default PrivateRouters
