// app/api/scrape/route.js
import axios from "axios";
import cheerio from "cheerio";

export async function POST(request) {
  const { url } = await request.json();

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const ingredients: string[] = [];
    const instructions: string[] = [];

    $("selector-for-ingredients").each((i, elem) => {
      ingredients.push($(elem).text().trim());
    });

    $("selector-for-instructions").each((i, elem) => {
      instructions.push($(elem).text().trim());
    });

    return new Response(JSON.stringify({ ingredients, instructions }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error scraping the website." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
