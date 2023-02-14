import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'

export default class UsuariosController {

    public async getListarUsuarios(): Promise<Usuario[]> {
        const user = await Usuario.all()
        return user;
    }

    public async getListarUsuariosYPerfil(): Promise<Usuario[]> {
        const user = await Usuario.query().preload('perfil')
        return user;
    }

    public async getListarUsuariosYPublicacion(): Promise<Usuario[]> {
        const user = await Usuario.query().preload('publicaciones')
        return user;
    }

    public async getListarUsuariosGrupos(): Promise<Usuario[]> {
        const user = await Usuario.query().preload('usuario_grupos')
        return user;
    }

    public async setRegistrarUsuario({request, response}: HttpContextContract) {
        const dataUsuario = request.only(['codigo_usuario', 'nombre_usuario', 'contrasena', 'email', 'telefono']);
        try {
            const codigoUsuario: Number = dataUsuario.codigo_usuario;
            const usuarioExistente: Number = await this.getValidarUsuarioExistente(codigoUsuario)
            if (usuarioExistente === 0) {
                await Usuario.create(dataUsuario)
                response.status(200).json({'msg': 'Registro completado con exito'})
            } else {
                response.status(400).json({'msg': 'Error, el codigo de usuario ya se encuentra registrado'})
            }
        } catch (error) {
            console.log(error)
            response.status(500).json({'msg': 'Error en el servidor'})
        }
    }

    public async delUsuario({request, response}: HttpContextContract){
        const dataUsuario = request.only(['codigo_usuario']);
        await Usuario.query().where({'codigo_usuario': dataUsuario.codigo_usuario}).delete();
        response.status(200).json({'msg': 'Usuario eliminado correctamente'});
    }

    private async getValidarUsuarioExistente(codigo_usuario: Number): Promise<Number> {
        const total = await Usuario.query().where({'codigo_usuario': codigo_usuario}).count('*').from('usuarios');
        return parseInt(total[0]['count(*)'])
    }
}
