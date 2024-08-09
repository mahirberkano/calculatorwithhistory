document.addEventListener('DOMContentLoaded', async () => {
    const historyBody = document.getElementById('historyBody');
    const clearHistoryButton = document.getElementById('clearHistoryButton');

    // Function to load history data
    async function loadHistory() {
        try {
            const response = await fetch('/api/history');
            if (!response.ok) throw new Error('Network response was not ok.');
            const history = await response.json();
            
            // Clear existing table rows
            historyBody.innerHTML = '';
            
            history.forEach(item => {
                const tr = document.createElement('tr');
                
                const expressionTd = document.createElement('td');
                expressionTd.textContent = item.expression;
                tr.appendChild(expressionTd);
                
                const resultTd = document.createElement('td');
                resultTd.textContent = item.result;
                tr.appendChild(resultTd);
                
                historyBody.appendChild(tr);
            });
        } catch (error) {
            console.error('Error loading history:', error);
        }
    }

    // Load history on page load
    await loadHistory();

    // Add event listener for the clear history button
    clearHistoryButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/history', {
                method: 'DELETE'  // Assuming your API supports DELETE for clearing history
            });
            if (!response.ok) throw new Error('Network response was not ok.');
            
            // Clear the table body
            historyBody.innerHTML = '';

            // Optional: Provide user feedback
            alert('History cleared successfully.');
        } catch (error) {
            console.error('Error clearing history:', error);
        }
    });
});
