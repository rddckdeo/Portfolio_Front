// eslint-disable-next-line
import React from 'react'


const Sidebar = ({ scrollToFn }) => {
    return (
        <nav className="Sidebar" aria-label="Section navigation">
            <button
                className="menuItem"
                onClick={() => scrollToFn.current.goProfile()}
                aria-label="Profile"
            >
                <span className="emoji">👤</span>
                <span className="label">Profile</span>
            </button>

            <button
                className="menuItem"
                onClick={() => scrollToFn.current.goProject()}
                aria-label="Projects"
            >
                <span className="emoji">📂</span>
                <span className="label">Projects</span>
            </button>

            <button
                className="menuItem"
                onClick={() => scrollToFn.current.goTech()}
                aria-label="Tech"
            >
                <span className="emoji">🛠</span>
                <span className="label">Tech</span>
            </button>

            <button
                className="menuItem"
                onClick={() => scrollToFn.current.goSite()}
                aria-label="Website"
            >
                <span className="emoji">🌐</span>
                <span className="label">Website</span>
            </button>
        </nav>
    );
};

export default Sidebar;