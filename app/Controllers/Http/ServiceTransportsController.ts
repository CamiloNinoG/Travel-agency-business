import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ServiceTransport from "App/Models/ServiceTransport";
import ServiceTransportValidator from "App/Validators/ServiceTransportValidator";

export default class ServiceTransportsController {
  public async find({ request, params }: HttpContextContract) {
    // Buscar por ID
    if (params.id) {
      const serviceTransport = await ServiceTransport.query()
        .where("id", params.id)
        .preload("vehicule") // <── 🔵 PRELOAD VEHICULE
        .preload("route") // (Opcional si quieres la ruta también)
        .firstOrFail();

      return serviceTransport;
    }

    // Listado completo o paginado
    const page = request.input("page");
    const perPage = request.input("per_page");

    if (page && perPage) {
      return await ServiceTransport.query()
        .preload("vehicule") // <── 🔵 PRELOAD VEHICULE
        .preload("route")
        .paginate(page, perPage);
    }

    return await ServiceTransport.query()
      .preload("vehicule") // <── 🔵 PRELOAD VEHICULE
      .preload("route");
  }

  public async create({ request }: HttpContextContract) {
    const data = await request.validate(ServiceTransportValidator);
    return await ServiceTransport.create(data);
  }

  public async update({ params, request }: HttpContextContract) {
    const service = await ServiceTransport.findOrFail(params.id);
    const data = await request.validate(ServiceTransportValidator);
    service.merge(data);
    await service.save();
    return service;
  }

  public async delete({ params, response }: HttpContextContract) {
    const service = await ServiceTransport.findOrFail(params.id);
    await service.delete();
    return response.status(204);
  }
}
