"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { GET_PRODUCTS } from "@/lib/ApiRoutes"
import { PopularCups } from "@/components/FruitCards"

const baseUrl = process.env.BASE_URL || "http://localhost:3000"

export default function MenuPage() {
    const [search, setSearch] = useState("")
    const [query, setQuery] = useState("") // query triggered by button
    const [cups, setCups] = useState([])
    const [drinks, setDrinks] = useState([])
    const [dryFruits, setDryFruits] = useState([])
    const [loadingCups, setLoadingCups] = useState(false)
    const [loadingDrinks, setLoadingDrinks] = useState(false)
    const [loadingDryFruits, setLoadingDryFruits] = useState(false)
    const [errorCups, setErrorCups] = useState(null)
    const [errorDrinks, setErrorDrinks] = useState(null)
    const [errorDryFruits, setErrorDryFruits] = useState(null)

    const fetchProducts = async (type, setData, setLoading, setError) => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(`${baseUrl}${GET_PRODUCTS}?type=${type}&search=${query}`, {
                next: { revalidate: 3600 },
            })
            const data = await res.json()
            setData(data.products || [])
        } catch (err) {
            console.error(err)
            setError("Failed to load products.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts("fruit", setCups, setLoadingCups, setErrorCups)
        fetchProducts("shake", setDrinks, setLoadingDrinks, setErrorDrinks)
        fetchProducts("dry-fruit", setDryFruits, setLoadingDryFruits, setErrorDryFruits)
    }, [query])

    const handleSearch = () => {
        setQuery(search.trim())
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">#Our Menu</h1>

            {/* Search */}
            <div className="mb-6 flex gap-2">
                <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md"
                />
                <Button onClick={handleSearch}>Search</Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="cups" className="w-full">
                <TabsList className="flex justify-center mb-6">
                    <TabsTrigger value="cups">Fruit Cups</TabsTrigger>
                    <TabsTrigger value="shakes">Shakes</TabsTrigger>
                    <TabsTrigger value="dryfruits">Dry Fruits</TabsTrigger>
                </TabsList>

                {/* Fruit Cups */}
                <TabsContent value="cups">
                    {loadingCups ? (
                        <p className="text-center col-span-full">Loading cups...</p>
                    ) : errorCups ? (
                        <p className="text-center col-span-full text-red-500">{errorCups}</p>
                    ) : cups.length === 0 ? (
                        <p className="text-center col-span-full">No fruit cups available.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {cups.map((cup) => (
                                <PopularCups key={cup._id} p={cup} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                {/* Shakes */}
                <TabsContent value="shakes">
                    {loadingDrinks ? (
                        <p className="text-center col-span-full">Loading shakes...</p>
                    ) : errorDrinks ? (
                        <p className="text-center col-span-full text-red-500">{errorDrinks}</p>
                    ) : drinks.length === 0 ? (
                        <p className="text-center col-span-full">No shakes available.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {drinks.map((drink) => (
                                <PopularCups key={drink._id} p={drink} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                {/* Dry Fruits */}
                <TabsContent value="dryfruits">
                    {loadingDryFruits ? (
                        <p className="text-center col-span-full">Loading dry fruits...</p>
                    ) : errorDryFruits ? (
                        <p className="text-center col-span-full text-red-500">{errorDryFruits}</p>
                    ) : dryFruits.length === 0 ? (
                        <p className="text-center col-span-full">No dry fruits available.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {dryFruits.map((item) => (
                                <PopularCups key={item._id} p={item} />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}
