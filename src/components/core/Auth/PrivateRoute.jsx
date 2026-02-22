import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) =>{
    const { token } = useSelector((state) => state.auth);
    // token === null means not authenticated in this project
    if (token !== null) return children
    return <Navigate to="/login" replace />
}

export default PrivateRoute