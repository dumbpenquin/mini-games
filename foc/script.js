async function getSuggestions() {
    const budget = document.getElementById('budget').value;
    const interest = document.getElementById('interest').value;
    const duration = parseInt(document.getElementById('duration').value);
  
    // Fetch data from trips.json
    const response = await fetch('trips.json');
    const trips = await response.json();
  
    // Filter trips based on user input
    const suggestions = trips.filter(trip => 
      trip.budget === budget &&
      trip.type.includes(interest) &&
      trip.duration <= duration
    );
  
    // Display trips
    displayTrips(suggestions);
  }
  
  function displayTrips(trips) {
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = "";
  
    if (trips.length === 0) {
      suggestionsDiv.innerHTML = "<p>No trips found. Try different options!</p>";
      return;
    }
  
    trips.forEach(trip => {
      const tripBox = document.createElement('div');
      tripBox.className = 'trip-box';
  
      tripBox.innerHTML = `
        <h3>${trip.destination}</h3>
        <p><strong>Type:</strong> ${trip.type.join(", ")}</p>
        <p><strong>Budget:</strong> ${trip.budget}</p>
        <p><strong>Duration:</strong> ${trip.duration} Days</p>
        <p><strong>Highlights:</strong> ${trip.highlights.join(", ")}</p>
      `;
  
      suggestionsDiv.appendChild(tripBox);
    });
  }
  