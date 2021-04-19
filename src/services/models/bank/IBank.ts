interface IBank {
  id: number;
  name: string;

  bic?: string;

  blz: string;

  location?: string;
  city?: string;
  isTestBank: boolean;

  popularity: number;
  interfaces: Array<'WEB_SCRAPER' | 'FINTS_SERVER' | 'XS2A'>;

  tppAuthenticationGroup?: {
    id: number;
    name?: string;
  };

  loginCredentials: Array<{
    label: string;
    isSecret: boolean;
    isVolatile: boolean;
  }>;
  properties: 'REDIRECT_APPROACH' | 'DECOUPLED_APPROACH' | 'DETAILED_CONSENT';
  loginHint?: string;
  health: number;
  lastCommunicationAttempt?: string;
  lastSuccessfulCommunication?: string;
  isMoneyTransferSupported?: boolean;
  isAisSupported?: boolean;
  bankGroup?: {
    id: number;
    name: string;
  };
}

export default IBank;
