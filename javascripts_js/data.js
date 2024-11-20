let globalData = null;

async function getData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/SmallCakekoo/ParcialFinalFDP/refs/heads/main/javascripts_js/data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        globalData = await response.json();
        console.log('Data loaded:', globalData); // Verifica que los datos se han cargado correctamente
        document.dispatchEvent(new Event('dataLoaded'));
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

// Llamar a getData y almacenar los datos en globalData
getData();
