import type React from "react";
import type { User } from "@/types";
import { Share } from "lucide-react";
import profileImg from "@assets/user/profile.png";
interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="rounded-lg pt-6 pb-6 mb-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="relative">
          {/* only the first leter of the name */}
          <div className="w-20 h-20 rounded-full border-2 border-orange-500 bg-gray-600 flex items-center justify-center text-3xl font-bold text-white">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          {/* <img 
            src={user.profileImage} 
            alt={user.name}
            className="w-20 h-20 rounded-full border-2 border-orange-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = profileImg;
            }}
          /> */}
          {/* <div className="absolute -bottom-1 -right-1 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            6
          </div> */}
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-white mb-2">{user.name}</h1>
          <p className="text-gray-400 mb-4">Archaeology enthusiast & digital volunteer</p>
          
          {/* <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
              Edit Profile
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer">
              <Share className="w-4 h-4" />
              Share
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;