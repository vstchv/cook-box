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
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/protected/extract", {
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
          <h2 className="text-xl font-semibold mb-2">Title</h2>
          <p>{result.title}</p>
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
    </>
  );
}
