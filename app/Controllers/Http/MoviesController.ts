import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Movie from 'App/Models/Movie';
import Ws from 'App/Services/Ws';
import MovieValidator from 'App/Validators/MovieValidator';
// import Screening from 'App/Models/Screening';

export default class MoviesController {
     
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMovie: Movie = await Movie.findOrFail(params.id)
            await theMovie.load("screenings",(screeningsQuery)=>{
                screeningsQuery.preload("theater", (theaterQuery)=>{
                    theaterQuery.preload("projector").preload("seats")
                })
            })
            return theMovie;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Movie.query().paginate(page, perPage)
            } else {
                return await Movie.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(MovieValidator);
        const theMovie: Movie = await Movie.create(body);
        Ws.io.emit('notifications', { message: 'new notification' })
        
        return theMovie;
    }

 public async update({ params, request }: HttpContextContract) {
    // try {

      const movie = await Movie.findOrFail(params.id)
      const payload = await request.validate(MovieValidator)
      movie.merge(payload)
      await movie.save()
      
      return movie
      
    // } catch (error) {
    //   console.error(error)
    //   return response.status(400).json({
    //     message: '⚠️ Error al actualizar la película',
    //     error: error.messages || error.message,
    //   })
    // }
  }

    public async delete({ params, response }: HttpContextContract) {
        const theMovie: Movie = await Movie.findOrFail(params.id);
        response.status(204);
        return await theMovie.delete();
    }
}
