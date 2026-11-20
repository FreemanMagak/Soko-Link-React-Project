import Hero from "../Components/Hero"
import { useProduce } from "../Context/ProduceProvider"

export default function Home() {
    const { produces } = useProduce()

    return <Hero produces={produces} />
}
