import Navbar from '../components/layout/Navbar/index'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import PageWrapper from '@components/layout/PageWrapper';
import '../theme/global.scss';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';

const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    
    <UserContext.Provider value={userData}>
      <ThirdwebProvider desiredChainId={activeChainId}>
        <Navbar />
        <PageWrapper>
          <Component {...pageProps} />
        </PageWrapper>
        <Toaster />
      </ThirdwebProvider >
    </UserContext.Provider>
  );
}

export default MyApp