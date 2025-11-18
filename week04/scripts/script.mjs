const displayDetails = (data) => {
  const results = document.querySelector("#results");
  results.innerHTML = `
    <p>Appointment for ${data.get('first')} ${data.get('last')}</p>
    <p>Proxy ${data.get('ordinance')} on ${data.get('date')} in the ${data.get('location')}</p>
    <p>Your Phone: ${data.get('phone')}</p>
    <p>Your email is ${data.get('email')}</p>
  `;
};

const getDate = () => {
  const myInfo = new URLSearchParams(window.location.search);
  return myInfo;
}

const displayAppointment = () => {
  const data = getDate();
  displayDetails(data);
}

displayAppointment();
