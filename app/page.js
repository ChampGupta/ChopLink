"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

export default function Home() {
  const [url, seturl] = useState("");
  const [shorturl, setshorturl] = useState("");
  const [generate, setgenerate] = useState("");
  const [copied, setCopied] = useState(false);

  const handleURL = async (e) => {
    seturl(e.target.value);
  };

  const handleShortURL = async (e) => {
    setshorturl(e.target.value);
  };

  const handleGenerate = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: url,
      shorturl: shorturl,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setgenerate(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`);
        seturl("");
        setshorturl(""); 
        toast.success(result.message)
      })
      .catch((error) => toast.error(error));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generate);
      toast.success("Copied to clipboard! ✅");
    } catch (err) {
      toast.error("Failed to copy!");
    }
  }

  return (
    <main className="bg-[#74B3CE] h-screen flex justify-center items-center">
      <div className="bg-[#0B181E] text-slate-100 md:h-[500px] md:w-[600px] h-[450px] w-[300px] flex flex-col justify-start items-start p-10 rounded-lg gap-5">
        <div className="flex flex-col gap-2">
          <span className="text-lg">Enter your URL: </span>
          <input
            type="text"
            value={url}
            placeholder="Type here..."
            className="rounded-xl p-2 h-8 md:w-96 w-50 outline-4 text-black text-lg"
            onChange={handleURL}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-lg">Enter your preferred short URL: </span>
          <input
            type="text"
            value={shorturl}
            placeholder="Type here..."
            className="rounded-xl p-2 h-8 md:w-96 w-50 outline-4 text-black text-lg"
            onChange={handleShortURL}
          />
        </div>
        <button
          onClick={handleGenerate}
          className="bg-slate-100 text-black px-3 py-1 rounded-xl font-bold text-lg"
        >
          Generate
        </button>
        <div>
          {generate && <>
          <div className="flex flex-col gap-1">
            <span className="font-bold text-lg">Your Generated short url link: </span>
            <div className="bg-white p-2 flex justify-between items-center">
              <Link target="_blank" href={generate} className="text-blue-800">{generate}</Link>
              <button onClick={handleCopy}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg></button>
            </div>
            <Toaster />
          </div>
          </>}
        </div>
      </div>
    </main>
  );
}
