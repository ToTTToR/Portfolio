import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeContext } from './contexts/theme'
import Header from './components/Header/Header'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import ProfilePic from './components/ProfilePic/ProfilePic'
import BingusOrFloppa from './components/BingusOrFloppa/BingusOrFloppa'
import './App.css'

const MainPage = () => {
  const a = 1;
  return (
    <div>
      <ProfilePic />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  )
};

const App = () => {
  const [{ themeName }] = useContext(ThemeContext)

  return (
    <div id='top' className={`${themeName} app`}>
      <Header />

      <main>
        <ProfilePic />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Routes>
        <Route path='/bingus-or-floppa' element={<BingusOrFloppa />} />
      </Routes>

      <ScrollToTop />
      <Footer />
    </div>
  )
}

export default App
