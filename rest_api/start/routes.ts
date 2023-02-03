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

Route.group(() => {

  Route.get('/listar-usuarios', 'UsuariosController.getListarUsuarios')
  Route.get('/listar-todo', 'UsuariosController.getListarUsuariosTodos')
  Route.get('/listar-perfil', 'UsuariosController.getListarUsuariosYPerfil')
  Route.get('/listar-publicaciones', 'UsuariosController.getListarUsuariosYPublicacion')
  Route.get('/listar-usuarios-grupo', 'UsuariosController.getListarUsuariosGrupos')

  Route.post('/registro-usuarios', 'UsuariosController.getRegistrarUsuario')
  Route.post('/registro-perfil', 'PerfilsController.getRegistrarPerfil')
  Route.post('/registro-pubicacion', 'PublicacionesController.getRegistrarPublicacion')
  Route.post('/registro-grupo', 'GruposController.getRegistrarGrupo')
  Route.post('/registro-usuario-grupo', 'GRupoUsuariosController.getRegistrarUsuarioGrupo')
  
})
