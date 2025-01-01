import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import {  userId, userToken } from "../redux/reducers/userSlice"



const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleLogout = () => {
    dispatch(userToken(''))
    dispatch(userId(''));
  }


  return (
    <div>
      
      <p>Hellow World</p>
      <br />
      <button onClick={handleLogout}>LogOut</button>
      <p>Please Sign In</p>
      <br />
      <button onClick={() => navigate('/auth/signin')}>SignIn</button>
    </div>
  )
}

export default Home
