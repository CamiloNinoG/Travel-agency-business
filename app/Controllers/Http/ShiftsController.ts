// app/Controllers/Http/ShiftsController.ts
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Shift from "App/Models/Shift";
import ShiftValidator from "App/Validators/ShiftValidator";

export default class ShiftsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Shift.query()
        .where("id", params.id)
        .preload("driver")
        .preload("vehicle")
        .firstOrFail();
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Shift.query()
          .preload("driver")
          .preload("vehicle")
          .paginate(page, perPage);
      } else {
        return await Shift.query()
          .preload("driver")
          .preload("vehicle");
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(ShiftValidator);
    return await Shift.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const shift = await Shift.findOrFail(params.id);
    const body = await request.validate(ShiftValidator);
    shift.merge(body);
    await shift.save();
    return shift;
  }

  public async delete({ params }: HttpContextContract) {
    const shift = await Shift.findOrFail(params.id);
    await shift.delete();
    return { message: "Shift eliminado correctamente" };
  }
}
