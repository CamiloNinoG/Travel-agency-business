import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Bus from "App/Models/Bus";
import BusValidator from "App/Validators/BusValidator";

export default class BusesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Bus.findOrFail(params.id);
    } else {
      const page = request.input("page", 1);
      const perPage = request.input("per_page", 20);

      const result = await Bus.query().paginate(page, perPage);

      // Convertimos el paginator a JSON
      const { data } = result.toJSON();

      return data; // sin meta
    }
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(BusValidator);
    return await Bus.create(data);
  }

  public async update({ params, request }: HttpContextContract) {
    const bus = await Bus.findOrFail(params.id);
    const data = await request.validate(BusValidator);
    bus.merge(data);
    await bus.save();
    return bus;
  }

  public async delete({ params, response }: HttpContextContract) {
    const bus = await Bus.findOrFail(params.id);
    await bus.delete();
    return response.status(204);
  }
}
