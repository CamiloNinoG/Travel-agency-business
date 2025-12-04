import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Client from "App/Models/Client";
import ClientValidator from "App/Validators/ClientValidator";
import ClientUpdateValidator from "App/Validators/ClientupdateValidator";

export default class ClientsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Client.findOrFail(params.id);
    } else {
      const page = request.input("page", 1);
      const perPage = request.input("per_page", 20);

      const result = await Client.query().paginate(page, perPage);

      // Convertimos el paginator a JSON
      const { data } = result.toJSON();

      return data; // sin meta
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(ClientValidator);
    return await Client.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const client = await Client.findOrFail(params.id);
    const data = await request.validate(ClientUpdateValidator);
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
    const { id_user } = params

    if (!id_user) {
      return response.status(400).json({ message: 'userId es requerido' })
    }

    const client = await Client.query().where('id_user', id_user).first()

    if (!client) {
      return response.status(404).json({ message: 'Cliente no encontrado para este userId' })
    }

    await client.delete()
    return response.status(204)
  }
}
