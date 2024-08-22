/** Array de rotas publicas, acessíveis por todos
  @type {string}
*/
export const publicRoutes = [
  '/'
]

/** Array de rotas privadas, acessíveis apenas por autenticados
   Rotas irão redirecionar usuários logados para /dashboard
   @type {string[]}
*/

export const authRoutes = [
  '/login',
  '/dashboard'
]

/**
* API - Prefixo das rotas de autenticação
* Rotas que iniciam com este prefixo serão tratadas como rotas de autenticação
*  @type {string}
*/
export const apiAuthPrefix = '/api/auth'

/** Rota padrão para redirecionamento após o login
  @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT = '/dashboard'