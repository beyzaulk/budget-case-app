import { useContext } from "react";

import { ImStatsBars } from "react-icons/im";
import { FiSun, FiMoon } from "react-icons/fi";

function Nav() {
  return (
    <header className="header container max-w-2xl px-6 py-6 mx-auto rounded-md mt-2">
      {/* Main container for header */}
      <div className="flex items-center justify-between space-x-8 header-text ">
        {/* Left Side: User Information */}
        <div className="flex items-center space-x-4">
          {/* Profile Image */}
          <div className="h-12 w-12 rounded-full overflow-hidden profile-image-border">
            <img
              className="object-cover w-full h-full"
              src="https://media.istockphoto.com/id/1300845620/tr/vekt%C3%B6r/kullan%C4%B1c%C4%B1-simgesi-d%C3%BCz-beyaz-arka-plan-%C3%BCzerinde-izole-kullan%C4%B1c%C4%B1-sembol%C3%BC-vekt%C3%B6r-ill%C3%BCstrasyonu.jpg?s=612x612&w=0&k=20&c=BapxTLg8R3jjWnvaSXeHqgtou_-FcyBKmAkUsgwQzxU="
              alt="Profile Image"
            />
          </div>
          {/* User Name */}
          <span className="text-xl font-medium">Hi, Beyza Ülkümen!</span>
        </div>

        {/* Right Side: Stats Icon, Sign Out Button, and Light/Dark Mode Toggle */}
        <div className="flex items-center space-x-6">
          {/* Stats Icon */}
          <ImStatsBars className="stats-icon" />

          {/* Sign Out Button */}
          <button className="sign-out-btn">Sign Out</button>

          {/* Light/Dark Mode Toggle */}
          <button
            className="toggle-btn"
            onClick={() => document.body.classList.toggle("dark")}
            aria-label="Toggle Theme"
          >
            {/* Light Mode  */}
            <FiSun className="block dark:hidden w-6 h-6" />
            {/* Dark Mode  */}
            <FiMoon className="hidden dark:block w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Nav;
