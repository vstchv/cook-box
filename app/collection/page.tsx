"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@/utils/supabase/client";
import { Database } from "@/types/supabase";
import Image from "next/image";
import { RecipeModal } from "@/components/recipe-modal";

type Recipe = Database["public"]["Tables"]["recipes"]["Row"];

export default function CollectionPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      const supabase = createBrowserClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("You must be logged in to view your collection.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        setError("Failed to fetch recipes.");
      } else {
        setRecipes(data || []);
      }

      setLoading(false);
    };

    fetchRecipes();
  }, []);

  if (loading) return <p className="text-muted">Loading your recipes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-6">
      {recipes.length === 0 ? (
        <p className="text-center">You haven’t saved any recipes yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="cursor-pointer bg-muted p-4 rounded-xl shadow-sm flex flex-col gap-2 hover:ring-2 hover:ring-primary transition"
            >
              {recipe.image_url && (
                <Image
                  src={recipe.image_url}
                  alt={recipe.title}
                  width={300}
                  height={200}
                  className="rounded-md object-cover w-full h-[160px]"
                />
              )}
              <h3 className="text-lg font-semibold line-clamp-2">
                {recipe.title}
              </h3>
            </div>
          ))}
        </div>
      )}

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          open={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
