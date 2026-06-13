import { motion } from 'framer-motion'
import HeroSection from '../components/home/HeroSection'
import StatsSection from '../components/home/StatsSection'
import FeaturedDishes from '../components/home/FeaturedDishes'
import ChefSection from '../components/home/ChefSection'
import Testimonials from '../components/home/Testimonials'
import ReservationCTA from '../components/home/ReservationCTA'

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <HeroSection />
      <StatsSection />
      <FeaturedDishes />
      <ChefSection />
      <Testimonials />
      <ReservationCTA />
    </motion.main>
  )
}
