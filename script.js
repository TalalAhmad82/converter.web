document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeSwitch = document.getElementById('theme-switch');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const aboutLink = document.getElementById('about-link');
    const aboutModal = document.getElementById('about-modal');
    const closeModal = document.querySelector('.close');
    
    // Currency converter elements
    const currencyAmount = document.getElementById('currency-amount');
    const currencyFrom = document.getElementById('currency-from');
    const currencyTo = document.getElementById('currency-to');
    const currencyResult = document.getElementById('currency-result');
    const exchangeRateText = document.getElementById('exchange-rate');
    const updateTimeText = document.getElementById('update-time');
    const currencySwap = document.querySelector('#currency .swap-icon');
    
    // Unit converter elements
    const unitType = document.getElementById('unit-type');
    const unitAmount = document.getElementById('unit-amount');
    const unitFrom = document.getElementById('unit-from');
    const unitTo = document.getElementById('unit-to');
    const unitResult = document.getElementById('unit-result');
    const formulaText = document.getElementById('formula-text');
    const unitSwap = document.querySelector('#unit .swap-icon');
    
    // Temperature converter elements
    const tempAmount = document.getElementById('temp-amount');
    const tempFrom = document.getElementById('temp-from');
    const tempTo = document.getElementById('temp-to');
    const tempResult = document.getElementById('temp-result');
    const tempFormulaText = document.getElementById('temp-formula-text');
    const tempSwap = document.querySelector('#temperature .swap-icon');
    
    // Theme Toggle
    themeSwitch.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', this.checked);
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        themeSwitch.checked = true;
        document.body.classList.add('dark-mode');
    }
    
    // Tab Navigation
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button and pane
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Modal Functionality
    aboutLink.addEventListener('click', function(e) {
        e.preventDefault();
        aboutModal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', function() {
        aboutModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === aboutModal) {
            aboutModal.style.display = 'none';
        }
    });
    
    // ===== CURRENCY CONVERTER =====
    
    // Exchange rates API
    const API_KEY = 'f68e13b8c8c9c1dda0ac0f94'; // Free API key from ExchangeRate-API
    let exchangeRates = {};
    let lastUpdated = null;
    
    // Fetch exchange rates
    async function fetchExchangeRates() {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
            const data = await response.json();
            
            if (data.result === 'success') {
                exchangeRates = data.conversion_rates;
                lastUpdated = new Date();
                updateTimeText.textContent = lastUpdated.toLocaleString();
                convertCurrency();
                return true;
            } else {
                throw new Error('Failed to fetch exchange rates');
            }
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            updateTimeText.textContent = 'Error fetching data. Using fallback rates.';
            // Fallback exchange rates (approximate values)
            exchangeRates = {
                USD: 1,
                EUR: 0.85,
                GBP: 0.75,
                JPY: 110.5,
                CAD: 1.25,
                AUD: 1.35,
                CNY: 6.45,
                INR: 74.5,
                PKR: 278.5,
                RUB: 92.3,
                ZAR: 18.2,
                SGD: 1.34,
                NZD: 1.62,
                MXN: 17.8,
                BRL: 5.2,
                CHF: 0.88,
                SAR: 3.75,
                AED: 3.67
            };
            return false;
        }
    }
    
    // Convert currency
    function convertCurrency() {
        const amount = parseFloat(currencyAmount.value);
        const fromCurrency = currencyFrom.value;
        const toCurrency = currencyTo.value;
        
        if (isNaN(amount)) {
            currencyResult.value = '';
            exchangeRateText.textContent = '';
            return;
        }
        
        // Calculate conversion
        if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
            const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
            const result = amount * rate;
            
            currencyResult.value = result.toFixed(4);
            exchangeRateText.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
        }
    }
    
    // Event listeners for currency converter
    currencyAmount.addEventListener('input', convertCurrency);
    currencyFrom.addEventListener('change', convertCurrency);
    currencyTo.addEventListener('change', convertCurrency);
    
    // Swap currencies
    currencySwap.addEventListener('click', function() {
        const tempCurrency = currencyFrom.value;
        currencyFrom.value = currencyTo.value;
        currencyTo.value = tempCurrency;
        this.classList.add('pulse');
        setTimeout(() => this.classList.remove('pulse'), 500);
        convertCurrency();
    });
    
    // ===== UNIT CONVERTER =====
    
    // Unit conversion data
    const unitData = {
        length: {
            meter: 1,
            kilometer: 0.001,
            centimeter: 100,
            millimeter: 1000,
            inch: 39.3701,
            foot: 3.28084,
            yard: 1.09361,
            mile: 0.000621371
        },
        weight: {
            kilogram: 1,
            gram: 1000,
            milligram: 1000000,
            pound: 2.20462,
            ounce: 35.274,
            ton: 0.001,
            stone: 0.157473
        },
        volume: {
            liter: 1,
            milliliter: 1000,
            gallon: 0.264172,
            quart: 1.05669,
            pint: 2.11338,
            cup: 4.22675,
            fluidOunce: 33.814,
            cubicMeter: 0.001
        },
        area: {
            squareMeter: 1,
            squareKilometer: 0.000001,
            squareCentimeter: 10000,
            squareMillimeter: 1000000,
            squareInch: 1550,
            squareFoot: 10.7639,
            squareYard: 1.19599,
            acre: 0.000247105,
            hectare: 0.0001
        },
        speed: {
            meterPerSecond: 1,
            kilometerPerHour: 3.6,
            milePerHour: 2.23694,
            knot: 1.94384,
            footPerSecond: 3.28084
        },
        time: {
            second: 1,
            minute: 1/60,
            hour: 1/3600,
            day: 1/86400,
            week: 1/604800,
            month: 1/2592000,
            year: 1/31536000
        }
    };
    
    // Unit labels for display
    const unitLabels = {
        length: {
            meter: 'Meter (m)',
            kilometer: 'Kilometer (km)',
            centimeter: 'Centimeter (cm)',
            millimeter: 'Millimeter (mm)',
            inch: 'Inch (in)',
            foot: 'Foot (ft)',
            yard: 'Yard (yd)',
            mile: 'Mile (mi)'
        },
        weight: {
            kilogram: 'Kilogram (kg)',
            gram: 'Gram (g)',
            milligram: 'Milligram (mg)',
            pound: 'Pound (lb)',
            ounce: 'Ounce (oz)',
            ton: 'Metric Ton (t)',
            stone: 'Stone (st)'
        },
        volume: {
            liter: 'Liter (L)',
            milliliter: 'Milliliter (mL)',
            gallon: 'Gallon (gal)',
            quart: 'Quart (qt)',
            pint: 'Pint (pt)',
            cup: 'Cup (c)',
            fluidOunce: 'Fluid Ounce (fl oz)',
            cubicMeter: 'Cubic Meter (m³)'
        },
        area: {
            squareMeter: 'Square Meter (m²)',
            squareKilometer: 'Square Kilometer (km²)',
            squareCentimeter: 'Square Centimeter (cm²)',
            squareMillimeter: 'Square Millimeter (mm²)',
            squareInch: 'Square Inch (in²)',
            squareFoot: 'Square Foot (ft²)',
            squareYard: 'Square Yard (yd²)',
            acre: 'Acre (ac)',
            hectare: 'Hectare (ha)'
        },
        speed: {
            meterPerSecond: 'Meter per Second (m/s)',
            kilometerPerHour: 'Kilometer per Hour (km/h)',
            milePerHour: 'Mile per Hour (mph)',
            knot: 'Knot (kn)',
            footPerSecond: 'Foot per Second (ft/s)'
        },
        time: {
            second: 'Second (s)',
            minute: 'Minute (min)',
            hour: 'Hour (h)',
            day: 'Day (d)',
            week: 'Week (wk)',
            month: 'Month (mo)',
            year: 'Year (yr)'
        }
    };
    
    // Populate unit dropdowns based on selected type
    function populateUnitDropdowns() {
        const type = unitType.value;
        const units = unitData[type];
        
        // Clear existing options
        unitFrom.innerHTML = '';
        unitTo.innerHTML = '';
        
        // Add new options
        for (const unit in units) {
            const fromOption = document.createElement('option');
            fromOption.value = unit;
            fromOption.textContent = unitLabels[type][unit];
            unitFrom.appendChild(fromOption);
            
            const toOption = document.createElement('option');
            toOption.value = unit;
            toOption.textContent = unitLabels[type][unit];
            unitTo.appendChild(toOption);
        }
        
        // Set default 'to' option to something different than 'from'
        if (unitTo.options.length > 1) {
            unitTo.selectedIndex = 1;
        }
        
        convertUnit();
    }
    
    // Convert units
    function convertUnit() {
        const amount = parseFloat(unitAmount.value);
        const type = unitType.value;
        const fromUnit = unitFrom.value;
        const toUnit = unitTo.value;
        
        if (isNaN(amount) || !fromUnit || !toUnit) {
            unitResult.value = '';
            formulaText.textContent = '-';
            return;
        }
        
        // Calculate conversion
        const fromValue = unitData[type][fromUnit];
        const toValue = unitData[type][toUnit];
        const result = amount * (fromValue / toValue);
        
        unitResult.value = result.toFixed(6);
        
        // Update formula text
        const fromLabel = unitLabels[type][fromUnit].split(' ')[0];
        const toLabel = unitLabels[type][toUnit].split(' ')[0];
        formulaText.textContent = `${amount} ${fromLabel} × (${fromValue} / ${toValue}) = ${result.toFixed(6)} ${toLabel}`;
    }
    
    // Event listeners for unit converter
    unitType.addEventListener('change', populateUnitDropdowns);
    unitAmount.addEventListener('input', convertUnit);
    unitFrom.addEventListener('change', convertUnit);
    unitTo.addEventListener('change', convertUnit);
    
    // Swap units
    unitSwap.addEventListener('click', function() {
        const tempUnit = unitFrom.value;
        unitFrom.value = unitTo.value;
        unitTo.value = tempUnit;
        this.classList.add('pulse');
        setTimeout(() => this.classList.remove('pulse'), 500);
        convertUnit();
    });
    
    // ===== TEMPERATURE CONVERTER =====
    
    // Convert temperature
    function convertTemperature() {
        const amount = parseFloat(tempAmount.value);
        const fromUnit = tempFrom.value;
        const toUnit = tempTo.value;
        
        if (isNaN(amount)) {
            tempResult.value = '';
            tempFormulaText.textContent = '-';
            return;
        }
        
        let result;
        let formula;
        
        // Convert to Celsius first (as intermediate step)
        let celsius;
        switch (fromUnit) {
            case 'celsius':
                celsius = amount;
                break;
            case 'fahrenheit':
                celsius = (amount - 32) * 5/9;
                break;
            case 'kelvin':
                celsius = amount - 273.15;
                break;
        }
        
        // Convert from Celsius to target unit
        switch (toUnit) {
            case 'celsius':
                result = celsius;
                break;
            case 'fahrenheit':
                result = (celsius * 9/5) + 32;
                break;
            case 'kelvin':
                result = celsius + 273.15;
                break;
        }
        
        tempResult.value = result.toFixed(2);
        
        // Create formula text
        if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
            formula = `°C to °F: (${amount}°C × 9/5) + 32 = ${result.toFixed(2)}°F`;
        } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
            formula = `°F to °C: (${amount}°F - 32) × 5/9 = ${result.toFixed(2)}°C`;
        } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
            formula = `°C to K: ${amount}°C + 273.15 = ${result.toFixed(2)}K`;
        } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
            formula = `K to °C: ${amount}K - 273.15 = ${result.toFixed(2)}°C`;
        } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
            formula = `°F to K: (${amount}°F - 32) × 5/9 + 273.15 = ${result.toFixed(2)}K`;
        } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
            formula = `K to °F: (${amount}K - 273.15) × 9/5 + 32 = ${result.toFixed(2)}°F`;
        } else {
            formula = `${fromUnit} to ${toUnit}: ${amount} = ${result.toFixed(2)}`;
        }
        
        tempFormulaText.textContent = formula;
    }
    
    // Event listeners for temperature converter
    tempAmount.addEventListener('input', convertTemperature);
    tempFrom.addEventListener('change', convertTemperature);
    tempTo.addEventListener('change', convertTemperature);
    
    // Swap temperature units
    tempSwap.addEventListener('click', function() {
        const tempUnit = tempFrom.value;
        tempFrom.value = tempTo.value;
        tempTo.value = tempUnit;
        this.classList.add('pulse');
        setTimeout(() => this.classList.remove('pulse'), 500);
        convertTemperature();
    });
    
    // Initialize converters
    fetchExchangeRates();
    populateUnitDropdowns();
    convertTemperature();
});