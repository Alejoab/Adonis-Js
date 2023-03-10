import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Publicacione from 'App/Models/Publicacione'

export default class PublicacionesController {

    async setRegistrarPublicacion({request, response}: HttpContextContract) {
        try {
            const dataPublicaciones = request.only(['codigo_publicacion', 'codigo_usuario', 'titulo', 'cuerpo']);
            const codigoPublicacion = dataPublicaciones.codigo_publicacion;
            const codigoPublicacionExistente: Number = await this.getValidarPublicacionExistente(codigoPublicacion);
            if (codigoPublicacionExistente === 0) {
                await Publicacione.create(dataPublicaciones);
                response.status(200).json({'msg': 'Registro de publicacion completado con exito'});
            } else {
                response.status(400).json({'msg': 'Error, el codigo de publicaciones ya se encuentra registrado'});
            }
        } catch (error) {
            console.log(error);
            response.status(500).json({'msg': 'Error en el servidor'});
        }
    }

    private async getValidarPublicacionExistente(codigo_publicacion: number): Promise<number> {
        const total = await Publicacione.query().where({'codigo_publicacion': codigo_publicacion}).count('*').from('publicaciones');
        return parseInt(total[0]['count(*)']);
    }
}
