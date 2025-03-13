import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './ui_components/Layout'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import ProfilePage from './pages/ProfilePage'
import { useQuery  } from '@tanstack/react-query'
import SignUpPage from './pages/SignUpPage'
import CreatePostPage from './pages/CreatePostPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './ui_components/ProtectedRoute'
import { getUsername } from './services/apiBlog'


function App() {
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data } = useQuery({
    queryKey: ["username"],
    queryFn: getUsername,
  });

  useEffect(
    function () {
      if (data) {
        setUsername(data.username);
        setIsAuthenticated(true);
      }
    },
    [data]
  );

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout isAuthenticated={isAuthenticated} username={username} setIsAuthenticated={setIsAuthenticated} setUsername={setUsername}  />} >
              <Route index element={<HomePage/>} />
              <Route path='blogs/:slug' element={<DetailPage username={username} isAuthenticated={isAuthenticated} />} />
              <Route path='create' element={ <ProtectedRoute> <CreatePostPage isAuthenticated={isAuthenticated} /> </ProtectedRoute> } />
              <Route path='signin' element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} />
              <Route path='profile/:username' element={<ProfilePage authUsername={username} />} />
              <Route path='signup' element={<SignUpPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
