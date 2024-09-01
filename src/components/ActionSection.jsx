import { useState, useEffect } from "react";
import ShareToWAPopup from "./ShareToWAPopup";

const ActionSection = () => {
  const PDFs = JSON.parse(localStorage.getItem("PDF") || "[]");
  const [inputValue, setInputValue] = useState("");
  const [Array, UpdatedArray] = useState([]);
  const [titles, setTitles] = useState([]);
  const [gDrivePopup, setgDrivePopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [waLink, setWALink] = useState("");
  const [popupVisibility, setPopupVisibility] = useState(false);

  const handlegDrivePopup = () => {
    setgDrivePopup(!gDrivePopup);
  };

  const handlePopupVisibility = () => {
    setPopupVisibility(!popupVisibility);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    if (titles.length === PDFs.length) { // Ensure all titles are loaded
      const message = PDFs.map((link, index) => `${titles[index] || "Untitled"}: ${link.PDFLink}`).join('\n');
      setWALink("https://wa.me/" + e.target.value + "?text=" + encodeURIComponent(message));
    }
  };

  useEffect(() => {
    const ExistingArray = JSON.parse(localStorage.getItem("PDF")) || [];
    UpdatedArray(ExistingArray);
  }, []);

  useEffect(() => {
    const convertToEmbedLink = (inputValue) => {
      const fileId = inputValue.match(/[-\w]{25,}/);
      return fileId
        ? `https://drive.google.com/file/d/${fileId}/preview`
        : inputValue;
    };

    const linkObject = {
      Title: "",
      PDFLink: inputValue,
      embedLink: convertToEmbedLink(inputValue),
    };

    if (inputValue) {
      const updatedArray = [...Array, linkObject];
      UpdatedArray(updatedArray);
      localStorage.setItem("PDF", JSON.stringify(updatedArray));
      setInputValue("");
    }
  }, [inputValue]);

  useEffect(() => {
    const fetchTitles = async () => {
      const newTitles = [...titles];
      for (let index = 0; index < Array.length; index++) {
        const item = Array[index];
        if (item.PDFLink) {
          try {
            const response = await fetch(
              `https://api.allorigins.win/get?url=${encodeURIComponent(item.PDFLink)}`
            );
            if (!response.ok) {
              throw new Error("Network response was not ok.");
            }
            const data = await response.json();
            const title = data.contents.match(/<title>(.*?)<\/title>/)[1]
              .replace("- Google Drive", "")
              .trim();
            newTitles[index] = title;
          } catch (error) {
            console.error("Error fetching title:", error);
          }
        }
      }
      setTitles(newTitles);
    };

    fetchTitles();
  }, [Array]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    window.location.reload();
  };

  const PDFLink = localStorage.getItem("PDF");

  return (
    <>
      {gDrivePopup && (
        <>
          <div
            onClick={handlegDrivePopup}
            className="fixed z-40 translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] bg-black opacity-5 blur-sm w-screen h-screen"
          />
          <embed
            className="fixed z-50 translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] bg-black p-2 rounded-[10px] max-w-[400px] max-h-[800px]"
            src="https://drive.google.com/drive/home?igu=1"
            frameBorder="0"
          />
        </>
      )}

      <div className="w-full px-[30px] pb-[30px] pt-[16px] bg-black h-fit font-medium flex flex-col gap-4 fixed bottom-0">
        {PDFLink && (
          <div className="text-center text-[12px] text-[#808080]">
            Double Tap to Delete Document Link
          </div>
        )}
        {!PDFLink && (
          <div className="text-[36px]">
            Store & Share PDF Documents With Ease
          </div>
        )}
        <div className="flex flex-row gap-[10px]">
          {!PDFLink && (
            <div className="w-full relative">
              <input
                className="w-full p-4 rounded-[10px] border-2 border-white placeholder-white bg-black"
                type="text"
                placeholder="Paste G-Drive Link of Doc"
                value={inputValue}
                onChange={handleInputChange}
              />
              <a href="https://drive.google.com/drive/home">
                <img
                  className="px-4 py-[19px] rounded-[10px] bg-black absolute top-[2px] right-[2px] pb-[1px]"
                  src="src\assets\driveicon.svg"
                  alt=""
                />
              </a>
            </div>
          )}
          {PDFLink && (
            <div className="w-full relative">
              <input
                className="w-full p-4 rounded-[10px] border-2 border-white placeholder-white bg-black"
                type="text"
                placeholder="Paste Link"
                value={inputValue}
                onChange={handleInputChange}
              />
              <a href="https://drive.google.com/drive/home">
                <img
                  className="px-4 py-[19px] rounded-[10px] bg-black absolute top-[2px] right-[2px] pb-[1px]"
                  src="src\assets\driveicon.svg"
                  alt=""
                />
              </a>
            </div>
          )}
          {PDFLink && (
            <button onClick={handlePopupVisibility} className="w-full flex flex-row justify-between items-center text-nowrap p-4 bg-white text-black rounded-[10px]">
              Share All to{" "}
              <img className="h-[21px]" src="src\assets\WABlack.svg" alt="" />
            </button>
          )}
          {popupVisibility && (
            <ShareToWAPopup
              handlePopupVisibility={handlePopupVisibility}
              handlePhoneNumber={handlePhoneNumber}
              phoneNumber={phoneNumber}
              waLink={waLink}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ActionSection;
