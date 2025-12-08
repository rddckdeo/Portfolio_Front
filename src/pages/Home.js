// eslint-disable-next-line
import React, { useState, useRef, useEffect } from 'react'
import styles from '../css/Home.module.css'
import Api from '../api/api'
// Components
import {ProfileInfo, TechInfo, SiteInfo, ProjectInfo} from '../components/Home/ProfileInfo'
import Popup from '../components/common/Popup'
const Home = ({scrollToRefFunctions}) => {
    const [userData, setUserData] = useState({});
    useEffect(() => {
        Api.get("/home/initProfile")
            .then((res) => setUserData(res.data))
            .catch((err) => console.log(err));
    }, []);
    // Popup Open Validation
    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const openPopup = (content) => {
        setModalContent(content);
        setOpen(true);
    };
    // 섹션 ref 생성
    const profileRef = useRef(null);
    const projectRef = useRef(null);
    const techRef = useRef(null);
    const siteRef = useRef(null);
    if (scrollToRefFunctions) {
        scrollToRefFunctions.current = {
            goProfile: () => profileRef.current.scrollIntoView({ behavior: "smooth" }),
            goProject: () => projectRef.current.scrollIntoView({ behavior: "smooth" }),
            goTech: () => techRef.current.scrollIntoView({ behavior: "smooth" }),
            goSite: () => siteRef.current.scrollIntoView({ behavior: "smooth" })    
        };
    }
    // ****************************** Component ******************************
return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Popup open={open} onClose={() => setOpen(false)}>
                    {modalContent}
                </Popup>
                {/* ⭐ 여기 각 영역을 div로 감싸 ref 연결 */}
                <div ref={profileRef} className='width100'>
                    <ProfileInfo userData={userData}/>
                </div>
                <div ref={projectRef} className='width100'>
                    <ProjectInfo/>
                </div>
                <div ref={techRef} className='width100'>
                    <TechInfo setOpen={setOpen} openPopup={openPopup}/>
                </div>
                <div ref={siteRef} className='width100'>
                    <SiteInfo setOpen={setOpen} openPopup={openPopup}/>
                </div>
            </div>
        </div>
    )
}
export default Home