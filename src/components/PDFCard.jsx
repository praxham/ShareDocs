import React, { useEffect, useState } from "react";

const PDFCard = () => {
  const PDFLink = JSON.parse(localStorage.getItem("PDF") || "[]");
  
  const [titles, setTitles] = useState(Array(PDFLink.length).fill("...Loading"));

  

  useEffect(() => {
    const fetchTitles = async () => {
      const newTitles = [...titles];
      for (let index = 0; index < PDFLink.length; index++) {
        const item = PDFLink[index];
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
      // console.log(titles);
    };

    fetchTitles();
  }, [PDFLink]);

  return (
    <>
      <div>
        {PDFLink.map((item, index) => (
          <div
            key={index}
            className="rounded-[15px] mx-[30px] mt-[30px] bg-[#141414] p-2"
          >
            <div className="flex flex-row justify-between items-center pb-2">
              <div className="text-wrap truncate">{titles[index]}</div>
              <img
                // onClick={handlePopupVisibility}
                className="w-6 ml-2 pointer-events-auto cursor-pointer"
                src="src/assets/WAWhite.svg"
                alt="Whatsapp Icon"
              />
            </div>
            <embed
              className="w-full aspect-video"
              src={item.embedLink}
              type=""
            />
          </div>
        ))}
      </div>
      {/* {popupVisibility && (
        <ShareToWAPopup
          handlePopupVisibility={handlePopupVisibility}
          handlePhoneNumber={handlePhoneNumber}
          phoneNumber={phoneNumber}
          waLink={waLink}
        />
      )} */}
    </>
  );
};

export default PDFCard;
