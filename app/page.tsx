import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Workflow } from "@/components/workflow"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Header />
      <Hero />
      <Workflow />
      <Footer />
    </main>
  )
}
