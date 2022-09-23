import axios from 'axios'

const projectEndpoint = `http://194.163.143.68/xrs/projects`
//const localEndpoint = `https://xquery-backend.herokuapp.com/api/sign`
const localEndpoint = `http://143.198.144.71:5432/api/sign`

const projectApi = {
  createProject: (param) => axios.post(projectEndpoint, param),
  verifySignature: (param) => axios.get(`${localEndpoint}?signature=${param.signature}&wallet=${param.wallet}`),
  getProjectStats: (param) =>
    axios({
      method: 'post',
      url: projectEndpoint + '/' + param.projectId,
      headers: {
        'Api-Key': param.apiKey
      },
      data: {
        "id": 1,
        "method": "get_project_stats",
        "params": []
      }
    })
}

export default projectApi