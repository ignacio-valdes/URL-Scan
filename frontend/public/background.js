// Store URL analysis results per tab
const tabAnalysis = {};

// API Backend URL (configurable for different environments)
const API_URL = "http://127.0.0.1:8000";

// Analyze URL when page finishes loading
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Only analyze when page load is complete and URL is HTTP/HTTPS
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
    analyzeUrl(tabId, tab.url);
  }
});

// Clean up cached data when tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabAnalysis[tabId];
});

async function analyzeUrl(tabId, url) {
  // Loading indicator
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

    // Determine security status based on VirusTotal analysis
    if (data.status === "found") {
      if (data.stats.malicious > 0) {
        badgeText = "MAL";
        badgeColor = "#FF0000";
        statusText = "Malicious ⚠️";
      } else {
        badgeText = "OK";
        badgeColor = "#00FF00";
        statusText = "Safe ✅";
      }
    } else {
      badgeText = "?";
      badgeColor = "#FFA500";
      statusText = "Unclassified";
    }

    chrome.action.setBadgeText({ text: badgeText, tabId: tabId });
    chrome.action.setBadgeBackgroundColor({ color: badgeColor, tabId: tabId });
    
    // Cache the analysis result
    tabAnalysis[tabId] = {
      url: url,
      status: statusText,
      data: data,
      timestamp: Date.now()
    };
    
    // Remember last analyzed tab
    lastAnalyzedTabId = tabId;
    
    console.log(`[URL-Scan] Analysis of ${url}: ${statusText}`);
  } catch (error) {
    console.error("Error in background service worker:", error);
    chrome.action.setBadgeText({ text: "ERR", tabId: tabId });
    chrome.action.setBadgeBackgroundColor({ color: "#000000", tabId: tabId });
    
    tabAnalysis[tabId] = {
      url: url,
      status: "Connection error",
      data: null,
      timestamp: Date.now()
    };
    
    lastAnalyzedTabId = tabId;
  }
}

// Reference to the last analyzed tab
let lastAnalyzedTabId = null;

// Message listener: Handle popup requests for analysis data
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