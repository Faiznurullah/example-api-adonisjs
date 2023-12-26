import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class BlogsController {
  public async index({ response }: HttpContextContract) {

    const data = await Database.from('blogs').select('*');

    if (data.length === 0) {
      return response.json({
        status: 404,
        message: 'Data kosong',
      });
    }
  
    return response.json({
      status: 200,
      data
    });
  

  }

  public async store({ request, response }: HttpContextContract) {

    const title = request.input('title')
    const content = request.input('content')

    const data = {
      title,
      content
    }

    const result = await Database.insertQuery().table('blogs').insert(data);

    return response.json({
      status: 200,
      message: "Insert Data Successfully"
    });


  }

  public async create({}: HttpContextContract) {}

  public async show({ params, response }: HttpContextContract) {

    const DataBase = await Database.from('blogs').select('*').where('id', params.id);

    return response.json({
      status: 200,
      data: DataBase
    });

  }

  public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {

    const title = request.input('title')
    const content = request.input('content')

    const data = {
      title,
      content
    }

    const result = await Database.from('blogs').where('id', params.id).update(data);

    return response.json({
      status: 200,
      message: "Update Data Successfully"
    });

  }

  public async destroy({ params, response }: HttpContextContract) {

    const result = await Database.from('blogs').where('id', params.id).delete();

    return response.json({
      status: 200,
      message: "Delete Data Successfully"
    });
    
  }
}
