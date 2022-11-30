import Articles from "App/Models/Articles";
import Database from '@ioc:Adonis/Lucid/Database';

export default class CreateArticleController {
    public static async createArticle(title: string, content: string): Promise<Articles> {
        const article = new Articles();
        article.title = title;
        article.content = content;
        await article.save();

        return article;
    }

    public static async getArticle(id: number): Promise<Articles|null> {
        const article:Articles|null = await Articles.find(id);
        if (article != null) {
            ++article.views;
            await article.save();
        }
        return article;
    }

    public static async getArticles(): Promise<Array <Articles|null>> {
        const article:Array<Articles|null> = await Database.from('articles').select('*');
        return article;
    }
}