"use strict";
/**
 * Generate sidebar with the news titles. Required because blank HTML is used.
 */

const doFillSidebar = () => {
  const sidebarList = document.querySelector("#sidebar ul");
  if(!sidebarList) {
    console.warn("Sidebar missing for news.")
    return;
  }
  
  document.querySelectorAll("article section").forEach(section => {
    const id = section.id;
    if(!id) {
      console.warn("ID missing for news.")
      return;
    }
    
    const titleText = section.querySelector(".title")?.textContent.trim() ?? "";
    sidebarList.insertAdjacentHTML("beforeend", `<li><a href="#${id}">${titleText}</a></li>`);
  });
};

// Failsafe loading pattern.
if(document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", doFillSidebar);
} else {
  doFillSidebar();
}
