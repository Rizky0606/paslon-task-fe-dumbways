import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // const [isUser, setIsUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // setIsUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li className="my-3">
              <Link to="/">Home</Link>
            </li>
            <li className="mb-3">
              <Link to="/partai">Partai</Link>
            </li>
            <li>
              <Link to="/paslon">Paslon</Link>
            </li>
            <li className="my-3">
              <Link to="/voter">Voter</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          PemLu
        </Link>
      </div>
      <div className="navbar-end">
        {/* LOGIN */}
        {/* <Link to="/login">
          <button className="btn btn-ghost rounded-md mx-5 font-semibold text-white bg-red-500">
            Masuk
          </button>
        </Link> */}
        {/* <Link to="/sign-up">
          <button className="btn btn-ghost rounded-md mx-5 font-semibold text-white bg-red-500">
            Daftar
          </button>
        </Link> */}
        {/* End Login */}

        {/* IsLogin */}
        <h3 className="mr-4">Rizky Fauzi</h3>
        <div className="dropdown dropdown-hover mr-14">
          <div className="avatar h-[36px] w-[36px] align-center">
            <div>
              <img
                src="/assets/avatar.jpg"
                tabIndex={0}
                className="rounded-full object-cover"
                alt="Avatar"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-24 mt-10"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
        {/* END */}
      </div>
    </div>
  );
};

export default Navbar;
