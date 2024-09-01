import ActionSection from "./components/ActionSection.jsx";
import HomeGraphics from "./components/HomeGraphics.jsx";
import PDFCard from "./components/PDFCard.jsx";

function App() {
  const PDFLink = localStorage.getItem("PDF");
  
  return (
    <>
      {PDFLink && <PDFCard />}
      {!PDFLink && <HomeGraphics />}
      <ActionSection />
    </>
  );
}

export default App;
