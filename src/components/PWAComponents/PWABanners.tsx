import React from 'react';
import { useInstallationBanner } from '@/hooks/usePWA';
import { Download, X } from 'lucide-react';
import styled from 'styled-components';

/**
 * PWA Install Banner Component
 * Shows a banner prompting users to install the app
 * 
 * Usage:
 * <PWAInstallBanner />
 */
export function PWAInstallBanner() {
  const { showBanner, dismiss, install } = useInstallationBanner();

  if (!showBanner) return null;

  return (
    <BannerContainer>
      <BannerContent>
        <IconWrapper>
          <Download size={24} />
        </IconWrapper>
        <TextContent>
          <BannerTitle>Install App</BannerTitle>
          <BannerDescription>
            Install our app for a better experience with offline support
          </BannerDescription>
        </TextContent>
        <ButtonGroup>
          <InstallButton onClick={install}>Install</InstallButton>
          <DismissButton onClick={dismiss}>
            <X size={20} />
          </DismissButton>
        </ButtonGroup>
      </BannerContent>
    </BannerContainer>
  );
}

const BannerContainer = styled.div`
  width: 100%;
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const BannerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  max-width: 100%;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 12px;
    padding: 12px 16px;
  }
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const TextContent = styled.div`
  flex: 1;
  min-width: 200px;
`;

const BannerTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const BannerDescription = styled.p`
  margin: 4px 0 0 0;
  font-size: 14px;
  opacity: 0.95;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 12px;
    margin: 2px 0 0 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    gap: 8px;
  }
`;

const InstallButton = styled.button`
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.35);
    border-color: rgba(255, 255, 255, 0.6);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    flex: 1;
    padding: 8px 12px;
    font-size: 13px;
  }
`;

const DismissButton = styled.button`
  padding: 8px 12px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 6px;
  }
`;

/**
 * Offline Status Indicator Component
 * Shows when the app is offline
 */
export function OfflineIndicator() {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <OfflineContainer>
      <OfflineContent>
        <OfflineIcon>📡</OfflineIcon>
        <OfflineText>You are currently offline. Some features may be limited.</OfflineText>
      </OfflineContent>
    </OfflineContainer>
  );
}

const OfflineContainer = styled.div`
  width: 100%;
  background: #ff9800;
  color: white;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px 16px;
    gap: 10px;
  }
`;

const OfflineContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const OfflineIcon = styled.span`
  font-size: 20px;
`;

const OfflineText = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
