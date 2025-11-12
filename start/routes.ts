// start/routes.ts
import Route from '@ioc:Adonis/Core/Route'
import './routes/ClientTravel'

/* =========================================================
   ACTIVITIES
   ========================================================= */
Route.group(() => {
  Route.get('/', 'ActivitiesController.find')          // GET all (paginado)
  Route.get('/:id', 'ActivitiesController.find')        // GET by ID
  Route.post('/', 'ActivitiesController.create')        // CREATE
  Route.put('/:id', 'ActivitiesController.update')      // UPDATE
  Route.delete('/:id', 'ActivitiesController.delete')   // DELETE
}).prefix('activities').middleware(['security'])

/* =========================================================
   AIRLINES
   ========================================================= */
Route.group(() => {
  Route.get('/', 'AirlinesController.find')             // GET all (paginado)
  Route.get('/:id', 'AirlinesController.find')          // GET by ID
  Route.post('/', 'AirlinesController.create')          // CREATE
  Route.put('/:id', 'AirlinesController.update')        // UPDATE
  Route.delete('/:id', 'AirlinesController.delete')     // DELETE
}).prefix('airlines').middleware(['security'])

/* =========================================================
   AIRPLANES
   ========================================================= */
Route.group(() => {
  Route.get('/', 'AirplanesController.find')            // GET all (paginado)
  Route.get('/:id', 'AirplanesController.find')         // GET by ID
  Route.post('/', 'AirplanesController.create')         // CREATE
  Route.put('/:id', 'AirplanesController.update')       // UPDATE
  Route.delete('/:id', 'AirplanesController.delete')    // DELETE
}).prefix('airplanes').middleware(['security'])

/* =========================================================
   BANK CARDS
   ========================================================= */
Route.group(() => {
  Route.get('/', 'BankCardsController.find')            // GET all (paginado)
  Route.get('/:id', 'BankCardsController.find')         // GET by ID
  Route.post('/', 'BankCardsController.create')         // CREATE
  Route.put('/:id', 'BankCardsController.update')       // UPDATE
  Route.delete('/:id', 'BankCardsController.delete')    // DELETE
}).prefix('bank-cards').middleware(['security'])


// === BUS ===
Route.group(() => {
  Route.get('/', 'BusesController.find')
  Route.get('/:id', 'BusesController.find')
  Route.post('/', 'BusesController.create')
  Route.put('/:id', 'BusesController.update')
  Route.delete('/:id', 'BusesController.delete')
}).prefix('/buses').middleware(['security'])

// === CITY ===
Route.group(() => {
  Route.get('/', 'CitiesController.find')
  Route.get('/:id', 'CitiesController.find')
  Route.post('/', 'CitiesController.create')
  Route.put('/:id', 'CitiesController.update')
  Route.delete('/:id', 'CitiesController.delete')
}).prefix('/cities').middleware(['security'])

// === CLIENT ===
Route.group(() => {
  Route.get('/clients', 'ClientsController.find')
  Route.get('/clients/:id', 'ClientsController.find')
  Route.put('/clients/:id', 'ClientsController.update')
  Route.delete('/clients/:id', 'ClientsController.delete')
  Route.delete('/clients/user/:id_user', 'ClientsController.deleteByUserId')
}).middleware(['security'])

// Ruta pública (sin middleware)
Route.post('/clients', 'ClientsController.create')

// === GPS ===
Route.group(() => {
  Route.get('/', 'GpsController.find')
  Route.get('/:id', 'GpsController.find')
  Route.post('/', 'GpsController.create')
  Route.put('/:id', 'GpsController.update')
  Route.delete('/:id', 'GpsController.delete')
}).prefix('/gps').middleware(['security'])

// === GUIDE ACTIVITIES ===
Route.group(() => {
  Route.get('/', 'GuideActivitiesController.find')
  Route.get('/:id', 'GuideActivitiesController.find')
  Route.post('/', 'GuideActivitiesController.create')
  Route.put('/:id', 'GuideActivitiesController.update')
  Route.delete('/:id', 'GuideActivitiesController.delete')
}).prefix('/guide-activities').middleware(['security'])

// === HOTELS ===
Route.group(() => {
  Route.get('/', 'HotelsController.find')
  Route.get('/:id', 'HotelsController.find')
  Route.post('/', 'HotelsController.create')
  Route.put('/:id', 'HotelsController.update')
  Route.delete('/:id', 'HotelsController.delete')
}).prefix('/hotels').middleware(['security'])

// === INSTALLMENTS ===
Route.group(() => {
  Route.get('/', 'InstallmentsController.find')
  Route.get('/:id', 'InstallmentsController.find')
  Route.post('/', 'InstallmentsController.create')
  Route.put('/:id', 'InstallmentsController.update')
  Route.delete('/:id', 'InstallmentsController.delete')
}).prefix('/installments').middleware(['security'])


// === INVOICES ===
Route.group(() => {
  Route.get('/', 'InvoicesController.find')
  Route.get('/:id', 'InvoicesController.find')
  Route.post('/', 'InvoicesController.create')
  Route.put('/:id', 'InvoicesController.update')
  Route.delete('/:id', 'InvoicesController.delete')
}).prefix('/invoices').middleware(['security'])

// === ITINERARY ROOMS ===
Route.group(() => {
  Route.get('/', 'ItineraryRoomsController.find')
  Route.get('/:id', 'ItineraryRoomsController.find')
  Route.post('/', 'ItineraryRoomsController.create')
  Route.put('/:id', 'ItineraryRoomsController.update')
  Route.delete('/:id', 'ItineraryRoomsController.delete')
}).prefix('/itinerary-rooms').middleware(['security'])

// === PLAN ACTIVITIES ===
Route.group(() => {
  Route.get('/', 'PlanActivitiesController.find')
  Route.get('/:id', 'PlanActivitiesController.find')
  Route.post('/', 'PlanActivitiesController.create')
  Route.put('/:id', 'PlanActivitiesController.update')
  Route.delete('/:id', 'PlanActivitiesController.delete')
}).prefix('/plan-activities').middleware(['security'])

// === ROOMS ===
Route.group(() => {
  Route.get('/', 'RoomsController.find')
  Route.get('/:id', 'RoomsController.find')
  Route.post('/', 'RoomsController.create')
  Route.put('/:id', 'RoomsController.update')
  Route.delete('/:id', 'RoomsController.delete')
}).prefix('/rooms').middleware(['security'])

// === ROUTES ===
Route.group(() => {
  Route.get('/', 'RoutesController.find')
  Route.get('/:id', 'RoutesController.find')
  Route.post('/', 'RoutesController.create')
  Route.put('/:id', 'RoutesController.update')
  Route.delete('/:id', 'RoutesController.delete')
}).prefix('/routes').middleware(['security'])


// === SERVICE TRANSPORTS ===
Route.group(() => {
  Route.get('/', 'ServiceTransportsController.find')
  Route.get('/:id', 'ServiceTransportsController.find')
  Route.post('/', 'ServiceTransportsController.create')
  Route.put('/:id', 'ServiceTransportsController.update')
  Route.delete('/:id', 'ServiceTransportsController.delete')
}).prefix('/service-transports').middleware(['security'])

// === TOURIST PLANS ===
Route.group(() => {
  Route.get('/', 'TouristPlansController.find')
  Route.get('/:id', 'TouristPlansController.find')
  Route.post('/', 'TouristPlansController.create')
  Route.put('/:id', 'TouristPlansController.update')
  Route.delete('/:id', 'TouristPlansController.delete')
}).prefix('/tourist-plans').middleware(['security'])

// === TRANSPORTATION ITINERARIES ===
Route.group(() => {
  Route.get('/', 'TransportationItinerariesController.find')
  Route.get('/:id', 'TransportationItinerariesController.find')
  Route.post('/', 'TransportationItinerariesController.create')
  Route.put('/:id', 'TransportationItinerariesController.update')
  Route.delete('/:id', 'TransportationItinerariesController.delete')
}).prefix('/transportation-itineraries').middleware(['security'])

// === TRAVEL PLANS ===
Route.group(() => {
  Route.get('/', 'TravelPlansController.find')
  Route.get('/:id', 'TravelPlansController.find')
  Route.post('/', 'TravelPlansController.create')
  Route.put('/:id', 'TravelPlansController.update')
  Route.delete('/:id', 'TravelPlansController.delete')
}).prefix('/travel-plans').middleware(['security'])

// === TRAVELS ===
Route.group(() => {
  Route.get('/', 'TravelsController.find')
  Route.get('/:id', 'TravelsController.find')
  Route.post('/', 'TravelsController.create')
  Route.put('/:id', 'TravelsController.update')
  Route.delete('/:id', 'TravelsController.delete')
}).prefix('/travels').middleware(['security'])

// === VEHICULES ===
Route.group(() => {
  Route.get('/', 'VehiculesController.find')
  Route.get('/:id', 'VehiculesController.find')
  Route.post('/', 'VehiculesController.create')
  Route.put('/:id', 'VehiculesController.update')
  Route.delete('/:id', 'VehiculesController.delete')
}).prefix('/vehicules').middleware(['security'])

Route.group(() => {
  Route.get('/', 'ClientTravelsController.find')
//   Route.get('/:id', 'ClientTravelsController.find')
  Route.post('/', 'ClientTravelsController.create')
//   Route.put('/:id', 'ClientTravelsController.update')
  Route.delete('/:id', 'ClientTravelsController.delete')

  Route.get('/client/:id', 'ClientTravelsController.getTravelsByClient')
  Route.get('/travel/:id', 'ClientTravelsController.getClientsByTravel')
}).prefix('client-travels').middleware(['security'])


// =========================================================
// ADMINISTRATORS
// =========================================================
Route.group(() => {
  Route.get('/', 'AdministratorsController.find')
  Route.get('/:id', 'AdministratorsController.find')
  Route.post('/', 'AdministratorsController.create')
  Route.put('/:id', 'AdministratorsController.update')
  Route.delete('/:id', 'AdministratorsController.delete')
  Route.delete('/user/:userId', 'AdministratorsController.deleteByUserId')
})
  .prefix('administrators').middleware(['security'])

// =========================================================
// GUIDES
// =========================================================
Route.group(() => {
  Route.get('/', 'GuidesController.find')
  Route.get('/:id', 'GuidesController.find')
  Route.post('/', 'GuidesController.create')
  Route.put('/:id', 'GuidesController.update')
  Route.delete('/:id', 'GuidesController.delete')
  Route.delete('/user/:userId', 'GuidesController.deleteByUserId')
})
  .prefix('guides').middleware(['security'])



// Importa tus archivos de rutas personalizados

// Ruta base opcional para probar
Route.get('/', async () => {
  return { message: 'Servidor Adonis funcionando 🚀' }
})