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

import Route from '@ioc:Adonis/Core/Route'
import CreateArticleController from 'App/Controllers/articles/CreateArticleController'

Route.post('/save_table', async ({request, response}) => {
  const title = request.input('title')
  var content = request.input('content')
  if (!content) {
    content = 'Empty'
  }
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
  const previous_article = await CreateArticleController.getArticle(id - 1)
  const next_article = await CreateArticleController.getArticle(id + 1)
  const c_date = new Date(my_articles?.created_at as unknown as number)
  const u_date = new Date(my_articles?.updated_at as unknown as number)
  return view.render("article", {article:my_articles, c_date, u_date, previous_article, next_article})
})

Route.get('/delete_line/:id', async ({request, response}) => {
  const id = request.param('id')
  await CreateArticleController.deleteArticle(id)
  return response.redirect('/')
})