import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import Navbar from "./components/Navbar"
import { ErrorBoundary } from "./components/ErrorBoundary"

const Home = lazy(() => import("./pages/Home"))
const Explore = lazy(() => import("./pages/Explore"))
const PostSkill = lazy(() => import("./pages/PostSkill"))

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Navbar />

        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/post" element={<PostSkill />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App