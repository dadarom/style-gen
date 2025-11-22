import { Header } from "../components/header"
import { Hero } from "../components/hero"
import { Workflow } from "../components/workflow"
import { Pricing } from "../components/Pricing"
import { Footer } from "../components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <section id="hero">
        <Hero />
      </section>
      <section id="workflow">
        <Workflow />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <Footer />
    </>
  )
}
