import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'ClientTravelsController.find')
//   Route.get('/:id', 'ClientTravelsController.find')
  Route.post('/', 'ClientTravelsController.create')
//   Route.put('/:id', 'ClientTravelsController.update')
  Route.delete('/:id', 'ClientTravelsController.delete')

  Route.get('/client/:id', 'ClientTravelsController.getTravelsByClient')
  Route.get('/travel/:id', 'ClientTravelsController.getClientsByTravel')
}).prefix('client-travels')
