// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// const Account = () => {
//   const [account, setAccount] = useState(false);
//   const [user, setUser] = useState<any>(null);
//   const router = useRouter();

//   const isLoggedIn = !!user;

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");

// <<<<<<< HEAD
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
// =======
//         const handleClick = () => setAccount(false);

//         document.addEventListener("click", handleClick);

//         return () => {
//             document.removeEventListener("click", handleClick);
//         };
//     }, []);

//     const handleLogout = async () => {
//         try {
//             await fetch("/api/logout", {
//                 method: "POST",
//                 credentials: "include",
//             });

//             localStorage.removeItem("user");

//             setUser(null);
//             setAccount(false);

//             router.push("/");
//         } catch (error) {
//             console.error("Logout failed", error);
//         }
//     };

//   const goToDashboard = () => {
//     if (session?.user?.role === "seller") {
//       router.push("/seller/dashboard");
//     } else {
//       router.push("/user/dashboard");
// >>>>>>> 3bccf5ff1376a305bd16e21ecc4adb2385a04c22
//     }
//   };

//     const handleClick = () => setAccount(false);

// <<<<<<< HEAD
//     document.addEventListener("click", handleClick);

//     return () => {
//       document.removeEventListener("click", handleClick);
//     };
//   }, []);
// =======
//   return (
//     <div className="relative">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth="1.5"
//         stroke="currentColor"
//         aria-hidden="true"
//         data-slot="icon"
//         className="h-6 w-6 cursor-pointer text-text sm:hidden"
//         onClick={(e) => {
//           e.stopPropagation();
//           setAccount((a) => !a);
//         }}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
//         />
//       </svg>

//       <div
//         className={`flex items-center gap-5 justify-end max-sm:bg-white max-sm:flex-col max-sm:fixed right-0 top-12 
//         max-sm:rounded max-sm:gap-0 max-sm:p-1 ${
//           account ? "opacity-100 scale-100" : "max-sm:opacity-0 max-sm:scale-95"
//         } transition-all duration-300`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/*Use Ternary to toggle auth buttons*/}
//             {user ? (
//             <>
//                 <button className='text-white text-sm hover:underline max-sm:text-black max-sm:p-2 cursor-pointer
//                 max-sm:active:bg-gray-300 max-sm:rounded-sm max-sm:w-full max-sm:px-6' onClick={() => {
//                     goToDashboard()
//                     setAccount(false);
//                 }}>Dashboard</button>
// >>>>>>> 3bccf5ff1376a305bd16e21ecc4adb2385a04c22

//   const handleLogout = async () => {
//     try {
//       await fetch("/api/logout", {
//         method: "POST",
//         credentials: "include",
//       });

//       localStorage.removeItem("user");

//       setUser(null);
//       setAccount(false);

//       router.push("/");
//     } catch (error) {
//       console.error("Logout failed", error);
//     }
//   };

//   const goToDashboard = () => {
//     if (user?.role === "seller") {
//       router.push("/seller/dashboard");
//     } else {
//       router.push("/user/dashboard");
//     }
//   };

//   return (
//     <div className="relative">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth="1.5"
//         stroke="currentColor"
//         className="h-6 w-6 cursor-pointer text-white sm:hidden"
//         onClick={(e) => {
//           e.stopPropagation();
//           setAccount((a) => !a);
//         }}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
//         />
//       </svg>

//       <div
//         className={`flex items-center gap-5 justify-end max-sm:bg-white max-sm:flex-col max-sm:fixed right-0 top-12 
//         max-sm:rounded max-sm:gap-0 max-sm:p-1 ${
//           account ? "opacity-100 scale-100" : "max-sm:opacity-0 max-sm:scale-95"
//         } transition-all duration-300`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {isLoggedIn ? (
//           <>
//             <button
//               className="text-white text-sm hover:underline max-sm:text-black max-sm:p-2 cursor-pointer
//               max-sm:active:bg-gray-300 max-sm:rounded-sm max-sm:w-full max-sm:px-6"
//               onClick={() => {
//                 goToDashboard();
//                 setAccount(false);
//               }}
//             >
//               Dashboard
//             </button>

//             <button
//               className="text-white text-sm hover:underline max-sm:text-black max-sm:p-2 cursor-pointer
//               max-sm:active:bg-gray-300 max-sm:rounded-sm max-sm:w-full max-sm:px-6"
//               onClick={async () => {
//                 await handleLogout();
//               }}
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               className="text-white text-sm hover:underline max-sm:text-black max-sm:p-2 cursor-pointer
//               max-sm:active:bg-gray-300 max-sm:rounded-sm max-sm:w-full max-sm:px-6"
//               onClick={() => {
//                 router.push("/sign-up");
//                 setAccount(false);
//               }}
//             >
//               Sign up
//             </button>

//             <button
//               className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold cursor-pointer
//               max-sm:active:bg-gray-300 transition max-sm:p-2 max-sm:rounded-sm max-sm:w-full max-sm:px-6"
//               onClick={() => {
//                 router.push("/login");
//                 setAccount(false);
//               }}
//             >
//               Login
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Account;









"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Account = () => {
  const [account, setAccount] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const isLoggedIn = !!user;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleClick = () => setAccount(false);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("user");
      setUser(null);
      setAccount(false);

      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const goToDashboard = () => {
    if (user?.role === "seller") {
      router.push("/seller/dashboard");
    } else {
      router.push("/user/dashboard");
    }
  };

  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6 cursor-pointer text-white sm:hidden"
        onClick={(e) => {
          e.stopPropagation();
          setAccount((a) => !a);
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>

      <div
        className={`flex items-center gap-5 justify-end max-sm:bg-white max-sm:flex-col max-sm:fixed right-0 top-12 
        max-sm:rounded max-sm:gap-0 max-sm:p-1 ${
          account ? "opacity-100 scale-100" : "max-sm:opacity-0 max-sm:scale-95"
        } transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {isLoggedIn ? (
          <>
            <button
              className="text-white text-sm hover:underline max-sm:text-black max-sm:p-2 cursor-pointer
              max-sm:active:bg-gray-300 max-sm:rounded-sm max-sm:w-full max-sm:px-6"
              onClick={() => {
                goToDashboard();
                setAccount(false);
              }}
            >
              Dashboard
            </button>

            <button
              className="text-white text-sm hover:underline max-sm:text-black max-sm:p-2 cursor-pointer
              max-sm:active:bg-gray-300 max-sm:rounded-sm max-sm:w-full max-sm:px-6"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="text-white text-sm hover:underline max-sm:text-black max-sm:p-2 cursor-pointer
              max-sm:active:bg-gray-300 max-sm:rounded-sm max-sm:w-full max-sm:px-6"
              onClick={() => {
                router.push("/sign-up");
                setAccount(false);
              }}
            >
              Sign up
            </button>

            <button
              className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold cursor-pointer
              max-sm:active:bg-gray-300 transition max-sm:p-2 max-sm:rounded-sm max-sm:w-full max-sm:px-6"
              onClick={() => {
                router.push("/login");
                setAccount(false);
              }}
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Account;