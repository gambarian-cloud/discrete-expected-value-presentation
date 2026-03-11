const scenes = Array.from(document.querySelectorAll(".scene"));

const ui = {
  sceneTitle: document.getElementById("sceneTitle"),
  sceneTabs: document.getElementById("sceneTabs"),
  sceneLabel: document.getElementById("sceneLabel"),
  progressFill: document.getElementById("progressFill"),
  progressText: document.getElementById("progressText"),
  prevScene: document.getElementById("prevScene"),
  nextScene: document.getElementById("nextScene"),
  restartButton: document.getElementById("restartButton"),
  heroNextButton: document.getElementById("heroNextButton"),
  restartEnd: document.getElementById("restartEnd"),
  jumpButtons: Array.from(document.querySelectorAll(".jump-button")),
  heroSparkCanvas: document.getElementById("heroSparkCanvas"),
  contributionCanvas: document.getElementById("contributionCanvas"),
  exampleCanvas: document.getElementById("exampleCanvas"),
  exampleSwitch: document.getElementById("exampleSwitch"),
  exampleTitle: document.getElementById("exampleTitle"),
  exampleDescription: document.getElementById("exampleDescription"),
  exampleFormula: document.getElementById("exampleFormula"),
  exampleResult: document.getElementById("exampleResult"),
  editorRows: document.getElementById("editorRows"),
  kpiExpectation: document.getElementById("kpiExpectation"),
  kpiRange: document.getElementById("kpiRange"),
  kpiMode: document.getElementById("kpiMode"),
  liveFormula: document.getElementById("liveFormula"),
  pmfCanvas: document.getElementById("pmfCanvas"),
  cdfCanvas: document.getElementById("cdfCanvas"),
  balanceSlider: document.getElementById("balanceSlider"),
  balanceGuess: document.getElementById("balanceGuess"),
  balanceTarget: document.getElementById("balanceTarget"),
  revealBalance: document.getElementById("revealBalance"),
  snapBalance: document.getElementById("snapBalance"),
  balanceFeedback: document.getElementById("balanceFeedback"),
  balanceSvg: document.getElementById("balanceSvg"),
  simCanvas: document.getElementById("simCanvas"),
  simStatus: document.getElementById("simStatus"),
  simPause: document.getElementById("simPause"),
  simReset: document.getElementById("simReset"),
  simRunButtons: Array.from(document.querySelectorAll(".sim-run")),
  simKpiCount: document.getElementById("simKpiCount"),
  simKpiMean: document.getElementById("simKpiMean"),
  simKpiTarget: document.getElementById("simKpiTarget"),
  simKpiGap: document.getElementById("simKpiGap"),
  simRecent: document.getElementById("simRecent"),
  quizStep: document.getElementById("quizStep"),
  quizQuestion: document.getElementById("quizQuestion"),
  quizOptions: document.getElementById("quizOptions"),
  quizPrev: document.getElementById("quizPrev"),
  quizNext: document.getElementById("quizNext"),
  quizCheck: document.getElementById("quizCheck"),
  quizResult: document.getElementById("quizResult"),
  finishCanvas: document.getElementById("finishCanvas"),
};

const palette = ["#e66d47", "#0f9a89", "#536fd8", "#eeb44f", "#8f68d9", "#29a2d6"];

const presets = {
  base: [
    { value: -2, weight: 18, color: palette[0] },
    { value: 1, weight: 26, color: palette[1] },
    { value: 4, weight: 24, color: palette[2] },
    { value: 8, weight: 18, color: palette[3] },
    { value: 12, weight: 14, color: palette[4] },
  ],
  dice: [
    { value: 1, weight: 10, color: palette[0] },
    { value: 2, weight: 10, color: palette[1] },
    { value: 3, weight: 10, color: palette[2] },
    { value: 4, weight: 10, color: palette[3] },
    { value: 5, weight: 10, color: palette[4] },
    { value: 6, weight: 10, color: palette[5] },
  ],
  risk: [
    { value: -100, weight: 80, color: palette[0] },
    { value: 200, weight: 17, color: palette[3] },
    { value: 1000, weight: 3, color: palette[2] },
  ],
};

const examples = {
  dice: {
    title: "Кубик",
    description: "У каждого исхода 1..6 одинаковый шанс 1/6. Ожидание равно 3.5.",
    rows: presets.dice,
  },
  lottery: {
    title: "Лотерея",
    description: "Пусть X — чистый итог: -100 (80%), 200 (17%), 1000 (3%).",
    rows: presets.risk,
  },
  custom: {
    title: "Свое распределение",
    description: "Учебный раунд: 0 (15%), 2 (35%), 5 (30%), 9 (20%).",
    rows: [
      { value: 0, weight: 15, color: palette[0] },
      { value: 2, weight: 35, color: palette[1] },
      { value: 5, weight: 30, color: palette[2] },
      { value: 9, weight: 20, color: palette[3] },
    ],
  },
};

const quiz = [
  {
    question: "Что означает E(X)=3.5 для честного кубика?",
    options: [
      "Следующий бросок точно даст 3 или 4",
      "Среднее длинной серии тянется к 3.5",
      "Вероятность любой грани равна 3.5%",
      "Кубик обязательно нечестный",
    ],
    correct: 1,
    note: "Ожидание описывает среднее на длинной дистанции, а не один бросок.",
  },
  {
    question: "Если повысить вероятность больших значений, что будет с E(X)?",
    options: [
      "Оно сдвинется вверх",
      "Оно всегда станет нулем",
      "Оно перестанет существовать",
      "Оно не меняется",
    ],
    correct: 0,
    note: "Более вероятные большие исходы сильнее тянут взвешенное среднее вверх.",
  },
  {
    question: "Почему E(X) может не совпадать ни с одним исходом?",
    options: [
      "Формула неверная",
      "Потому что это взвешенное среднее",
      "Из-за ошибки округления",
      "Так бывает только у непрерывных величин",
    ],
    correct: 1,
    note: "Взвешенное среднее может оказаться между реальными исходами.",
  },
  {
    question: "Если математическое ожидание лотереи отрицательное, то:",
    options: [
      "Выигрыши невозможны",
      "Каждый билет гарантированно в минус",
      "На длинной дистанции средний итог отрицателен",
      "Математическое ожидание не работает",
    ],
    correct: 2,
    note: "Единичный выигрыш возможен, но средний итог при большом числе игр отрицателен.",
  },
  {
    question: "Какая формула верна для дискретной случайной величины?",
    options: ["E(X)=Σxᵢ+pᵢ", "E(X)=Σxᵢ·pᵢ", "E(X)=x_max·p_max", "E(X)=Σpᵢ/Σxᵢ"],
    correct: 1,
    note: "Правильно: сумма произведений значения на вероятность.",
  },
];

const state = {
  sceneIndex: 0,
  distribution: cloneRows("base"),
  exampleKey: "dice",
  balanceGuess: 0,
  balanceRevealed: false,
  simulation: {
    total: 0,
    means: [],
    outcomes: [],
    shown: 0,
    running: false,
    frameId: 0,
    step: 1,
  },
  quizIndex: 0,
  quizAnswers: Array(quiz.length).fill(null),
};

const sceneShortLabels = [
  "Старт",
  "Типы СВ",
  "Смысл E(X)",
  "3 примера",
  "Конструктор",
  "Баланс",
  "Симуляция",
  "Квиз",
  "Итог",
];

function cloneRows(key) {
  const source = presets[key];
  return source.map((row) => ({ value: row.value, weight: row.weight, color: row.color }));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function format(value, digits = 2) {
  if (!Number.isFinite(value)) {
    return "—";
  }
  const rounded = Math.abs(value - Math.round(value)) < 1e-9;
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: rounded ? 0 : digits,
  }).format(value);
}

function pct(probability) {
  return `${format(probability * 100, 1)}%`;
}

function normalize(rows) {
  const fixed = rows.map((row) => ({
    value: Number.isFinite(row.value) ? row.value : 0,
    weight: clamp(Number.isFinite(row.weight) ? row.weight : 1, 1, 100),
    color: row.color,
  }));
  const totalWeight = fixed.reduce((sum, row) => sum + row.weight, 0) || 1;
  return fixed.map((row) => ({ ...row, probability: row.weight / totalWeight }));
}

function stats(rowsInput) {
  const rows = normalize(rowsInput);
  const expectation = rows.reduce((sum, row) => sum + row.value * row.probability, 0);
  const mode = [...rows].sort((a, b) => b.probability - a.probability)[0];
  const sorted = [...rows].sort((a, b) => a.value - b.value);
  return {
    rows,
    sorted,
    expectation,
    min: Math.min(...rows.map((row) => row.value)),
    max: Math.max(...rows.map((row) => row.value)),
    mode,
  };
}

function drawCanvasBase(canvas) {
  const ctx = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(240, Math.round(rect.width * ratio));
  const height = Math.max(140, Math.round(rect.height * ratio));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fffdf8";
  ctx.fillRect(0, 0, width, height);
  return { ctx, width, height };
}

function drawHeroSpark() {
  const { ctx, width, height } = drawCanvasBase(ui.heroSparkCanvas);
  const data = [];
  let sum = 0;
  for (let i = 1; i <= 70; i += 1) {
    sum += 1 + Math.floor(Math.random() * 6);
    data.push(sum / i);
  }

  const minY = 1;
  const maxY = 6;
  const pad = { left: 36, right: 18, top: 14, bottom: 24 };
  const sx = (i) => pad.left + (i / (data.length - 1)) * (width - pad.left - pad.right);
  const sy = (v) => pad.top + (1 - (v - minY) / (maxY - minY)) * (height - pad.top - pad.bottom);

  ctx.strokeStyle = "rgba(31,42,58,0.08)";
  ctx.lineWidth = 1.5;
  for (let g = 1; g <= 6; g += 1) {
    const y = sy(g);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(15,154,137,0.9)";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(pad.left, sy(3.5));
  ctx.lineTo(width - pad.right, sy(3.5));
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = "#e66d47";
  ctx.lineWidth = 3;
  ctx.beginPath();
  data.forEach((value, idx) => {
    const x = sx(idx);
    const y = sy(value);
    if (idx === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();
}

function drawContribution() {
  const { ctx, width, height } = drawCanvasBase(ui.contributionCanvas);
  const sceneStats = stats(state.distribution);
  const rows = sceneStats.rows;
  const max = Math.max(...rows.map((row) => Math.abs(row.value * row.probability)), 0.01);
  const pad = { left: 34, right: 20, top: 16, bottom: 34 };
  const barWidth = (width - pad.left - pad.right) / rows.length;

  ctx.strokeStyle = "rgba(31,42,58,0.16)";
  ctx.lineWidth = 2;
  const zero = pad.top + (height - pad.top - pad.bottom) * (max / (max * 2));
  ctx.beginPath();
  ctx.moveTo(pad.left, zero);
  ctx.lineTo(width - pad.right, zero);
  ctx.stroke();

  rows.forEach((row, index) => {
    const contribution = row.value * row.probability;
    const h = (Math.abs(contribution) / max) * ((height - pad.top - pad.bottom) / 2 - 6);
    const x = pad.left + index * barWidth + 8;
    const y = contribution >= 0 ? zero - h : zero;
    ctx.fillStyle = row.color;
    ctx.fillRect(x, y, barWidth - 16, h);
    ctx.fillStyle = "#627086";
    ctx.font = `${Math.max(14, width * 0.015)}px Aptos`;
    ctx.fillText(format(row.value), x + 4, height - 10);
  });
}

function drawExample() {
  const config = examples[state.exampleKey];
  const sceneStats = stats(config.rows);
  const rows = sceneStats.rows;

  ui.exampleTitle.textContent = config.title;
  ui.exampleDescription.textContent = config.description;
  ui.exampleFormula.textContent = `E(X) = ${rows.map((r) => `(${format(r.value)}·${pct(r.probability)})`).join(" + ")}`;
  ui.exampleResult.textContent = `Итог: E(X) = ${format(sceneStats.expectation)}`;

  const { ctx, width, height } = drawCanvasBase(ui.exampleCanvas);
  const pad = { left: 36, right: 20, top: 18, bottom: 34 };
  const maxP = Math.max(...rows.map((row) => row.probability), 0.01);
  const colW = (width - pad.left - pad.right) / rows.length;

  rows.forEach((row, index) => {
    const h = (row.probability / maxP) * (height - pad.top - pad.bottom - 20);
    const x = pad.left + index * colW + 10;
    const y = height - pad.bottom - h;
    ctx.fillStyle = row.color;
    ctx.fillRect(x, y, colW - 20, h);
    ctx.fillStyle = "#1f2a3a";
    ctx.font = `${Math.max(13, width * 0.015)}px Bahnschrift`;
    ctx.fillText(format(row.value), x + 2, height - 12);
    ctx.fillStyle = "#627086";
    ctx.fillText(pct(row.probability), x + 2, y - 7);
  });

  const min = sceneStats.min;
  const max = sceneStats.max;
  const span = Math.max(1, max - min);
  const expectationX = pad.left + ((sceneStats.expectation - min) / span) * (width - pad.left - pad.right);
  ctx.strokeStyle = "rgba(15,154,137,0.9)";
  ctx.lineWidth = 2.5;
  ctx.setLineDash([8, 7]);
  ctx.beginPath();
  ctx.moveTo(expectationX, pad.top);
  ctx.lineTo(expectationX, height - pad.bottom + 2);
  ctx.stroke();
  ctx.setLineDash([]);
}

function renderEditor() {
  const normalized = normalize(state.distribution);
  ui.editorRows.innerHTML = normalized
    .map(
      (row, index) => `
        <div class="editor-row" data-index="${index}">
          <input type="number" data-role="value" data-index="${index}" value="${row.value}">
          <input type="range" data-role="weight" data-index="${index}" min="1" max="100" value="${row.weight}">
          <input type="number" data-role="weight-number" data-index="${index}" min="1" max="100" value="${row.weight}">
          <div>${pct(row.probability)}</div>
        </div>
      `,
    )
    .join("");
}

function syncBalanceRange(sceneStats) {
  const span = Math.max(4, sceneStats.max - sceneStats.min);
  const extra = Math.max(2, span * 0.35);
  const min = Number((sceneStats.min - extra).toFixed(1));
  const max = Number((sceneStats.max + extra).toFixed(1));
  ui.balanceSlider.min = String(min);
  ui.balanceSlider.max = String(max);
  ui.balanceSlider.step = "0.1";
  state.balanceGuess = clamp(state.balanceGuess, min, max);
  ui.balanceSlider.value = String(state.balanceGuess);
  ui.balanceGuess.textContent = format(state.balanceGuess);
  ui.balanceTarget.textContent = format(sceneStats.expectation);
}

function drawPmfAndCdf() {
  const sceneStats = stats(state.distribution);
  const rows = sceneStats.sorted;

  ui.kpiExpectation.textContent = format(sceneStats.expectation);
  ui.kpiRange.textContent = `${format(sceneStats.min)}...${format(sceneStats.max)}`;
  ui.kpiMode.textContent = `${format(sceneStats.mode.value)} (${pct(sceneStats.mode.probability)})`;
  ui.liveFormula.textContent = `E(X) = ${rows.map((r) => `${format(r.value)}·${pct(r.probability)}`).join(" + ")} = ${format(sceneStats.expectation)}`;

  const pmf = drawCanvasBase(ui.pmfCanvas);
  const pmfPad = { left: 36, right: 16, top: 12, bottom: 26 };
  const pmfMax = Math.max(...rows.map((row) => row.probability), 0.01);
  const pmfW = (pmf.width - pmfPad.left - pmfPad.right) / rows.length;

  rows.forEach((row, index) => {
    const h = (row.probability / pmfMax) * (pmf.height - pmfPad.top - pmfPad.bottom - 16);
    const x = pmfPad.left + index * pmfW + 8;
    const y = pmf.height - pmfPad.bottom - h;
    pmf.ctx.fillStyle = row.color;
    pmf.ctx.fillRect(x, y, pmfW - 16, h);
    pmf.ctx.fillStyle = "#1f2a3a";
    pmf.ctx.font = `${Math.max(12, pmf.width * 0.013)}px Bahnschrift`;
    pmf.ctx.fillText(format(row.value), x + 2, pmf.height - 8);
  });

  const cdf = drawCanvasBase(ui.cdfCanvas);
  const cdfPad = { left: 36, right: 16, top: 14, bottom: 26 };
  const x = (value) =>
    cdfPad.left +
    ((value - sceneStats.min) / Math.max(1, sceneStats.max - sceneStats.min)) * (cdf.width - cdfPad.left - cdfPad.right);
  const y = (value) => cdfPad.top + (1 - value) * (cdf.height - cdfPad.top - cdfPad.bottom);

  cdf.ctx.strokeStyle = "rgba(31,42,58,0.09)";
  cdf.ctx.lineWidth = 1.5;
  [0, 0.25, 0.5, 0.75, 1].forEach((g) => {
    const yy = y(g);
    cdf.ctx.beginPath();
    cdf.ctx.moveTo(cdfPad.left, yy);
    cdf.ctx.lineTo(cdf.width - cdfPad.right, yy);
    cdf.ctx.stroke();
  });

  cdf.ctx.strokeStyle = "#0f9a89";
  cdf.ctx.lineWidth = 3;
  cdf.ctx.beginPath();
  let cumulative = 0;
  rows.forEach((row, index) => {
    cumulative += row.probability;
    const px = x(row.value);
    const py = y(cumulative);
    if (index === 0) {
      cdf.ctx.moveTo(px, py);
    } else {
      cdf.ctx.lineTo(px, py);
    }
  });
  cdf.ctx.stroke();
  cdf.ctx.fillStyle = "#627086";
  cdf.ctx.font = `${Math.max(12, cdf.width * 0.013)}px Aptos`;
  cdf.ctx.fillText("CDF", cdf.width - cdfPad.right - 34, cdfPad.top + 12);

  syncBalanceRange(sceneStats);
  drawContribution();
  drawFinish();
}

function drawBalance() {
  const sceneStats = stats(state.distribution);
  const rows = sceneStats.rows;
  const min = Number(ui.balanceSlider.min);
  const max = Number(ui.balanceSlider.max);
  const span = Math.max(1, max - min);
  const mapX = (value) => 70 + ((value - min) / span) * 560;
  const guessX = mapX(state.balanceGuess);
  const targetX = mapX(sceneStats.expectation);
  const delta = sceneStats.expectation - state.balanceGuess;
  const angle = clamp((delta / span) * 95, -16, 16);

  const weights = rows
    .map((row) => {
      const x = mapX(row.value);
      const radius = 11 + row.probability * 42;
      return `
        <line x1="${x}" y1="120" x2="${x}" y2="74" stroke="rgba(31,42,58,0.24)" stroke-width="2" />
        <circle cx="${x}" cy="58" r="${radius}" fill="${row.color}" fill-opacity="0.92" />
        <text x="${x}" y="62" text-anchor="middle" fill="#fff" font-size="16" font-weight="700">${format(row.value)}</text>
      `;
    })
    .join("");

  const marker = state.balanceRevealed
    ? `
      <line x1="${targetX}" y1="16" x2="${targetX}" y2="286" stroke="rgba(15,154,137,0.55)" stroke-width="3" stroke-dasharray="9 7" />
      <text x="${targetX}" y="18" text-anchor="middle" fill="#0f9a89" font-size="13">E(X)=${format(sceneStats.expectation)}</text>
    `
    : "";

  ui.balanceSvg.innerHTML = `
    <rect x="0" y="0" width="700" height="320" fill="transparent"></rect>
    <line x1="52" y1="286" x2="648" y2="286" stroke="rgba(31,42,58,0.18)" stroke-width="4"></line>
    <polygon points="${guessX - 26},286 ${guessX + 26},286 ${guessX},238" fill="rgba(83,111,216,0.28)"></polygon>
    <g transform="rotate(${angle} ${guessX} 120)">
      <line x1="52" y1="120" x2="648" y2="120" stroke="#1f2a3a" stroke-width="10" stroke-linecap="round"></line>
      ${weights}
    </g>
    <circle cx="${guessX}" cy="238" r="9" fill="#536fd8"></circle>
    ${marker}
  `;

  ui.balanceGuess.textContent = format(state.balanceGuess);
  ui.balanceTarget.textContent = format(sceneStats.expectation);

  if (state.balanceRevealed) {
    ui.balanceFeedback.textContent = `Точка баланса: ${format(sceneStats.expectation)}. Твоя ошибка: ${format(Math.abs(delta))}.`;
  } else if (Math.abs(delta) < 0.2) {
    ui.balanceFeedback.textContent = "Очень близко: балка почти в равновесии.";
  } else if (delta > 0) {
    ui.balanceFeedback.textContent = "Правый край перевешивает. Сдвигай опору правее.";
  } else {
    ui.balanceFeedback.textContent = "Левый край перевешивает. Сдвигай опору левее.";
  }
}

function pickOutcome(rows) {
  const rand = Math.random();
  let cumulative = 0;
  for (let i = 0; i < rows.length; i += 1) {
    cumulative += rows[i].probability;
    if (rand <= cumulative) {
      return rows[i].value;
    }
  }
  return rows[rows.length - 1].value;
}

function buildSimulation(target) {
  const rows = stats(state.distribution).rows;
  const outcomes = [];
  const means = [];
  let sum = 0;
  for (let i = 0; i < target; i += 1) {
    const value = pickOutcome(rows);
    outcomes.push(value);
    sum += value;
    means.push(sum / (i + 1));
  }
  return { outcomes, means };
}

function stopSimulation() {
  if (state.simulation.frameId) {
    cancelAnimationFrame(state.simulation.frameId);
  }
  state.simulation.frameId = 0;
}

function drawSimulation() {
  const sceneStats = stats(state.distribution);
  const data = state.simulation.means.length ? state.simulation.means : [sceneStats.expectation];
  const shown = state.simulation.shown;

  const graph = drawCanvasBase(ui.simCanvas);
  const pad = { left: 38, right: 16, top: 12, bottom: 28 };
  const ymin = Math.min(sceneStats.min, sceneStats.expectation, ...data);
  const ymax = Math.max(sceneStats.max, sceneStats.expectation, ...data);
  const gap = Math.max(1, (ymax - ymin) * 0.2);
  const low = ymin - gap;
  const high = ymax + gap;
  const sy = (value) => pad.top + (1 - (value - low) / Math.max(1, high - low)) * (graph.height - pad.top - pad.bottom);
  const sx = (idx) =>
    pad.left +
    (idx / Math.max(1, state.simulation.total - 1)) * (graph.width - pad.left - pad.right);

  graph.ctx.strokeStyle = "rgba(31,42,58,0.08)";
  graph.ctx.lineWidth = 1;
  for (let i = 0; i < 5; i += 1) {
    const y = pad.top + (i / 4) * (graph.height - pad.top - pad.bottom);
    graph.ctx.beginPath();
    graph.ctx.moveTo(pad.left, y);
    graph.ctx.lineTo(graph.width - pad.right, y);
    graph.ctx.stroke();
  }

  graph.ctx.strokeStyle = "rgba(15,154,137,0.95)";
  graph.ctx.lineWidth = 2;
  graph.ctx.setLineDash([8, 6]);
  graph.ctx.beginPath();
  graph.ctx.moveTo(pad.left, sy(sceneStats.expectation));
  graph.ctx.lineTo(graph.width - pad.right, sy(sceneStats.expectation));
  graph.ctx.stroke();
  graph.ctx.setLineDash([]);

  if (shown > 0) {
    graph.ctx.strokeStyle = "#e66d47";
    graph.ctx.lineWidth = 3;
    graph.ctx.beginPath();
    for (let i = 0; i < shown; i += 1) {
      const x = sx(i);
      const y = sy(state.simulation.means[i]);
      if (i === 0) {
        graph.ctx.moveTo(x, y);
      } else {
        graph.ctx.lineTo(x, y);
      }
    }
    graph.ctx.stroke();
  }

  ui.simKpiCount.textContent = state.simulation.total ? `${format(shown, 0)} / ${format(state.simulation.total, 0)}` : "0";
  ui.simKpiMean.textContent = shown ? format(state.simulation.means[shown - 1]) : "—";
  ui.simKpiTarget.textContent = format(sceneStats.expectation);
  ui.simKpiGap.textContent = shown ? format(Math.abs(state.simulation.means[shown - 1] - sceneStats.expectation)) : "—";

  const recent = shown ? state.simulation.outcomes.slice(Math.max(0, shown - 12), shown) : [];
  ui.simRecent.innerHTML = recent.length ? recent.map((value) => `<span>${format(value)}</span>`).join("") : "<span>Пока нет данных</span>";
}

function simulationStep() {
  if (!state.simulation.running) {
    return;
  }
  state.simulation.shown = Math.min(state.simulation.total, state.simulation.shown + state.simulation.step);
  drawSimulation();
  if (state.simulation.shown >= state.simulation.total) {
    state.simulation.running = false;
    ui.simPause.textContent = "Готово";
    ui.simPause.disabled = true;
    ui.simStatus.textContent = "Серия завершена: среднее приблизилось к теоретическому E(X).";
    return;
  }
  state.simulation.frameId = requestAnimationFrame(simulationStep);
}

function startSimulation(total) {
  stopSimulation();
  const data = buildSimulation(total);
  state.simulation.total = total;
  state.simulation.means = data.means;
  state.simulation.outcomes = data.outcomes;
  state.simulation.shown = 0;
  state.simulation.running = true;
  state.simulation.step = Math.max(1, Math.ceil(total / 130));
  ui.simPause.disabled = false;
  ui.simPause.textContent = "Пауза";
  ui.simStatus.textContent = `Выполняем ${format(total, 0)} испытаний для текущего распределения...`;
  drawSimulation();
  state.simulation.frameId = requestAnimationFrame(simulationStep);
}

function resetSimulation() {
  stopSimulation();
  state.simulation = {
    total: 0,
    means: [],
    outcomes: [],
    shown: 0,
    running: false,
    frameId: 0,
    step: 1,
  };
  ui.simPause.disabled = true;
  ui.simPause.textContent = "Пауза";
  ui.simStatus.textContent = "Запусти серию испытаний.";
  drawSimulation();
}

function toggleSimulationPause() {
  if (!state.simulation.total || state.simulation.shown >= state.simulation.total) {
    return;
  }
  if (state.simulation.running) {
    state.simulation.running = false;
    stopSimulation();
    ui.simPause.textContent = "Продолжить";
    ui.simStatus.textContent = "Пауза.";
  } else {
    state.simulation.running = true;
    ui.simPause.textContent = "Пауза";
    ui.simStatus.textContent = "Симуляция продолжается...";
    state.simulation.frameId = requestAnimationFrame(simulationStep);
  }
}

function drawFinish() {
  const graph = drawCanvasBase(ui.finishCanvas);
  const sceneStats = stats(state.distribution);
  const target = sceneStats.expectation;
  const points = [];
  let sum = 0;
  for (let i = 1; i <= 130; i += 1) {
    sum += pickOutcome(sceneStats.rows);
    points.push(sum / i);
  }

  const low = Math.min(sceneStats.min, target, ...points) - 1;
  const high = Math.max(sceneStats.max, target, ...points) + 1;
  const pad = { left: 36, right: 16, top: 14, bottom: 24 };
  const sx = (i) => pad.left + (i / (points.length - 1)) * (graph.width - pad.left - pad.right);
  const sy = (v) => pad.top + (1 - (v - low) / Math.max(1, high - low)) * (graph.height - pad.top - pad.bottom);

  graph.ctx.strokeStyle = "rgba(15,154,137,0.88)";
  graph.ctx.lineWidth = 2;
  graph.ctx.setLineDash([8, 7]);
  graph.ctx.beginPath();
  graph.ctx.moveTo(pad.left, sy(target));
  graph.ctx.lineTo(graph.width - pad.right, sy(target));
  graph.ctx.stroke();
  graph.ctx.setLineDash([]);

  graph.ctx.strokeStyle = "#536fd8";
  graph.ctx.lineWidth = 3;
  graph.ctx.beginPath();
  points.forEach((point, index) => {
    const x = sx(index);
    const y = sy(point);
    if (!index) {
      graph.ctx.moveTo(x, y);
    } else {
      graph.ctx.lineTo(x, y);
    }
  });
  graph.ctx.stroke();
}

function renderQuiz() {
  const item = quiz[state.quizIndex];
  ui.quizStep.textContent = String(state.quizIndex + 1);
  ui.quizQuestion.textContent = item.question;
  ui.quizOptions.innerHTML = item.options
    .map(
      (option, index) => `
        <label class="quiz-option">
          <input type="radio" name="quiz-item" value="${index}" ${state.quizAnswers[state.quizIndex] === index ? "checked" : ""}>
          <span>${option}</span>
        </label>
      `,
    )
    .join("");
  ui.quizPrev.disabled = state.quizIndex === 0;
  ui.quizNext.disabled = state.quizIndex === quiz.length - 1;
}

function evaluateQuiz() {
  let score = 0;
  const comments = [];
  quiz.forEach((item, index) => {
    const answer = state.quizAnswers[index];
    const ok = answer === item.correct;
    if (ok) {
      score += 1;
    }
    comments.push(`${index + 1}. ${ok ? "Верно" : "Нужно повторить"} — ${item.note}`);
  });
  ui.quizResult.innerHTML = `<strong>${score} / ${quiz.length}</strong><br>${comments.join("<br>")}`;
}

function renderSceneTabs() {
  ui.sceneTabs.innerHTML = scenes
    .map(
      (scene, index) => `
        <button class="tab-button ${index === state.sceneIndex ? "active" : ""}" type="button" data-scene-index="${index}" title="${scene.dataset.title}">
          ${index + 1}. ${sceneShortLabels[index] || scene.dataset.title}
        </button>
      `,
    )
    .join("");
}

function goToScene(index) {
  state.sceneIndex = clamp(index, 0, scenes.length - 1);
  scenes.forEach((scene, sceneIndex) => scene.classList.toggle("active", sceneIndex === state.sceneIndex));
  const activeTitle = scenes[state.sceneIndex].dataset.title;
  ui.sceneTitle.textContent = activeTitle;
  ui.sceneLabel.textContent = `Раздел ${state.sceneIndex + 1}: ${activeTitle}`;
  ui.progressText.textContent = `${state.sceneIndex + 1} / ${scenes.length}`;
  ui.progressFill.style.width = `${((state.sceneIndex + 1) / scenes.length) * 100}%`;
  ui.prevScene.disabled = state.sceneIndex === 0;
  ui.nextScene.textContent = state.sceneIndex === scenes.length - 1 ? "Сначала" : "Дальше";
  renderSceneTabs();
}

function attachEvents() {
  ui.prevScene.addEventListener("click", () => goToScene(state.sceneIndex - 1));
  ui.nextScene.addEventListener("click", () => {
    if (state.sceneIndex === scenes.length - 1) {
      goToScene(0);
      return;
    }
    goToScene(state.sceneIndex + 1);
  });

  ui.restartButton.addEventListener("click", () => goToScene(0));
  ui.heroNextButton.addEventListener("click", () => goToScene(1));
  ui.restartEnd.addEventListener("click", () => goToScene(0));
  ui.jumpButtons.forEach((button) => {
    button.addEventListener("click", () => goToScene(Number(button.dataset.jump)));
  });

  ui.sceneTabs.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.dataset.sceneIndex) {
      return;
    }
    goToScene(Number(target.dataset.sceneIndex));
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      goToScene(state.sceneIndex === scenes.length - 1 ? 0 : state.sceneIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      goToScene(state.sceneIndex - 1);
    }
  });

  ui.exampleSwitch.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.dataset.example) {
      return;
    }
    state.exampleKey = target.dataset.example;
    Array.from(ui.exampleSwitch.querySelectorAll("button")).forEach((button) => {
      button.classList.toggle("active", button.dataset.example === state.exampleKey);
    });
    drawExample();
  });

  document.querySelectorAll(".preset-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.distribution = cloneRows(button.dataset.preset);
      state.balanceRevealed = false;
      renderEditor();
      drawPmfAndCdf();
      drawBalance();
      resetSimulation();
    });
  });

  ui.editorRows.addEventListener("input", (event) => {
    const target = event.target;
    const index = Number(target.dataset.index);
    if (!Number.isInteger(index) || index < 0 || index >= state.distribution.length) {
      return;
    }

    if (target.dataset.role === "value") {
      state.distribution[index].value = Number(target.value);
    }
    if (target.dataset.role === "weight" || target.dataset.role === "weight-number") {
      state.distribution[index].weight = clamp(Number(target.value), 1, 100);
      renderEditor();
    }

    state.balanceRevealed = false;
    drawPmfAndCdf();
    drawBalance();
    resetSimulation();
  });

  ui.balanceSlider.addEventListener("input", () => {
    state.balanceGuess = Number(ui.balanceSlider.value);
    state.balanceRevealed = false;
    drawBalance();
  });

  ui.revealBalance.addEventListener("click", () => {
    state.balanceRevealed = true;
    drawBalance();
  });

  ui.snapBalance.addEventListener("click", () => {
    const sceneStats = stats(state.distribution);
    state.balanceGuess = sceneStats.expectation;
    ui.balanceSlider.value = String(sceneStats.expectation);
    state.balanceRevealed = true;
    drawBalance();
  });

  ui.simRunButtons.forEach((button) => {
    button.addEventListener("click", () => startSimulation(Number(button.dataset.count)));
  });
  ui.simPause.addEventListener("click", toggleSimulationPause);
  ui.simReset.addEventListener("click", resetSimulation);

  ui.quizOptions.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    state.quizAnswers[state.quizIndex] = Number(target.value);
  });
  ui.quizPrev.addEventListener("click", () => {
    state.quizIndex = clamp(state.quizIndex - 1, 0, quiz.length - 1);
    renderQuiz();
  });
  ui.quizNext.addEventListener("click", () => {
    state.quizIndex = clamp(state.quizIndex + 1, 0, quiz.length - 1);
    renderQuiz();
  });
  ui.quizCheck.addEventListener("click", evaluateQuiz);

  window.addEventListener("resize", () => {
    drawHeroSpark();
    drawContribution();
    drawExample();
    drawPmfAndCdf();
    drawBalance();
    drawSimulation();
    drawFinish();
  });
}

function init() {
  renderSceneTabs();
  goToScene(0);
  renderEditor();
  renderQuiz();
  drawHeroSpark();
  drawExample();
  drawPmfAndCdf();
  state.balanceGuess = 2;
  drawBalance();
  resetSimulation();
  drawFinish();
  attachEvents();
}

init();
