import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Animales from 'App/Models/Animales';

export default class AnimalesController {
    
    public async registrarAnimal({request, response}: HttpContextContract) {
        try{
            const dataAnimal = request.all();
            const validacion = await this.validarAnimal(dataAnimal.codigo_animal);

            if (validacion){
                response.status(400).json({'msg': 'El animal ya se encuentra registrado'});
            } else {
                await Animales.create(dataAnimal);
                response.status(200).json({'msg': 'Animal registrado correctamente'});
            }
        } catch (error) {
            console.log(error);
            response.status(500).json({'msg': 'Error en el servidor'})
        }

    }

    public async editarAnimal({request, response}: HttpContextContract) {
        try {
            const dataUsuario = request.all();
            const id = request.params().id

            const animal = await Animales.findOrFail(id);

            animal.nombre_animal = dataUsuario.nombre_animal;
            animal.especie = dataUsuario.especie;
            animal.raza = dataUsuario.raza;
            animal.genero = dataUsuario.genero;
            animal.edad = dataUsuario.edad;

            animal.save()

            response.status(200).json({'msg': 'Animal editado correctamente'});

        } catch (error) {
            console.log(error);
            response.status(500).json({'msg': 'Error en el servidor'})
        }
    }

    public async eliminarAnimal({request, response}: HttpContextContract) {
        try {
            const id = request.params().id

            const animal = await Animales.findOrFail(id);

            animal.delete()

            response.status(200).json({'msg': 'Animal eliminado correctamente'});

        } catch (error) {
            console.log(error);
            response.status(500).json({'msg': 'Error en el servidor'})
        }
    }

    public async listar(): Promise<Animales[]> {
        const animal = await Animales.all()
        return animal;
    }

    public async especie({request}: HttpContextContract): Promise<Animales[]> {
        const especie = request.params().especie;

        const animales = await Animales.query().where('especie', especie);

        return animales;
    }

    public async edad({request}: HttpContextContract): Promise<Animales[]> {
        const edad = request.params().edad;

        const animales = await Animales.query().where('edad', '<', edad);

        return animales;
    }

    private async validarAnimal(codigo_animal: Number): Promise<Number> {
        const total = await Animales.query().where({'codigo_animal': codigo_animal});
        return total.length;
    }
}
