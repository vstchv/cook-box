import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { load as cheerioLoad } from "cheerio";
import { ExtractResult } from "@/types/extract";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required." }, { status: 400 });
    }
    //console.log(url);
    const { data } = await axios.get(url);
    //console.log(data);
    const cData = cheerioLoad(data);
    console.log(cData);

    const ingredients: string[] = [];
    const instructions: string[] = [];

    cData(".list").each((i, elem) => {
      console.log(elem);
      ingredients.push(cData(elem).text().trim());
    });

    cData(".grouped-list").each((i, elem) => {
      instructions.push(cData(elem).text().trim());
    });

    const result: ExtractResult = { ingredients, instructions };

    return NextResponse.json(result, {
      status: 200,
    });
  } catch (error: any) {
    console.error("Scraping error:", error.message || error);

    return NextResponse.json(
      { error: "Error scraping the website." },
      { status: 500 }
    );
  }
}
