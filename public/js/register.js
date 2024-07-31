async function getIpAddress() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Erreur:", error);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const loginForm = document.getElementById("login-form");

  // Écouteur d'événement pour le formulaire de connexion
  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const username = loginForm.querySelector(
        '.inputBox input[type="username"]'
      ).value;
      const password = loginForm.querySelector(
        '.inputBox input[type="password"]'
      ).value;

      try {
        const response = await axios.post(
          "http://localhost:3000/api/register",
          {
            username: username,
            password: password,
            ip: await getIpAddress(),
          }
        );

        if (response.data.code === 404) {
          alert("Pas de compte avec ce nom d'utilisateur.");
        } else if (response.data.code === 403) {
          alert("Nom d'utilisateur ou mot de passe incorrect.");
        } else if (response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          window.location.href = "/chat";
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            alert("Nom d'utilisateur ou mot de passe incorrect.");
          } else {
            alert(
              `Erreur ${error.response.status}: ${error.response.statusText}`
            );
          }
        } else {
          alert("Erreur : Impossible de joindre le serveur.");
        }
      }
    });
  }
});
