
import { Layout } from '../components'
import '../styles/globals.css'
import {Toaster} from "react-hot-toast"
import {StoreProvider} from "../context/Store"
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
        
  return(
                <StoreProvider>
                        <SessionProvider session={session}>     
                                <Layout>
                                        <Toaster/>
                                                {
                                                        Component.auth? 
                                                                <Auth>
                                                                        <Component {...pageProps} />
                                                                </Auth>
                                                                :
                                                                <Component {...pageProps} />
                                                }
                                </Layout>
                        </SessionProvider>
                </StoreProvider>
        )
}

function Auth({ children, adminOnly }) {
        const router = useRouter();
        const { status, data: session } = useSession({
          required: true,
          onUnauthenticated() {
            router.push("/unauthorized?message=The page you're trying to access has restricted access.Please login first");
          },
        });
        if (status === 'loading') {
          return <div>Loading...</div>;
        }

        // if (adminOnly && !session.user.isAdmin) {
        //   router.push('/unauthorized?message=admin login required');
        // }

        return children;
      }

export default MyApp
