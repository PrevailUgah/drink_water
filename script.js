// 1. Grab our elements from the HTML blueprint
const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');

// Run this function once immediately to set up the starting empty layout
updateBigCup();

// 2. Loop through all 8 small cups and add a "Click Listener" to each
smallCups.forEach((cup, idx) => {
    cup.addEventListener('click', () => highlightCups(idx));
});

// 3. Logic to fill up the small cups
function highlightCups(idx) {
    // If you click a cup that's already full, and it's the last full one, unfill it
    if (smallCups[idx].classList.contains('full') && !smallCups[idx].nextElementSibling?.classList.contains('full')) {
        idx--;
    }

    // Fill all cups up to the one you clicked, and unfill any cups ahead of it
    smallCups.forEach((cup, idx2) => {
        if(idx2 <= idx) {
            cup.classList.add('full');
        } else {
            cup.classList.remove('full');
        }
    });

    // Every time a small cup changes, recalculate the big cup!
    updateBigCup();
}

// 4. Logic to calculate and animate the Big Cup
function updateBigCup() {
    // Count how many small cups have the class name "full"
    const fullCups = document.querySelectorAll('.cup-small.full').length;
    const totalCups = smallCups.length;

    // If no cups are full, hide the text percentage block completely
    if(fullCups === 0) {
        percentage.style.visibility = 'hidden';
        percentage.style.height = 0;
    } else {
        // Show it, calculate the percentage height, and update text
        percentage.style.visibility = 'visible';
        percentage.style.height = `${(fullCups / totalCups) * 330}px`; // 330 is the max height in CSS
        percentage.innerText = `${(fullCups / totalCups) * 100}%`;
    }

    // If the big cup is completely full, hide the top "Remained" text area
    if(fullCups === totalCups) {
        remained.style.visibility = 'hidden';
        remained.style.height = 0;
    } else {
        remained.style.visibility = 'visible';
        // 2 liters total minus (0.25 liters * number of full cups)
        liters.innerText = `${2 - (250 * fullCups / 1000)}L`;
    }
}
