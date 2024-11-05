// settings.js
document.getElementById('settingsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    fetch('/api/user/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Settings updated');
        } else {
            alert('Update failed');
        }
    });
});
