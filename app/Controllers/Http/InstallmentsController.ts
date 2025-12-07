import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Installment from "App/Models/Installment";
import InstallmentValidator from "App/Validators/InstallmentValidator";
import ClientTravel from "App/Models/ClientTravel";

export default class InstallmentsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const installment = await Installment.findOrFail(params.id);
      await installment.load("travel");
      return installment;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Installment.query().paginate(page, perPage);
      } else {
        return await Installment.query();
      }
    }
  }

  public async findByTravel({ params }: HttpContextContract) {
    const travelId = params.travelId;

    // Buscar las cuotas asociadas al viaje
    const installments = await Installment.query()
      .where("id_travel", travelId)
      .preload("travel")
      .preload("invoice");

    return { installments };
  }

  public async findByClient({ params }: HttpContextContract) {
    const clientId = params.clientId;

    // 1️⃣ Obtener los viajes del cliente
    const travels = await ClientTravel.query().where("id_client", clientId);

    if (travels.length === 0) {
      return {
        message: "El cliente no tiene viajes registrados",
        installments: [],
      };
    }

    // 2️⃣ Extraer los IDs de los viajes
    const travelIds = travels.map((t) => t.id_travel);

    // 3️⃣ Buscar cuotas de esos viajes
    const installments = await Installment.query()
      .whereIn("id_travel", travelIds)
      .preload("travel")
      .preload("invoice");

    return { installments };
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(InstallmentValidator);
    const installment = await Installment.create(body);
    return installment;
  }

  public async update({ params, request }: HttpContextContract) {
    const installment = await Installment.findOrFail(params.id);
    const payload = await request.validate(InstallmentValidator);
    installment.merge(payload);
    await installment.save();
    return installment;
  }

  public async delete({ params, response }: HttpContextContract) {
    const installment = await Installment.findOrFail(params.id);
    response.status(204);
    return await installment.delete();
  }
}
