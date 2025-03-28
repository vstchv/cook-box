"use client";

import { useState, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExtractResult } from "@/types/extract";
import Image from "next/image";

export default function Extract() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ExtractResult | null>(null);
  const [error, setError] = useState("");

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
          <h2 className="text-2xl font-bold mb-4">{result.title}</h2>

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
