import { BookOpen, Camera, Users } from "lucide-react";
import InfoCard from "./InfoCard.jsx";
const HowItWork = () => {
    const cardContents = [{
        title: "Discover & Upload",
        description: "Find ancient inscriptions in the field and upload high-quality images with location details and initial observations.",
        icon: <Camera className="w-10 h-10 text-primary" />
    },
    {
        title: "Transcribe & Translate",
        description: "Work together to decipher scripts, provide transcriptions, and offer translations in multiple languages.",
        icon: <BookOpen className="w-10 h-10 text-primary" />
    },
    {
        title: "Share Knowledge",
        description: "Engage with experts and enthusiasts, share insights, and build collective understanding of our heritage.",
        icon: <Users className="w-10 h-10 text-primary" />
    }
    ];
    return (
        <section className="py-20 bg-secondary-background/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-bold mb-4 text-secondary-dark">How Our Platform Works</h3>
                    <p className="text-secondary-dark text-lg">Collaborative archaeology made simple</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* <div className="text-center group ">
                        <div className="w-20 h-20 
                broder border-slate-700
                rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Camera className="w-10 h-10 text-primary" />
                        </div>
                        <h4 className="text-xl font-semibold mb-3 text-secondary-dark">Discover & Upload</h4>
                        <p className="text-secondary-dark leading-relaxed">
                            Find ancient inscriptions in the field and upload high-quality images with location details and initial observations.
                        </p>
                    </div> */}
                    {cardContents.map((content, index) => (
                        <InfoCard key={index} content={content} />
                    ))}

                    {/* <div className="text-center group">
                        <div className="w-20 h-20 
                
                rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <BookOpen className="w-10 h-10 text-primary" />
                        </div>
                        <h4 className="text-xl font-semibold mb-3 text-secondary-dark">Transcribe & Translate</h4>
                        <p className="text-secondary-dark leading-relaxed">
                            Work together to decipher scripts, provide transcriptions, and offer translations in multiple languages.
                        </p>
                    </div>

                    <div className="text-center group">
                        <div className="w-20 h-20 
                
                rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Users className="w-10 h-10 text-primary" />
                        </div>
                        <h4 className="text-xl font-semibold mb-3 text-secondary-dark">Share Knowledge</h4>
                        <p className="text-secondary-dark leading-relaxed">
                            Engage with experts and enthusiasts, share insights, and build collective understanding of our heritage.
                        </p>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default HowItWork;