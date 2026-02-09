


async function getCurrentRound() {
  const response = await fetch("http://localhost:3000/api/encrypt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: "randomjunk",
      futureRound: "25945240",
    }),
  });
}

getCurrentRound();
