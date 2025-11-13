import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Turno from 'App/Models/Turno'
import TurnoValidator from 'App/Validators/TurnoValidator'

export default class TurnosController {
    public async find({ request, params }: HttpContextContract) {
        // Si viene un ID -> devolver solo ese registro
        if (params.id) {
            return await Turno.findOrFail(params.id)
        }
    
        // Si vienen parámetros de paginación -> devolver con meta/data
        const data = request.all()
        if ('page' in data && 'per_page' in data) {
            const page = request.input('page', 1)
            const perPage = request.input('per_page', 20)
            return await Turno.query().paginate(page, perPage)
        }
    
        // Si no hay paginación -> devolver todos los registros
        return await Turno.query()
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(TurnoValidator)
        const turno = await Turno.create({
            idConductor: body.id_conductor,
            idVehicule: body.id_vehicule,
            fechaInicio: body.fecha_inicio,
            fechaFin: body.fecha_fin,
        });
        return turno;
    }
}
