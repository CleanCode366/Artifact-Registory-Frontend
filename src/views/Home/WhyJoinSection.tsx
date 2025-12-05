import { Award, Globe, Users } from "lucide-react";
import type React from "react";
import CommunityCard from "./CommunityCard.jsx";
// import { color } from "framer-motion";

const WhyJoinSection: React.FC = () => {
    const communityCardContent = [{
        title: "Global Impact",
        description: "Contribute to a worldwide effort to digitally preserve archaeological treasures for future generations.",
        icon: <Globe className="w-8 h-8 " />,
        color: "blue"
    },
    {
        title: "Expert Community",
        description: "Connect with archaeologists, linguists, historians, and passionate enthusiasts from around the world.",
        icon: <Users className="w-8 h-8" />,
        color: "purple"
    },
    {
        title: "Recognition",
        description: "Gain recognition for your contributions and build a reputation in the archaeological community.",
        icon: <Award className="w-8 h-8" />,
        color: "green"
    }
    ];

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-bold mb-4 text-secondary-dark">Why Join Our Community?</h3>
                    <p className="text-secondary-dark text-lg">Be part of preserving and understanding our shared heritage</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 communitycards">
                    {
                        communityCardContent.map((content, index) => (
                            <CommunityCard key={index} content={content} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
}

export default WhyJoinSection;