ALTER TABLE recipes
ADD CONSTRAINT unique_user_recipe UNIQUE (user_id, source_url);
