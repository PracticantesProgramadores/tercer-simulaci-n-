const questions = [
  {
    id: 1,
    prompt: "¿Cuál es el propósito principal del texto narrativo?",
    options: [
      "Explicar fenómenos científicos",
      "Preservar experiencias y contar historias",
      "Hacer descripciones detalladas de lugares",
      "Convencer al lector de una opinión"
    ],
    correct: 1
  },
  {
    id: 2,
    prompt: "¿Qué elementos son indispensables para construir un texto narrativo?",
    options: [
      "Tono, voz y métrica",
      "Tiempo, espacio, personajes, trama y narrador",
      "Introducción, citas y conclusión",
      "Ideas principales y secundarias"
    ],
    correct: 1
  },
  {
    id: 3,
    prompt: "¿Qué caracteriza a la novela dentro de las formas narrativas?",
    options: [
      "Ser breve y con solo un personaje",
      "Ser una narración oral sin estructura",
      "Ser más extensa y compleja que un cuento",
      "Tratar solo hechos reales"
    ],
    correct: 2
  },
  {
    id: 4,
    prompt: "¿Cuál de los siguientes textos organiza los hechos en orden temporal?",
    options: [
      "El mito",
      "La crónica",
      "La poesía épica",
      "La biografía"
    ],
    correct: 1
  },
  {
    id: 5,
    prompt: "¿Qué tipo de narrador conoce todo lo que ocurre en la historia?",
    options: [
      "Protagonista",
      "Testigo",
      "Omnisciente",
      "Secundario"
    ],
    correct: 2
  },
  {
    id: 6,
    prompt: "¿Qué determina el espacio en un texto narrativo?",
    options: [
      "La intención del autor",
      "El lugar donde ocurren los hechos",
      "La duración aproximada del relato",
      "La apariencia de los personajes"
    ],
    correct: 1
  },
  {
    id: 7,
    prompt: "¿Qué se requiere para escribir un buen texto narrativo según el texto?",
    options: [
      "Usar rimas y versos",
      "Planificar: definir tema, investigar y organizar ideas",
      "Escribir sin estructura para mayor creatividad",
      "Incluir siempre diálogos"
    ],
    correct: 1
  },
  {
    id: 8,
    prompt: "¿Qué característica distingue a la crónica?",
    options: [
      "Sucesos imaginarios",
      "Narración en desorden para crear suspenso",
      "Hechos reales vividos por el autor en orden temporal",
      "Lenguaje técnico y científico"
    ],
    correct: 2
  },
  {
    id: 9,
    prompt: "¿Cuál es la estructura básica de una crónica?",
    options: [
      "Portada, índice y bibliografía",
      "Título, introducción, desarrollo y conclusión",
      "Inicio, nudo y desenlace",
      "Versos y estrofas"
    ],
    correct: 1
  },
  {
    id: 10,
    prompt: "¿Qué tipos de crónica menciona el texto?",
    options: [
      "De terror, humorística y fantástica",
      "Argumentativa, informativa y poética",
      "Histórica, literaria, deportiva, cultural, periodística, de viaje y de guerra",
      "Cotidiana, breve y libre"
    ],
    correct: 2
  }
]

const letters = ["A", "B", "C", "D"]

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const t = array[i]
    array[i] = array[j]
    array[j] = t
  }
  return array
}

function createOption(name, idx, text, value) {
  const wrapper = document.createElement("label")
  wrapper.className = "option"
  const input = document.createElement("input")
  input.type = "radio"
  input.name = name
  input.value = String(value)
  const spanLetter = document.createElement("span")
  spanLetter.textContent = letters[idx]
  const spanText = document.createElement("span")
  spanText.textContent = text
  spanText.style.flex = "1"
  wrapper.appendChild(input)
  wrapper.appendChild(spanLetter)
  wrapper.appendChild(spanText)
  return wrapper
}

function clearQuiz() {
  const container = document.getElementById("quiz")
  container.innerHTML = ""
}

let currentQuestions = []
let currentIndex = 0
let answers = []

function updateProgress() {
  const total = currentQuestions.length
  const answered = answers.filter(v => v !== null).length
  const percent = Math.round((answered / total) * 100)
  const bar = document.getElementById("progress-bar")
  const progressText = document.getElementById("progress-text")
  const stepText = document.getElementById("step-text")
  if (bar) bar.style.width = percent + "%"
  if (progressText) progressText.textContent = `Progreso: ${answered}/${total}`
  if (stepText) stepText.textContent = `Pregunta ${Math.min(currentIndex + 1, total)} de ${total}`
}

function renderQuestion() {
  const container = document.getElementById("quiz")
  container.innerHTML = ""
  const q = currentQuestions[currentIndex]

  const card = document.createElement("div")
  card.className = "question"
  const prompt = document.createElement("div")
  prompt.className = "prompt"
  prompt.textContent = q.prompt
  const options = document.createElement("div")
  options.className = "options"
  q.optionsShuffled.forEach((opt, idx) => {
    options.appendChild(createOption("q", idx, opt.text, opt.originalIndex))
  })
  card.appendChild(prompt)
  card.appendChild(options)
  container.appendChild(card)

  const nextBtn = document.getElementById("next")
  nextBtn.textContent = currentIndex === currentQuestions.length - 1 ? "Terminar" : "Siguiente"

  const result = document.getElementById("result")
  result.style.display = "none"
  result.innerHTML = ""
  updateProgress()
}

function evaluateQuiz() {
  let correct = 0
  currentQuestions.forEach((q, i) => {
    const value = answers[i]
    if (value === q.correct) correct += 1
  })
  const total = questions.length
  const wrong = total - correct
  const grade = Math.round((correct / total) * 1000) / 100
  const result = document.getElementById("result")
  result.innerHTML = `
    <div class="score">Correctas: ${correct} | Incorrectas: ${wrong}</div>
    <div class="detail">Calificación: ${grade}/10 — Redirigiendo a la página de inicio...</div>
  `
  result.style.display = "block"
  setTimeout(() => {
    window.location.href = "index.html"
  }, 2500)
}

document.addEventListener("DOMContentLoaded", () => {
  currentQuestions = shuffle([...questions]).map(q => ({
    prompt: q.prompt,
    correct: q.correct,
    optionsShuffled: shuffle(q.options.map((text, originalIndex) => ({ text, originalIndex })))
  }))
  currentIndex = 0
  answers = new Array(currentQuestions.length).fill(null)
  renderQuestion()

  const nextBtn = document.getElementById("next")
  nextBtn.addEventListener("click", () => {
    const selected = document.querySelector("input[name='q']:checked")
    const value = selected ? Number(selected.value) : null
    if (value === null) return
    answers[currentIndex] = value
    updateProgress()
    if (currentIndex === currentQuestions.length - 1) {
      evaluateQuiz()
    } else {
      currentIndex += 1
      renderQuestion()
    }
  })
})
