// eslint-disable-next-line
import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import Setting from '../pages/Setting'
import Sidebar from '../components/common/Sidebar'

// RouterWrapper: BrowserRouter를 감싸 AppRouter에 props 전달
const RouterWrapper = (props) => (
    <BrowserRouter>
        <AppRouter {...props} />
    </BrowserRouter>
)

const AppRouter = ({ children, scrollToRefFunctions, userSession, setUserSession }) => {
    const location = useLocation(); // 현재 URL 감지
    const isHome = location.pathname === "/"; // 홈에서만 Sidebar 표시

    return (
        <>
            {/* Header 등 children 렌더링 */}
            {children}

            {/* Sidebar는 홈에서만 표시 */}
            {isHome && <Sidebar scrollToFn={scrollToRefFunctions} />}

            {/* 라우팅 */}
            <Routes>
                <Route path="/" element={<Home scrollToRefFunctions={scrollToRefFunctions} />} />
                <Route 
                    path="/setting" 
                    element={
                        <Setting 
                            userSession={userSession}
                            setUserSession={setUserSession}
                        />
                    } 
                />
            </Routes>
        </>
    )
}

export default RouterWrapper
