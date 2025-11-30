const answerKey = {
    math: [
      ["210"],
      ["15"],
      ["70"],
      ["500"],
      ["40"],
      ["9.8"],
      ["60", "60%"],
      ["81"],
      ["544"],
      ["43"]
    ],
    science: [
      ["gravity"],
      ["carbon dioxide", "co2"],
      ["the sun", "sun"],
      ["evaporation"],
      ["herbivore"],
      ["thermometer"],
      ["the sun", "sun"],
      ["orbit"],
      ["8", "eight"],
      ["precipitation"]
    ],
    history: [
      ["george washington", "washington"],
      ["july"],
      ["the constitution", "constitution", "u.s. constitution", "united states constitution"],
      ["great britain", "britain", "england", "united kingdom", "uk"],
      ["bill of rights", "the bill of rights"],
      ["pacific ocean", "pacific"],
      ["washington, d.c.", "washington dc", "washington d c", "dc", "d.c."],
      ["george washington", "washington"],
      ["mayflower", "the mayflower"],
      ["mississippi river", "mississippi"]
    ],
    english: [
      ["because"],
      ["problem"],
      ["pencil"],
      ["friend"],
      ["answer"],
      ["school"],
      ["example"],
      ["really"],
      ["different"],
      ["around"]
    ]
  };
  
  function normalize(str) {
    return String(str).trim().toLowerCase();
  }
  
  function showTest(subject) {
    const sections = document.querySelectorAll(".test-section");
    sections.forEach(sec => sec.classList.remove("active"));
    const active = document.getElementById(subject);
    if (active) active.classList.add("active");
  
    const buttons = document.querySelectorAll(".nav-links button");
    buttons.forEach(btn => btn.classList.remove("active"));
    buttons.forEach(btn => {
      if (btn.textContent.trim().toLowerCase().includes(subject)) {
        btn.classList.add("active");
      }
    });
  
    const titleMap = {
      math: "Math Test",
      science: "Science Test",
      history: "History Test",
      english: "English Test"
    };
    document.getElementById("test-title").textContent =
      titleMap[subject] || "5th Grade Test";
  }
  
  function checkAnswers(subject) {
    const form = document.getElementById(subject);
    const inputs = form.querySelectorAll("input");
    const answers = answerKey[subject];
    let correct = 0;
  
    inputs.forEach((input, index) => {
      const user = normalize(input.value);
      const key = answers[index];
      if (!user) return;
      if (Array.isArray(key)) {
        for (let option of key) {
          if (user === normalize(option)) {
            correct++;
            break;
          }
        }
      } else {
        if (user === normalize(key)) {
          correct++;
        }
      }
    });
  
    const resultEl = document.getElementById(`result-${subject}`);
    resultEl.textContent = `You got ${correct} out of 10 correct.`;
  }
  