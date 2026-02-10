// components/profile/ProfileLoader.tsx
import cdacRoundLogo from "@assets/cdacroundlogo.png";

const ProfileLoader = () => {
  return (
    <div className="min-h-screen bg-secondary-background flex items-center justify-center">
      <div className="flex flex-col items-center">
        <img
          src={cdacRoundLogo}
          className="mr-3 mb-4 size-20 cdacSpinner"
          alt="loading"
        />
        <div className="text-black text-lg">
          Loading user profile...
        </div>
      </div>
    </div>
  );
};

export default ProfileLoader;
