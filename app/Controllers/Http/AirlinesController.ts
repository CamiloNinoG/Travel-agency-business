import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Airline from "App/Models/Airline";
import AirlineValidator from "App/Validators/AirlineValidator";

export default class AirlinesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Airline.findOrFail(params.id);
    } else {
      const page = request.input("page", 1);
      const perPage = request.input("per_page", 20);

      const result = await Airline.query().paginate(page, perPage);

      // Convertimos el paginator a JSON
      const { data } = result.toJSON();

      return data; 
    }
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(AirlineValidator);
    return await Airline.create(data);
  }

  public async update({ params, request }: HttpContextContract) {
    const airline = await Airline.findOrFail(params.id);
    const data = await request.validate(AirlineValidator);
    airline.merge(data);
    await airline.save();
    return airline;
  }

  public async delete({ params, response }: HttpContextContract) {
    const airline = await Airline.findOrFail(params.id);
    await airline.delete();
    return response.status(204);
  }
}
