import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// Removed CircularProgess import per UI requirement

const WellcomeLayout: React.FC = () => {

  return (
    <div className="w-screen h-screen flex flex-col">

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-primary-background scrollbar-hide">
          <div className="text-text-secondary">
            <Suspense fallback={''}>
              <Outlet />
            </Suspense>
          </div>
        </div>
    </div>
  );
};

export default WellcomeLayout;
