document.addEventListener('DOMContentLoaded', function() {
    const checklistForm = document.getElementById('checklist-form');
    const checklistItemsContainer = document.getElementById('checklist-items');
    const downloadPdfBtn = document.getElementById('download-pdf');

    let checklistItems = [];

    checklistForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const itemInput = document.getElementById('item');
        const photoInput = document.getElementById('photo');

        const newItem = {
            item: itemInput.value,
            photo: photoInput.files[0]
        };

        checklistItems.push(newItem);

        renderChecklistItems();

        itemInput.value = '';
        photoInput.value = '';
    });

    downloadPdfBtn.addEventListener('click', function() {
        const element = document.getElementById('checklist-items');

        html2pdf(element, {
            margin:       10,
            filename:     'checklist.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { dpi: 192, letterRendering: true },
            jsPDF:        { unit: 'pt', format: 'letter', orientation: 'portrait' }
        });
    });

    function renderChecklistItems() {
        checklistItemsContainer.innerHTML = '';

        checklistItems.forEach(function(item, index) {
            const div = document.createElement('div');
            div.classList.add('checklist-item');

            const textNode = document.createTextNode(item.item);
            div.appendChild(textNode);

            if (item.photo) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(item.photo);
                img.alt = `Foto do item ${index + 1}`;
                img.classList.add('checklist-photo');
                div.appendChild(img);
            }

            checklistItemsContainer.appendChild(div);
        });
    }
});

  