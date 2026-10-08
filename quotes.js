// Phases: far (>30 days), mid (8-30), close (3-7), final (1-2), today (event day / ongoing), done (nothing left).
// Categories: any (always mixed in), run, career. {n} = days left, {title} = event name.
const QUOTES = {
  gentle: {
    any: {
      far: [
        "Small steps every day add up to something big. Just show up today.",
        "You have time, and time is a gift. Use a little of it well today.",
        "Consistency beats intensity. One good day at a time.",
      ],
      mid: [
        "{n} days to {title}. You're closer than you think, so keep going.",
        "Be proud of the work you've already put in. Now add to it.",
        "Progress, not perfection. A decent day today is a win.",
      ],
      close: [
        "{n} days left. Trust your preparation and stay steady.",
        "You've done the hard part. Now just keep it smooth and calm.",
        "Look after yourself: sleep, food, water. They count as prep too.",
      ],
      final: [
        "Almost there. Breathe, trust yourself, and keep things light.",
        "You are ready. Rest well and let the work do its job.",
        "Nothing new now. Just calm confidence in what you've built.",
      ],
      today: [
        "Today is the day you've been preparing for. Be proud and enjoy it.",
        "Take a deep breath. You belong here. Go and do your thing.",
        "Whatever happens today, you showed up and gave it your all.",
      ],
      done: [
        "You did the work. Rest, reflect, and be kind to yourself.",
        "Chapter closed. Add a new goal when you're ready.",
        "Well done for seeing it through. What's next?",
      ],
    },
    run: {
      far: [
        "Every easy run is a deposit in the bank. Keep making them.",
        "Lace up. You never regret the run you did, only the one you skipped.",
      ],
      mid: [
        "Your legs are getting stronger every week. Be patient with them.",
        "Easy pace, steady breathing. The long run builds you quietly.",
      ],
      close: [
        "Taper time is coming. Trust your legs and keep the mileage sensible.",
        "21.1 km is just a lot of single steps. You know how to take steps.",
      ],
      final: [
        "Prep your kit, hydrate, sleep early. The race is already mostly won.",
        "Tomorrow your legs get to show what they've learned. Rest them well.",
      ],
      today: [
        "Start slow, smile early, and enjoy the 21 km. You've earned this.",
        "Run your own race. Every kilometre is yours.",
      ],
      done: ["You ran a half marathon. Let that sink in, and enjoy the recovery."],
    },
    career: {
      far: [
        "A little prep each day beats a panicked week later. Do one block today.",
        "Practise the basics, tell your story, and keep going gently.",
      ],
      mid: [
        "Revise a topic, practise one interview answer. Small, steady wins.",
        "Your story is worth telling well. Rehearse it a little today.",
      ],
      close: [
        "Polish your intro and your best three stories. You know more than you think.",
        "Mock interviews aren't scary, they're practice. Do one today.",
      ],
      final: [
        "Sort your documents, rest your mind, and trust your preparation.",
        "You are prepared. Sleep well and let your best self show up.",
      ],
      today: [
        "Be curious, be yourself, and listen well. They're meeting a person, not a test.",
        "One conversation at a time. You've got this.",
      ],
      done: ["The season is done. Whatever comes next, you gave it a real go."],
    },
  },

  drill: {
    any: {
      far: [
        "Nobody is coming to do it for you. Get up and get it done.",
        "Comfort is a thief. {n} days is plenty of time to waste if you let it.",
        "Discipline today, results later. No negotiating.",
      ],
      mid: [
        "{n} days to {title}. Every skipped session shows up on the day.",
        "Motivation is a mood. Discipline is a decision. Decide.",
        "You didn't come this far to coast. Do the work.",
      ],
      close: [
        "{n} days. The clock isn't slowing down, so stop drifting.",
        "No excuses, no shortcuts. Finish every session.",
        "Your competition is training right now. Are you?",
      ],
      final: [
        "{n} days. Sharp, focused, no slacking. Finish strong.",
        "Everything you've done counts now. Don't throw it away on a lazy day.",
        "Eyes up. Execute the plan. No drama.",
      ],
      today: [
        "This is it. You trained for this. Go and take it.",
        "No nerves, no hesitation. Execute.",
        "Leave nothing in the tank. Today you perform.",
      ],
      done: [
        "Done. Debrief honestly, fix what failed, then set the next target.",
        "Good. Now pick the next hard thing. Don't get comfortable.",
        "The finish line is the starting line of the next goal.",
      ],
    },
    run: {
      far: [
        "Run when it's cold. Run when you don't feel like it. Especially then.",
        "The long run won't run itself. Shoes on, now.",
      ],
      mid: [
        "Bad day? Run anyway. 21 km doesn't care about your mood.",
        "Every missed long run is a kilometre you'll pay for in November.",
      ],
      close: [
        "Hit your mileage. Hit your pace. Hit your sleep. All three.",
        "Pain is temporary, a DNF stays on the record. Train like it.",
      ],
      final: [
        "Taper means rest, not laziness. Eat, hydrate, sleep. Be ready.",
        "You know the pace. Don't go out too fast. Discipline until the gun.",
      ],
      today: [
        "Go out controlled, finish strong. 21.1 km, no mercy on yourself.",
        "The wall is a story. Don't believe it. Keep moving.",
      ],
      done: ["Race done. Recover properly, then decide the next distance."],
    },
    career: {
      far: [
        "Placements reward the prepared. Grind the basics daily, starting now.",
        "Be the candidate who put in the hours while others scrolled.",
      ],
      mid: [
        "Solve problems. Mock interviews. Fix your weak spots, not your strong ones.",
        "{n} days. If you haven't done a mock interview this week, do one now.",
      ],
      close: [
        "Rehearse until your answers are second nature. Out loud, not in your head.",
        "Weak topics first. Comfort-zone revision is procrastination.",
      ],
      final: [
        "Final polish only. Documents ready, stories sharp, sleep locked in.",
        "You either prepared or you didn't. Walk in like you did.",
      ],
      today: [
        "Show up sharp. Speak clearly. Own every question.",
        "Every round is a chance. Take each one seriously and win it.",
      ],
      done: ["Season over. Review every round honestly and learn from it."],
    },
  },
};

if (typeof module !== "undefined" && module.exports) module.exports = QUOTES;
