import { Calendar, ChevronRight, Eye, Heart, MapPin, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react";
import img1 from "@assets/AncientSanskritStoneInsc.webp"
import img2 from "@assets/tamilCopperPlate.avif"
import img3 from "@assets/mediaPersianInscription.webp"
import { NavLink } from "react-router-dom";

const FeaturedInscriptionsCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const featuredInscriptions = [
        {
        id: 1,
        title: "Ancient Sanskrit Stone Tablet",
        // location: "Hampi, Karnataka",
        // period: "14th Century",
        image: img1,
        description: "Detailed Vijayanagara empire inscription with royal decrees",
        link: "/feed/68c7a90e62ee5a8274fceaac",
        // likes: 234,
        // views: 1542,
        // comments: 45
        },
        {
        id: 2,
        title: "Tamil Copper Plate Inscription",
        // location: "Thanjavur, Tamil Nadu",
        // period: "11th Century",
        image: img2,
        description: "Chola dynasty land grant inscription with detailed genealogy",
        link: "/feed/68c7a9a162ee5a8274fceab0",
        // likes: 189,
        // views: 987,
        // comments: 32
        },
        {
        id: 3,
        title: "Medieval Persian Script",
        // location: "Delhi",
        // period: "13th Century",
        image: img3,
        description: "Sultanate period architectural inscription from Qutub complex",
        link: "/feed/68c7a95062ee5a8274fceaae"
        // likes: 156,
        // views: 743,
        // comments: 28
        }
    ];

    useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredInscriptions.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
    return(
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h3 className="text-3xl text-primary-text font-bold mb-4">Featured Discoveries</h3>
                <p className="text-slate-400 text-lg">Explore remarkable inscriptions recently added to our collection</p>
            </div>

            <div className="relative">
                <div className="overflow-hidden rounded-2xl">
                <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {featuredInscriptions.map((inscription) => (
                    <div key={inscription.id} className="w-full flex-shrink-0">
                        <div className="grid md:grid-cols-2 gap-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                        <div className="relative group">
                            <img 
                            src={inscription.image} 
                            alt={inscription.title}
                            className="w-full h-80 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h4 className="text-2xl font-bold mb-3 text-primary-text">{inscription.title}</h4>
                            {/* <div className="flex items-center text-slate-400 mb-2">
                            <MapPin className="w-4 h-4 mr-2" />
                            {inscription.location}
                            </div>
                            <div className="flex items-center text-slate-400 mb-4">
                            <Calendar className="w-4 h-4 mr-2" />
                            {inscription.period}
                            </div> */}
                            <p className="text-slate-300 mb-6 leading-relaxed">{inscription.description}</p>
                            
                            <div className="flex items-center justify-between mb-6">
                            <div className="flex space-x-6 text-sm text-slate-400">
                                {/* <span className="flex items-center">
                                <Heart className="w-4 h-4 mr-1" />
                                {inscription.likes}
                                </span>
                                <span className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                {inscription.views}
                                </span>
                                <span className="flex items-center">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                {inscription.comments}
                                </span> */}
                            </div>
                            </div>
                                {/* {inscription.link} */}
                            <NavLink to="/feed" className="bg-gradient-to-r bg-primary px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center">
                            Explore More
                            <ChevronRight className="w-5 h-5 ml-2" />
                            </NavLink>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center mt-6 space-x-2">
                {featuredInscriptions.map((_, index) => (
                    <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                        currentSlide === index ? 'bg-primary' : 'bg-slate-600'
                    }`}
                    />
                ))}
                </div>
            </div>
            </div>
        </section>
    )
}

export default FeaturedInscriptionsCarousel;