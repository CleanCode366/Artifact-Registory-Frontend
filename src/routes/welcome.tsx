import WellcomeLayout from "@layouts/WellcomeLayout/WellcomeLayout";
import Consent from "@views/Intro/Consent";
import Info from "@views/Intro/Info";
import Wellcome from "@views/Intro/Wellcome";

const WellcomeRoutes = {
  path: '/',
  element: <WellcomeLayout/>,
  children: [
    {
      path: 'consent',
      element: <Consent />
    },
    {
      path: 'info',
      element: <Info />
    },
    {
      path: 'welcome',
      element: <Wellcome />
    }
    
  ]
};

export default WellcomeRoutes;
