import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import DashboardContent from "../components/common/DashboardContant";





// <div>

//   <p>Hellow World</p>
//   <br />
//   <button onClick={handleLogout}>LogOut</button>
//   <p>Please Sign In</p>
//   <br />
//   <button onClick={() => navigate('/auth/signin')}>SignIn</button>
// </div>



const Home = () => {


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-1 p-4 overflow-y-auto">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
};

export default Home;

