// Get and display current location
navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.getElementById("location").innerText = `Latitude: ${lat}, Longitude: ${lon}`;
});

// Save diary entry
function saveDiary() {
    const diaryText = document.getElementById('diary-text').value;
    if (diaryText) {
        fetch('http://localhost:5000/diary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: diaryText }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.status);
            loadDiaryEntries();
        });
    }
}

// Load diary entries
function loadDiaryEntries() {
    fetch('http://localhost:5000/diary')
        .then(response => response.json())
        .then(entries => {
            const entriesContainer = document.getElementById('diary-entries');
            entriesContainer.innerHTML = entries.map(entry => `<p>${entry}</p>`).join('');
        });
}

// Upload photo
function uploadPhoto() {
    const fileInput = document.getElementById('photo-upload');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    fetch('http://localhost:5000/upload-photo', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        const photoGallery = document.getElementById('photo-gallery');
        const imageUrl = `http://localhost:5000/${data.url}`;
        photoGallery.innerHTML += `<img src="${imageUrl}" alt="Uploaded photo" style="width: 100px;">`;
    });
}
