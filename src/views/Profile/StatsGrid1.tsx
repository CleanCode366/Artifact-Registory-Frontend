import type React from "react";
import type { User } from "@/types";
import { Heart, Star, ThumbsUp, Upload, Users } from "lucide-react";

interface StatsGridProps {
    stats: User;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
    const statItems = [
        { icon: Upload, value: stats.imagesUploaded, label: "Images Uploaded", bgColor: "#34D399" },
        { icon: ThumbsUp, value: stats.upvotesReceived, label: "Upvotes Received", bgColor: "#51A2FF" },
        // { icon: Users, value: stats.followers, label: "Followers", bgColor: "#FBBF24" },
        // { icon: Star, value: stats.points, label: "Points", bgColor: "#A78BFA" }
    ];

    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-black ">Dashboard Stats</h2>
            <section className="py-16 bg-secondary-background/30" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center" style={{ width: "100%" }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 ag-courses_item" style={{ width: "100%" }}>
                        {statItems.map((item, index) => {
                            return (
                                <div key={index} className="ag-courses-item_link text-center p-6 bg-primary-background/50 rounded-xl backdrop-blur-sm border border-slate-700/50 secondary-text-dark cursor-pointer">
                                    <div className="ag-courses-item_bg" style={{ backgroundColor: `${item.bgColor}` }}>

                                    </div>
                                    <item.icon className={`w-8 h-8 mx-auto mb-3 text-white ag-courses-item_icon-box ${item.color}`} />
                                    <div className="text-3xl font-bold mt-4 mb-1 ag-courses-item_title">{item.value}</div>
                                    <div className="secondary-text-dark ag-courses-item_date-box">{item.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StatsGrid;