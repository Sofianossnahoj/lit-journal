import { Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
  const user = false;

  if (!user) {
    console.log('Nope!')
    return <Navigate to="/" />;
  }
}

export default ProtectedRoute