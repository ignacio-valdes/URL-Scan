import { useEffect, useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("Cargando...");

  useEffect(() => {
    async function initPopup() {
      try {
        // Request analysis data from background service worker
        // Timeout: 1 second to avoid hanging
        const response = await Promise.race([
          new Promise((resolve) => {
            chrome.runtime.sendMessage({ action: "getAnalysis" }, (res) => {
              resolve(res);
            });
          }),
          new Promise((resolve) => setTimeout(() => resolve(null), 1000)),
        ]);

        if (response?.url && response?.status) {
          setUrl(response.url);
          setStatus(response.status);
        } else {
          setStatus("Error: No data available");
        }
      } catch (error) {
        console.error("Error:", error);
        setStatus("Connection error");
      }
    }

    initPopup();
  }, []);

  return (
    <>
      <div className="bg-white w-40 rounded-lg flex flex-col">
        <nav className="h-10 py-2 px-4">
          <img src="icons/logo.png" alt="logo" className="size-10" />
        </nav>
        <div className="flex flex-col">
          <h1 className="text-center mt-4 font-bold text-sm">URL:</h1>
          <div className="rounded-lg flex bg-gray-100 border-2 border-gray-300 m-4 p-2 place-content-center">
            <p className="text-xs text-gray-700 truncate">{url || "Fetching URL..."}</p>
          </div>
          
          <h1 className="text-center mt-4 font-bold text-sm">Status:</h1>
          <div className="rounded-lg flex bg-white border-2 border-gray-400 m-4 p-2 place-content-center min-h-10">
            <p className="text-sm font-semibold">{status}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
