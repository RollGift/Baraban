const backendUrl = 'https://your-backend.pythonanywhere.com';

async function addGift() {
  const giftName = document.getElementById('giftInput').value;
  const res = await fetch(`${backendUrl}/add_gift`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ giftName })
  });
  const data = await res.json();
  if (data.error) {
    alert('Ошибка: подарок не найден.');
    return;
  }
  loadGifts();
}

async function loadGifts() {
  const res = await fetch(`${backendUrl}/get_gifts`);
  const gifts = await res.json();
  document.getElementById('gifts').innerHTML = gifts.map(g => `<p>${g.name} — $${g.price}</p>`).join('');
}

async function pickWinner() {
  const res = await fetch(`${backendUrl}/pick_winner`);
  const winner = await res.json();
  document.getElementById('winner').innerHTML = `🎉 Победил подарок: ${winner.name} ($${winner.price})`;
}

window.onload = loadGifts;
