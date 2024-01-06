import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database' 
import Blog from 'App/Models/Blog'

export default class BlogsController {
  public async index({ response }: HttpContextContract) {

    const data = await Blog.all();

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

  public async store({  request, response }: HttpContextContract) {

    const NewBlog = new Blog();

    NewBlog.title = request.input('title')
    NewBlog.content = request.input('content')

    const result = await NewBlog.save();

    return response.json({
      status: 200,
      message: "Insert Data Successfully"
    });


  }

  public async create({}: HttpContextContract) {}

  public async show({ params, response }: HttpContextContract) { 

    const DataBase = await Blog.find(params.id);

    return response.json({
      status: 200,
      data: DataBase
    });

  }

  public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {

    
    const result = await Blog
    .query()
    .where('id', params.id)
    .update({ title: request.input('title'), content:  request.input('content') })

    return response.json({
      status: 200,
      message: "Update Data Successfully"
    });

  }

  public async destroy({ params, response }: HttpContextContract) {

    const blog = await Blog.findOrFail(params.id)
    await blog.delete()
    

    return response.json({
      status: 200,
      message: "Delete Data Successfully"
    });
    
  }
}
