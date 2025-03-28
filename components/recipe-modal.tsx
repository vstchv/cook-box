"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Database } from "@/types/supabase";

type Recipe = Database["public"]["Tables"]["recipes"]["Row"];

interface RecipeModalProps {
  recipe: Recipe;
  open: boolean;
  onClose: () => void;
}

export function RecipeModal({ recipe, open, onClose }: RecipeModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {recipe.title}
          </DialogTitle>
        </DialogHeader>

        {recipe.image_url && (
          <Image
            src={recipe.image_url}
            alt={recipe.title}
            width={600}
            height={300}
            className="rounded-md object-cover mb-4"
          />
        )}

        <div>
          <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {Array.isArray(recipe.ingredients) &&
              recipe.ingredients.map((ingredient, i) => (
                <li key={i}>{String(ingredient)}</li>
              ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Instructions</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            {Array.isArray(recipe.instructions) &&
              recipe.instructions.map((step, i) => (
                <li key={i}>{String(step)}</li>
              ))}
          </ol>
        </div>

        {recipe.source_url && (
          <a
            href={recipe.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary mt-4 block text-sm underline"
          >
            View original recipe ↗
          </a>
        )}
      </DialogContent>
    </Dialog>
  );
}
