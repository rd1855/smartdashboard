// Initialize the map
const map = L.map("map").setView([40.7128, -74.006], 13)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map)

// Simulated real-time data updates
function updateData() {
  // Update key metrics
  document.getElementById("population").textContent = Math.floor(Math.random() * 1000000) + 500000
  document.getElementById("air-quality").textContent = Math.floor(Math.random() * 100) + 1
  document.getElementById("traffic-flow").textContent = Math.floor(Math.random() * 100) + "%"

  // Update service statuses
  document.getElementById("transport-status").textContent = Math.random() > 0.5 ? "Normal" : "Delayed"
  document.getElementById("waste-status").textContent = Math.random() > 0.7 ? "On Schedule" : "Behind Schedule"
  document.getElementById("emergency-status").textContent = Math.random() > 0.9 ? "All Clear" : "Active Incidents"

  // Simulate changing map data
  L.circle([40.7128, -74.006], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: Math.random() * 1000 + 500,
  }).addTo(map)
}

// Update data every 5 seconds
setInterval(updateData, 5000)

// Create charts
const energyChart = new Chart(document.getElementById("energy-chart"), {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Energy Consumption (MWh)",
        data: [12000, 19000, 3000, 5000, 2000, 3000],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  },
})

const waterChart = new Chart(document.getElementById("water-chart"), {
  type: "bar",
  data: {
    labels: ["Residential", "Commercial", "Industrial", "Public"],
    datasets: [
      {
        label: "Water Usage (Gallons)",
        data: [300000, 450000, 600000, 200000],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  },
})

const budgetChart = new Chart(document.getElementById("budget-chart"), {
  type: "pie",
  data: {
    labels: ["Infrastructure", "Education", "Healthcare", "Public Safety", "Others"],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
      },
    ],
  },
  options: {
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index
        const label = budgetChart.data.labels[index]
        const value = budgetChart.data.datasets[0].data[index]
        alert(`${label}: ${value}%`)
      }
    },
  },
})

const satisfactionChart = new Chart(document.getElementById("satisfaction-chart"), {
  type: "radar",
  data: {
    labels: ["Transportation", "Safety", "Education", "Healthcare", "Environment"],
    datasets: [
      {
        label: "Citizen Satisfaction",
        data: [4, 3.5, 4.2, 3.8, 3.9],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  },
  options: {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 5,
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index
        const label = satisfactionChart.data.labels[index]
        const value = satisfactionChart.data.datasets[0].data[index]
        alert(`${label} Satisfaction: ${value}/5`)
      }
    },
  },
})

// User personalization (simple example)
const userProfile = document.getElementById("user-profile")
userProfile.addEventListener("click", () => {
  const newName = prompt("Enter your name:")
  if (newName) {
    userProfile.querySelector("span").textContent = newName
    localStorage.setItem("userName", newName)
  }
})

// Load user name from local storage
window.addEventListener("load", () => {
  const savedName = localStorage.getItem("userName")
  if (savedName) {
    userProfile.querySelector("span").textContent = savedName
  }
})

// Add interactivity to navigation
const navLinks = document.querySelectorAll("nav a")
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href").substring(1)
    const targetSection = document.getElementById(targetId)
    targetSection.scrollIntoView({ behavior: "smooth" })
  })
})

// Notifications
const notifToggle = document.getElementById("notif-toggle")
const notifPanel = document.getElementById("notif-panel")
const notifList = document.getElementById("notif-list")

notifToggle.addEventListener("click", () => {
  notifPanel.classList.toggle("hidden")
})

function addNotification(message) {
  const li = document.createElement("li")
  li.textContent = message
  notifList.prepend(li)
  if (notifList.children.length > 5) {
    notifList.removeChild(notifList.lastChild)
  }
}

// Simulated real-time notifications
setInterval(() => {
  const events = [
    "Traffic congestion reported on Main St.",
    "Air quality alert: Moderate",
    "Public transport delays on Line 2",
    "Emergency vehicle dispatched to Downtown",
    "Smart parking spaces available: 50",
  ]
  addNotification(events[Math.floor(Math.random() * events.length)])
}, 10000)

// Weather Widget
function updateWeather() {
  const weatherInfo = document.getElementById("weather-info")
  const temperature = Math.floor(Math.random() * 30) + 10 // 10°C to 40°C
  const conditions = ["Sunny", "Cloudy", "Rainy", "Windy"][Math.floor(Math.random() * 4)]
  weatherInfo.innerHTML = `
        <div>🌡️ ${temperature}°C</div>
        <div>${conditions}</div>
    `
}

// Public Transport Tracker
function updateTransport() {
  const transportInfo = document.getElementById("transport-info")
  const busDelay = Math.floor(Math.random() * 10)
  const trainStatus = Math.random() > 0.8 ? "Delayed" : "On Time"
  transportInfo.innerHTML = `
        <div>🚌 Bus: ${busDelay} min delay</div>
        <div>🚆 Train: ${trainStatus}</div>
    `
}

// Energy Consumption Heatmap
function updateHeatmap() {
  const heatmapContainer = document.getElementById("heatmap")
  const heatmapData = []
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      heatmapData.push([i, j, Math.random()])
    }
  }
  if (!window.heatmapInstance) {
    window.heatmapInstance = h337.create({
      container: heatmapContainer,
      radius: 20,
      maxOpacity: 0.8,
      minOpacity: 0,
      blur: 0.75,
    })
  }
  window.heatmapInstance.setData({
    max: 1,
    data: heatmapData,
  })
}

// Pollution Monitoring System
function updatePollution() {
  const pollutionInfo = document.getElementById("pollution-info")
  const pm25 = Math.floor(Math.random() * 150)
  const no2 = Math.floor(Math.random() * 100)
  pollutionInfo.innerHTML = `
        <div>PM2.5: ${pm25} µg/m³</div>
        <div>NO₂: ${no2} ppb</div>
    `

  // Update map with pollution data
  const pollutionLayer = L.circle([40.7128, -74.006], {
    color: pm25 > 100 ? "red" : pm25 > 50 ? "yellow" : "green",
    fillColor: pm25 > 100 ? "#f03" : pm25 > 50 ? "#ff0" : "#0f0",
    fillOpacity: 0.5,
    radius: 1000,
  }).addTo(map)

  // Remove the layer after 5 seconds to prevent cluttering
  setTimeout(() => map.removeLayer(pollutionLayer), 5000)
}

// Smart Parking System
function updateParking() {
  const parkingInfo = document.getElementById("parking-info")
  const availableSpots = Math.floor(Math.random() * 100)
  const totalSpots = 100
  parkingInfo.innerHTML = `
        <div>Available: ${availableSpots}</div>
        <div>Total: ${totalSpots}</div>
    `

  // Update map with parking data
  const parkingMarker = L.marker([40.7128, -74.006]).addTo(map)
  parkingMarker.bindPopup(`Parking Available: ${availableSpots}/${totalSpots}`).openPopup()

  // Remove the marker after 5 seconds to prevent cluttering
  setTimeout(() => map.removeLayer(parkingMarker), 5000)
}

// Citizen Feedback System
const feedbackForm = document.getElementById("feedback-form")
const feedbackList = document.getElementById("feedback-list")

feedbackForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const feedbackText = document.getElementById("feedback-text").value
  if (feedbackText.trim() !== "") {
    addFeedback(feedbackText)
    document.getElementById("feedback-text").value = ""
  }
})

function addFeedback(text) {
  const feedbackItem = document.createElement("div")
  feedbackItem.classList.add("feedback-item")
  feedbackItem.textContent = text
  feedbackList.prepend(feedbackItem)

  // Limit to 5 most recent feedback items
  if (feedbackList.children.length > 5) {
    feedbackList.removeChild(feedbackList.lastChild)
  }
}

// City Events Calendar
document.addEventListener("DOMContentLoaded", () => {
  const calendarEl = document.getElementById("calendar")
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    events: [
      { title: "City Council Meeting", date: "2025-01-15" },
      { title: "Community Clean-up Day", date: "2025-01-22" },
      { title: "Smart City Expo", start: "2025-02-01", end: "2025-02-03" },
    ],
  })
  calendar.render()
})

// Update all real-time data
function updateAllData() {
  updateData()
  updateWeather()
  updateTransport()
  updateHeatmap()
  updatePollution()
  updateParking()
}

// Initial update and set interval
updateAllData()
setInterval(updateAllData, 5000)

// Enhanced map interactivity
map.on("click", (e) => {
  const popup = L.popup()
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map)
})

// Add legend to the map
const legend = L.control({ position: "bottomright" })
legend.onAdd = (map) => {
  const div = L.DomUtil.create("div", "info legend")
  div.innerHTML += "<h4>Map Legend</h4>"
  div.innerHTML += '<div><span style="background-color: red"></span> High Pollution</div>'
  div.innerHTML += '<div><span style="background-color: yellow"></span> Moderate Pollution</div>'
  div.innerHTML += '<div><span style="background-color: green"></span> Low Pollution</div>'
  div.innerHTML += '<div><span style="background-color: blue"></span> Parking</div>'
  return div
}
legend.addTo(map)

// Add search functionality to the map
const searchControl = L.Control.geocoder().addTo(map)

