// eslint-disable-next-line
import React, { useRef, useState } from 'react';
import './App.css';
import './css/common.css';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import AppRouter from './router/AppRouter';

function App() {
  // scroll function
  const scrollToRefFunctions = useRef(null);

  // user session state
  const [userSession, setUserSession] = useState(localStorage.getItem("user"));

  // 로그아웃 함수
  const handleLogout = () => {
    setUserSession(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="App">
      <AppRouter 
        scrollToRefFunctions={scrollToRefFunctions}
        userSession={userSession}
        setUserSession={setUserSession}
      >
        {/* Header에 userSession과 로그아웃 함수 전달 */}
        <Header userSession={userSession} handleLogout={handleLogout} />
      </AppRouter>
    </div>
  );
}

export default App;
