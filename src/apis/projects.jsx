import axios from 'axios'

const projectEndpoint = `http://194.163.143.68/xrs/projects`
const localEndpoint = `http://192.168.104.202:2083/api/sign`

const projectApi = {
  createProject: (param) => axios.post(projectEndpoint, param),
  verifySignature: (param) => axios.get(`${localEndpoint}?signature=${param.signature}&wallet=${param.wallet}`)
}

export default projectApi