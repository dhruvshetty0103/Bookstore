import AxiosHelper from '../helper/axios.js'

const register = (data) => {
  let reqobj = {
    method: 'post',
    url: 'http://localhost:4000/users',
    headers: {
      'Content-type': 'application/json',
    },
    data: data,
  }
  return AxiosHelper.post(reqobj)
    .then((response) => {
      return response
    })
    .catch((err) => {
      throw err
    })
}

const login = (data) => {
  let reqobj = {
    method: 'post',
    url: 'http://localhost:4000/users/login',
    headers: {
      'Content-type': 'application/json',
    },
    data: data,
  }
  return AxiosHelper.post(reqobj)
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((err) => {
      throw err
    })
}

const forgetPassword = (data) => {
  let reqobj = {
    method: 'post',
    url: 'http://localhost:4000/users/forgot',
    headers: {
      'Content-type': 'application/json',
    },
    data: data,
  }
  return AxiosHelper.post(reqobj)
    .then((response) => {
      return response
    })
    .catch((err) => {
      throw err
    })
}

const resetPassword = (data, token) => {
  let reqobj = {
    method: 'post',
    url: 'http://localhost:4000/users/reset/' + token,
    headers: {
      'Content-type': 'application/json',
    },
    data: data,
  }
  console.log(reqobj.url)
  return AxiosHelper.post(reqobj)
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((err) => {
      throw err
    })
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { register, login, forgetPassword, resetPassword }
