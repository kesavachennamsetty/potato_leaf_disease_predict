document.addEventListener('DOMContentLoaded', function () {
    const dropBox = document.getElementById('dropBox');
    const fileInput = document.getElementById('fileInput');
    const responseText = document.getElementById('response');

    if (!dropBox || !fileInput || !responseText) {
        console.error("Required elements are missing. Check your HTML structure.");
        return;
    }

    // Open file dialog when clicking the drop box
    dropBox.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle file drag and drop
    dropBox.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropBox.style.backgroundColor = 'rgba(0, 123, 255, 0.1)';
    });

    dropBox.addEventListener('dragleave', () => {
        dropBox.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    });

    dropBox.addEventListener('drop', (event) => {
        event.preventDefault();
        dropBox.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';

        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            fileInput.files = files; // Assign files to the hidden input
            alert(`File "${files[0].name}" added!`);
        }
    });

    // Form submission
    document.getElementById('uploadForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const file = fileInput.files[0];

        if (!file) {
            alert("Please select a file to upload!");
            return;
        }

        if (!file.type.startsWith('image/')) {
            alert("Please upload a valid image file!");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:8000/upload/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                responseText.textContent = `Error: ${errorData.message || 'Failed to upload image'}`;
                return;
            }

            const result = await response.json();
            responseText.textContent = `Uploaded successfully! Server response: ${result.label}`;
            responseText.style.color = 'green';
        } catch (error) {
            responseText.textContent = `Error: ${error.message}`;
        }
    });
});
