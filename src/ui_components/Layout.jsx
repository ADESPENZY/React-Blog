import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({isAuthenticated, username, setIsAuthenticated, setUsername}) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {  
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <main className="w-full bg-background text-foreground min-h-screen dark:bg-[#141624]">
      <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} isAuthenticated={isAuthenticated} username={username} setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />
      <ToastContainer />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
