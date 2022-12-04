
import { Layout } from '../components'
import '../styles/globals.css'
import {Toaster} from "react-hot-toast"
import {StoreProvider} from "../context/Store"
import { SessionProvider, useSession } from 'next-auth/react';


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
        
  return(
                <StoreProvider>
                        <SessionProvider session={session}>     
                                <Layout>
                                        <Toaster/>
                                                <Component {...pageProps} />
                                </Layout>
                        </SessionProvider>
                </StoreProvider>
        )
}

export default MyApp
