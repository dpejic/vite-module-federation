import { tw } from "./utils/tw";
import { Header } from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Layout } from "./components/Layout/Layout";

function App() {
  const [failedLoadingCatalog, setFailedLoadingCatalog] = useState(false);

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        await import("@catalog/catalog");
      } catch (err) {
        console.error("Failed to load catalog module:", err);
        setFailedLoadingCatalog(true);
      }
    };

    loadCatalog();
  }, []);

  return (
    <div>
      <Header />
      <Layout>
        <div className={tw("mt-5")}>
          <catalog-element></catalog-element>
          {failedLoadingCatalog && <p>Some troubles loading catalog !!</p>}
        </div>
      </Layout>
      <ToastContainer />
    </div>
  );
}

// if (import.meta.hot) {
//   import.meta.hot.on("vite:beforeUpdate", () => {
//     import.meta.hot?.invalidate();
//   });
// }

export default App;
