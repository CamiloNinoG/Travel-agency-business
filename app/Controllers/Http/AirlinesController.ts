import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Airline from "App/Models/Airline";
import AirlineValidator from "App/Validators/AirlineValidator";

export default class AirlinesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const airline = await Airline.findOrFail(params.id);
      return airline;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Airline.query().paginate(page, perPage);
      } else {
        return await Airline.query();
      }
    }
  }

  public async getAirplanes({ params }: HttpContextContract) {
    const airlineId = params.id;

    const airline = await Airline.findOrFail(airlineId);

    // Cargar los aviones de esa aerolínea
    await airline.load("airplanes");

    return airline.airplanes;
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
