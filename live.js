document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "https://api-football-proxy.onrender.com";

  async function loadCountriesAndLeagues() {
    const countries = await fetch(baseUrl + "/countries").then(r => r.json());
    const countrySelect = document.getElementById("country-select");
    countrySelect.innerHTML = "<option value=''>Todos</option>";
    countries.response.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.name;
      opt.textContent = c.name;
      countrySelect.appendChild(opt);
    });

    countrySelect.addEventListener("change", async () => {
      const country = countrySelect.value;
      const res = await fetch(baseUrl + "/leagues?country=" + country).then(r => r.json());
      const leagueSelect = document.getElementById("league-select");
      leagueSelect.innerHTML = "<option value=''>Todas</option>";
      res.response.forEach(l => {
        const opt = document.createElement("option");
        opt.value = l.league.id;
        opt.textContent = l.league.name;
        leagueSelect.appendChild(opt);
      });
    });
  }

  async function loadMatches() {
    const container = document.getElementById("matches-container");
    const res = await fetch(baseUrl + "/fixtures/live").then(r => r.json());
    container.innerHTML = "";
    res.response.forEach(match => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <strong>${match.teams.home.name}</strong> vs <strong>${match.teams.away.name}</strong><br/>
        🕒 ${match.fixture.date}<br/>
        🟢 ${match.goals.home} - ${match.goals.away}
      `;
      container.appendChild(div);
    });
  }

  async function loadPredictions() {
    const container = document.getElementById("predictions-container");
    const res = await fetch(baseUrl + "/predictions?fixture=1").then(r => r.json());
    container.innerHTML = "";
    res.response.forEach(p => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <strong>${p.teams.home.name}</strong> vs <strong>${p.teams.away.name}</strong><br/>
        Predicción: ${p.predictions.winner.name || "Empate"}<br/>
        Probabilidades: Home ${p.predictions.percent.home}, Draw ${p.predictions.percent.draw}, Away ${p.predictions.percent.away}
      `;
      container.appendChild(div);
    });
  }

  loadCountriesAndLeagues();
  loadMatches();
  loadPredictions();
});
