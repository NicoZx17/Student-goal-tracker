let goals = [];

function addGoal() {
  const goalText = document.getElementById('goalInput').value.trim();
  if (goalText === "") return;

  const goal = { text: goalText, completed: false };
  goals.push(goal);
  document.getElementById('goalInput').value = "";
  renderGoals();
}

function renderGoals() {
  const list = document.getElementById('goalList');
  list.innerHTML = "";

  goals.forEach((goal, index) => {
    const li = document.createElement('li');
    li.innerHTML = \`
      <input type="checkbox" \${goal.completed ? "checked" : ""} 
             onchange="toggleGoal(\${index})">
      \${goal.text}
    \`;
    list.appendChild(li);
  });
}

function toggleGoal(index) {
  goals[index].completed = !goals[index].completed;
  renderGoals();
}

function generatePrompt() {
  const prompts = [
    "What’s one small step you can take toward your main goal today?",
    "Which task today aligns most with your career vision?",
    "How does your current study plan help your long-term goal?",
    "What would your future self thank you for doing today?"
  ];

  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  document.getElementById('promptOutput').innerText = randomPrompt;
}

function exportData(format) {
  let dataStr = "";
  let fileName = \`goals.\${format}\`;

  if (format === "json") {
    dataStr = JSON.stringify(goals, null, 2);
  } else if (format === "csv") {
    const header = "Goal,Completed\n";
    const rows = goals.map(g => \`"\${g.text}",\${g.completed}\`).join("\n");
    dataStr = header + rows;
  } else {
    alert("Unsupported format");
    return;
  }

  const blob = new Blob([dataStr], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}
