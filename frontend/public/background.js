// Almacenar estado de análisis por pestaña
const tabAnalysis = {};

// API Backend URL (configurable)
const API_URL = "http://127.0.0.1:8000";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Solo analizamos cuando la carga está completa y la URL es http/https
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
    analyzeUrl(tabId, tab.url);
  }
});

// Limpiar datos cuando se cierra la pestaña
chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabAnalysis[tabId];
});

async function analyzeUrl(tabId, url) {
  // Indicador de carga (...)
  chrome.action.setBadgeText({ text: "...", tabId: tabId });
  chrome.action.setBadgeBackgroundColor({ color: "#888888", tabId: tabId });

  try {
    const response = await fetch(`${API_URL}/analizar-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
    });
    
    const data = await response.json();

    let statusText = "";
    let badgeText = "?";
    let badgeColor = "#FFA500";

    if (data.status === "encontrado") {
      if (data.stats.malicioso > 0) {
        badgeText = "MAL";
        badgeColor = "#FF0000";
        statusText = "Malicioso ⚠️";
      } else {
        badgeText = "OK";
        badgeColor = "#00FF00";
        statusText = "Seguro ✅";
      }
    } else {
      badgeText = "?";
      badgeColor = "#FFA500";
      statusText = "No clasificada";
    }

    chrome.action.setBadgeText({ text: badgeText, tabId: tabId });
    chrome.action.setBadgeBackgroundColor({ color: badgeColor, tabId: tabId });
    
    // Guardar el análisis
    tabAnalysis[tabId] = {
      url: url,
      status: statusText,
      data: data,
      timestamp: Date.now()
    };
    
    // Recordar la última pestaña analizada
    lastAnalyzedTabId = tabId;
    
    console.log(`[URL-Scan] Análisis de ${url}: ${statusText}`);
  } catch (error) {
    console.error("Error en background:", error);
    chrome.action.setBadgeText({ text: "ERR", tabId: tabId });
    chrome.action.setBadgeBackgroundColor({ color: "#000000", tabId: tabId });
    
    tabAnalysis[tabId] = {
      url: url,
      status: "Error de conexión",
      data: null,
      timestamp: Date.now()
    };
    
    lastAnalyzedTabId = tabId;
  }
}

// Guardar referencia a la última pestaña analizada
let lastAnalyzedTabId = null;

// Permitir que el popup acceda a los datos
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getAnalysis") {
    const tabId = request.tabId || sender.tab?.id || lastAnalyzedTabId;
    
    if (tabId && tabAnalysis[tabId]) {
      sendResponse(tabAnalysis[tabId]);
    } else {
      sendResponse(null);
    }
  }
  return true;
});