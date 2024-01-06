 
import Route from '@ioc:Adonis/Core/Route';


Route.get('/', async () => {

   return {status: 'API OK'}

});

Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout');


Route.group(() => {
   Route.resource('/blogs', 'BlogsController').apiOnly()
}).middleware('auth')
