import React, { useEffect, useState } from "react";
import Delete from './../assets/Delete.svg'

const PDFCard = () => {
  const [PDFLink, setPDFLink] = useState(JSON.parse(localStorage.getItem("PDF") || "[]"));
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
    };

    fetchTitles();
  }, [PDFLink]);

  const handleDelete = (index) => {
    // Remove the item from the local storage
    const updatedPDFLink = PDFLink.filter((_, i) => i !== index);
    localStorage.setItem("PDF", JSON.stringify(updatedPDFLink));
    
    // Update the state
    setPDFLink(updatedPDFLink);
    setTitles(titles.filter((_, i) => i !== index));
  };

  return (
    <>
      <div>
        {PDFLink.map((item, index) => (
          <div
            key={index}
            className="rounded-[15px] mx-[30px] mt-[30px] bg-[#141414] p-2"
          >
            <div className="flex flex-row justify-between items-center pb-2">
              <div className="text-wrap line-clamp-1">{titles[index]}</div>
              <img
                onClick={() => handleDelete(index)}
                className="w-4 ml-4 mr-2 pointer-events-auto cursor-pointer"
                src={Delete}
                alt="Delete Icon"
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
    </>
  );
};

export default PDFCard;
