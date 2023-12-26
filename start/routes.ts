 
import Route from '@ioc:Adonis/Core/Route';


Route.get('/', async () => {

   return {status: 'API OK'}

});

Route.resource('/blogs', 'BlogsController').apiOnly()
