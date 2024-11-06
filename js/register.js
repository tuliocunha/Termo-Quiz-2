// Include this script in your HTML to use the xlsx library
// <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.2/xlsx.full.min.js"></script>

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    // Load existing users
    fetch('data/users.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const users = XLSX.utils.sheet_to_json(worksheet);

            // Check if user already exists
            let userExists = users.some(user => user.username === username);

            if (userExists) {
                alert('Username already exists');
            } else {
                // Add new user
                const newUser = { id: users.length + 1, username, email, password, avatar: '' };
                users.push(newUser);
                const newWorksheet = XLSX.utils.json_to_sheet(users);
                workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;

                // Write updated users to file
                XLSX.writeFile(workbook, 'data/users.xlsx');
                alert('Registration successful');
                window.location.href = 'login.html';
            }
        });
});
