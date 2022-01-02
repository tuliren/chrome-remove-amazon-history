const removeButton = document.getElementById("removeItemsFromView");

removeButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: removeItemsFromView,
  });
});

function removeItemsFromView() {
  if (!document.URL.match(/amazon.*\/history/)) {
    return;
  }

  const buttonText = "remove from view";
  const removeFromViewButtons = Array.prototype.slice
      .call(document.getElementsByTagName("span"))
      .filter(e => e.textContent.toLowerCase().trim() === buttonText.trim())
      .map(e => e.parentElement);
  console.log(`Removing ${removeFromViewButtons.length} item(s)...`);
  removeFromViewButtons.forEach(e => e.click());
}
