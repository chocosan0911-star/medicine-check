// ===== パスワード設定 =====
const PASSWORD = "1234"; // 好きな数字・文字に変更

function checkPassword() {
  const ok = localStorage.getItem("auth");
  if (ok === "ok") return;

  const input = prompt("パスワードを入力してください");
  if (input === PASSWORD) {
    localStorage.setItem("auth", "ok");
  } else {
    alert("パスワードが違います");
    document.body.innerHTML = "";
  }
}

checkPassword();

// ===== 日付・時刻 =====
const today = new Date().toISOString().slice(0, 10);

function getTime() {
  const now = new Date();
  return now.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

// ===== 表示更新 =====
function load() {
  const data = JSON.parse(localStorage.getItem(today)) || {};

  document.getElementById("morning-status").textContent =
    data.morning ? `⭕ ${data.morning}` : "未服用";

  document.getElementById("night-status").textContent =
    data.night ? `⭕ ${data.night}` : "未服用";

  const y = new Date();
  y.setDate(y.getDate() - 1);
  const yesterday = y.toISOString().slice(0, 10);
  const yData = JSON.parse(localStorage.getItem(yesterday)) || {};

  document.getElementById("y-morning").textContent =
    yData.morning ? `⭕ ${yData.morning}` : "❌";

  document.getElementById("y-night").textContent =
    yData.night ? `⭕ ${yData.night}` : "❌";
}

// ===== ボタン処理 =====
function takeMedicine(time) {
  const data = JSON.parse(localStorage.getItem(today)) || {};
  data[time] = getTime();   // 飲んだ時刻を保存
  localStorage.setItem(today, JSON.stringify(data));
  load();
}

load();
