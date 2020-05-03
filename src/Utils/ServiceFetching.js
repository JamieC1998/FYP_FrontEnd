import Axios from "axios"

const getService = (callback, serviceName) => {
    Axios.get(`http://127.0.0.1:8110/instance/${serviceName}`)
    .then(response => {
        console.log(response.data[0])
        callback(`http://${response.data[0].instanceInfo.ipAddr}:${response.data[0].port}`)
    })
    .catch(err => console.log(err));
}

export default getService;