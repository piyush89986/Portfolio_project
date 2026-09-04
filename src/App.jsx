import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import Footer from "./components/Footer";
import AIAgent from "./components/ai/AIAgent";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary min-h-screen text-white'>
        {/* Global 3D Starfield Background across all pages & sections */}
        <StarsCanvas />

        <div className='relative z-10'>
          <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
            <Navbar />
            <Hero />
          </div>
          <About />
          <Experience />
          <Tech />
          <Works />
          <Feedbacks />
          <Contact />
          <Footer />
        </div>

        {/* Interactive AI Recruiter Agent UI */}
        <AIAgent />
      </div>
    </BrowserRouter>
  );
};

export default App;
