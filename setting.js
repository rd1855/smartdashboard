document.addEventListener("DOMContentLoaded", () => {
    const settingsForm = document.getElementById("settings-form")
    const userNameInput = document.getElementById("user-name")
    const themeSelect = document.getElementById("theme")
    const notificationsCheckbox = document.getElementById("notifications")
    const dataRefreshRateInput = document.getElementById("data-refresh-rate")
    const defaultViewSelect = document.getElementById("default-view")
  
    // Load saved settings
    userNameInput.value = localStorage.getItem("userName") || ""
    themeSelect.value = localStorage.getItem("theme") || "light"
    notificationsCheckbox.checked = localStorage.getItem("notifications") === "true"
    dataRefreshRateInput.value = localStorage.getItem("dataRefreshRate") || "5"
    defaultViewSelect.value = localStorage.getItem("defaultView") || "overview"
  
    settingsForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Save settings
      localStorage.setItem("userName", userNameInput.value)
      localStorage.setItem("theme", themeSelect.value)
      localStorage.setItem("notifications", notificationsCheckbox.checked)
      localStorage.setItem("dataRefreshRate", dataRefreshRateInput.value)
      localStorage.setItem("defaultView", defaultViewSelect.value)
  
      alert("Settings saved successfully!")
    })
  
    // Apply theme immediately when changed
    themeSelect.addEventListener("change", (e) => {
      document.body.classList.remove("theme-light", "theme-dark")
      document.body.classList.add(`theme-${e.target.value}`)
    })
  })
  
  