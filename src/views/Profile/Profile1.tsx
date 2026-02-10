import AuthContext from "@/context/AuthContext";
import { coreBackendClient } from "@/utils/http/clients/coreBackend.client";
import { useContext, useEffect, useState } from "react";
import ProfileLoader from "./ProfileLoader";
import ProfileUI from "./ProfileUI";


const Profile: React.FC = () => {
  const { isLoading: authLoading } = useContext(AuthContext);

  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, postsRes, commentsRes] = await Promise.all([
          coreBackendClient.post("post/userProfile"),
          coreBackendClient.post("post/getAllUserPost"),
          coreBackendClient.post("post/getCommentByUser"),
        ]);

        setUserDetails(profileRes.data.data);
        setPosts(postsRes.data.data ?? []);
        setComments(commentsRes.data.data ?? []);
      } catch (err) {
        console.error("Profile fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchData();
    }
  }, [authLoading]);

  if (authLoading || loading) {
    return <ProfileLoader />;
  }

  return (
    <ProfileUI
      user={userDetails}
      posts={posts}
      comments={comments}
    />
  );
};

export default Profile;