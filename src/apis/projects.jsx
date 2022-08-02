import axios from 'axios'

const projectEndpoint = `http://194.163.143.68/xrs/projects`

const projectApi = {
  createProject: (param) => axios.post(projectEndpoint, param)
}

export default projectApi