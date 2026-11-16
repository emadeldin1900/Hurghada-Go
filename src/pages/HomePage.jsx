import DestinationHero from '../components/home/DestinationHero';
import PopularCategories from '../components/home/PopularCategories';
import FeaturedPlaces from '../components/home/FeaturedPlaces';
import SignatureExperiences from '../components/home/SignatureExperiences';
import AiTravelAssistant from '../components/home/AiTravelAssistant';
import TravelerReviews from '../components/home/TravelerReviews';
import PlanAndPartner from '../components/home/PlanAndPartner';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      <DestinationHero />
      <PopularCategories />
      <FeaturedPlaces />
      <SignatureExperiences />
      <AiTravelAssistant />
      <TravelerReviews />
      <PlanAndPartner />
    </div>
  );
}
