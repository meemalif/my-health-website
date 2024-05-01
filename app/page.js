import HeroSection from "../components/heroSection";
import HeroSection2 from "../components/heroSection2";
import Testimonal from "../components/Testimonia";
import Testimonals from "../components/Testimonials";
import Authors from "../components/Authors";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HeroSection2 />
      <Authors />
      <Testimonal />
      <Testimonals />
    </div>
  );
}
