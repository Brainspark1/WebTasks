const startTodayButton = document.getElementById('startTodayButton')
const contactButton = document.getElementById('contactButton')

startTodayButton.addEventListener('mouseover', () => {
    startTodayButton.style.backgroundColor = 'black';
    startTodayButton.style.color = 'white';
});

startTodayButton.addEventListener('mouseout', () => {
    startTodayButton.style.backgroundColor = 'white';
    startTodayButton.style.color = 'black';
});

contactButton.addEventListener('mouseover', () => {
    contactButton.style.backgroundColor = '#333333';
    contactButton.style.color = 'white';
});

contactButton.addEventListener('mouseout', () => {
    contactButton.style.backgroundColor = 'black';
    contactButton.style.color = 'white';
});
