import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Activity from "App/Models/Activity";
import ActivityValidator from "App/Validators/ActivityValidator";

export default class ActivitiesController {
public async find({ request, params }: HttpContextContract) {
  // Si viene un ID -> devolver solo ese registro
  if (params.id) {
    return await Activity.findOrFail(params.id)
  }

  // Si vienen parámetros de paginación -> devolver con meta/data
  const data = request.all()
  if ('page' in data && 'per_page' in data) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 20)
    return await Activity.query().paginate(page, perPage)
  }

  // Si no hay paginación -> devolver todos los registros
  return await Activity.query()
}

public async getByCity({ params }: HttpContextContract) {
  const cityId = params.cityId;

  const activities = await Activity.query().where('id_city', cityId);

  return activities;
}

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(ActivityValidator);
    return await Activity.create(data);
  }

  public async update({ params, request }: HttpContextContract) {
    const activity = await Activity.findOrFail(params.id);
    const data = await request.validate(ActivityValidator);
    activity.merge(data);
    await activity.save();
    return activity;
  }

  public async delete({ params, response }: HttpContextContract) {
    const activity = await Activity.findOrFail(params.id);
    await activity.delete();
    return response.status(204);
  }
}
