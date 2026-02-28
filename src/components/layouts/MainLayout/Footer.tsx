import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sectionKeys = {
    aboutUs: "aboutUs",
    customerServices: "customerServices",
    contactUs: "contactUs",
    followUs: "followUs",
  };

  const toggleSection = (sectionKey: string | null) => {
    setActiveSection(activeSection === sectionKey ? null : sectionKey);
  };

  return (
    <div className="bg-primary py-6 text-center text-white">
      <p>Copyright &copy; {year} JB Blanket</p>
    </div>
  );
  // return (
  //   // <div className="bg-primary py-8 text-white">
  //   //   <div className="container mx-auto">
  //   //     <div>
  //   //       {/* Wrapper: stack on mobile, row on md+ */}
  //   //       <div className="flex flex-col gap-y-10 md:flex-row md:gap-x-10">
  //   //         <Link to="/">
  //   //           <img
  //   //             className="mx-auto w-[200px] md:mx-0"
  //   //             src="/logo2.svg"
  //   //             alt="JB Blanket"
  //   //           />
  //   //         </Link>

  //   //         <div className="flex flex-1 flex-col gap-y-6">
  //   //           {/* Top section: stack on mobile */}
  //   //           <div className="flex flex-col gap-y-8 md:flex-row md:justify-between">
  //   //             {/* Links: Collapsible on mobile, always visible on desktop */}
  //   //             <div className="flex flex-col gap-y-8 px-4 text-white md:flex-row md:gap-x-14">
  //   //               {/* About Us Section */}
  //   //               <div className="space-y-6">
  //   //                 <p
  //   //                   className="flex cursor-pointer items-center justify-between md:cursor-default"
  //   //                   onClick={() => toggleSection(sectionKeys.aboutUs)}
  //   //                 >
  //   //                   About Us
  //   //                   <span className="md:hidden">
  //   //                     {activeSection === sectionKeys.aboutUs ? "−" : "+"}
  //   //                   </span>
  //   //                 </p>
  //   //                 <div
  //   //                   className={`${
  //   //                     activeSection === sectionKeys.aboutUs
  //   //                       ? "max-h-[200px] opacity-100"
  //   //                       : "max-h-0 opacity-0"
  //   //                   } overflow-hidden transition-all duration-300 md:max-h-[200px] md:opacity-100`}
  //   //                 >
  //   //                   <div className="space-y-2">
  //   //                     <p className="text-xs">Our Story</p>
  //   //                     <p className="text-xs">Careers</p>
  //   //                     <p className="text-xs">Events</p>
  //   //                   </div>
  //   //                 </div>
  //   //               </div>

  //   //               {/* Customer Services Section */}
  //   //               <div className="space-y-6">
  //   //                 <p
  //   //                   className="flex cursor-pointer items-center justify-between md:cursor-default"
  //   //                   onClick={() =>
  //   //                     toggleSection(sectionKeys.customerServices)
  //   //                   }
  //   //                 >
  //   //                   Customer Services
  //   //                   <span className="md:hidden">
  //   //                     {activeSection === sectionKeys.customerServices
  //   //                       ? "−"
  //   //                       : "+"}
  //   //                   </span>
  //   //                 </p>
  //   //                 <div
  //   //                   className={`${
  //   //                     activeSection === sectionKeys.customerServices
  //   //                       ? "max-h-[200px] opacity-100"
  //   //                       : "max-h-0 opacity-0"
  //   //                   } overflow-hidden transition-all duration-300 md:max-h-[200px] md:opacity-100`}
  //   //                 >
  //   //                   <div className="space-y-2">
  //   //                     <p className="text-xs">FAQ</p>
  //   //                     <p className="text-xs">Shipping & Return</p>
  //   //                     <p className="text-xs">Privacy Policy</p>
  //   //                   </div>
  //   //                 </div>
  //   //               </div>

  //   //               {/* Contact Us Section */}
  //   //               <div className="space-y-6">
  //   //                 <p
  //   //                   className="flex cursor-pointer items-center justify-between md:cursor-default"
  //   //                   onClick={() => toggleSection(sectionKeys.contactUs)}
  //   //                 >
  //   //                   Contact Us
  //   //                   <span className="md:hidden">
  //   //                     {activeSection === sectionKeys.contactUs ? "−" : "+"}
  //   //                   </span>
  //   //                 </p>
  //   //                 <div
  //   //                   className={`${
  //   //                     activeSection === sectionKeys.contactUs
  //   //                       ? "max-h-[200px] opacity-100"
  //   //                       : "max-h-0 opacity-0"
  //   //                   } overflow-hidden transition-all duration-300 md:max-h-[200px] md:opacity-100`}
  //   //                 >
  //   //                   <div className="space-y-2">
  //   //                     <p className="text-xs">123 Blanket Lane</p>
  //   //                     <p className="text-xs">
  //   //                       <span>Phone:</span>{" "}
  //   //                       <a href="tel:1234567890">(123) 456-7890</a>
  //   //                     </p>
  //   //                     <p className="text-xs">
  //   //                       <span>Email:</span>{" "}
  //   //                       <a href="mailto:info@jerseyblanket.com">
  //   //                         info@jerseyblanket.com
  //   //                       </a>
  //   //                     </p>
  //   //                   </div>
  //   //                 </div>
  //   //               </div>
  //   //             </div>

  //   //             {/* Slogan + Button: Always visible */}
  //   //             <div className="flex flex-col items-center gap-y-6 text-center md:text-left">
  //   //               <p className="text-2xl leading-snug text-white md:text-4xl">
  //   //                 Save Your Memories <br /> With Jersey
  //   //               </p>
  //   //               <button className="animate text-primary rounded-md bg-white px-16 py-2 text-lg font-medium hover:scale-105 md:px-24 md:text-xl">
  //   //                 Order Now !
  //   //               </button>
  //   //             </div>
  //   //           </div>

  //   //           {/* Socials: Collapsible on mobile */}
  //   //           <div className="flex flex-col gap-y-4 border-b border-b-white px-4 pb-4">
  //   //             <p className="flex cursor-pointer items-center justify-between text-xl md:cursor-default">
  //   //               Follow Us
  //   //             </p>
  //   //             <div
  //   //               className={`max-h-[200px] overflow-hidden transition-all duration-300 md:opacity-100`}
  //   //             >
  //   //               <div className="space-x-4 text-sm hover:text-gray-300">
  //   //                 <a href="#">Facebook</a>
  //   //                 <a href="#">Instagram</a>
  //   //                 <a href="#">TikTok</a>
  //   //               </div>
  //   //             </div>
  //   //           </div>
  //   //         </div>
  //   //       </div>

  //   //       {/* Bottom text: Always visible */}
  //   //       <p className="pt-7 text-center text-sm">
  //   //         © {year} Jersey Blanket. All rights reserved.
  //   //       </p>
  //   //     </div>
  //   //   </div>
  //   // </div>
  // );
};

export default Footer;
