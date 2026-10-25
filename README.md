# Code à Cuisine

AI-Powered Recipe Generator built with Angular, connected to an n8n / Google Gemini workflow.

## 🌐 Live Demo
  
👉 **[https://jakob-moussa.developerakademie.net/code-a-cuisine/](https://jakob-moussa.developerakademie.net/code-a-cuisine/)**

---

## Local development

Run `npm start`, then open the URL printed by Angular (normally http://localhost:4200).
Keep n8n running with the production webhook active at
`https://workflow-code.app.n8n.cloud/webhook/generate-recipes` (or local instance).

The browser posts to the configured `environment.n8nWebhookUrl`.
Gemini credentials remain in n8n; no frontend API key is needed.

## Generation flow

Add ingredients, choose preferences, and click **Generate Recipe**. The existing
Loading page loops its animation until the request succeeds or fails. A successful
response opens Results with exactly three cards; each **View** opens its own details.
Failures offer **Retry** with the same inputs or **Back to preferences**. Leaving
Loading cancels the request; requests time out after three minutes.

`RecipeStateService` owns shared Signals. `RecipeGeneratorService` sends the HTTP
request and validates the response. `RecipeService` coordinates state and errors,
provides result cards, and retains the existing cookbook recipes.
Generated detail IDs use `generated-1` through `generated-3` so they do not collide
with the cookbook's numeric IDs. State lasts for the current browser session in memory;
refreshing clears it, and expired generated links return to ingredient entry.

The webhook receives:

```json
{
  "ingredients": [{ "name": "Tomatoes", "amount": 300, "unit": "gram" }],
  "preferences": {
    "portions": 2,
    "cookingPersons": 1,
    "cookingTime": "quick",
    "cuisine": "Italian",
    "diet": "Vegetarian"
  }
}
```

The response is `{ "recipes": [...] }` with exactly three recipe objects containing
`title`, `cookingTime`, `cookingPersons`, `tags`, `yourIngredients`, `extraIngredients`,
`steps`, and `nutrition`, matching the existing workflow. Ingredients have `name` and
`amount`; steps have `number`, `title`, `description`, and `chef`. Missing nutrition
is displayed as a dash, and incomplete recipes show the retry state.

## Build & Deployment

- **Production Build:**
  ```bash
  npm run build -- --base-href /code-a-cuisine/
  ```

## Verification

- `npm run build` — production build and Angular template checks.
- `npm test -- --watch=false` — unit and routed generation-flow tests.
