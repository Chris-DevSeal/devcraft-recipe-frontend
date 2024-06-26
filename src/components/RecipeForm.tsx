import { RecipeWithIngredients } from "@/utils/types";
import { FormEvent, useState } from "react";

export default function RecipeForm({
  onSubmit,
}: {
  onSubmit: (data: RecipeWithIngredients) => void;
}) {
  const [ingredientAmount, setIngredientAmount] = useState(1);
  const submitRecipe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(Object.fromEntries(formData));
    onSubmit({
      name: formData.get("name")!.toString(),
      steps: formData.get("steps")!.toString(),
      // @ts-ignore
      ingredients: [...Array(ingredientAmount).keys()].map((index) => {
        return {
          name: formData.get(`name-${index}`),
          amount: parseInt(formData.get(`amount-${index}`)!.toString()),
          units: formData.get(`units-${index}`),
        };
      }),
    });
    event.currentTarget.reset();
  };
  return (
    <form onSubmit={submitRecipe}>
      <div className="flex gap-4 justify-center items-center mb-6">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          placeholder="Banana Bread"
          required
        ></input>
      </div>
      <div className="flex gap-4 justify-center items-center mb-6">
        <label htmlFor="steps">Steps:</label>
        <textarea
          id="steps"
          name="steps"
          required
          placeholder="1. Eat banana bread"
        ></textarea>
      </div>

      {
        // @ts-ignore
        [...Array(ingredientAmount).keys()].map((index) => {
          return (
            <fieldset
              className="flex gap-4 justify-center items-center mb-6"
              key={index}
            >
              <label htmlFor={`name-${index}`}>Ingredient Name:</label>
              <input
                id={`name-${index}`}
                name={`name-${index}`}
                placeholder="Bananas"
              ></input>
              <label htmlFor={`amount-${index}`}>Ingredient Amount:</label>
              <input
                id={`amount-${index}`}
                type="number"
                name={`amount-${index}`}
                placeholder="6"
                required
                defaultValue={0}
              ></input>
              <label htmlFor={`units-${index}`}>Ingredient Units:</label>
              <input
                id={`units-${index}`}
                name={`units-${index}`}
                placeholder="bunches"
              ></input>
            </fieldset>
          );
        })
      }
      <button
        className="group underline rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        onClick={(event) => {
          event.preventDefault();
          setIngredientAmount((amount) => amount - 1);
        }}
        disabled={ingredientAmount <= 1}
      >
        Remove Ingredient
      </button>
      <button
        className="group underline rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        onClick={(event) => {
          event.preventDefault();
          setIngredientAmount((amount) => amount + 1);
        }}
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
