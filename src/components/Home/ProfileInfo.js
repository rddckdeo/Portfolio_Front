// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import styles from '../../css/Home.module.css'
import Api from '../../api/api'
import Popup from '../common/Popup'
import PopupComponents from '../../components/Home/PopupComponents'

const ProfileInfo = ({userData}) => {
    // ******************** 캐러셀 상태 변수 추가
    const [currentIndex, setCurrentIndex] = useState(0);
    const imageList = userData?.ATTACHMENT_LIST || [];
    const total = imageList.length;
    const leftIndex = (currentIndex - 1 + total) % total;
    const rightIndex = (currentIndex + 1 ) % total;

    const moveLeft = () => setCurrentIndex(prev => (prev - 1 + total) % total);
    const moveRight = () => setCurrentIndex(prev => (prev + 1) % total);
    // 캐러셀 상태 변수 추가 ********************
    return (
        <div className={styles.card}>
            <p className={`${styles.cardTitle} mb10 fontJalnan`}>👋Welcome To My Portfolio!</p>
            <div className='flexRow spaceEvenly mt40 alignCenter minHeight400'>
                <div className={styles.carouselBackContainer}>
                    <div className={`${styles.carouselContainer} mb20`}>
                        {total > 0 && (
                            <>
                                <img
                                    src={imageList[leftIndex].attPath}
                                    alt="left"
                                    className={styles.carouselImageLeft}
                                    onClick={moveLeft}
                                />
                                <img
                                    src={imageList[currentIndex].attPath}
                                    alt="center"
                                    className={styles.carouselImageCenter}
                                />
                                <img
                                    src={imageList[rightIndex].attPath}
                                    alt="right"
                                    className={styles.carouselImageRight}
                                    onClick={moveRight}
                                />
                            </>
                        )}
                    </div>
                </div>

                <div className={styles.profileInfoBox}>
                    <div className={styles.infoRow}>
                        <div className={styles.infoLabel}> 
                            <img src='/images/icon/user.png' alt='user' className={styles.infoIcon}/> 이름</div>
                        <div className={styles.infoValue}>{userData.NAME}</div>
                    </div>

                    <div className={styles.infoRow}>
                        <div className={styles.infoLabel}> 
                            <img src='/images/icon/phone.png' alt='phone' className={styles.infoIcon}/>연락처</div>
                        <div className={styles.infoValue}>{userData.PHONE}</div>
                    </div>

                    <div className={styles.infoRow}>
                        <div className={styles.infoLabel}> 
                            <img src='/images/icon/email.png' alt='email' className={styles.infoIcon}/>이메일</div>
                        <div className={styles.infoValue}>{userData.EMAIL}</div>
                    </div>

                    <div className={styles.infoRow}>
                        <div className={styles.infoLabel}> 
                            <img src='/images/icon/github.png' alt='github' className={styles.infoIcon}/>GitHub</div>
                        <a  href={userData.GIT_LINK} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={styles.infoLink}>
                            {userData.GIT_LINK}
                        </a>
                    </div>

                    <div className={styles.introBox}>
                        {userData.INTRODUCTION}
                    </div>
                </div>

            </div>
        </div>
    )
}

const TechInfo = ({setOpen, openPopup}) => {
    const [techValue, setTechValue] = useState([]);
    useEffect(() => {
        Api.get("/home/initTech")
            .then((res) => setTechValue(res.data))
            .catch((err)=> console.log(err));
    },[]);
    const testValue = [
        { type : "backend", isImg : true, img : "/images/spring-icon.png", title : "Spring Boot" },
        { type : "backend", isImg : true, img : "/images/spring-icon.png", title : "Spring Framework" },
        { type : "backend", isImg : false, img : "", title : "Java" },
        { type : "frontend", isImg : false, img : "", title : "React" },
        { type : "frontend", isImg : false, img : "", title : "JSP" },
        { type : "frontend", isImg : false, img : "", title : "HTML" },
        { type : "frontend", isImg : false, img : "", title : "CSS" },
        { type : "frontend", isImg : false, img : "", title : "Java Script" },
        { type : "DataBase", isImg : false, img : "", title : "MySQL" },
        { type : "DataBase", isImg : false, img : "", title : "Oracle" },
        { type : "etc", isImg : false, img : "", title : "GitHub" }
    ]
    return(
        <div className={styles.card}>
            <p className={styles.cardTitle}>Tech Stack</p>
            <div className='flexColumn'>
                <div className='flexColumn p10'>
                    <div className='semibold fontSize20'>Back-End</div>
                    <div className='flexRow gap10 ml10 mt10'>
                        {techValue
                        .filter(item => item.techType === "backend")
                        .map((item, index) => (
                            <div key={index} className={styles.techItem}>
                            {item.isIcon === "1" ? (
                                <>
                                <img src={item.attPath} alt={item.techName} className={styles.techIcon}/>
                                <span className='bold'>{item.techName}</span>
                                </>
                            ) : (
                                <span className='bold'>{item.techName}</span>
                            )}
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div className='flexColumn p10'>
                    <div className='semibold fontSize20'>Front-End</div>
                    <div className='flexRow gap10 ml10 mt10'>
                        {techValue
                        .filter(item => item.techType === "frontend")
                        .map((item, index) => (
                            <div key={index} className={styles.techItem}>
                            {item.isIcon === "1" ? (
                                <>
                                <img src={item.attPath} alt={item.techName} className={styles.techIcon}/>
                                <span className='bold'>{item.techName}</span>
                                </>
                            ) : (
                                <span className='bold'>{item.techName}</span>
                            )}
                            </div>
                        ))
                        }
                    </div>
                </div>

                <div className='flexColumn p10'>
                    <div className='semibold fontSize20'>DataBase</div>
                    <div className='flexRow gap10 ml10 mt10'>
                        {techValue
                        .filter(item => item.techType === "database")
                        .map((item, index) => (
                            <div key={index} className={styles.techItem}>
                            {item.isIcon === "1" ? (
                                <>
                                <img src={item.attPath} alt={item.techName} className={styles.techIcon}/>
                                <span className='bold'>{item.techName}</span>
                                </>
                            ) : (
                                <span className='bold'>{item.techName}</span>
                            )}
                            </div>
                        ))
                        }
                    </div>
                </div>

                <div className='flexColumn p10'>
                    <div className='semibold fontSize20'>ETC</div>
                    <div className='flexRow gap10 ml10 mt10'>
                        {techValue
                        .filter(item => item.techType === "ETC")
                        .map((item, index) => (
                            <div key={index} className={styles.techItem}>
                            {item.isIcon === "1" ? (
                                <>
                                <img src={item.attPath} alt={item.techName} className={styles.techIcon}/>
                                <span className='bold'>{item.techName}</span>
                                </>
                            ) : (
                                <span className='bold'>{item.techName}</span>
                            )}
                            </div>
                        ))
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

const SiteInfo = ({setOpen, openPopup}) => {
    const [project, setProject] = useState([]);
    useEffect(() => {
        Api.get("/home/initProject")
            .then((res) => setProject(res.data))
            .catch((err) => console.log(err));
    }, []);

    return(
        <div className={styles.card}>
            <p className={styles.cardTitle}>Project</p>
            <div className={styles.gridContainer}>
                {project.map((item, index) => (
                    <div key={index} className={styles.gridCard} onClick={() => openPopup(<PopupComponents mdFile={item.mdPath} />)}>
                        <img src={item.imagePath} alt={item.title}/>
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

const ProjectInfo = () => {
    const [index, setIndex] = useState(0);
    const slides = [
        { img: '/images/project/CoCo.png', title: '개발자 협업 웹사이트: CoCo 프로젝트', year: '2024' },
        { img: '/images/project/hotelHaru.png', title: '호텔 예약 웹사이트 : Hotel Haru', year: '2024' },
    ];
    const goPrev = () => {
        setIndex(prev => (prev - 1 + slides.length) % slides.length);
    };
    
    const goNext = () => {
        setIndex(prev => (prev + 1) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex(prev => (prev + 1) % slides.length);
        }, 10000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.card}>
            
            <div className={styles.projectHeader}>
                <div className={styles.headerTop}>
                    <div><img src='/images/icon/leftBtn.png' onClick={goPrev} className={styles.arrowBtn}/></div>
                    <span className={styles.headerTitle}>{slides[index].title}</span>
                    <div><img src='/images/icon/rightBtn.png' onClick={goNext} className={styles.arrowBtn}/></div>
                </div>
                <div className={styles.progressBar}>
                    <div
                    className={styles.progressFill}
                    style={{ width: `${(index + 1) / slides.length * 100}%` }}
                    />
                </div>
            </div>

            <div className={styles.projectContent}>
                <div
                    className={styles.sliderWrapper}
                    style={{ transform: `translateX(-${index * 100}%)` }}>
                    {slides.map((slide, i) => (
                    <img key={i} src={slide.img} className={styles.projectImg} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export {ProfileInfo, TechInfo, SiteInfo, ProjectInfo}
