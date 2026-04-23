const selections = {
    beach: null,
    food: null,
    activity: null,
    mood: null
};

const groups = document.querySelectorAll('.options');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const messageBox = document.getElementById('messageBox');

function updateSummary() {
    document.getElementById('summary-beach').textContent = selections.beach || 'Not selected';
    document.getElementById('summary-food').textContent = selections.food || 'Not selected';
    document.getElementById('summary-activity').textContent = selections.activity || 'Not selected';
    document.getElementById('summary-mood').textContent = selections.mood || 'Not selected';
}

function activateButton(groupName, value) {
    const group = document.querySelector(`.options[data-group="${groupName}"]`);
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
    }, 2200);
}

groups.forEach((group) => {
    const groupName = group.dataset.group;
    const buttons = group.querySelectorAll('.option-btn');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            selections[groupName] = button.dataset.value;
            activateButton(groupName, button.dataset.value);
            updateSummary();
        });
    });
});

saveBtn.addEventListener('click', () => {
    localStorage.setItem('grenadaSelections', JSON.stringify(selections));
    updateSummary();
    showMessage('Your choices were saved.');
});

resetBtn.addEventListener('click', () => {
    Object.keys(selections).forEach((key) => {
        selections[key] = null;
    });

    localStorage.removeItem('grenadaSelections');

    document.querySelectorAll('.option-btn').forEach((btn) => {
        btn.classList.remove('active');
    });

    updateSummary();
    showMessage('Selections reset.');
});

function loadSavedSelections() {
    const saved = localStorage.getItem('grenadaSelections');
    if (!saved) {
        updateSummary();
        return;
    }

    const parsed = JSON.parse(saved);

    Object.keys(selections).forEach((key) => {
        selections[key] = parsed[key] || null;
        if (selections[key]) {
            activateButton(key, selections[key]);
        }
    });

    updateSummary();
}

loadSavedSelections();
