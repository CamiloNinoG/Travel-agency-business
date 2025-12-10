import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Client from "App/Models/Client";
import ClientValidator from "App/Validators/ClientValidator";
import ClientUpdate from "App/Validators/ClientUpdateValidator";

export default class ClientsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Client.findOrFail(params.id);
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Client.query().paginate(page, perPage);
      } else {
        return await Client.query();
      }
    }
  }

  public async getByUser({ params, response }: HttpContextContract) {
    try {
      const id_user = params.id_user;

      if (!id_user) {
        return response.badRequest({
          message: "El id_user es requerido",
        });
      }

      // Buscar cliente por id_user
      const client = await Client.query()
        .where("id_user", id_user)
        .preload("bankCards")
        .preload("travels")
        .first();

      if (!client) {
        return response.notFound({
          message: "Cliente no encontrado para este usuario",
        });
      }

      return client;
    } catch (error) {
      console.error("Error en getByUser:", error);
      return response.internalServerError({
        message: "Error obteniendo cliente",
        error: error.message,
      });
    }
  }

  public async getByUserId({ params, response }: HttpContextContract) {
    const { userId } = params;

    const client = await Client.query().where("id_user", userId).first();

    if (!client) {
      return response.status(404).json({ message: "Cliente no encontrado" });
    }

    return client;
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(ClientValidator);
    return await Client.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const client = await Client.findOrFail(params.id);
    const data = await request.validate(ClientUpdate);
    client.merge(data);
    await client.save();
    return client;
  }

  public async delete({ params, response }: HttpContextContract) {
    const client = await Client.findOrFail(params.id);
    response.status(204);
    return await client.delete();
  }

  public async deleteByUserId({ params, response }: HttpContextContract) {
    const { id_user } = params;

    if (!id_user) {
      return response.status(400).json({ message: "userId es requerido" });
    }

    const client = await Client.query().where("id_user", id_user).first();

    if (!client) {
      return response
        .status(404)
        .json({ message: "Cliente no encontrado para este userId" });
    }

    await client.delete();
    return response.status(204);
  }
}
