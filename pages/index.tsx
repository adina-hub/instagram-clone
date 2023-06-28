import Head from 'next/head'
import { Header } from '../components/Header.js'
import Feed from '../components/Feed.js'

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Feed />
      {/* Modal */}
    </div>
  )
}
