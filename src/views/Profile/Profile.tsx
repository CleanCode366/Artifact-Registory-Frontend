import { mockUser, mockPosts } from '@/Db/userProfile';
import ProfileHeader from './ProfileHeader';
import StatsGrid from './StatsGrid';
import ImageGallery from './ImageGallery';
import ContributionsList from './ContributionsList';
import { Suspense, use, useEffect, useState } from 'react';
import { get } from 'http';
import { getCookie } from '@/utils/Auth/auth';

declare global {
  interface Window {
    _env_?: { VITE_BACKEND_API_URL?: string };
  }
}

const backendApiUrl = window._env_?.VITE_BACKEND_API_URL ?? import.meta.env.VITE_BACKEND_API_URL;
// Mock data based on your data structure


// Profile Header Component

// Stats Dashboard Component


// Image Gallery Component


// Contributions Component

// Main Dashboard Component
const Profile = () => {
  const [UserDetails, SetUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [Comments, setComments] = useState([]);

  useEffect(() => {
    // Get token at the beginning
    const token = getCookie('token');
    
    if (!token) {
      console.error('No token found');
      // Redirect to login or handle no token case
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch(`${backendApiUrl}post/userProfile`, {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') || '50d7115f-8f84-4e07-a8ae-1a155afe4864',
          },
          body: JSON.stringify({}),
        });
        const data = await response.json();
        SetUserDetails(data.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAllPosts = async () => {
      try {
        const response = await fetch(`${backendApiUrl}post/getAllUserPost`, {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') || '50d7115f-8f84-4e07-a8ae-1a155afe4864',
          },
          body: JSON.stringify({}),
        });
        const data = await response.json();
        setPosts(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    const fetchAllComments = async () => {
      try {
        const response = await fetch(`${backendApiUrl}post/getCommentByUser`, {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') || '50d7115f-8f84-4e07-a8ae-1a155afe4864',
          },
          body: JSON.stringify({}),
        });
        const data = await response.json();
        console.log(await data.data);
        setComments(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoadingComments(false);
      }
    };

    fetchAllComments();
    fetchAllPosts();
    fetchPosts();
  }, []);

  if (isLoading || isLoadingPosts || isLoadingComments) {
    return (
      <div className="min-h-screen bg-primary-background flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-background p-4">
      <div className="max-w-6xl mx-auto">
        {UserDetails && <ProfileHeader user={UserDetails} />}
        {UserDetails && <StatsGrid stats={UserDetails} />}
        {posts.length > 0 && <ImageGallery posts={posts} />}
        {Comments.length > 0 && <ContributionsList comments={Comments} />}
      </div>
    </div>
  );
};
// const Profile = () => {

//   const [UserDetails, SetUserDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const [isLoadingPosts, setIsLoadingPosts] = useState(true);
//   const [posts, setPosts] = useState(null);

//   const [isLoadingComments, setIsLoadingComments] = useState(true);
//   const [Comments, setComments] = useState(null);

  
//    useEffect(() => {
//       const fetchPosts = async () => {
//         try {
//           const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImV4cCI6MTc1NzAwOTIxMSwidXNlciI6Im5pbmpha2Fua2FpMUBnbWFpbC5jb20iLCJpYXQiOjE3NTY5MjI4MTF9.uJltW2Slu-R147-ZU0hLM3mpjctlRJcHEwCBrtbO1_0'
//           const response = await fetch('https://inscriptions.cdacb.in/post/userProfile', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`,
//             },
//             body: JSON.stringify({}),
//           });
//           const data = await response.json();
//           // SetUserDetails(Array.isArray(data.data) ? data.data : []);
//           // data = { data : {}}
//           // object to json converstion of data
//           SetUserDetails(await (data).data);
//         } catch (error) {
//           console.error('Failed to fetch posts:', error);
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       const fetchAllPosts = async () => {
//         try {
//           const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImV4cCI6MTc1NzAwOTIxMSwidXNlciI6Im5pbmpha2Fua2FpMUBnbWFpbC5jb20iLCJpYXQiOjE3NTY5MjI4MTF9.uJltW2Slu-R147-ZU0hLM3mpjctlRJcHEwCBrtbO1_0'
//           const response = await fetch('https://inscriptions.cdacb.in/post/getAllUserPost', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`,
//             },
//             body: JSON.stringify({}),
//           });
//           const data = await response.json();
//           // SetUserDetails(Array.isArray(data.data) ? data.data : []);
//           // data = { data : {}}
//           // object to json converstion of data
//           setPosts(Array.isArray(data.data) ? data.data : []);
//         } catch (error) {
//           console.error('Failed to fetch posts:', error);
//         } finally {
//           setIsLoadingPosts(false);
//         }
//       };
//       const fetchAllComments = async () => {
//         try {
//           const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImV4cCI6MTc1NzAwOTIxMSwidXNlciI6Im5pbmpha2Fua2FpMUBnbWFpbC5jb20iLCJpYXQiOjE3NTY5MjI4MTF9.uJltW2Slu-R147-ZU0hLM3mpjctlRJcHEwCBrtbO1_0'
//           const response = await fetch('https://inscriptions.cdacb.in/post/getCommentByUser', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`,
//             },
//             body: JSON.stringify({}),
//           });
//           const data = await response.json();
//           // SetUserDetails(Array.isArray(data.data) ? data.data : []);
//           // data = { data : {}}
//           // object to json converstion of data
//           setComments(Array.isArray(data.data) ? data.data : []);
//         } catch (error) {
//           console.error('Failed to fetch posts:', error);
//         } finally {
//           setIsLoadingComments(false);
//         }
//       };
//       // write the function for get post
//       // get descriptions and comments
//       fetchAllComments();
//       fetchAllPosts();
//       fetchPosts();
//   }, []);

//     if (isLoading || isLoadingPosts || isLoadingComments) {
//     return (
//       <div className="min-h-screen bg-primary-background flex items-center justify-center">
//         <div className="text-lg">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-primary-background  p-4">
//       <div className="max-w-6xl mx-auto">
//         {UserDetails && <ProfileHeader user={UserDetails} />}
//         {UserDetails && <StatsGrid stats={UserDetails} />}
//         {posts && <ImageGallery posts={posts} />}
//         {Comments &&
//         <ContributionsList posts={Comments} />}
//       </div>
//     </div>
//   );
// };

export default Profile;