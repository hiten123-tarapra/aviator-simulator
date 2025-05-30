let balance = 100;
let targetProfit = 1;
let maxLoss = 5;
let totalProfit = 0;
let currentBet = 0.10;
let baseBet = 0.10;
let targetMultiplier = 1.3;
let round = 0;

function getRandomMultiplier() {
  return +(Math.random() * 9 + 1).toFixed(2); // 1.00 to 10.00
}

function logToTable(round, bet, multiplier, result, balance, netProfit) {
  const table = document.getElementById('logTable').getElementsByTagName('tbody')[0];
  const row = table.insertRow();
  row.className = result === 'WIN' ? 'win' : 'loss';
  row.insertCell(0).innerText = round;
  row.insertCell(1).innerText = `$${bet.toFixed(2)}`;
  row.insertCell(2).innerText = multiplier;
  row.insertCell(3).innerText = result;
  row.insertCell(4).innerText = `$${balance.toFixed(2)}`;
  row.insertCell(5).innerText = `$${netProfit.toFixed(2)}`;
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
    result = 'LOSS';
    currentBet = +(currentBet * 2).toFixed(2);
  }

  logToTable(round, currentBet, multiplier, result, balance, totalProfit);

  if (totalProfit >= targetProfit) {
    document.getElementById('summary').innerText = `🎯 Target Reached: Profit $${totalProfit.toFixed(2)}`;
    return false;
  } else if (Math.abs(totalProfit) >= maxLoss) {
    document.getElementById('summary').innerText = `🛑 Max Loss Reached: Lost $${Math.abs(totalProfit).toFixed(2)}`;
    return false;
  }

  return true;
}

function startSimulation() {
  balance = 100;
  totalProfit = 0;
  currentBet = baseBet;
  round = 0;
  document.getElementById('logTable').getElementsByTagName('tbody')[0].innerHTML = '';
  document.getElementById('summary').innerText = '';
  
  let keepGoing = true;
  while (keepGoing) {
    keepGoing = simulateBet();
  }
}
