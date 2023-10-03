import axios from 'axios'
import PropTypes from 'prop-types'
import { userFromJson } from '../domain/user/userFromJson'
import { REST_SERVER_URL } from './util'
import { lodgmentService } from './lodgmentService'

class AuthService {
  async logIn(username, password) {
    const response = await axios.get(
      `${REST_SERVER_URL}/api/user/${username}/${password}`
    )

    const user = response.data
    this.setLoggedUser(username, user)
    return user
  }

  async getByUsername(username) {
    const user = await axios.get(`${REST_SERVER_URL}/api/user/name/${username}`)
    return user ? userFromJson(user.data) : undefined
  }

  async setUserData(id, user) {
    await axios
      .put(`${REST_SERVER_URL}/api/user/${id}`, user)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error))
  }

  setLoggedUser(username, user) {
    sessionStorage.setItem('logged', username)
    sessionStorage.setItem('logged_user_id', user.id)
    return true
  }

  logOutUser() {
    sessionStorage.removeItem('logged')
  }

  async getById(id) {
    const user = await axios.get(`${REST_SERVER_URL}/api/user/${id}`)
    return user ? userFromJson(user.data) : undefined
  }

  async createReservation(reservation) {
    const user = await authService.getById(sessionStorage.getItem('logged_user_id'))
    reservation.user = user
    
    lodgmentService.saveReserve(reservation)
  }
}

AuthService.propTypes = {
  authenticationResponse: PropTypes.bool,
  loggedUser: PropTypes.object,
}

export const authService = new AuthService()
