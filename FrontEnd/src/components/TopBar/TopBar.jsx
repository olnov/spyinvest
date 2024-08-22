import Logo from "../../assets/logo-si-5.png";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../ProfileImage/ProfileImage";

export const TopBar = () => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* <nav className="navbar fixed-top navbar-light bg-light shadow-sm p-0 mb-5 bg-body-tertiary"> */}
      <nav className="navbar navbar-expand-lg fixed-top shadow-sm navbar-light bg-light">
        <div
          className="d-flex align-items-center"
          style={{ marginLeft: "30px" }}
        >
          <a className="navbar-brand" href="#">
            <img src={Logo} width="108" height="42" alt="" />
          </a>
        </div>
        {!token ? (
          <>
            <div className="d-flex">
              <a href="#" className="btn btn-outline-primary me-2">
                Login
              </a>
              <a href="#" className="btn btn-primary">
                Signup
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="container-fluid">
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      className="nav-link fs-5 link-underline-opacity-100-hover"
                      aria-current="page"
                      href="/portfolios"
                    >
                      Portfolio
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link fs-5"
                      aria-current="page"
                      href={"/profile/" + id}
                    >
                      Profile settings
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="d-flex">
              <ProfileImage userId={id} width="40" height="40" />
              &nbsp;
              <button
                className="btn btn-outline-primary me-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </nav>
    </>
  );
};
