import React from "react";
import Logo from "../../assets/logo-si-3.png";

export const TopBar = ()=>{
    return (
        <>
        <nav className="navbar fixed-top navbar-light bg-light shadow-sm p-0 mb-5 bg-body-tertiary">
        <div className="d-flex align-items-center" style={{ marginLeft: '30px'}}>
        <a className="navbar-brand" href="#">
        <img src={Logo} width="55" height="80" alt="" />
        </a>
        <h2>SpyInvest</h2>
        </div>
        <div className="d-flex">
            <a href="#" className="btn btn-outline-primary me-2">Login</a>
            <a href="#" className="btn btn-primary">Signup</a>
        </div>
        </nav>
        </>
    )
}