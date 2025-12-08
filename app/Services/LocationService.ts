import fetch from 'node-fetch'
import Env from '@ioc:Adonis/Core/Env'

export default class DistanceService {
  public static async getCoordinates(city: string) {
    const baseUrl = Env.get('NOMINATIM_BASE_URL')
    const url = `${baseUrl}?format=json&q=${city},Colombia`

    const response = await fetch(url)
    const data = await response.json()

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    }
  }

  public static async getDistance(origin: any, dest: any) {
    const baseUrl = Env.get('OSRM_BASE_URL')

    const url = `${baseUrl}/${origin.lon},${origin.lat};${dest.lon},${dest.lat}?overview=false`

    const response = await fetch(url)
    const data = await response.json()

    const route = data.routes[0]

    return {
      distanceKm: route.distance / 1000,            
      durationMinutes: route.duration / 60,         
      durationHours: route.duration / 3600,         
    }
  }
}
