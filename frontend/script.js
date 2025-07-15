document.addEventListener('DOMContentLoaded', function () {
    const dropBox = document.getElementById('dropBox');
    const fileInput = document.getElementById('fileInput');
    const responseText = document.getElementById('response');
    const loader = document.getElementById('loader');
    const dotsSpan = document.getElementById('dots');

    let dotInterval;

    if (!dropBox || !fileInput || !responseText || !loader || !dotsSpan) {
        console.error("Required elements are missing. Check your HTML structure.");
        return;
    }

    function startLoadingDots() {
        let count = 0;
        dotInterval = setInterval(() => {
            count = (count + 1) % 4;
            dotsSpan.textContent = '.'.repeat(count);
        }, 500);
    }

    function stopLoadingDots() {
        clearInterval(dotInterval);
        dotsSpan.textContent = '';
    }

    dropBox.addEventListener('click', () => {
        fileInput.click();
    });

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
            fileInput.files = files;
            alert(`File "${files[0].name}" added!`);
        }
    });

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

        // Show loader
        loader.style.display = 'block';
        responseText.textContent = '';
        startLoadingDots();

        try {
            const response = await fetch('/upload/', {
                method: 'POST',
                body: formData,
            });

            stopLoadingDots();
            loader.style.display = 'none';

            if (!response.ok) {
                const errorData = await response.json();
                responseText.textContent = `Error: ${errorData.message || 'Failed to upload image'}`;
                responseText.style.color = 'red';
                return;
            }

            const result = await response.json();
            responseText.textContent = `Uploaded successfully! Server response: ${result.label}`;
            responseText.style.color = 'green';
        } catch (error) {
            stopLoadingDots();
            loader.style.display = 'none';
            responseText.textContent = `Error: ${error.message}`;
            responseText.style.color = 'red';
        }
    });
});
