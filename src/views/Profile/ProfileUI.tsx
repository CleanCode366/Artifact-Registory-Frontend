// components/profile/ProfileUI.tsx
import React from "react";
import ProfileHeader from "./ProfileHeader";
import StatsGrid from "./StatsGrid";
import StatsGrid1 from "./StatsGrid1";
import ImageGallery from "./ImageGallery";
import ContributionsList from "./ContributionsList";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Images, MessageCircle } from "lucide-react";

interface ProfileUIProps {
  user: any;
  posts: any[];
  comments: any[];
}

const ProfileUI = ({ user, posts, comments }: ProfileUIProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="min-h-screen bg-primary-background p-4">
      <div className="max-w-6xl mx-auto">

        {user && <ProfileHeader user={user} />}

        {user && (
          <div>
            <div className="profile-stats-pc">
              <StatsGrid1 stats={user} />
            </div>
            <div className="profile-stats-mob">
              <StatsGrid stats={user} />
            </div>
          </div>
        )}

        <h2 className="text-xl font-bold text-black mt-6">
          My Contributions
        </h2>
        {/* <h6 className="text-orange-500 hover:text-orange-400 text-xl font-bold text-black">My Posts</h6> */}

        {/* <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
            <Tab icon={<Images className="w-5 h-5" />} label="My Posts" />
            <Tab icon={<MessageCircle className="w-5 h-5" />} label="My Comments" />
          </Tabs>
        </Box> */}
        {posts?.length > 0 ? (
          <ImageGallery posts={posts} />
        ) : (
          <div className="py-8 flex items-center justify-center min-h-80 ">No posts available.</div>
        )}

        {comments?.length > 0 ? (
          <ContributionsList comments={comments} />
        ) : (
          <div className="py-8 flex items-center justify-center min-h-80">No contributions yet.</div>
        )}
        <ContributionsList comments={comments} />

      </div>
    </div>
  );
};

export default ProfileUI;
