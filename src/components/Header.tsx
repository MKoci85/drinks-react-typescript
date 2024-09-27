import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";


export default function Header() {

    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })
    const {pathname} = useLocation()
    const isHome = useMemo(() => pathname === '/' , [pathname])

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const { drinks } = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const showNotification = useAppStore((state) => state.showNotification)
    

    useEffect(() => {
        fetchCategories() 
    },[])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //Validate
        if(Object.values(searchFilters).includes('')){
            showNotification({text: 'All fields are required', error:true})
            return
        }

        //search recipes
        searchRecipes(searchFilters)

    }

  return (
    <header className={ isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
        <div className="mx-auto container px-5 py-16">
            <div className="flex justify-between items-center">
                <div>
                    <img className="w-32" src="/logo.svg" alt="logo" />
                </div>

                <nav className="flex gap-4">
                    {/* <Link to="/" className="text-white uppercase font-bold">Home</Link>
                    <Link to="/favorites" className="text-white uppercase font-bold">Favorites</Link> */}

                    <NavLink to="/" 
                        className={({isActive}) => 
                            isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                        }>Home</NavLink>
                    <NavLink to="/favorites" className={({isActive}) => 
                            isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                        }>Favorites</NavLink>
                </nav>
            </div>

                { isHome && (
                    <form
                        className="md:w-1/2 2xl:w-1/3 my-32 p-10 rounded-lg shadow-inner shadow-orange-400 space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label htmlFor="ingredient" className="block text-white uppercase font-extrabold text-lg">
                                Name or Ingredient
                            </label>
                            <input 
                                id="ingredient"
                                type="text"
                                name="ingredient"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Name or Ingredient. e.g. Vodka, Tequila, Coffee"
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="category" className="block text-white uppercase font-extrabold text-lg">
                                Category
                            </label>
                            <select 
                                id="category"
                                name="category"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value=''>-- Select --</option>
                                { drinks.map( drink => (
                                    <option 
                                        key={drink.strCategory}
                                        value={drink.strCategory}
                                    >{drink.strCategory}</option>
                                ))}
                            </select>
                        </div>
                        <input 
                            type="submit" 
                            value="Search" 
                            className="cursor-pointer bg-orange-600 py-2 hover:bg-orange-400 shadow shadow-white text-white font-extrabold w-full rounded-lg uppercase"
                        
                        />
                    </form>
                )}

        </div>
    </header>
  )
}
