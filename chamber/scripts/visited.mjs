const storeVisit = (date) => {
  const result = localStorage.setItem("last_visit", date);
  return result;
};

const diffInDays = (endDate, startDate) => {
  const dayInMilliseconds = 1000 * 60 * 60 * 24;
  const diffInMilliseconds = Math.abs(endDate - startDate);
  const diffInDays = Math.round(diffInMilliseconds / dayInMilliseconds);
  return diffInDays;
};

const storeVisitedDate = (now, store = true) => {
  const messageResponse = document.querySelector("#messageResponse");
  const storeVisited = localStorage.getItem("last_visit");
  let visitedDate = null;

  // Verify if last visite is stored
  if (storeVisited) {
    // Convert visit to integer
    visitedDate = parseInt(storeVisited);
  }

  // Get the differenc between the dates
  const daysDiff = visitedDate ? diffInDays(now.getTime(), visitedDate) : null;

  // Define responses
  const responses = [
    {
      condition: (days) => days === null,
      message: (days) => "Welcome! Let us know if you have any questions.",
      style: "display-welcome"
    },
    {
      condition: (days) => days < 1,
      message: (days) => "Back so soon! Awesome!",
      style: "display-day"
    },
    {
      condition: (days) => days >= 1,
      message: (days) => `You last visited ${days} day${days === 1 ? '' : 's'} ago.`,
      style: "display-days"
    }
  ];

  const response = responses.find(message => message.condition(daysDiff));

  // Display message
  if (response) {
    const displayMessage = response.message(daysDiff);
    messageResponse.className = "";
    messageResponse.classList.add("message-response");
    messageResponse.classList.add(response.style);
    messageResponse.innerHTML = displayMessage;
  }

  // Update last visit store
  if (store) {
    storeVisit(now.getTime());
  }
};

export { storeVisitedDate };
