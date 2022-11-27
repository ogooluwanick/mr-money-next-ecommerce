
import { Layout } from '../components'
import { StateContext } from '../context/StateContext'
import '../styles/globals.css'
import {Toaster} from "react-hot-toast"
import {StoreProvider} from "../context/Store"

function MyApp({ Component, pageProps }) {
  return(
                <StoreProvider>
                        <Layout>
                                <Toaster/>
                                        <Component {...pageProps} />
                        </Layout>
                </StoreProvider>
        )
}

export default MyApp
