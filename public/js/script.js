const bars = document.getElementById('bars');
const menu = document.getElementById('Menu');

bars.addEventListener('click', () => {
    menu.classList.toggle('show')

    // window.addEventListener('click', () => {
    //     menu.classList.remove('show')
    // })
})

function openModal() {
    document.getElementById('improvementsModal').style.display = 'flex';
}

// Function to close the modal
function closeModal() {
    document.getElementById('improvementsModal').style.display = 'none';
}

// Check if the modal has been shown before using local storage
if (!localStorage.getItem('modalShown')) {
    openModal();
    localStorage.setItem('modalShown', 'true');
}