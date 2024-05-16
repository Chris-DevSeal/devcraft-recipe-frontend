import { useState } from "react";

export default function RecipeForm({ onSubmit }) {
  const [ingredientAmount, setIngredientAmount] = useState(1);
  const submitRecipe = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(Object.fromEntries(formData));
    onSubmit({
      name: formData.get("name"),
      steps: formData.get("steps"),
      ingredients: [...Array(ingredientAmount).keys()].map((index) => {
        return {
          name: formData.get(`name-${index}`),
          amount: formData.get(`amount-${index}`),
          units: formData.get(`units-${index}`),
        };
      }),
    });
    event.target.reset();
  };
  return (
    <form onSubmit={submitRecipe}>
      <div className="flex gap-4 justify-center items-center mb-6">
        <label for="name">Name:</label>
        <input id="name" name="name" placeholder="Banana Bread"></input>
      </div>
      <div className="flex gap-4 justify-center items-center mb-6">
        <label for="steps">Steps:</label>
        <textarea
          id="steps"
          name="steps"
          placeholder="1. Eat banana bread"
        ></textarea>
      </div>
      {[...Array(ingredientAmount).keys()].map((index) => {
        return (
          <fieldset
            className="flex gap-4 justify-center items-center mb-6"
            key={index}
          >
            <label for={`name-${index}`}>Ingredient Name:</label>
            <input
              id={`name-${index}`}
              name={`name-${index}`}
              placeholder="Bananas"
            ></input>
            <label for={`amount-${index}`}>Ingredient Amount:</label>
            <input
              id={`amount-${index}`}
              type="number"
              name={`amount-${index}`}
              placeholder="6"
            ></input>
            <label for={`units-${index}`}>Ingredient Units:</label>
            <input
              id={`units-${index}`}
              name={`units-${index}`}
              placeholder="bunches"
            ></input>
          </fieldset>
        );
      })}
      <button
        className="group underline rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        onClick={() => setIngredientAmount((amount) => amount + 1)}
      >
        Add Ingredient
      </button>
      <input
        className="group underline rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        type="submit"
      />
    </form>
  );
}
