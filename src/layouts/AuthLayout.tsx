import React, { useState } from "react";
import { Link } from "react-router-dom";

import video from "src/assets/JB-VIDEO.mp4";
import logo from "src/assets/logo.svg";
interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex size-full items-center gap-x-4 rounded-3xl text-white shadow-2xl lg:p-8">
        <div className="relative hidden h-full w-[55%] items-center justify-center lg:flex">
          <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-700">
            <video
              src={video}
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setLoaded(true)}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/80 to-transparent transition-opacity duration-700 ${
                loaded ? "opacity-40" : "opacity-100"
              }`}
            ></div>

            {/* Top Bar */}
            <div className="absolute top-2 right-0 left-0 flex items-center justify-between px-4 text-white">
              <img src={logo} alt="Jb Blanket" className="h-10" />
            </div>
          </div>
        </div>

        <div
          className={`bg-stroke flex h-full w-full flex-col items-center justify-center space-y-3 rounded-xl px-5 py-3 transition-opacity duration-700 lg:w-[50%] lg:px-8 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex w-full flex-col items-start justify-between border-b border-b-gray-300 pb-2">
            <Link to="/">
              <img src={logo} alt="jb Blanket" />
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
