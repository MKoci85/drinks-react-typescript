import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"



export default function FavoritesPage() {

  const favorites = useAppStore((state) => state.favorites)

  return (
    <>
      <h1 className="text-6xl font-extrabold text-white">Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 my-10 gap-10 ">
        {favorites.map(drink => (
          <DrinkCard 
            key={drink.idDrink}
            drink={drink}
          />
        ))}
      </div>
    </>
  )
}
