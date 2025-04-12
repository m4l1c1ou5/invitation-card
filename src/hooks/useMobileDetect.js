import { useState, useEffect } from 'react';

const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
      const tabletRegex = /android|ipad|playbook|silk/i;
      
      const isMobileDevice = mobileRegex.test(userAgent) || 
                            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
                            
      const isTabletDevice = tabletRegex.test(userAgent) && !mobileRegex.test(userAgent);
      
      const isSmallScreen = window.innerWidth < 768;
      
      setIsMobile(isMobileDevice || isTabletDevice || isSmallScreen);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return isMobile;
};

export default useMobileDetect;
