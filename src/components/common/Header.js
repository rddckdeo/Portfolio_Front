// eslint-disable-next-line
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ userSession, handleLogout }) => {
    const navigate = useNavigate();

    return (
        <div className="Header">
            <div className="flexRow">
                <div className="logo" onClick={() => navigate("/")}>
                    💻 <span>CH Portfolio</span>
                </div>
            </div>
            <div className="flexRow gap10">
                {userSession && (
                    <div className="logoutBtn" onClick={handleLogout}>
                        🔓 Logout
                    </div>
                )}
                <div className="configBtn" onClick={() => navigate("/setting")}>
                    <img src="/images/config-icon.png" alt="config" className="headerIcon" />
                    <span>설정</span>
                </div>
            </div>
        </div>
    );
};


export default Header;
