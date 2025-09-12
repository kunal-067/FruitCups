import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export function PopularCups({p}) {
    return (
        <Card key={p.id} className="p-0 overflow-hidden">
            {/* <Link href={`/product/${p.id}`} className="block"> */}
            <div className="relative h-36">
                <Image src={p.img} alt={p.name} fill className="object-cover" />
            </div>
            <CardContent className="p-3">
                <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{p.name}</h4>
                    <Badge>{p.nutrients[0]}</Badge>
                </div>
                <p className="text-emerald-600 font-semibold mt-2">₹{p.price}</p>
                <div className="mt-3 flex items-center gap-2">
                    <Button size="sm" onClick={(e) => { e.preventDefault(); addToCart(p); }}>Add</Button>
                    <Link href={`/product/${p.id}`} className="text-sm text-slate-500 ml-auto">Details →</Link>
                </div>
            </CardContent>
            {/* </Link> */}
        </Card>
    )
}