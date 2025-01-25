import { useState, useEffect } from "react";
import ActionSection from "./components/ActionSection.jsx";
import HomeGraphics from "./components/HomeGraphics.jsx";
import PDFCard from "./components/PDFCard.jsx";

function App() {
  const PDFLink = localStorage.getItem("PDF") || [];
  const [pdfExists, setPdfExists] = useState(false);

  useEffect(() => {
    setPdfExists(PDFLink?.length > 0);
  }, [PDFLink]);

  return (
    <>
      {pdfExists ? <PDFCard /> : <HomeGraphics />}
      <ActionSection />
    </>
  );
}

export default App;
