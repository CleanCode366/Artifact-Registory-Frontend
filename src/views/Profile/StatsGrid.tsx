import type React from "react";
import type { User } from "@/types";
import { Heart, Star, ThumbsUp, Upload, Users } from "lucide-react";

interface StatsGridProps {
  stats: User;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const statItems = [
    { icon: Upload, value: stats.imagesUploaded, label: "Images Uploaded", color: "text-[#34D399]" },
    { icon: ThumbsUp, value: stats.upvotesReceived, label: "Upvotes Received", color: "text-[#51A2FF]" },
    // { icon: Users, value: stats.followers, label: "Followers", color: "text-[#FBBF24]" },
    // { icon: Star, value: stats.points, label: "Point s", color: "text-[#A78BFA]" }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-black mb-7">Dashboard Stats</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <div key={index} className="bg-secondary-background border border-slate-700/50  rounded-lg p-4 text-center">
            <item.icon className={`w-8 h-8 mx-auto ${item.color}`} />
            <div className="text-2xl font-bold text-black mt-4 mb-1">{item.value}</div>
            <div className="text-black text-sm">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsGrid;