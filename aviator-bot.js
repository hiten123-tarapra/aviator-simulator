let cumulativeLosses = 0;

function logToTable(round, bet, multiplier, result, balance, netProfit, cumulativeLosses) {
  const table = document.getElementById('logTable').getElementsByTagName('tbody')[0];
  const row = table.insertRow();
  row.className = result === 'WIN' ? 'win' : 'loss';
  row.insertCell(0).innerText = round;
  row.insertCell(1).innerText = `$${bet.toFixed(2)}`;
  row.insertCell(2).innerText = multiplier;
  row.insertCell(3).innerText = result;
  row.insertCell(4).innerText = `$${balance.toFixed(2)}`;
  row.insertCell(5).innerText = `$${netProfit.toFixed(2)}`;
  row.insertCell(6).innerText = `$${cumulativeLosses.toFixed(2)}`;
}

function simulateBet() {
  round++;
  const multiplier = getRandomMultiplier();
  const win = multiplier >= targetMultiplier;

  let result;
  if (win) {
    let winAmount = +(currentBet * (targetMultiplier - 1)).toFixed(2);
    balance += winAmount;
    totalProfit += winAmount;
    result = 'WIN';
    currentBet = baseBet;
  } else {
    balance -= currentBet;
    totalProfit -= currentBet;
    cumulativeLosses += currentBet;  // <-- Add current bet to cumulative losses
    result = 'LOSS';
    currentBet = +(currentBet * 2).toFixed(2);
  }

  logToTable(round, currentBet, multiplier, result, balance, totalProfit, cumulativeLosses);

  if (totalProfit >= targetProfit) {
    document.getElementById('summary').innerText = `🎯 Target Reached: Profit $${totalProfit.toFixed(2)}`;
    return false;
  } else if (cumulativeLosses >= maxLoss) {
    document.getElementById('summary').innerText = `🛑 Max Loss Reached: Lost $${cumulativeLosses.toFixed(2)}`;
    return false;
  }

  return true;
}

function startSimulation() {
  balance = 100;
  totalProfit = 0;
  cumulativeLosses = 0;   // reset losses on new simulation
  currentBet = baseBet;
  round = 0;
  document.getElementById('logTable').getElementsByTagName('tbody')[0].innerHTML = '';
  document.getElementById('summary').innerText = '';

  let keepGoing = true;
  while (keepGoing) {
    keepGoing = simulateBet();
  }
}
