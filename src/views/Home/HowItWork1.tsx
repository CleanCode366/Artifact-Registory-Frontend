import { BookOpen, Camera, Users } from "lucide-react";
import InfoCard from "./InfoCard.jsx";
import { Parallax } from "react-parallax";
import banner2 from "@assets/banner2.jpg";
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
        <>
            <div className="parallax-bg-pc">
                <Parallax blur={0} bgImage={banner2} bgImageAlt="the cat" strength={600} style={{ borderRadius: "30px" }}>
                    <section className="py-20 bg-secondary-background/30"
                        style={{ background: "linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%,rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.7) 100%)" }}
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h3 className="text-3xl font-bold mb-4 text-white">How Our Platform Works</h3>
                                <p className="text-white text-lg">Collaborative archaeology made simple</p>
                            </div>
                            <div className="grid md:grid-cols-3 gap-8">
                                {cardContents.map((content, index) => (
                                    <InfoCard key={index} content={content} />
                                ))}

                            </div>
                        </div>
                    </section>
                </Parallax >
            </div>
            <div className="parallax-bg-mob">
                <Parallax blur={0} bgImage={''} bgImageAlt="the cat" strength={600} style={{ borderRadius: "30px" }}>
                    <section className="py-20 bg-secondary-background/30">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h3 className="text-3xl font-bold mb-4 text-black">How Our Platform Works</h3>
                                <p className="text-black text-lg">Collaborative archaeology made simple</p>
                            </div>
                            <div className="flex items-center justify-center flex-col gap-8">
                                {cardContents.map((content, index) => (
                                    <InfoCard key={index} content={content} />
                                ))}
                            </div>
                        </div>
                    </section>
                </Parallax >
            </div>
        </>
    )
}

export default HowItWork;