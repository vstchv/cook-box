"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";
import { ExtractResult } from "@/types/extract";

export default function Extract() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ExtractResult | null>(null);
  const [error, setError] = useState("");

  const onUrlSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
    setError("");
    setResult(null);

    try {
      console.log("trying to fetch api/recipes/extract");
      const response = await fetch("api/extract", {
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
    <div className="container mx-auto p-4">
      <form onSubmit={onUrlSubmit} className="flex flex-col space-y-4">
        <Input
          placeholder="Enter recipe URL"
          type="text"
          required
          name="url"
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
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside">
            {result.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mt-4 mb-2">Instructions</h2>
          <ol className="list-decimal list-inside">
            {result.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
