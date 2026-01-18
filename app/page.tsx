"use client";
//imports required
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import spidy from "../public/spidy.png";
import spidy_pet from "../public/spidy_pet.png";
import image from "../public/image.png";
import image1 from "../public/image1.png";

export default function LoginForm() {
  const [quote, setQuote] = useState("");
  const [typedText, setTypedText] = useState("");
  const [showQuote, setShowQuote] = useState(false);
  const [isError, setIsError] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pulse, setPulse] = useState(0);

  const spidyEmojis = ["🕷️", "🕸️"];
  //Password logic
  const maskPassword = (length: number) =>
    Array.from(
      { length },
      () => spidyEmojis[Math.floor(Math.random() * spidyEmojis.length)],
    ).join("");
  const getStrength = (pwd: string) => {
    if (pwd.length < 4) return "weak";
    if (pwd.length < 8) return "medium";
    return "strong";
  };
  const strength = getStrength(password);
  const spidyReaction = {
    weak: "😬 Too weak!",
    medium: "🕸️ Getting better…",
    strong: "🕶️ Web-level secure!",
  };
  //Quotes
  const successQuotes = [
    " Welcome back, hero 🕷️",
    " Your friendly neighborhood login!",
    " With great power comes great UI",
    " Access granted. Suit up!",
  ];

  const errorQuotes = [
    " Oops! Even heroes mistype 😅",
    " Wrong credentials, Spidey senses tingling!",
    " that didn’t work… try again hero",
    " Villains detected. Check your login!",
  ];
  useEffect(() => {
    if (!quote) return;

    const letters = Array.from(quote); // ✅ Unicode-safe
    setTypedText("");
    let i = 0;

    const interval = setInterval(() => {
      setTypedText((prev) => prev + letters[i]);
      i++;

      if (i >= letters.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [quote]);
  //Eventhandling for form submission
  const handleLogin = () => {
    const isLoginSuccess = Math.random() > 0.5; // demo logic

    const list = isLoginSuccess ? successQuotes : errorQuotes;
    const randomQuote = list[Math.floor(Math.random() * list.length)];

    setIsError(!isLoginSuccess);
    setQuote(randomQuote);
    setShowQuote(true);
  };

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center ">
        <div className="absolute top-16 right-32">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeIn", delay: 0.6 }}
          >
            <Image
              src={spidy}
              alt="spidy"
              className="h-[400] mt-[-60] w-[600]"
            />
          </motion.div>
        </div>
        {/* Glass card wrapper */}
        <div className="p-[1px] rounded-3xl bg-gradient-to-br from-pink-400/60 via-purple-400/40 to-white/10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-[320px] rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl"
          >
            <h1 className="text-2xl font-semibold text-white text-center">
              Welcome Back
            </h1>

            <p className="text-sm text-white/70 text-center mt-1 p-3">
              Login to your account
            </p>

            <form className="space-y-5">
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full rounded-xl bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 text-sm text-pink-700 placeholder-white/50 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30"
              />

              <div className="relative w-full">
                {/* REAL INPUT */}
                <input
                  type={showPassword ? "text" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className={`w-full rounded-xl bg-white/5 backdrop-blur-md
      border border-white/10 px-4 py-2 text-sm
      outline-none focus:border-cyan-400
      focus:ring-2 focus:ring-cyan-400/40
      caret-cyan-400 transition-all
      ${showPassword ? "text-[#42dad9] " : "text-transparent"}`}
                />

                {/* 🕸️ SPIDY MASK (ONLY WHEN HIDDEN) */}
                {!showPassword && (
                  <div className="pointer-events-none absolute inset-0 flex items-center px-4 gap-1">
                    {password.split("").map((_, i) => (
                      <motion.div
                        key={`${i}-${pulse}`}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Image
                          src={image}
                          alt="spidy"
                          width={16}
                          height={16}
                          className="drop-shadow-[0_0_6px_rgba(56,189,248,0.9)]"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* 👀 TOGGLE */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
                >
                  {showPassword ? "👀" : "🕷️"}
                </button>
              </div>

              <motion.div
                key={strength}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-2 text-xs text-center font-semibold
    ${
      strength === "weak"
        ? "text-pink-900"
        : strength === "medium"
          ? "text-white-300"
          : "text-[#42dad9]"
    }`}
              >
                {spidyReaction[strength]}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={handleLogin}
                className="w-full rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 py-2 text-sm font-medium text-white shadow-lg cursor-pointer"
              >
                Login
              </motion.button>
            </form>
            {showQuote && (
              <div
                className={`mt-4 relative rounded-2xl px-4 py-3 shadow-xl transition-all
    ${isError ? "bg-red-100 text-red-800" : "bg-white text-gray-800"}`}
              >
                {/* speech tail */}
                <div
                  className={`absolute -top-2 left-6 w-4 h-4 rotate-45
      ${isError ? "bg-red-100" : "bg-white"}`}
                />

                <p className="text-sm font-semibold text-center">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
            )}

            <p className="text-xs text-white/60 text-center mt-4">
              Don’t have an account?{" "}
              <span className="text-[#42dad9] cursor-pointer hover:underline">
                Sign up
              </span>
            </p>
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10">
        <Image
          src={image1}
          alt="background"
          fill
          className="object-cover opacity-9"
          priority
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeIn", delay: 0.6 }}
      >
        <h1 className=" gwen text-3xl mt-[-300px] p-3 text-pink-500 ">
          SPIDY <span className="text-8xl text-[#42dad9]">GWEN</span>
          <Image
            className="w-[200] mt-[-169] ml-[390]"
            src={spidy_pet}
            alt="Spider"
          />
        </h1>
      </motion.div>
    </>
  );
}
