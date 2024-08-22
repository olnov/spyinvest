import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, login } from "../../services/authServices";
import "./SignUp.css";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const functions = [
      setEmail,
      setPassword,
      setConfirmPassword,
      setName,
      setSurname,
    ];
    const targets = ["email", "password", "confirmPassword", "name", "surname"];

    for (let i = 0; i < functions.length; i++) {
      if (e.target.name === targets[i]) {
        functions[i](e.target.value);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        await register(email, password, name, surname);
        const data = await login(email, password);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        const id = localStorage.getItem("userId");
        navigate(`/profile/${id}`);
      } else {
        alert("Passwords do not match");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div
        className="px-4 py-5 px-md-5 text-center text-lg-start"
        style={{ ackgroundColor: "hsl(0, 0%, 96%)" }}
      >
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight text-white">
                Welcome to SpyInvest, <br />
                <span>where you have a license to invest!</span>
              </h1>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card" style={{ opacity: ".95" }}>
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={handleRegister}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            onChange={handleChange}
                          />
                          <label className="form-label" htmlFor="name">
                            First name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="text"
                            id="surname"
                            name="surname"
                            className="form-control"
                            onChange={handleChange}
                          />
                          <label className="form-label" htmlFor="surname">
                            Last name
                          </label>
                        </div>
                      </div>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="email">
                        Email address
                      </label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-control"
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="confirmPassword">
                        Confirm password
                      </label>
                    </div>

                    <button
                      type="submit"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-primary btn-block mb-4"
                    >
                      Sign up
                    </button>
                  </form>
                  <a href="/login">
                    <h6>Already registred? Please, login.</h6>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
