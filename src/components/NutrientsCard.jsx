'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector } from 'react-redux';
import { Badge } from './ui/badge';

function NutrientsCard() {
    const {nutrition, fruits:selectedFruits, toppings:selectedToppings} = useSelector(state=>state.product)
    return (
        <div className="grid md:grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Nutrition Summary (selected items)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-sm text-slate-700">
                        {nutrition.map(ntx=>(
                            <div key={ntx.name} className="flex justify-between py-1"><span>{ntx.name}</span><span className="font-medium">{ntx.quantity} {ntx.name == 'Calories' ? 'kcal' : 'mg'}</span></div>
                        ))}
                    </div>
                    <div className="text-xs text-slate-500 mt-2">*Values are approximate per selected combination</div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Selected Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-sm">
                        <div className="font-medium">Fruits</div>
                        {selectedFruits.length ? selectedFruits.map((f) => {
                            // const fd = selectedFruits.find(x => x.name === f);
                            return (
                                <div key={f.id} className="py-1 flex justify-between items-center">
                                    <div>
                                        <div className="font-medium">{f.name}</div>
                                        <div className="text-xs text-slate-500">Calories: {f?.nutrients.find(e=>e.name == 'Calories')?.quantity} kcal • Vit C: {f?.nutrients.find(e=>e.name == 'Vitamin C')?.quantity} mg • Fiber: {f?.nutrients.find(e=>e.name == 'Fiber')?.quantity} g</div>
                                    </div>
                                    <Badge>{f?.calories} ✓</Badge>
                                </div>
                            );
                        }) : <div className="text-xs text-slate-500">No fruits selected</div>}

                        <div className="mt-3 font-medium">Toppings</div>
                        {selectedToppings.length ? selectedToppings.map((t) => {
                            // const td = selectedToppings.find(x => x.name === t);
                            return (
                                <div key={t.id} className="py-1 flex justify-between items-center">
                                    <div>
                                        <div className="font-medium">{t.name}</div>
                                        <div className="text-xs text-slate-500">Calories: {t?.nutrients.find(e=>e.name == 'Calories')?.quantity} kcal • Protein: {t?.nutrients.find(e=>e.name == 'Protein')?.quantity} g</div>
                                    </div>
                                    <Badge>{t?.calories} ✓</Badge>
                                </div>
                            );
                        }) : <div className="text-xs text-slate-500">No toppings selected</div>}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default NutrientsCard