// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import Api from '../../api/api'
import styles from "../../css/Setting.module.css";
// *********************************************************************************
// *********************************************************************************
// *********************************************************************************
const Login = ({ setUserSession }) => {
    const testLogin = { admin: "pwd", user1: "1234" };
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const login = () => {
        if (!id || !pwd) {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }
        if (testLogin[id] && testLogin[id] === pwd) {
            setUserSession(id);
            localStorage.setItem("user", id);
            alert("로그인 성공!");
        } else {
            alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            login();
        }
    };
    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginContent}>
                <div className="width100 justifystart">
                    <div>아이디 :</div>
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} 
                        onKeyDown={handleKeyDown}/>
                </div>
                <div className="width100 justifystart">
                    <div>비밀번호 :</div>
                    <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} 
                        onKeyDown={handleKeyDown}/>
                </div>
                <div className="width100 justifyEnd mt10">
                    <button onClick={login}>접속</button>
                </div>
            </div>
        </div>
    );
};
// *********************************************************************************
// *********************************************************************************
// *********************************************************************************
const Main = () => {
    const [settingToggle, setSettingToggle] = useState("home");
    const renderContent = () => {
        switch(settingToggle){
            case "home" : return <SetHome/>
            case "techAdd" : return <SetTechAdd/>
            case "techList" : return <SetTechList/>
            case "projectAdd" : return <SetProjectAdd/>
            case "projectList" : return <SetProjectList/>
            default : return <SetHome/>
        }
    }
    return(
        <div className={`${styles.loginContainer} flexColumn`}>
            <div className={styles.settingContent}>
                <div className="flexRow width100 height100">
                    <div className={styles.settingSidebar}>
                        <div>
                            <div className={styles.setItem} onClick={() => setSettingToggle("home")}>Home</div>
                        </div>
                        <div>
                            <div className={styles.setItem}>Tech Stack</div>
                            <div className={styles.setItem2} onClick={() => setSettingToggle("techList")}>기술 목록</div>
                            <div className={styles.setItem2} onClick={() => setSettingToggle("techAdd")}>기술 추가</div>
                        </div>
                        <div>
                            <div className={styles.setItem}>Project</div>
                            <div className={styles.setItem2} onClick={() => setSettingToggle("projectList")}>프로젝트 목록</div>
                            <div className={styles.setItem2} onClick={() => setSettingToggle("projectAdd")}>프로젝트 추가</div>
                        </div>
                    </div>
                    {/* content */}
                    <div className={styles.setContent}>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    )
}
// *********************************************************************************
// *********************************************************************************
// *********************************************************************************
// contnet components
const SetHome = () => {
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        Api.get("/home/initProfile")
            .then((res) => setProfileData(res.data))
            .catch((err) => console.log(err));
    }, []);
// *********************************************************************************
    const ProfileSetting = ({ profileData }) => {
        const title = ['No','파일 이름','파일 위치','사용여부','생성일자','수정일자','삭제여부'];
        // ******************** 캐러셀 상태 변수 추가
        const [currentIndex, setCurrentIndex] = useState(0);
        const imageList = profileData?.ATTACHMENT_LIST || [];
        const total = imageList.length;
        const leftIndex = (currentIndex - 1 + total) % total;
        const rightIndex = (currentIndex + 1 ) % total;

        const moveLeft = () => setCurrentIndex(prev => (prev - 1 + total) % total);
        const moveRight = () => setCurrentIndex(prev => (prev + 1) % total);
        // 캐러셀 상태 변수 추가 ********************
        return (
            <div className={styles.homeCard}>
                <div className="flexRow width100 justifyBetween alignCenter mb20">
                    <p className="bold fontSize18">프로필 사진 수정</p>
                </div>
                {/* 이미지 모음 */}
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

                {/* 목록 테이블 */}
                <div className={styles.tableContainer}>
                    <div className={styles.tableHeader}>
                        {title.map((item, index) => (
                            <div key={index}>{item}</div>
                        ))}
                    </div>

                    {profileData?.ATTACHMENT_LIST?.map((item, index) => (
                        <div className={styles.tableRow} key={index}>
                            <div>{index + 1}</div>
                            <div>{item.attName}</div>
                            <div>{item.attPath}</div>
                            <div>{item.isUse}</div>
                            <div>{item.createDate}</div>
                            <div>{item.updateDate}</div>
                            <div>{item.isDel}</div>
                        </div>
                    ))}
                    <div className="width100 justifyCenter">+</div>
                </div>
            </div>
        );
    };
// *********************************************************************************
    const ProfileDataSetting = ({ profileData }) => {
        return (
            <div className={styles.homeCard}>
                <div className="flexRow justifyEnd gap10 mb20">
                    <button className={styles.btnBlue}>수정</button>
                    <button className={styles.btnGreen}>완료</button>
                </div>
                <div className={styles.profileInfoBox}>
                    <div><span>이름 : </span>{profileData.NAME}</div>
                    <div><span>전화번호 : </span>{profileData.PHONE}</div>
                    <div><span>깃허브 : </span>{profileData.GIT_LINK}</div>
                    <div><span>소개 : </span>{profileData.INTRODUCTION}</div>
                    <div><span>생성일 : </span>{profileData.CREATE_DATE}</div>
                    <div><span>수정일 : </span>{profileData.UPDATE_DATE}</div>
                </div>
            </div>
        );
    };
// *********************************************************************************
    return (
        <div className="width100 height100 flexRow gap20">
            <ProfileSetting profileData={profileData} />
            <ProfileDataSetting profileData={profileData} />
        </div>
    );
};
// *********************************************************************************
// *********************************************************************************
// *********************************************************************************

const SetTechAdd = () => {
    return(
        <div className="width100 height100 flexColumn">

        </div>
    )
}
// *********************************************************************************
const SetTechList = () => {
    return(
        <div className="width100 height100 flexColumn">
            SetTechList
        </div>
    )
}
// *********************************************************************************
// *********************************************************************************
// *********************************************************************************
const SetProjectAdd = () => {
    // 이미지 상태 추가
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if(!file) return;
        setImageFile(file);
        // 미리보기 생성
        const preview = URL.createObjectURL(file);
        setImagePreview(preview);
    }
    // MD 파일 상태 추가
    const [mdFile, setMdFile] = useState(null);
    const handleMdFileUpload = (e) => {
        const file = e.target.files[0];
        if(!file) return;
        setMdFile(file);
    }
    const clear = () => {
        setImageFile(null);
        setImagePreview(null);
        setMdFile(null);
    }
    const save = () => {
        if(!imageFile || !mdFile){
            alert("이미지와 MD 파일을 모두 업로드해주세요");
            return;
        };
        Api.post("/setting/projectAdd", {
            imgName: imageFile ? imageFile.name : null,
            imgPath: imageFile ? `/images/${imageFile.name}` : null,
            mdName: mdFile ? mdFile.name : null,
            mdPath: mdFile ? `/md/${mdFile.name}` : null
        })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
    }
    // ************ 메모리 누수 방지
    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    return(
        <div className={`width100 height100 flexRow ${styles.projectAddContainer}`}>
            <div className={`flexColumn mr20 ml20 ${styles.leftArea}`}>
                {/* *************** 이미지 박스 */}
                <div className="width100 justifyCenter">
                    <div className={styles.projectImgBox}>
                        {imagePreview ? (
                            <img src={imagePreview} alt="preview" className={styles.projectPreview}/>
                        ) : (
                            <span className={styles.noImageText}>이미지를 업로드해주세요</span>
                        )}
                    </div>
                </div>
                <input
                    id="projectImgInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                />
                <button className="btnBlue mt10" 
                        onClick={() => document.getElementById("projectImgInput").click()}> 
                        이미지 삽입
                </button>
                
                <input
                    id="projectMdInput"
                    type="file"
                    accept=".md,text/markdown"
                    style={{ display: "none" }}
                    onChange={handleMdFileUpload}
                />
                <button className="btnGreen mt10"
                        onClick={() => document.getElementById("projectMdInput").click()}>
                    마크다운 삽입 ( .MD )
                </button>

                <div>이미지</div>
                <div className="ml10">
                    <div>path : {imageFile ? `/images/${imageFile.name}` : "-"}</div>
                    <div>이름 : {imageFile ? imageFile.name : "-"}</div>
                </div>
                
                <div className="mt10">MD 파일</div>
                <div className="ml10">
                    <div>path : {mdFile ? `/md/${mdFile.name}` : "-"}</div>
                    <div>이름 : {mdFile ? mdFile.name : "-"}</div>
                </div>
                {/* buttons */}
                <div className="justifyEnd gap10">
                    <button className="btnDefault" onClick={clear}>Clear</button>
                    <button className="btnDefault" onClick={save}>저장</button>
                </div>
            </div>
            <div className={`flexColumn ${styles.rightArea}`}>
                {/* md 에디터 영역 - 나중에 */}
                <div className={styles.mdEditorBox}>
                    MD 파일 Editor (준비 중)
                </div>
            </div>
        </div>
    )
}
// *********************************************************************************
const SetProjectList = () => {
    useEffect(() => {
        // Api.get("/home/getProject")
        //     .then((res) => console.log(res.data))
        //     .catch((err) => console.log(err));
    })
    return(
        <div className="width100 height100 flexColumn">
            <div className={styles.gridContainer}>
                
            </div>
        </div>
    )
}

export { Login, Main };
