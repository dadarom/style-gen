import { Header } from "../components/header"
import { Hero } from "../components/hero"
import { Workflow } from "../components/workflow"
import { Pricing } from "../components/Pricing"
import { Demo } from "../components/Demo"
import About from "../components/About"
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
      <section id="demo">
        <Demo />
      </section>
      
      <section id="about">
        <About />
      </section>
      <Footer />
    </>
  )
}
