async function cargarPartidos() {
  const contenedor = document.getElementById("partidos");
  try {
    const res = await fetch("https://api-football-proxy-kmkf.onrender.com/proxy?url=https://v3.football.api-sports.io/fixtures?live=all", {
      headers: {
        "x-rapidapi-key": "4712cb300b003d94f61b5a63a6b22f2b",
        "x-rapidapi-host": "v3.football.api-sports.io"
      }
    });
    const data = await res.json();
    contenedor.innerHTML = "";
    if (data.response.length === 0) {
      contenedor.innerHTML = "<p>No hay partidos en vivo ahora mismo.</p>";
      return;
    }
    data.response.forEach(fixture => {
      const partido = document.createElement("div");
      partido.className = "partido";
      partido.innerHTML = `
        <strong>${fixture.teams.home.name}</strong> ${fixture.goals.home} - ${fixture.goals.away} <strong>${fixture.teams.away.name}</strong>
        <br><small>${fixture.league.name} | ${fixture.fixture.status.elapsed}'</small>
      `;
      contenedor.appendChild(partido);
    });
  } catch (error) {
    contenedor.innerHTML = "<p>Error al cargar los partidos en vivo.</p>";
  }
}

cargarPartidos();
setInterval(cargarPartidos, 30000); // refrescar cada 30 segundos
