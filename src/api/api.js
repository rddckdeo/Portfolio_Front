import axios from 'axios'

const Api = axios.create({
    baseURL: "http://localhost:80",
    withCredentials: true, // 쿠키/세션 필요할 때
})

export default Api