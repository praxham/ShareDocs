import React from "react";

const ShareToWAPopup = ({handlePopupVisibility, phoneNumber, handlePhoneNumber, waLink}) => {
  return (
    <>
      <div
        onClick={handlePopupVisibility}
        className="fixed z-40 translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] bg-black opacity-80 blur-md w-screen h-screen"
      ></div>
      <div
        className="fixed z-40 translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] max-w-[400px] flex flex-col gap-4 w-full 
          h-fit bg-[#141414] p-2 rounded-[10px]"
      >
        <div className="text-white text-center">
          PDF URLs Are Copied to Clipboard Paste it in the WhatsApp Chat of{" "}
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
          Share PDF URL to {phoneNumber || "..."}
        </a>
      </div>
    </>
  );
};

export default ShareToWAPopup;
