import axios from "axios";

const authAxios = axios.create({
    baseURL: 'https://639b45bdd51415019750e39b.mockapi.io/auth'
})

export default authAxios