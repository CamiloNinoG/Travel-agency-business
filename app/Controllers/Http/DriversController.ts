// app/Controllers/Http/DriversController.ts
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Driver from "App/Models/Driver";
import DriverValidator from "App/Validators/DriverValidator";
import Env from "@ioc:Adonis/Core/Env";
import axios from "axios";

export default class DriversController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Driver.findOrFail(params.id);
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Driver.query().paginate(page, perPage);
      } else {
        return await Driver.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(DriverValidator);
    return await Driver.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const driver = await Driver.findOrFail(params.id);
    const body = await request.validate(DriverValidator);
    driver.merge(body);
    await driver.save();
    return driver;
  }

  public async delete({ params }: HttpContextContract) {
    const driver = await Driver.findOrFail(params.id);
    await driver.delete();
    return { message: "Driver eliminado correctamente" };
  }

  //   enviar mensaje alert
  public async alertWeather({ response }: HttpContextContract) {
    try {
      const SUS_URL = Env.get("SUS_API_URL");
      const FLASK_URL = Env.get("NOTIFICATION_SERVICE_URL");

      const drivers = await Driver.query();
      const results: any[] = [];

      for (const d of drivers) {
        // 1️⃣ Traer usuario directo por ID
        const userResp = await axios.get(`${SUS_URL}/${d.id_user}`);
        const user = userResp.data;

        if (!user || !user.email) {
          results.push({
            driver_id: d.id,
            id_user: d.id_user,
            status: "email_not_found",
          });
          continue;
        }

        // 2️⃣ Payload correo
        const payload = {
          to: user.email,
          subject: "Alerta Climática",
          body: "Estimado conductor, se ha detectado una alerta climática importante. Por favor tome precauciones.",
        };

        // 3️⃣ Enviar correo por Flask
        const emailResp = await axios.post(FLASK_URL, payload);

        results.push({
          driver_id: d.id,
          email: user.email,
          flask_response: emailResp.data,
        });
      }

      return response.json({
        status: "success",
        results,
      });
    } catch (error: any) {
      return response.status(500).json({
        error: "Error enviando alertas",
        details: error.message,
      });
    }
  }
}
