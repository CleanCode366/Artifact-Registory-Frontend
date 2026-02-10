// components/profile/ProfileUI.tsx
import ProfileHeader from "./ProfileHeader";
import StatsGrid from "./StatsGrid";
import StatsGrid1 from "./StatsGrid1";
import ImageGallery from "./ImageGallery";
import ContributionsList from "./ContributionsList";

interface ProfileUIProps {
  user: any;
  posts: any[];
  comments: any[];
}

const ProfileUI = ({ user, posts, comments }: ProfileUIProps) => {
  return (
    <div className="min-h-screen bg-primary-background p-4">
      <div className="max-w-6xl mx-auto">

        {user && <ProfileHeader user={user} />}

        {user && (
          <>
            <div className="profile-stats-pc">
              <StatsGrid1 stats={user} />
            </div>
            <div className="profile-stats-mob">
              <StatsGrid stats={user} />
            </div>
          </>
        )}

        <h2 className="text-xl font-bold text-black mt-6">
          My Contributions
        </h2>

        {posts?.length > 0 ? (
          <ImageGallery posts={posts} />
        ) : (
          <div className="py-8 text-center">No posts available.</div>
        )}

        {comments?.length > 0 ? (
          <ContributionsList comments={comments} />
        ) : (
          <div className="py-8 text-center">No contributions yet.</div>
        )}
      </div>
    </div>
  );
};

export default ProfileUI;
