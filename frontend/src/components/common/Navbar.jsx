import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux"
import { userId, userToken } from "../../redux/reducers/userSlice";


const Navbar = () => {

    const dispatch = useDispatch()
  
  
    const handleLogout = () => {
      dispatch(userToken(''))
      dispatch(userId(''));
    }

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
            <div className="text-lg font-bold">Welcome, User!</div>
            <div className="flex items-center gap-4">
                <FaSearch className="text-gray-600 hover:text-blue-500 cursor-pointer" />
                <FaBell className="text-gray-600 hover:text-blue-500 cursor-pointer" />
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="">
                        <div className="w-10 rounded-full">
                            <FaUserCircle className="text-gray-600 hover:text-blue-500 cursor-pointer text-2xl" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
