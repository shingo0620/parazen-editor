import Axios from 'axios'

const axios = Axios.create({
  // https://paralandbusinesscardweb.blob.core.windows.net/web/NFTWebAR/1/scoure/Model/1/1.gltf
  baseURL: 'https://paralandbusinesscardweb.blob.core.windows.net/web/NFTWebAR/',
  timeout: 10000,
  headers: {'Content-Type': 'application/json'}
});

export const getModel = async (id) =>{
  return axios.get(`/${id}/scoure/Model/${id}/${id}.gltf`)
}