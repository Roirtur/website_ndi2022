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
| import './routes/customer''
|
*/

import { Request } from '@adonisjs/core/build/standalone'
import Route from '@ioc:Adonis/Core/Route'
import CreateArticleController from 'App/Controllers/articles/CreateArticleController'

Route.post('/save_table', async ({request, response}) => {
  const title = request.input('title')
  const content = request.input('content')
  await CreateArticleController.createArticle(title, content)
  return response.redirect('/')
})

Route.get('/', async ({view}) => {
  const my_articles = await CreateArticleController.getArticles()
  return view.render("home", {articles:my_articles})
})

Route.get('/get_line/:id', async ({request, view}) => {
  const id = request.param('id')
  const my_articles = await CreateArticleController.getArticle(id)
  const c_date = new Date(my_articles.created_at)
  const u_date = new Date(my_articles.updated_at)
  const last_id = my_articles[0].id
  const first_id = my_articles[:1].id
  return view.render("article", {article:my_articles, c_date, u_date, last_id, first_id})
})