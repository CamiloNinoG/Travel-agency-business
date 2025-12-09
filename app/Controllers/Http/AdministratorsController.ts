import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Administrator from "App/Models/Administrator";
import AdministratorValidator from "App/Validators/AdministratorValidator";
import Ws from "App/Services/Ws";

export default class AdministratorsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Administrator.findOrFail(params.id);
    }

    const data = request.all();
    if ("page" in data && "per_page" in data) {
      const page = request.input("page", 1);
      const perPage = request.input("per_page", 20);
      return await Administrator.query().paginate(page, perPage);
    }

    return await Administrator.query();
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(AdministratorValidator);
    const admin = await Administrator.create(body);
    // Ws.io.emit("notifications", { message: "Nuevo administrador creado" });
    return admin;
  }

  public async update({ params, request }: HttpContextContract) {
    const admin = await Administrator.findOrFail(params.id);
    const payload = await request.validate(AdministratorValidator);
    admin.merge(payload);
    await admin.save();
    return admin;
  }

  public async delete({ params, response }: HttpContextContract) {
    const admin = await Administrator.findOrFail(params.id);
    await admin.delete();
    return response.status(204);
  }

  public async deleteByUserId({ params, response }: HttpContextContract) {
    const { userId } = params;

    const admin = await Administrator.query().where("id_user", userId).first();

    if (!admin) {
      return response
        .status(404)
        .json({ message: "Administrador no encontrado" });
    }

    await admin.delete();
    return response.status(204);
  }
}
