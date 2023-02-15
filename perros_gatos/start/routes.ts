/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/registrar-animal', 'AnimalesController.registrarAnimal'),
  Route.put('/editar-animal/:id/', 'AnimalesController.editarAnimal'),
  Route.delete('eliminar-animal/:id', 'AnimalesController.eliminarAnimal'),

  Route.get('listar-animales', 'AnimalesController.listar'),
  Route.get('filtro-especies/:especie', 'AnimalesController.especie'),
  Route.get('menores-edad/:edad', 'AnimalesController.edad')
}).prefix('/perros_gatos')
