// ─────────────────────────────────────────────
//  American Decline — D3 v7 line chart
//  Data sourced from: CDC, Census Bureau, BJS, BLS, Federal Reserve, Dept. of Labor, Opportunity Insights
// ─────────────────────────────────────────────

const DATASETS = {
    campaignFunds: {
        label: 'Campaign Spending',
        title: 'Average Cost of Winning a U.S. House Seat',
        unit: 'Millions of dollars (2022 inflation-adjusted)',
        color: '#e056fd',
        source: 'Source: <a href="https://www.opensecrets.org/elections-overview/cost-of-winning" target="_blank" rel="noopener">OpenSecrets (Center for Responsive Politics) — Cost of Winning</a>; Federal Election Commission. CPI adjustment via BLS CPI-U.',
        note: 'The price of a seat in the House of Representatives has tripled in real terms since 1986, even after accounting for inflation. The Supreme Court\'s 2010 Citizens United ruling, which removed limits on independent political spending, marks a clear inflection point in the acceleration.',
        fmt: v => '$' + v.toFixed(2) + 'M',
        data: [
            {year:1986, value:0.93}, {year:1988, value:0.96}, {year:1990, value:0.92},
            {year:1992, value:1.13}, {year:1994, value:1.03}, {year:1996, value:1.25},
            {year:1998, value:1.17}, {year:2000, value:1.45}, {year:2002, value:1.64},
            {year:2004, value:1.60}, {year:2006, value:1.81}, {year:2008, value:1.86},
            {year:2010, value:1.93}, {year:2012, value:2.03}, {year:2014, value:1.86},
            {year:2016, value:1.83}, {year:2018, value:2.35}, {year:2020, value:2.60},
            {year:2022, value:2.80},
        ]
    },
    incomeMobility: {
        label: 'Income Mobility',
        title: 'Absolute Upward Income Mobility',
        unit: '% of children who out-earn their parents (by birth year)',
        color: '#26de81',
        source: 'Source: <a href="https://opportunityinsights.org/paper/the-fading-american-dream/" target="_blank" rel="noopener">Chetty et al. — "The Fading American Dream", Opportunity Insights / Science (2017)</a>',
        note: 'Measures the share of children who earn more than their parents did at the same age, adjusted for inflation. Born in 1940, 92% of Americans out-earned their parents. For those born in 1980, that figure had fallen to just 50% — one of the starkest measures of the declining American Dream.',
        fmt: v => v.toFixed(0) + '%',
        data: [
            {year:1940, value:92},
            {year:1945, value:86},
            {year:1950, value:79},
            {year:1955, value:72},
            {year:1960, value:64},
            {year:1965, value:62},
            {year:1970, value:61},
            {year:1975, value:56},
            {year:1980, value:50},
        ]
    },
    lifeExpectancy: {
        label: 'Life Expectancy',
        title: 'U.S. Life Expectancy at Birth',
        unit: 'Years',
        color: '#ff3d41',
        source: 'Source: <a href="https://www.cdc.gov/nchs/fastats/life-expectancy.htm" target="_blank" rel="noopener">CDC National Vital Statistics System (NVSS)</a>',
        note: 'After decades of steady gains, life expectancy peaked in 2014 and reversed — a trend unique among wealthy peer nations. COVID-19 accelerated the decline in 2020–2021.',
        fmt: v => v.toFixed(1) + ' yrs',
        data: [
            {year:1980, value:73.7}, {year:1985, value:74.7}, {year:1990, value:75.4},
            {year:1995, value:75.8}, {year:2000, value:76.8}, {year:2005, value:77.4},
            {year:2010, value:78.7}, {year:2014, value:78.9}, {year:2015, value:78.8},
            {year:2016, value:78.6}, {year:2017, value:78.6}, {year:2018, value:78.7},
            {year:2019, value:78.8}, {year:2020, value:77.0}, {year:2021, value:76.1},
            {year:2022, value:77.5},
        ]
    },
    overdoses: {
        label: 'Drug Overdoses',
        title: 'Drug Overdose Death Rate',
        unit: 'Deaths per 100,000 population',
        color: '#ffbf00',
        source: 'Source: <a href="https://wonder.cdc.gov/" target="_blank" rel="noopener">CDC WONDER Database — National Center for Health Statistics</a>',
        note: 'Driven by three successive waves — prescription opioids, heroin, then illicit fentanyl — the overdose death rate increased more than sevenfold between 1999 and 2022.',
        fmt: v => v.toFixed(1),
        data: [
            {year:1999, value:4.3},  {year:2000, value:4.6},  {year:2001, value:5.1},
            {year:2002, value:5.9},  {year:2003, value:6.3},  {year:2004, value:6.4},
            {year:2005, value:7.0},  {year:2006, value:7.9},  {year:2007, value:7.9},
            {year:2008, value:8.3},  {year:2009, value:8.7},  {year:2010, value:9.1},
            {year:2011, value:9.3},  {year:2012, value:9.4},  {year:2013, value:9.6},
            {year:2014, value:10.7}, {year:2015, value:12.4}, {year:2016, value:14.8},
            {year:2017, value:15.9}, {year:2018, value:14.9}, {year:2019, value:14.2},
            {year:2020, value:19.8}, {year:2021, value:28.3}, {year:2022, value:32.6},
        ]
    },
    inequality: {
        label: 'Inequality',
        title: 'Income Inequality — Gini Coefficient',
        unit: 'Gini index  (0 = perfect equality · 1 = maximum inequality)',
        color: '#ff6b35',
        source: 'Source: <a href="https://www.census.gov/data/tables/time-series/demo/income-poverty/historical-income-households.html" target="_blank" rel="noopener">U.S. Census Bureau — Historical Income Tables (Table H-4)</a>',
        note: 'The Gini coefficient measures the distribution of income across a population. The U.S. has seen a near-unbroken rise since the 1960s, now among the highest of any G7 nation.',
        fmt: v => v.toFixed(3),
        data: [
            {year:1967, value:0.397}, {year:1970, value:0.394}, {year:1975, value:0.397},
            {year:1980, value:0.403}, {year:1985, value:0.419}, {year:1990, value:0.428},
            {year:1995, value:0.450}, {year:2000, value:0.462}, {year:2005, value:0.469},
            {year:2010, value:0.470}, {year:2015, value:0.479}, {year:2018, value:0.486},
            {year:2019, value:0.484}, {year:2020, value:0.489}, {year:2021, value:0.494},
            {year:2022, value:0.470},
        ]
    },
    incarceration: {
        label: 'Incarceration',
        title: 'U.S. Incarceration Rate',
        unit: 'Inmates per 100,000 residents',
        color: '#c0392b',
        source: 'Source: <a href="https://bjs.ojp.gov/library/publications/list?series_filter=Prisoners" target="_blank" rel="noopener">Bureau of Justice Statistics — Prisoners Series & Jail Inmates at Midyear</a>',
        note: 'The U.S. incarcerates more people per capita than any other nation on earth. The rate quadrupled between 1980 and its 2008 peak, driven by mandatory minimums and the War on Drugs.',
        fmt: v => Math.round(v).toString(),
        data: [
            {year:1980, value:221}, {year:1985, value:313}, {year:1990, value:458},
            {year:1995, value:601}, {year:2000, value:683}, {year:2005, value:738},
            {year:2007, value:767}, {year:2008, value:754}, {year:2010, value:731},
            {year:2013, value:698}, {year:2015, value:670}, {year:2017, value:639},
            {year:2019, value:581}, {year:2020, value:537}, {year:2021, value:533},
            {year:2022, value:540},
        ]
    },
    maternalMortality: {
        label: 'Maternal Mortality',
        title: 'Maternal Mortality Rate',
        unit: 'Deaths per 100,000 live births',
        color: '#b06aff',
        source: 'Source: <a href="https://www.cdc.gov/nchs/maternal-mortality/index.htm" target="_blank" rel="noopener">CDC National Center for Health Statistics — Maternal Mortality Surveillance</a>',
        note: 'The U.S. maternal mortality rate is the highest of any wealthy nation and has more than tripled since 2000. Rates are significantly higher for Black women.',
        fmt: v => v.toFixed(1),
        data: [
            {year:2000, value:9.8},  {year:2003, value:12.1}, {year:2006, value:13.3},
            {year:2009, value:17.8}, {year:2012, value:15.9}, {year:2014, value:18.0},
            {year:2016, value:16.9}, {year:2018, value:17.4}, {year:2019, value:20.1},
            {year:2020, value:23.8}, {year:2021, value:32.9}, {year:2022, value:22.3},
        ]
    },
    poverty: {
        label: 'Poverty Rate',
        title: 'U.S. Official Poverty Rate',
        unit: 'Percentage of population below the federal poverty line',
        color: '#74b9ff',
        source: 'Source: <a href="https://www.census.gov/topics/income-poverty/poverty/data/tables.html" target="_blank" rel="noopener">U.S. Census Bureau — Current Population Survey, Annual Social and Economic Supplement</a>',
        note: 'Despite being the world\'s largest economy, the U.S. poverty rate has barely improved since the 1970s. The sharp drop in 1964–1973 followed the Great Society programs; gains have stalled since.',
        fmt: v => v.toFixed(1) + '%',
        data: [
            {year:1960, value:22.2}, {year:1965, value:17.3}, {year:1970, value:12.6},
            {year:1975, value:12.3}, {year:1980, value:13.0}, {year:1985, value:14.0},
            {year:1990, value:13.5}, {year:1995, value:13.8}, {year:2000, value:11.3},
            {year:2005, value:12.6}, {year:2010, value:15.1}, {year:2015, value:13.5},
            {year:2019, value:10.5}, {year:2020, value:11.4}, {year:2021, value:11.6},
            {year:2022, value:11.5},
        ]
    },
    firstTimeBuyer: {
        label: 'First-Time Buyers',
        title: 'Median Age of First-Time Home Buyers',
        unit: 'Years old',
        color: '#55efc4',
        source: 'Source: <a href="https://www.nar.realtor/research-and-statistics/research-reports/highlights-from-the-profile-of-home-buyers-and-sellers" target="_blank" rel="noopener">National Association of Realtors — Profile of Home Buyers and Sellers (annual)</a>',
        note: 'The typical first-time buyer was 29 years old in 1981. By 2022 that had risen to 36 — a record high — as housing costs have outpaced wage growth and student debt delays wealth accumulation.',
        fmt: v => v.toFixed(0) + ' yrs',
        data: [
            {year:1981, value:29}, {year:1985, value:28}, {year:1989, value:30},
            {year:1993, value:31}, {year:1997, value:32}, {year:2000, value:31},
            {year:2003, value:32}, {year:2006, value:32}, {year:2009, value:30},
            {year:2011, value:31}, {year:2013, value:31}, {year:2015, value:31},
            {year:2017, value:32}, {year:2018, value:32}, {year:2019, value:33},
            {year:2020, value:33}, {year:2021, value:33}, {year:2022, value:36},
            {year:2023, value:35},
        ]
    },
    minWage: {
        label: 'Real Min. Wage',
        title: 'Federal Minimum Wage (Inflation-Adjusted)',
        unit: 'Dollars per hour, in 2023 purchasing power',
        color: '#fd79a8',
        source: 'Source: <a href="https://www.dol.gov/agencies/whd/minimum-wage/history" target="_blank" rel="noopener">U.S. Department of Labor</a>; CPI adjustment via <a href="https://www.bls.gov/cpi/" target="_blank" rel="noopener">U.S. Bureau of Labor Statistics</a>',
        note: 'The federal minimum wage reached its peak real value in 1968. Adjusted for inflation, today\'s $7.25/hr is worth roughly half what it was then — a 55-year stagnation in the floor wage.',
        fmt: v => '$' + v.toFixed(2),
        data: [
            {year:1938, value:5.45},  {year:1945, value:6.71},  {year:1950, value:9.37},
            {year:1956, value:11.27}, {year:1961, value:11.67}, {year:1963, value:12.37},
            {year:1967, value:12.72}, {year:1968, value:13.91}, {year:1974, value:12.32},
            {year:1976, value:12.33}, {year:1978, value:12.67}, {year:1979, value:12.44},
            {year:1980, value:11.15}, {year:1981, value:11.58}, {year:1990, value:9.05},
            {year:1991, value:9.57},  {year:1996, value:9.32},  {year:1997, value:9.96},
            {year:2007, value:8.72},  {year:2008, value:9.25},  {year:2009, value:10.33},
            {year:2015, value:8.54},  {year:2020, value:8.07},  {year:2023, value:7.25},
        ]
    },
    unionMembership: {
        label: 'Union Membership',
        title: 'Union Membership Rate',
        unit: 'Percentage of wage and salary workers',
        color: '#a29bfe',
        source: 'Source: <a href="https://www.bls.gov/news.release/union2.nr0.htm" target="_blank" rel="noopener">U.S. Bureau of Labor Statistics — Union Members Summary</a>',
        note: 'Union membership covered over a third of U.S. workers in the 1950s. Decades of legislative erosion, offshoring, and employer opposition have driven it to historic lows, weakening collective bargaining power.',
        fmt: v => v.toFixed(1) + '%',
        data: [
            {year:1954, value:34.7}, {year:1960, value:31.4}, {year:1965, value:28.4},
            {year:1970, value:27.4}, {year:1975, value:25.5}, {year:1980, value:21.9},
            {year:1983, value:20.1}, {year:1985, value:18.0}, {year:1990, value:16.1},
            {year:1995, value:14.9}, {year:2000, value:13.4}, {year:2005, value:12.5},
            {year:2010, value:11.9}, {year:2015, value:11.1}, {year:2019, value:10.3},
            {year:2020, value:10.8}, {year:2021, value:10.3}, {year:2022, value:10.1},
            {year:2023, value:10.0},
        ]
    },
    householdDebt: {
        label: 'Household Debt',
        title: 'Household Debt as % of Disposable Income',
        unit: 'Percentage of disposable personal income',
        color: '#e17055',
        source: 'Source: <a href="https://www.federalreserve.gov/releases/z1/" target="_blank" rel="noopener">Federal Reserve Board — Financial Accounts of the United States (Z.1)</a>; <a href="https://www.bea.gov/data/income-saving/disposable-personal-income" target="_blank" rel="noopener">Bureau of Economic Analysis</a>',
        note: 'American households carry far more debt relative to their income than in previous generations. The ratio doubled between 1980 and its 2007 peak, driven by mortgage, auto, student, and credit card debt.',
        fmt: v => v.toFixed(1) + '%',
        data: [
            {year:1980, value:65.0},  {year:1985, value:79.5},  {year:1990, value:88.0},
            {year:1995, value:90.4},  {year:2000, value:101.2}, {year:2003, value:115.5},
            {year:2005, value:128.0}, {year:2007, value:135.4}, {year:2008, value:130.1},
            {year:2010, value:121.5}, {year:2012, value:113.0}, {year:2014, value:104.8},
            {year:2016, value:101.3}, {year:2018, value:96.5},  {year:2019, value:95.8},
            {year:2020, value:96.4},  {year:2021, value:89.4},  {year:2022, value:91.2},
        ]
    },
    cpi: {
        label: 'Inflation (CPI)',
        title: 'Annual Inflation Rate — Consumer Price Index',
        unit: 'Year-over-year % change, all urban consumers, all items',
        color: '#f9ca24',
        source: 'Source: <a href="https://www.bls.gov/cpi/" target="_blank" rel="noopener">U.S. Bureau of Labor Statistics — Consumer Price Index for All Urban Consumers (CPI-U)</a>',
        note: 'CPI measures the average change in prices consumers pay for goods and services. After the turbulent 1970s–80s, inflation fell into a stable low band — until 2021–2022, when it hit a 40-year high of 8%, driven by supply chain shocks, stimulus spending, and energy prices.',
        fmt: v => v.toFixed(1) + '%',
        data: [
            {year:1960, value:1.7},  {year:1961, value:1.0},  {year:1962, value:1.0},
            {year:1963, value:1.3},  {year:1964, value:1.3},  {year:1965, value:1.6},
            {year:1966, value:2.9},  {year:1967, value:3.1},  {year:1968, value:4.2},
            {year:1969, value:5.5},  {year:1970, value:5.7},  {year:1971, value:4.4},
            {year:1972, value:3.2},  {year:1973, value:6.2},  {year:1974, value:11.0},
            {year:1975, value:9.1},  {year:1976, value:5.8},  {year:1977, value:6.5},
            {year:1978, value:7.6},  {year:1979, value:11.3}, {year:1980, value:13.5},
            {year:1981, value:10.3}, {year:1982, value:6.2},  {year:1983, value:3.2},
            {year:1984, value:4.3},  {year:1985, value:3.6},  {year:1986, value:1.9},
            {year:1987, value:3.6},  {year:1988, value:4.1},  {year:1989, value:4.8},
            {year:1990, value:5.4},  {year:1991, value:4.2},  {year:1992, value:3.0},
            {year:1993, value:3.0},  {year:1994, value:2.6},  {year:1995, value:2.8},
            {year:1996, value:3.0},  {year:1997, value:2.3},  {year:1998, value:1.6},
            {year:1999, value:2.2},  {year:2000, value:3.4},  {year:2001, value:2.8},
            {year:2002, value:1.6},  {year:2003, value:2.3},  {year:2004, value:2.7},
            {year:2005, value:3.4},  {year:2006, value:3.2},  {year:2007, value:2.8},
            {year:2008, value:3.8},  {year:2009, value:-0.4}, {year:2010, value:1.6},
            {year:2011, value:3.2},  {year:2012, value:2.1},  {year:2013, value:1.5},
            {year:2014, value:1.6},  {year:2015, value:0.1},  {year:2016, value:1.3},
            {year:2017, value:2.1},  {year:2018, value:2.4},  {year:2019, value:1.8},
            {year:2020, value:1.2},  {year:2021, value:4.7},  {year:2022, value:8.0},
            {year:2023, value:4.1},  {year:2024, value:2.9},
        ]
    },
    studentDebt: {
        label: 'Student Debt',
        title: 'Total Outstanding Student Loan Debt',
        unit: 'Billions of dollars (nominal)',
        color: '#00cec9',
        source: 'Source: <a href="https://www.federalreserve.gov/releases/g19/" target="_blank" rel="noopener">Federal Reserve Board — Consumer Credit (G.19)</a>; <a href="https://nces.ed.gov/programs/digest/" target="_blank" rel="noopener">National Center for Education Statistics</a>',
        note: 'Outstanding student debt grew nearly fourfold in under two decades, crossing $1.7 trillion by 2022. Rising tuition, stagnant wages, and limited refinancing options have trapped millions of borrowers.',
        fmt: v => '$' + Math.round(v).toLocaleString() + 'B',
        data: [
            {year:2006, value:481},  {year:2007, value:543},  {year:2008, value:611},
            {year:2009, value:771},  {year:2010, value:873},  {year:2011, value:1023},
            {year:2012, value:1103}, {year:2013, value:1183}, {year:2014, value:1274},
            {year:2015, value:1364}, {year:2016, value:1449}, {year:2017, value:1524},
            {year:2018, value:1570}, {year:2019, value:1645}, {year:2020, value:1700},
            {year:2021, value:1753}, {year:2022, value:1757}, {year:2023, value:1774},
        ]
    },
};

// ─────────────────────────────────────────────
//  Chart setup
// ─────────────────────────────────────────────
const margin  = { top: 20, right: 20, bottom: 46, left: 62 };
const DURATION = 700;

let svgEl, g, xScale, yScale, gradientStop0, gradientStop1;
let cW, cH; // chart inner width/height
let activeKey = 'lifeExpectancy';

function chartDims() {
    const wrap = document.getElementById('chartContainer');
    const totalW = wrap.clientWidth - 56; // subtract container padding
    cW = Math.max(200, totalW - margin.left - margin.right);
    cH = Math.max(180, Math.min(420, window.innerHeight * 0.46) - margin.top - margin.bottom);
}

function initChart() {
    chartDims();

    svgEl = d3.select('#chart')
        .attr('width',  cW + margin.left + margin.right)
        .attr('height', cH + margin.top  + margin.bottom);

    // Defs — gradient for area fill
    const defs = svgEl.append('defs');
    const grad = defs.append('linearGradient')
        .attr('id', 'areaGrad')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0).attr('y1', 0).attr('x2', 0);

    gradientStop0 = grad.append('stop').attr('offset', '0%').attr('stop-opacity', 0.28);
    gradientStop1 = grad.append('stop').attr('offset', '100%').attr('stop-color', '#0b0b0b').attr('stop-opacity', 0);

    g = svgEl.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Grid
    g.append('g').attr('class', 'grid');

    // Area
    g.append('path').attr('class', 'chart-area').attr('fill', 'url(#areaGrad)');

    // Line
    g.append('path').attr('class', 'chart-line')
        .attr('fill', 'none')
        .attr('stroke-width', 2.2)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round');

    // Axes
    g.append('g').attr('class', 'axis axis-x');
    g.append('g').attr('class', 'axis axis-y');

    // End-point dot
    g.append('circle').attr('class', 'end-dot')
        .attr('r', 5)
        .attr('stroke', '#0b0b0b')
        .attr('stroke-width', 2);

    // Hover cross-hair
    g.append('line').attr('class', 'hover-line')
        .attr('y1', 0)
        .attr('stroke', 'rgba(255,255,255,0.22)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4,3')
        .attr('opacity', 0);

    g.append('circle').attr('class', 'hover-dot')
        .attr('r', 5)
        .attr('stroke', '#0b0b0b')
        .attr('stroke-width', 2)
        .attr('opacity', 0);

    // Interaction overlay (must be last so it captures events)
    g.append('rect').attr('class', 'overlay')
        .attr('fill', 'transparent')
        .on('mousemove', onHover)
        .on('mouseleave', onLeave);

    xScale = d3.scaleLinear();
    yScale = d3.scaleLinear();
}

// ─────────────────────────────────────────────
//  Update — called on dataset switch and resize
// ─────────────────────────────────────────────
function updateChart(key, animate = true) {
    activeKey = key;
    const ds     = DATASETS[key];
    const data   = ds.data;
    const color  = ds.color;
    const dur    = animate ? DURATION : 0;

    // Y domain with 10% padding
    const yMin  = d3.min(data, d => d.value);
    const yMax  = d3.max(data, d => d.value);
    const yPad  = (yMax - yMin) * 0.12;

    xScale.domain(d3.extent(data, d => d.year)).range([0, cW]);
    yScale.domain([Math.max(0, yMin - yPad), yMax + yPad]).range([cH, 0]);

    const lineGen = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.value))
        .curve(d3.curveCatmullRom.alpha(0.5));

    const areaGen = d3.area()
        .x(d => xScale(d.year))
        .y0(cH)
        .y1(d => yScale(d.value))
        .curve(d3.curveCatmullRom.alpha(0.5));

    // Gradient color
    gradientStop0.attr('stop-color', color);
    d3.select('#areaGrad').attr('y2', cH);

    // Grid
    g.select('.grid')
        .transition().duration(dur)
        .call(d3.axisLeft(yScale).ticks(5).tickSize(-cW).tickFormat(''));

    // Axes
    g.select('.axis-x')
        .attr('transform', `translate(0,${cH})`)
        .transition().duration(dur)
        .call(d3.axisBottom(xScale).ticks(Math.min(data.length, 8)).tickFormat(d3.format('d')));

    g.select('.axis-y')
        .transition().duration(dur)
        .call(d3.axisLeft(yScale).ticks(5));

    // Area
    g.select('.chart-area')
        .datum(data)
        .transition().duration(dur)
        .attr('d', areaGen);

    // Line
    g.select('.chart-line')
        .datum(data)
        .transition().duration(dur)
        .attr('stroke', color)
        .attr('d', lineGen);

    // End dot
    const last = data[data.length - 1];
    g.select('.end-dot')
        .transition().duration(dur)
        .attr('cx', xScale(last.year))
        .attr('cy', yScale(last.value))
        .attr('fill', color);

    g.select('.hover-dot').attr('fill', color);

    // Overlay sizing
    g.select('.overlay').attr('width', cW).attr('height', cH);

    // Hover line height
    g.select('.hover-line').attr('y2', cH);

    // Meta text
    document.getElementById('chartTitle').textContent  = ds.title;
    document.getElementById('chartUnit').textContent   = ds.unit;
    document.getElementById('chartNote').textContent   = ds.note;
    document.getElementById('chartSource').innerHTML = ds.source;

    const latestEl = document.getElementById('chartLatest');
    latestEl.innerHTML = `
        <div class="chart-latest-value" style="color:${color}">${ds.fmt(last.value)}</div>
        <div class="chart-latest-label">${last.year} (latest)</div>
    `;

    // Nav buttons
    document.querySelectorAll('.dataset-btn').forEach(btn => {
        const active = btn.dataset.key === key;
        btn.classList.toggle('active', active);
        if (active) btn.style.setProperty('--active-color', color);
    });
}

// ─────────────────────────────────────────────
//  Hover interaction
// ─────────────────────────────────────────────
const bisect = d3.bisector(d => d.year).left;

function onHover(event) {
    const [mx]   = d3.pointer(event);
    const data   = DATASETS[activeKey].data;
    const year   = xScale.invert(mx);
    const idx    = bisect(data, year, 1);
    const d0     = data[Math.max(0, idx - 1)];
    const d1     = data[Math.min(data.length - 1, idx)];
    const d      = Math.abs(year - d0.year) < Math.abs(year - d1.year) ? d0 : d1;

    const cx = xScale(d.year);
    const cy = yScale(d.value);

    g.select('.hover-line').attr('x1', cx).attr('x2', cx).attr('opacity', 1);
    g.select('.hover-dot').attr('cx', cx).attr('cy', cy).attr('opacity', 1);

    const tip = document.getElementById('tooltip');
    document.getElementById('tooltipYear').textContent  = d.year;
    document.getElementById('tooltipValue').textContent = DATASETS[activeKey].fmt(d.value);
    tip.style.opacity = '1';

    const svgRect = document.getElementById('chart').getBoundingClientRect();
    const tx = svgRect.left + margin.left + cx;
    const ty = svgRect.top  + margin.top  + cy;
    tip.style.left = (tx + 14) + 'px';
    tip.style.top  = (ty - 36) + 'px';
}

function onLeave() {
    g.select('.hover-line').attr('opacity', 0);
    g.select('.hover-dot').attr('opacity', 0);
    document.getElementById('tooltip').style.opacity = '0';
}

// ─────────────────────────────────────────────
//  Nav
// ─────────────────────────────────────────────
function buildNav() {
    const nav = document.getElementById('datasetNav');
    Object.entries(DATASETS).forEach(([key, ds]) => {
        const btn = document.createElement('button');
        btn.className    = 'dataset-btn';
        btn.textContent  = ds.label;
        btn.dataset.key  = key;
        btn.addEventListener('click', () => updateChart(key));
        nav.appendChild(btn);
    });
}

// ─────────────────────────────────────────────
//  Resize
// ─────────────────────────────────────────────
function resize() {
    chartDims();
    svgEl.attr('width',  cW + margin.left + margin.right)
         .attr('height', cH + margin.top  + margin.bottom);
    updateChart(activeKey, false);
}

const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

// ─────────────────────────────────────────────
//  Init
// ─────────────────────────────────────────────
buildNav();
initChart();
updateChart('lifeExpectancy', false);
window.addEventListener('resize', debounce(resize, 200));
