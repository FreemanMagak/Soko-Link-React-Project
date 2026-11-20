import ProduceCards from "./ProduceCards"

export default function FeaturedProduce({featuredproduces}) {

    return (
        <>
            <div className=" featuredproduce-section d-flex flex-wrap gap-3 justify-content-start">
                {
                    featuredproduces.map((featuredproduce) => (
                        <ProduceCards
                            key={featuredproduce.id}
                            featuredproduce={featuredproduce}
                        />
                    ))
                }
            </div>
        </>
    )
}