import React from "react";

const ShareToWAPopup = ({handlePopupVisibility, phoneNumber, handlePhoneNumber, waLink, message}) => {
console.log(message);
  const handleShare = async () => {
    const shareData = {
      title: "Shared File URLs",
      text: message, 
    };
  
    if (navigator.share) {
      // Use the Web Share API if available
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback for devices/browsers that don't support Web Share API
      navigator.clipboard.writeText(message).then(() => {
        alert("File URLs copied to clipboard! You can share it manually.");
      });
    }
  };
  return (
    <>
      <div
        onClick={handlePopupVisibility}
        className="fixed z-40 translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] bg-black opacity-80 blur-md w-screen h-screen"
      ></div>
      <div
        className="fixed z-40 translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] flex flex-col gap-4 w-full 
          h-fit bg-[#141414] p-2 rounded-[10px]"
      >
        <div className="text-white text-center">
          All PDFs will be sent to this number {" "}
          {phoneNumber || "..."}
        </div>
        <div className="relative flex flex-col">
          <input
            className="bg-transparent border p-4 pl-[69px] rounded-[10px]"
            type="number"
            maxLength={10}
            value={phoneNumber}
            onChange={handlePhoneNumber}
            required
          />
          <span className="absolute top-4 left-4">wa.me/</span>
        </div>
        <a
          href={waLink}
          className="text-black bg-white p-4 rounded-[10px] text-center"
        >
          Send PDFs to {phoneNumber || "..."} on WA
        </a>
        <button
        onClick={()=>handleShare()}
          className="text-white bg-black p-4 -mt-2 rounded-[10px] text-center"
        >
          Share
        </button>
      </div>
    </>
  );
};

export default ShareToWAPopup;
