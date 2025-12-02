import fetch from 'node-fetch'

export default class DistanceService {
  public static async getCoordinates(city: string) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${city},Colombia`

    const response = await fetch(url)
    const data = await response.json()

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    }
  }

  public static async getDistance(origin: any, dest: any) {
    const url = `https://router.project-osrm.org/route/v1/driving/${origin.lon},${origin.lat};${dest.lon},${dest.lat}?overview=false`

    const response = await fetch(url)
    const data = await response.json()

    const route = data.routes[0]

    return {
      distanceKm: route.distance / 1000,
    }
  }
}
