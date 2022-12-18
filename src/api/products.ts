import axios from "axios";

const productAxios = axios.create({
    baseURL: 'https://639b45bdd51415019750e39b.mockapi.io/foods'
})

export default productAxios