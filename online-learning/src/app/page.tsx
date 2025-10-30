import Navbar from '../components/Navbar';
import Hero from '../components/Hero'
import AcademyProgram from '../components/AcademyProgram';
import TechnologyProgram from '../components/TechnologyProgram'
import FeatureCards from '../components/FeatureCards'
import Testimonials from '../components/Testimonials'
import Stats from '../components/Stats'
import Footer from '../components/Footer'
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero/>
      <AcademyProgram/>
      <TechnologyProgram/>
      <FeatureCards/>
      <Testimonials/>
      <Stats/>
      <Footer/>
    </main>
  );
}