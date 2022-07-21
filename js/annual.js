let annualData = {};
let annualSpeciesList = null;

axios.get('../data/annual.json').then((response) => {
  annualData = response.data;
    // Populate selection list
    let select = document.getElementById('AnnualSpecies');
    Object.keys(annualData.species).sort().forEach( (val) => {
        let newOption = new Option(val, val);
        select.add(newOption,undefined);
    });

    select = document.getElementById('AnnualYear');
    annualData.years.forEach( (val) => {
        let newOption = new Option(val, val);
        select.add(newOption,undefined);
    });

    annualSpeciesList = new SlimSelect({
        select: '#AnnualSpecies'
    });

    // Needs a little delay
    setTimeout(() => {annualSpeciesList.set(['baboon', 'elephant'])}, 500);
});

// Update graph when selections changes
const annualPlot = () => {
    let pdata = [];
    let selected = annualSpeciesList.selected();
    let selector = document.getElementById('AnnualYear');
    let year = selector.options[selector.selectedIndex].value;
    let format = document.querySelector('input[name=annualFormat]:checked').value;
    
    if(selected.length > 0) {
        selected.forEach( (species) => {
            let total = annualData['species'][species][year]['total'];
            let x = [];
            let y = [];
            for( let month in annualData['species'][species][year]['month']) {
                x.push(month);
                if(format === 'frequency') {
                    y.push(annualData['species'][species][year]['month'][month] / total );    
                }
                else {
                    y.push(annualData['species'][species][year]['month'][month]);
                }
            }
            let plotd = {
                x: x,
                y: y,
                name: species,
                type: 'bar'
            };
            pdata.push(plotd);
        });
    }
    if(format === 'frequency') {
        Plotly.newPlot('AnnualPlot', pdata, {yaxis: {title: 'Frequency'}, xaxis: {title: 'Month', tick0: 0, dtick: 1}}, {responsive: true});
    }
    else {
        Plotly.newPlot('AnnualPlot', pdata, {yaxis: {title: 'Count'}, xaxis: {title: 'Month', tick0: 0, dtick: 1}}, {responsive: true});
    }
    
}

const annualClearList = () => {
    annualSpeciesList.set(['']);
}