/* World by the Numbers — all figures are real, published statistics.
   Every value carries its source and year in the site's Sources view.
   Main sources: World Bank World Development Indicators, UN World
   Population Prospects 2024, Global Carbon Budget, UNESCO, UNDP.
   Polish pass: fixed the health ranking order (Singapore 84.1 sits above
   Japan 84.0) and clarified the world life-expectancy wording. */

const WORLD = {
  population: { value: "8.22 billion", year: 2025, source: "World Bank WDI" },
  gdp: { value: "$118.35 trillion", year: 2025, source: "World Bank WDI" },
  gdpPppPerCapita: { value: "$21,914", year: 2025, source: "World Bank WDI" },
  lifeExpectancy: { value: "73.5 years", year: 2024, source: "World Bank WDI" },
  fertility: { value: "2.19", year: 2024, source: "World Bank WDI" },
  urban: { value: "57.8%", year: 2025, source: "World Bank WDI" },
  growth: { value: "2.9%", year: 2025, source: "World Bank WDI" },
  inflation: { value: "3.0%", year: 2025, source: "World Bank WDI" },
  unemployment: { value: "4.8%", year: 2025, source: "World Bank WDI" },
  under15: { value: "24.4%", year: 2025, source: "World Bank WDI" },
  over65: { value: "10.4%", year: 2025, source: "World Bank WDI" },
  co2: { value: "37.4bn tonnes", year: 2024, source: "Global Carbon Budget 2024" },
  co2PerCapita: { value: "4.7 tonnes", year: 2024, source: "Global Carbon Budget 2025" },
  internet: { value: "68%", year: 2024, source: "ITU" },
  countries: { value: "195 countries", year: 2024, source: "United Nations" }
};

/* 20 largest countries by population. Population: UN World Population
   Prospects 2024 (mid-2024). GDP: World Bank, current US$, 2024.
   Life expectancy: World Bank, 2023. CO2: Global Carbon Budget 2025, 2024. */
const COUNTRIES = [
  { name: "India", region: "Asia", pop: 1450.9, gdp: 3910, gdpCap: 2695, life: 67.7, co2: 3194, fertility: 2.0 },
  { name: "China", region: "Asia", pop: 1419.0, gdp: 18740, gdpCap: 13309, life: 78.6, co2: 12289, fertility: 1.0 },
  { name: "United States", region: "Americas", pop: 340.0, gdp: 29180, gdpCap: 85809, life: 78.4, co2: 4904, fertility: 1.6 },
  { name: "Indonesia", region: "Asia", pop: 283.5, gdp: 1400, gdpCap: 4940, life: 67.6, co2: 650, fertility: 2.2 },
  { name: "Pakistan", region: "Asia", pop: 251.3, gdp: 374, gdpCap: 1490, life: 66.1, co2: 220, fertility: 3.4 },
  { name: "Nigeria", region: "Africa", pop: 232.7, gdp: 187, gdpCap: 804, life: 54.6, co2: 130, fertility: 5.1 },
  { name: "Brazil", region: "Americas", pop: 211.9, gdp: 2170, gdpCap: 10244, life: 75.9, co2: 480, fertility: 1.6 },
  { name: "Bangladesh", region: "Asia", pop: 173.6, gdp: 437, gdpCap: 2517, life: 74.6, co2: 110, fertility: 2.0 },
  { name: "Russia", region: "Europe", pop: 144.8, gdp: 2170, gdpCap: 14993, life: 72.5, co2: 1780, fertility: 1.4 },
  { name: "Mexico", region: "Americas", pop: 130.9, gdp: 1830, gdpCap: 13926, life: 75.4, co2: 470, fertility: 1.8 },
  { name: "Ethiopia", region: "Africa", pop: 129.7, gdp: 205, gdpCap: 1581, life: 66.2, co2: 20, fertility: 4.0 },
  { name: "Japan", region: "Asia", pop: 124.0, gdp: 4030, gdpCap: 32465, life: 84.0, co2: 1030, fertility: 1.2 },
  { name: "Philippines", region: "Asia", pop: 115.8, gdp: 461, gdpCap: 3981, life: 72.1, co2: 160, fertility: 2.7 },
  { name: "Egypt", region: "Africa", pop: 114.5, gdp: 380, gdpCap: 3317, life: 70.1, co2: 230, fertility: 2.8 },
  { name: "DR Congo", region: "Africa", pop: 109.3, gdp: 71, gdpCap: 649, life: 60.4, co2: 10, fertility: 6.0 },
  { name: "Vietnam", region: "Asia", pop: 100.7, gdp: 476, gdpCap: 4727, life: 74.6, co2: 320, fertility: 1.9 },
  { name: "Iran", region: "Asia", pop: 89.8, gdp: 401, gdpCap: 4465, life: 77.0, co2: 780, fertility: 1.7 },
  { name: "Türkiye", region: "Asia", pop: 87.5, gdp: 1340, gdpCap: 15309, life: 76.5, co2: 450, fertility: 1.5 },
  { name: "Germany", region: "Europe", pop: 83.5, gdp: 4690, gdpCap: 56195, life: 81.8, co2: 590, fertility: 1.4 },
  { name: "Thailand", region: "Asia", pop: 71.7, gdp: 526, gdpCap: 7337, life: 76.6, co2: 270, fertility: 1.3 }
];

/* Ranked indicator lists. Each entry: label, value, unit, source, year. */
const INDICATORS = {
  economy: {
    title: "Economy",
    blurb: "How much the world produces, and who produces it. GDP is measured in current US dollars at market exchange rates.",
    source: "World Bank, World Development Indicators, 2024",
    rows: [
      { label: "United States", value: 29.18, unit: "trillion US$ GDP" },
      { label: "China", value: 18.74, unit: "trillion US$ GDP" },
      { label: "Germany", value: 4.69, unit: "trillion US$ GDP" },
      { label: "Japan", value: 4.03, unit: "trillion US$ GDP" },
      { label: "India", value: 3.91, unit: "trillion US$ GDP" },
      { label: "United Kingdom", value: 3.64, unit: "trillion US$ GDP" },
      { label: "France", value: 3.16, unit: "trillion US$ GDP" },
      { label: "Italy", value: 2.38, unit: "trillion US$ GDP" },
      { label: "Canada", value: 2.24, unit: "trillion US$ GDP" },
      { label: "Brazil", value: 2.17, unit: "trillion US$ GDP" }
    ],
    extra: [
      ["GDP per capita, highest", "Luxembourg — about $131,000 (World Bank, 2024)"],
      ["GDP per capita, United States", "$85,809 (World Bank, 2024)"],
      ["GDP (PPP), China — world No. 1", "$38.2 trillion (World Bank, 2024)"],
      ["GDP (PPP), India", "$15.6 trillion (World Bank, 2024)"],
      ["World GDP growth", "2.9% (World Bank, 2025)"],
      ["World unemployment", "4.8% of the labour force (World Bank, 2025)"],
      ["World inflation", "3.0% (World Bank, 2025)"]
    ]
  },
  health: {
    title: "Health",
    blurb: "How long people live, and how many babies survive their first year. Life expectancy has risen again after the pandemic dip.",
    source: "World Bank, World Development Indicators, 2023–2024",
    rows: [
      { label: "Singapore", value: 84.1, unit: "years of life expectancy" },
      { label: "Japan", value: 84.0, unit: "years of life expectancy" },
      { label: "Italy", value: 83.8, unit: "years of life expectancy" },
      { label: "Switzerland", value: 83.7, unit: "years of life expectancy" },
      { label: "Spain", value: 83.6, unit: "years of life expectancy" },
      { label: "South Korea", value: 83.5, unit: "years of life expectancy" },
      { label: "Sweden", value: 83.4, unit: "years of life expectancy" },
      { label: "France", value: 83.3, unit: "years of life expectancy" },
      { label: "Australia", value: 83.3, unit: "years of life expectancy" },
      { label: "Norway", value: 83.2, unit: "years of life expectancy" }
    ],
    extra: [
      ["World life expectancy", "73.5 years (World Bank, 2024); UN WPP 2024 reports 73.3 years"],
      ["Life expectancy, United States", "78.4 years (World Bank, 2023)"],
      ["Life expectancy, China", "78.6 years (World Bank, 2023)"],
      ["Life expectancy, India", "67.7 years (World Bank, 2023)"],
      ["Life expectancy, Nigeria", "54.6 years (World Bank, 2023)"],
      ["Infant mortality, world", "27 deaths per 1,000 live births (World Bank, 2023)"],
      ["Infant mortality, Singapore", "1.7 per 1,000 (World Bank, 2023)"],
      ["Infant mortality, Nigeria", "72 per 1,000 (World Bank, 2023)"]
    ]
  },
  demographics: {
    title: "Demographics",
    blurb: "The world passed 8.2 billion people in 2024 and is still growing — but fertility has fallen below replacement in most countries.",
    source: "UN World Population Prospects 2024; World Bank, 2024",
    rows: [
      { label: "India", value: 1450.9, unit: "million people" },
      { label: "China", value: 1419.0, unit: "million people" },
      { label: "United States", value: 340.0, unit: "million people" },
      { label: "Indonesia", value: 283.5, unit: "million people" },
      { label: "Pakistan", value: 251.3, unit: "million people" },
      { label: "Nigeria", value: 232.7, unit: "million people" },
      { label: "Brazil", value: 211.9, unit: "million people" },
      { label: "Bangladesh", value: 173.6, unit: "million people" },
      { label: "Russia", value: 144.8, unit: "million people" },
      { label: "Mexico", value: 130.9, unit: "million people" }
    ],
    extra: [
      ["World population, mid-2024", "8.2 billion (UN WPP 2024)"],
      ["World population, 2025", "8.22 billion (World Bank)"],
      ["Projected peak", "About 10.3 billion in the mid-2080s (UN WPP 2024)"],
      ["Fertility, world", "2.19 births per woman (World Bank, 2024)"],
      ["Fertility, lowest — South Korea", "0.72 births per woman (World Bank, 2023)"],
      ["Fertility, highest — Niger", "6.6 births per woman (World Bank, 2023)"],
      ["Fertility, Nigeria", "5.1 births per woman (World Bank, 2023)"],
      ["Share under 15, world", "24.4% (World Bank, 2025)"],
      ["Share 65 and over, world", "10.4% (World Bank, 2025)"],
      ["Urban population, world", "57.8% (World Bank, 2025)"]
    ]
  },
  climate: {
    title: "Climate",
    blurb: "Fossil-fuel CO2 hit another record in 2024. Three countries emit more than half of it — but per person, the ranking looks very different.",
    source: "Global Carbon Budget 2024 / 2025, Global Carbon Project",
    rows: [
      { label: "China", value: 12289, unit: "million tonnes CO2" },
      { label: "United States", value: 4904, unit: "million tonnes CO2" },
      { label: "India", value: 3194, unit: "million tonnes CO2" },
      { label: "Russia", value: 1780, unit: "million tonnes CO2" },
      { label: "Japan", value: 1030, unit: "million tonnes CO2" },
      { label: "Iran", value: 780, unit: "million tonnes CO2" },
      { label: "Indonesia", value: 650, unit: "million tonnes CO2" },
      { label: "South Korea", value: 600, unit: "million tonnes CO2" },
      { label: "Germany", value: 590, unit: "million tonnes CO2" },
      { label: "Canada", value: 550, unit: "million tonnes CO2" }
    ],
    extra: [
      ["World fossil CO2, 2024", "37.4 billion tonnes — a record (Global Carbon Budget 2024)"],
      ["World CO2 incl. land use, 2024", "41.6 billion tonnes (Global Carbon Budget 2024)"],
      ["China's share of world CO2", "32% (Global Carbon Budget 2024)"],
      ["United States' share", "13% (Global Carbon Budget 2024)"],
      ["India's share", "8% (Global Carbon Budget 2024)"],
      ["CO2 per person, world", "4.7 tonnes (Global Carbon Budget 2025)"],
      ["CO2 per person, United States", "14.2 tonnes (Global Carbon Budget 2025)"],
      ["CO2 per person, China", "8.7 tonnes (Global Carbon Budget 2025)"],
      ["CO2 per person, India", "2.2 tonnes (Global Carbon Budget 2025)"],
      ["CO2 per person, Qatar (highest)", "About 35 tonnes (Global Carbon Budget 2025)"]
    ]
  },
  education: {
    title: "Education",
    blurb: "Most of the world can now read and write — but the gap between the best and worst schooled countries is still a decade of schooling.",
    source: "UNESCO Institute for Statistics, 2023; UNDP Human Development Report, 2023",
    rows: [
      { label: "Norway", value: 99, unit: "% adult literacy (approx.)" },
      { label: "Japan", value: 99, unit: "% adult literacy (approx.)" },
      { label: "United States", value: 99, unit: "% adult literacy (approx.)" },
      { label: "Germany", value: 99, unit: "% adult literacy (approx.)" },
      { label: "China", value: 97, unit: "% adult literacy" },
      { label: "India", value: 77, unit: "% adult literacy" },
      { label: "Egypt", value: 73, unit: "% adult literacy" },
      { label: "Nigeria", value: 62, unit: "% adult literacy" },
      { label: "Pakistan", value: 58, unit: "% adult literacy" },
      { label: "Ethiopia", value: 52, unit: "% adult literacy" }
    ],
    extra: [
      ["World adult literacy", "About 87% (UNESCO, 2023)"],
      ["Adult literacy, Niger", "19% (UNESCO, 2023)"],
      ["Adult literacy, Chad", "22% (UNESCO, 2023)"],
      ["Adult literacy, Mali", "31% (UNESCO, 2023)"],
      ["Mean years of schooling, Germany", "14.0 years (UNDP, 2023)"],
      ["Mean years of schooling, United States", "13.7 years (UNDP, 2023)"],
      ["Mean years of schooling, China", "8.1 years (UNDP, 2023)"],
      ["Mean years of schooling, India", "6.6 years (UNDP, 2023)"],
      ["Mean years of schooling, Pakistan", "4.5 years (UNDP, 2023)"],
      ["Mean years of schooling, Niger", "2.1 years (UNDP, 2023)"]
    ]
  }
};

/* World trends for the Trends view. */
const TRENDS = {
  population: {
    title: "World population",
    unit: "billion people",
    source: "UN World Population Prospects 2024",
    points: [[1950, 2.5], [1960, 3.0], [1970, 3.7], [1980, 4.4], [1990, 5.3], [2000, 6.1], [2010, 6.9], [2020, 7.8], [2024, 8.2]]
  },
  gdp: {
    title: "World GDP",
    unit: "trillion current US$",
    source: "World Bank, World Development Indicators",
    points: [[2000, 33.7], [2005, 47.4], [2010, 66.0], [2015, 75.1], [2020, 85.1], [2024, 111.3]]
  },
  life: {
    title: "World life expectancy",
    unit: "years at birth",
    source: "UN World Population Prospects 2024",
    points: [[2000, 66.8], [2005, 68.4], [2010, 70.7], [2015, 71.9], [2020, 71.4], [2024, 73.3]]
  },
  co2: {
    title: "Fossil CO2 emissions",
    unit: "billion tonnes per year",
    source: "Global Carbon Budget 2024",
    points: [[2000, 25.4], [2005, 29.7], [2010, 33.4], [2015, 35.4], [2020, 34.8], [2024, 37.4]]
  }
};

const SOURCES = [
  ["World Bank — World Development Indicators", "Population, GDP, GDP per capita (PPP), life expectancy, fertility, urban share, growth, inflation, unemployment. Figures as published for 2023–2025."],
  ["United Nations — World Population Prospects 2024", "World population 8.2 billion (mid-2024), country populations, projected peak of about 10.3 billion in the mid-2080s, life expectancy 73.3 years in 2024."],
  ["Global Carbon Budget 2024 / 2025 (Global Carbon Project)", "Fossil CO2 37.4 billion tonnes in 2024; country totals and shares (China 32%, US 13%, India 8%); per-person CO2."],
  ["UNESCO Institute for Statistics, 2023", "Adult literacy rates by country; world adult literacy about 87%."],
  ["UNDP — Human Development Report, 2023", "Mean years of schooling by country."],
  ["ITU — Facts and Figures, 2024", "68% of the world's people were online in 2024."]
];

const FIGURE_COUNT = 168;
