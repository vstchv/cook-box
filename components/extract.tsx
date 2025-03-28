"use client";

import { useState, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExtractResult } from "@/types/extract";
import Image from "next/image";
import { Bookmark } from "lucide-react";
import { createBrowserClient } from "@/utils/supabase/client";

export default function Extract() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ExtractResult | null>(null);
  const [error, setError] = useState("");

  const supabase = createBrowserClient();

  const handleSaveRecipe = async () => {
    if (!result) return;
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("You must be logged in to save recipes.");
      return;
    }

    const { error, status } = await supabase.from("recipes").insert({
      user_id: user.id,
      title: result.title,
      image_url: result.image,
      ingredients: result.ingredients,
      instructions: result.instructions,
      source_url: url,
    });

    if (status === 409) {
      // TODO better error handling
      alert("Already saved this recipe :) ");
      return;
    }

    if (error) {
      console.error("Failed to save recipe:", error);
      alert("Error saving recipe.");
    } else {
      alert("Recipe saved! 🍽️");
    }
  };

  const onUrlSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    }
  };

  return (
    <>
      <form onSubmit={onUrlSubmit} className="flex flex-col space-y-4">
        <Input
          placeholder="Enter recipe URL"
          type="text"
          required
          autoComplete="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="submit">Extract</Button>
      </form>

      {error && (
        <div className="mt-4 text-red-500">
          <p>Error: {error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold mb-4">{result.title}</h2>
            <Button size="sm" onClick={handleSaveRecipe}>
              <Bookmark className="w-4 h-4 mr-2" />
              Save Recipe in Collection
            </Button>
          </div>
          <div>
            <div className="flex flex-row justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
                <ul className="list-disc list-inside space-y-1">
                  {result.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              {result.image && (
                <div className="w-full md:w-1/3">
                  <Image
                    src={result.image}
                    alt={result.title}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover w-full h-auto"
                  />
                </div>
              )}
            </div>

            <h3 className="text-xl font-semibold mt-4 mb-2">Instructions</h3>
            <ol className="list-decimal list-inside space-y-1">
              {result.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}
