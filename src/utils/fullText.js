const promptType = {
  yesNo: 'yesNo',
  smallText: 'smallText',
  bigText: 'bigText',
};

export default [
  {
    title:
      'Just for today, my thoughts will be on my recovery, living and enjoying life without the use of drugs.',
    prompts: [
      { text: 'Am I clean today?', type: promptType.yesNo },
      { text: 'How have I acted differently?', type: promptType.bigText },
      {
        text: 'Did my disease run my life today?',
        type: promptType.yesNo,
        sub: { text: 'If so, how?', type: promptType.bigText },
      },

      { text: 'What did I do today that I wish I had not done?', type: promptType.bigText },
      { text: 'What have I left undone that I wish I had done?', type: promptType.bigText },
      {
        text: 'Was I good to myself today?',
        type: promptType.yesNo,
        sub: { text: 'How?', type: promptType.bigText },
      },

      { text: 'Was today a good day?', type: promptType.yesNo },
      { text: 'Was I happy?', type: promptType.yesNo },
      { text: 'Was I serene?', type: promptType.yesNo },
    ],
  },

  {
    title:
      'Just for today I will have faith in someone in NA who believes in me and wants to help me in my recovery.',
    prompts: [
      { text: 'Did I talk to my sponsor today?', type: promptType.yesNo },
      {
        text: 'Did I attend a meeting today?',
        type: promptType.yesNo,
        sub: { text: 'Where?', type: promptType.smallText },
      },

      { text: 'Did I share my experiences, strengths, and hopes?', type: promptType.yesNo },
      { text: 'Who are the people in my life that I trust today?', type: promptType.smallText },
      { text: 'Who has trust in me today?', type: promptType.smallText },
    ],
  },

  {
    title:
      'Just for today I will have a program; I will try to follow it to the best of my ability.',
    prompts: [
      { text: 'Did I read from our literature today?', type: promptType.yesNo },
      { text: 'What steps did I consciously work?', type: promptType.smallText },
      { text: 'Did I admit my powerlessness today?', type: promptType.yesNo },
      { text: 'Was I able to put my trust in my Higher Power today?', type: promptType.yesNo },
      { text: 'What did I learn about myself today?', type: promptType.bigText },
      { text: 'Did I make any amends today?', type: promptType.yesNo },
      { text: 'Do I owe any?', type: promptType.yesNo },
      { text: 'Did I admit fault to anyone today?', type: promptType.yesNo },
      { text: 'Did I worry about yesterday or tomorrow?', type: promptType.yesNo },
      { text: 'Can I accept myself as I am today?', type: promptType.yesNo },
    ],
  },

  {
    title: 'Just for today, through NA, I will try to get a better perspective on my life.',
    prompts: [
      { text: 'Did I feel like I was a part of humanity today?', type: promptType.yesNo },
      { text: 'Did I allow myself to become obsessed by anything today?', type: promptType.yesNo },
      { text: 'What has God given me to be grateful for today?', type: promptType.bigText },
      {
        text: 'Have I done anything to cause harm to myself or to another today?',
        type: promptType.yesNo,
        sub: { text: 'If so, what?', type: promptType.bigText },
      },

      { text: 'Am I willing to change today?', type: promptType.yesNo },
      {
        text: 'Did I pray or meditate today?',
        type: promptType.yesNo,
        sub: { text: 'How did this affect my life?', type: promptType.bigText },
      },

      {
        text: 'What spiritual principles have I been able to practice in my life today?',
        type: promptType.bigText,
      },
      {
        text: 'Was the most important thing in my life today staying clean?',
        type: promptType.yesNo,
      },
    ],
  },

  {
    title:
      'Just for today I will be unafraid, my thoughts will be on my new associations, people who are not using and have found a new way of life. So long as I follow that way, I have nothing to fear.',
    prompts: [
      {
        text: 'Have I given of myself today without expecting anything in return?',
        type: promptType.yesNo,
      },
      { text: 'Was there fear in my life today?', type: promptType.yesNo },
      { text: 'Did I feel intense joy or pain?', type: promptType.yesNo },
      { text: 'Did I call or visit someone in the program today?', type: promptType.yesNo },
      { text: 'Did I pray for the well-being of another today?', type: promptType.yesNo },
      { text: 'Was I happy today?', type: promptType.yesNo },
      { text: 'Have I been peaceful today?', type: promptType.yesNo },
      { text: 'Did I consciously remember that I have a choice today?', type: promptType.yesNo },
    ],
  },

  {
    title:
      'Dear God, show me what I have done right and wrong today. Show me how I can better live and serve your will tomorrow.',
    prompts: [{ text: 'Notes', type: promptType.bigText }],
  },
];
