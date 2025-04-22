"use client";

import { Button } from "@/components/ui/button";
import { ExtractResult } from "@/types/extract";
import { createBrowserClient } from "@/utils/supabase/client";
import { Bookmark } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, FormEvent, useEffect, useRef } from "react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
export default function ExtractPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ExtractResult | null>(null);
  const [error, setError] = useState("");

  const supabase = createBrowserClient();

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleSaveRecipeToCollection = async () => {
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
      toast({
        title: "Already saved!",
        description: "You've already added this recipe to your collection 🙂",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    if (error) {
      console.error("Failed to save recipe:", error);
      toast({
        title: "Failed to save recipe",
        description: "Something unexpected happened.",
        variant: "destructive",
        duration: 5000,
      });
    } else {
      toast({
        title: "Recipe saved!",
        description: "You can now view it in your collection.",
        variant: "success",
        duration: 5000,
      });
    }
  };

  const onRecipeUrlSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      <h1 className="font-fredoka font-black tracking-widest text-[64pt]  text-center">
        Cook-Box
      </h1>

      <h2 className="font-fredoka text-xl font-thin text-center tracking-wide mb-10">
        A simple tool to extract just the recipe – no ads, no fluff, just cook
      </h2>

      {/* Extract form */}
      <form onSubmit={onRecipeUrlSubmit} className="flex flex-col space-y-4">
        <Input
          className="w-full rounded-md border border-white/20 bg-background px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-0 animate-border-glow"
          placeholder="Paste recipe link here..."
          type="text"
          required
          autoComplete="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="submit">Get Recipe</Button>
      </form>
      {error && (
        <div className="mt-4 text-red-500">
          <p>Error: {error}</p>
        </div>
      )}
      {/* How it Works Section */}
      <section className="mt-40">
        <h2 className="text-center text-3xl font-bold mb-8">How it works</h2>
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10 text-left">
          <div className="flex-1 px-6 py-4">
            <h3 className="text-xl font-semibold mb-2">
              1. Paste Link to Recipe
            </h3>
            <p className="text-sm text-gray-400">
              Provide the URL of a recipe page and click 'Get Recipe'.
            </p>
          </div>
          <div className="flex-1 px-6 py-4">
            <h3 className="text-xl font-semibold mb-2">
              2. Get the Formatted Recipe
            </h3>
            <p className="text-sm text-gray-400">
              A clean, easy-to-read version is extracted with only the
              ingredients and steps.
            </p>
          </div>
          <div className="flex-1 px-6 py-4">
            <h3 className="text-xl font-semibold mb-2">
              3. Copy, Save, or Print
            </h3>
            <p className="text-sm text-gray-400">
              Save to your collection or copy/print it for cooking!
            </p>
          </div>
        </div>
      </section>

      {/* Result */}
      {result && (
        <div ref={resultRef} className="mt-40 animate-fade-in">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg backdrop-blur-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-3xl font-bold">{result.title}</h2>
              <Button size="sm" onClick={handleSaveRecipeToCollection}>
                <Bookmark className="w-4 h-4 mr-2" />
                Save Recipe
              </Button>
            </div>

            <div className="flex flex-col-reverse md:flex-row gap-8">
              {/* Ingredients */}
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-4">Ingredients</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {result.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              {result.image && (
                <div>
                  <Image
                    src={result.image}
                    alt={result.title}
                    width={400}
                    height={300}
                    className="rounded-xl object-cover w-full h-auto shadow-md"
                  />
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-10">
              <h3 className="text-2xl font-semibold mb-4">Instructions</h3>
              <ol className="list-decimal list-inside space-y-4 text-gray-300">
                {result.instructions.map((instruction, index) => (
                  <li key={index} className="leading-relaxed">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
