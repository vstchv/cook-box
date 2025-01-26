
import { ExtractResult } from "@/types/extract";
import axios from "axios";
import * as cheerio from 'cheerio';

export async function POST(request) {
  const { url } = await request.json();

  let recipe: ExtractResult = {
    title: '',
    ingredients: [],
    instructions: [],
  };

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Extract the title
    recipe.title = $('h1').first().text().trim() || $('title').text().trim() || 'Recipe Title';

    // Extract ingredients
    $('.ingredients-list__item').each((_, element) => {
      const ingredient = $(element).text().trim().replace(/\s+/g, ' '); 
      if (ingredient) {
        recipe.ingredients.push(ingredient);
      }
    });

    // Extract instructions
    $('.method-steps__list-item').each((_, element) => {
      const instruction = $(element).find('.editor-content p').text().trim(); 
      if (instruction) {
        recipe.instructions.push(instruction);
      }
    });


    return new Response(JSON.stringify(recipe), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error scraping the recipe:", error);
    return new Response(
      JSON.stringify({ error: "Unable to scrape the recipe from the provided URL." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}