import User from 'App/Models/User'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    
    async register({auth, request, response}, HttpContextContract){
        
        const email = request.input('email')
        const password = request.input('password')
        
        try {
            const user = await User.create({email, password})
            const token = await auth.use('api').attempt(email, password) 
            
            return {
                status: 200,
                user,
                token
            }
        } catch (error) {
            return response.unauthorized('Invalid credentials')
        }
        
    }
    
    async logout({ auth, response }) {
        // Mencabut token dan menunggu selesai
        await auth.use('api').revoke();
      
        // Memeriksa apakah pengguna sudah logout
        const isLoggedOut = await auth.use('api').isLoggedOut();
      
        if (isLoggedOut) {
          return response.send({ message: 'Logout berhasil' });
        } else {
          return response.status(500).send({ message: 'Gagal logout' });
        }
      }
      
    
    
    async login({request, auth, response}){
        
        const email = request.input('email')
        const password = request.input('password')
        
        try {
            const token = await auth.use('api').attempt(email, password, {
                expiresIn: '2 mins',
            })
            auth.use('api').isLoggedIn  
            return token
        } catch {
            return response.unauthorized('Invalid credentials')
        }
        
    }
    
}
