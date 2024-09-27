import type { Drink } from "../types"
import { useAppStore } from "../stores/useAppStore"

type DrinkCardProps = {
    drink: Drink
}

export default function DrinkCard({drink}: DrinkCardProps) {

    const selectRecipe = useAppStore((state) => state.selectRecipe)

  return (
    <div className="shadow-sm shadow-orange-400 rounded-2xl bg-white">
        <div className="overflow-hidden">
            <img 
                className="rounded-xl hover:scale-125 transition-transform hover:rotate-2" 
                src={drink.strDrinkThumb} 
                alt={`Image from: ${drink.strDrink}`} 
            />
        </div>

        <div className="p-5">
            <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
            <button
                type="button"
                className="bg-orange-500 hover:bg-orange-400 mt-5 w-full p-3 font-bold text-white text-lg rounded shadow shadow-black"
                onClick={() => selectRecipe(drink.idDrink)}
            >
                Recipe
            </button>
        </div>
    </div>
  )
}
