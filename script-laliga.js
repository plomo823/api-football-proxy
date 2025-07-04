document.addEventListener("DOMContentLoaded", () => {
  fetch("/standings")
    .then(res => res.json())
    .then(data => {
      const standings = data.response[0].league.standings[0];
      const tableBody = document.querySelector("#standings-table tbody");
      tableBody.innerHTML = "";

      standings.forEach(team => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${team.rank}</td>
          <td>${team.team.name}</td>
          <td>${team.all.played}</td>
          <td>${team.points}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(err => {
      document.querySelector("#standings-table tbody").innerHTML =
        "<tr><td colspan='4'>Error al cargar datos.</td></tr>";
    });
});
