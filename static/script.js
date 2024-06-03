async function plotFunction() {
    const funcInput = document.getElementById('function-input').value;
    if (!funcInput) {
        alert('Please enter a function to plot');
        return;
    }

    const xMin = -1e9;
    const xMax = 1e9;
    const numPoints = 1000; // Adjust the number of points to ensure performance

    const response = await fetch('/plot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            function: funcInput,
            x_min: xMin,
            x_max: xMax,
            num_points: numPoints
        }),
    });

    const data = await response.json();

    // Filter out null values to avoid plotting issues
    const filteredData = data.x.map((x, i) => ({ x: x, y: data.y[i] })).filter(point => point.y !== null);
    const xValues = filteredData.map(point => point.x);
    const yValues = filteredData.map(point => point.y);

    const trace = {
        x: xValues,
        y: yValues,
        mode: 'lines',
        name: funcInput
    };

    const initialXRange = [-10, 10];
    const initialYRange = [-10, 10];

    const layout = {
        title: `Graph of ${funcInput}`,
        xaxis: {
            title: 'x',
            range: initialXRange,
            showgrid: true,
            zeroline: true
        },
        yaxis: {
            title: 'y',
            range: initialYRange,
            showgrid: true,
            zeroline: true
        },
        dragmode: 'pan',
        hovermode: 'closest'
    };

    Plotly.newPlot('graph', [trace], layout, { scrollZoom: true });
}
