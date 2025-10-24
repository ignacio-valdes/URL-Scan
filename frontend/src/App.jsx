import { useEffect, useState } from "react";

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  try {
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  } catch (error) {
    console.error("Error al obtener la url:", error);
    return null;
  }
}

function App() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchData() {
      const tab = await getCurrentTab();
      setUrl(tab.url);
      fetch("http://127.0.0.1:8000/analizar-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: tab.url }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "encontrado") {
            console.log("URL encontrada en la base de datos.");
            if (data.stats.malicioso > 0) {
              setStatus("Malicioso");
            } else {
              setStatus("Seguro");
            }
          } else {
            console.log("URL no encontrada.");
          }
        })
        .catch((error) => {
          console.error("Error al enviar la URL:", error);
        });
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="bg-white w-40 rounded-lg flex flex-col">
        <nav className="h-10 py-2 px-4">
          <img src="icons/logo.png" alt="logo" className="size-10" />
        </nav>
        <div className="flex flex-col">
          <h1 className="text-center mt-4 font-bold">URL:</h1>
          <div className="rounded-lg h-10 flex bg-white opacity-65 border-2 border-gray-400 m-4 p-2 place-content-center">
            <p>{status}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
