import axios from 'axios'

import { cleanUpEmptyParams } from './util'
import { Lodgment } from '../domain/Lodgment'

class LodgmentService {
  constructor() {
    this.apiService = axios.create({
      baseURL: 'http://localhost:8080/api/lodgment',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async getLodgements(params) {
    const userId = sessionStorage.getItem('logged_user_id')

    const response = await this.apiService.get('', {
      headers: {
        'X-User-Id': userId,
      },
      params: cleanUpEmptyParams(params),
    })

    const nextPage = response.headers['x-next-page']

    return {
      data: response.data.map((lodgment) => Lodgment.fromJSON(lodgment)),
      nextPage,
    }
  }

  async getById(id) {
    try {
      const userId = sessionStorage.getItem('logged_user_id')
      const lodgmentJSON = await this.apiService.get(`/${id}`, {
        headers: {
          'X-User-Id': userId,
        },
      })
      const lodgment = await Lodgment.fromJSON(lodgmentJSON.data)

      return lodgment
    } catch (error) {
      //TODO
      console.error(error)
    }
  }

  async createLodgment(lodgment) {
    await this.apiService.post(``, lodgment)
  }

  async saveReserve(reserve) {
    try {
      await this.apiService.post(`/${reserve.lodgmentId}/reserve`, reserve)
    } catch (error) {
      console.error(error)
    }
  }

  async updateLodgment(lodgment) {
    await this.apiService.put('', lodgment)
  }
}

export const lodgmentService = new LodgmentService()
