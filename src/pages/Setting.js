// eslint-disable-next-line
import { Login, Main } from "../components/Setting/SettingComponents";
import styles from "../css/Setting.module.css";

const Setting = ({ userSession, setUserSession }) => {
    return (
    <div className={styles.container}>
        {userSession ? <Main /> : <Login setUserSession={setUserSession} />}
    </div>
    );
};

export default Setting;
