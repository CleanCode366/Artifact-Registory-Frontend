import React, { useEffect, useState } from 'react';
import InscriptionDetailsPage from './InscriptionDetailPage';
import InscriptionDetailsPage1 from './InscriptionDetailPage1';

const InscriptionDetails: React.FC = () => {
  const [postId, setPostId] = useState<string>("");
  // parse from url
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('postId');
    setPostId(id || "");
  }, []);
  
  return (
    <>
    <InscriptionDetailsPage1 />
    {/* <InscriptionDetailsPage /> */}
    </>    
  );
};

export default InscriptionDetails;