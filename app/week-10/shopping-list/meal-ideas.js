"use client"

import {useState, useEffect} from "react";

async function fetchMealIdeas(ingredient) {
    // ingredient = 'bread'
    console.log('ingredient:', ingredient);
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        console.log(data);
        return data.meals || [];
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

function getIngredientsWithMeasures(meal) {
    return Array.from({length: 20}, (_, i) => {
        const ingredient = meal[`strIngredient${i + 1}`];
        const measure = meal[`strMeasure${i + 1}`];

        return ingredient && ingredient.trim() !== "" ?
            `${ingredient} (${measure && measure.trim() !== "" ? measure : " "})`
            : null;
    }).filter(item => item !== null);
}

async function getMealIngredients(mealId) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        const data = await response.json();
        console.log('data.ingredients', mealId, data);
        const ingredients = getIngredientsWithMeasures(data.meals[0]);
        console.log("Ingredients needed:\n", ingredients.join("\n"));
        return ingredients || [];
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

export default function MealIdeas({ingredient}) {
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(0);
    const [ingredients, setIngredients] = useState([]);


    useEffect(() => {
        async function loadMealIdeas() {
            const data = await fetchMealIdeas(ingredient);
            setMeals(data);
        }

        loadMealIdeas();
    }, [ingredient]);

    useEffect(() => {
        async function loadMealIngredients() {
            const data = await getMealIngredients(selectedMeal);
            setIngredients(data);
        }

        loadMealIngredients();
    }, [selectedMeal]);

    return (
        <div className="p-2 w-1/2">
            <h2 className="text-lg font-bold mb-2">Meal Ideas</h2>
            {meals.length > 0 ? (
                <div>
                    <h2 className="text-lg mb-2">Here are some meal ideas using <strong>{ingredient}</strong>:</h2>
                    <ul className="space-y-2">
                        {meals.map((meal) => (
                            <li
                                key={meal.idMeal}
                                className="bg-gray-900 rounded-lg p-3 flex flex-col gap-2 cursor-pointer hover:bg-gray-800"
                                onClick={() => setSelectedMeal(meal.idMeal)}
                            >
                                {/* Meal Header */}
                                <div className="flex items-center bg-gray-700 p-2 rounded-md">
                                    <img src={meal.strMealThumb} alt={meal.strMeal}
                                         className="w-12 h-12 rounded-md mr-3"/>
                                    <span className="text-white text-sm font-bold">{meal.strMeal}</span>
                                </div>

                                {/* Ingredients List */}
                                {selectedMeal === meal.idMeal && (
                                    <div className="p-3 bg-gray-800 text-white rounded-lg">
                                        <span className="font-semibold text-sm">Ingredients needed:</span>
                                        <ul className="list-none pl-0 mt-2 flex flex-col gap-1">
                                            {ingredients.map((ingredient) => (
                                                <li
                                                    key={ingredient}
                                                    className="text-xs p-1 bg-gray-700 rounded-md"
                                                >
                                                    {ingredient}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-lg">No meal ideas found for {ingredient}</p>
            )}
        </div>

    )
}