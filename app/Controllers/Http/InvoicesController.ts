import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Invoice from "App/Models/Invoice";
import InvoiceValidator from "App/Validators/InvoiceValidator";

export default class InvoicesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const invoice = await Invoice.findOrFail(params.id);
      await invoice.load("client");
      await invoice.load("installment");
      return invoice;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Invoice.query().paginate(page, perPage);
      } else {
        return await Invoice.query();
      }
    }
  }

  public async findByCC({ params, response }: HttpContextContract) {
    const cc = params.cc;

    if (!cc) {
      return response.badRequest({
        message: "Se requiere la cédula (CC) para la búsqueda.",
      });
    }

    try {
      const invoices = await Invoice.query()
        .where("cc", cc) // ⬅️ Filtra por la columna 'cc'
        .preload("client") // Carga la relación del cliente si la necesitas
        .preload("installment") // Carga la relación de la cuota si la necesitas
        .orderBy("created_at", "desc"); // Ordena por fecha de creación (opcional)

      if (invoices.length === 0) {
        return response.notFound({
          message: `No se encontraron facturas para la cédula ${cc}.`,
        });
      }

      return invoices;
    } catch (error) {
      console.error("Error al buscar facturas por CC:", error);
      return response.internalServerError({
        message: "Error interno del servidor al buscar facturas.",
      });
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(InvoiceValidator);
    const invoice = await Invoice.create(body);
    return invoice;
  }

  public async update({ params, request }: HttpContextContract) {
    const invoice = await Invoice.findOrFail(params.id);
    const payload = await request.validate(InvoiceValidator);
    invoice.merge(payload);
    await invoice.save();
    return invoice;
  }

  public async delete({ params, response }: HttpContextContract) {
    const invoice = await Invoice.findOrFail(params.id);
    response.status(204);
    return await invoice.delete();
  }
}
