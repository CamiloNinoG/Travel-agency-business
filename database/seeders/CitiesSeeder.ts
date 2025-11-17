import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import axios from 'axios'
import City from 'App/Models/City'

export default class CitiesSeeder extends BaseSeeder {
  public async run () {
    console.log("Cargando ciudades desde API Colombia...")

    const departamentos = await axios.get('https://api-colombia.com/api/v1/Department')

    for (const dep of departamentos.data) {
      const municipios = await axios.get(
        `https://api-colombia.com/api/v1/Department/${dep.id}/cities`
      )

      for (const city of municipios.data) {
        await City.firstOrCreate(
          { name: city.name },
          {
            name: city.name,
            ubication: dep.name,
          }
        )
      }
    }

    console.log("Ciudades cargadas correctamente ✓")
  }
}
