/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

// start/routes.ts
import Route from '@ioc:Adonis/Core/Route'

// Importa tus archivos de rutas personalizados
import './routes/Movies'
import './routes/Projectors'
import './routes/Screenings'
import './routes/Seats'
import './routes/Theaters'

// Ruta base opcional para probar
Route.get('/', async () => {
  return { message: 'Servidor Adonis funcionando 🚀' }
})