const luxurySelections = {
    beach: null,
    food: null,
    experience: null,
    mood: null
};

const optionGroups = document.querySelectorAll('.option-group');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const messageBox = document.getElementById('messageBox');

function updateLuxurySummary() {
    document.getElementById('summary-beach').textContent = luxurySelections.beach || 'Not selected';
    document.getElementById('summary-food').textContent = luxurySelections.food || 'Not selected';
    document.getElementById('summary-experience').textContent = luxurySelections.experience || 'Not selected';
    document.getElementById('summary-mood').textContent = luxurySelections.mood || 'Not selected';
}

function setActiveButton(groupName, value) {
    const group = document.querySelector(`.option-group[data-group="${groupName}"]`);
    if (!group) return;

    group.querySelectorAll('.option-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.value === value);
    });
}

function showMessage(text) {
    messageBox.textContent = text;
    messageBox.classList.remove('hidden');

    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 2500);
}

optionGroups.forEach((group) => {
    const groupName = group.dataset.group;
    const buttons = group.querySelectorAll('.option-btn');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            luxurySelections[groupName] = button.dataset.value;
            setActiveButton(groupName, button.dataset.value);
            updateLuxurySummary();
        });
    });
});

saveBtn.addEventListener('click', () => {
    localStorage.setItem('grenadaLuxurySelections', JSON.stringify(luxurySelections));
    updateLuxurySummary();
    showMessage('Your luxury Grenada escape has been saved.');
});

resetBtn.addEventListener('click', () => {
    Object.keys(luxurySelections).forEach((key) => {
        luxurySelections[key] = null;
    });

    localStorage.removeItem('grenadaLuxurySelections');

    document.querySelectorAll('.option-btn').forEach((btn) => {
        btn.classList.remove('active');
    });

    updateLuxurySummary();
    showMessage('Your selections were reset.');
});

function loadSavedLuxurySelections() {
    const saved = localStorage.getItem('grenadaLuxurySelections');

    if (!saved) {
        updateLuxurySummary();
        return;
    }

    const parsed = JSON.parse(saved);

    Object.keys(luxurySelections).forEach((key) => {
        luxurySelections[key] = parsed[key] || null;
        if (luxurySelections[key]) {
            setActiveButton(key, luxurySelections[key]);
        }
    });

    updateLuxurySummary();
}

loadSavedLuxurySelections();