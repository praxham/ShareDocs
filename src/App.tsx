import ActionSection from "./components/ActionSection"
import Heading from "./components/Heading"
import HomeGraphics from "./components/HomeGraphics"
import PDFCard from "./components/PDFCard";
function App() {
  const PDFLink = Object.keys(localStorage).filter(key => key.startsWith('PDF'))[0];
  const PDFLinkActual = localStorage.getItem(PDFLink);
  return (
    <>
    <div className="container">
      {PDFLink && <PDFCard />}
      {!PDFLink && <HomeGraphics/>}
      {!PDFLink && <Heading/>}
      <ActionSection/>
    </div>
    </>
  )
}

export default App