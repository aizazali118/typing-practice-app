export interface TextContent {
  id: number;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const textDatabase: TextContent[] = [
  // Easy texts (simple words, common vocabulary)
  {
    id: 1,
    text: "The cat sat on the mat. It was a sunny day. Birds were singing in the trees. The cat was happy and purr. The warm sun made everything feel nice and calm.",
    difficulty: 'easy'
  },
  {
    id: 2,
    text: "I like to read books. Books take me to new places. I can learn many things from reading. My favorite books are about space and stars in the sky.",
    difficulty: 'easy'
  },
  {
    id: 3,
    text: "The dog ran fast in the park. Children played on the swings. The sky was blue with white clouds. Everyone was having fun on this beautiful day.",
    difficulty: 'easy'
  },
  {
    id: 4,
    text: "She loves to cook food for her family. Today she made soup and bread. The kitchen smells so good. Everyone sits at the table to eat together.",
    difficulty: 'easy'
  },
  {
    id: 5,
    text: "My room has a big window. I can see the street from my bed. At night, I watch the stars. They shine bright in the dark sky above my house.",
    difficulty: 'easy'
  },
  {
    id: 6,
    text: "We went to the beach last summer. The sand was warm under my feet. I built a castle near the water. Waves came and washed it away slowly.",
    difficulty: 'easy'
  },
  {
    id: 7,
    text: "The flowers in the garden are blooming. Red roses and yellow daisies grow tall. Bees buzz around them all day. The garden looks like a rainbow.",
    difficulty: 'easy'
  },
  {
    id: 8,
    text: "My best friend lives next door. We play games every day after school. Sometimes we ride our bikes to the park. We always have so much fun together.",
    difficulty: 'easy'
  },
  {
    id: 9,
    text: "Rain falls on the roof at night. The sound helps me fall asleep. I dream of adventures far away. Morning comes with bright sunshine through my window.",
    difficulty: 'easy'
  },
  {
    id: 10,
    text: "The old tree in our yard is very tall. It has many branches and green leaves. Birds make nests in the tree. We sit under it when the day is hot.",
    difficulty: 'easy'
  },

  // Medium texts (complex sentences, varied vocabulary)
  {
    id: 11,
    text: "Technology has transformed the way we communicate with each other. Social media platforms connect people across continents instantly. However, this convenience comes with challenges regarding privacy and mental health that society must address.",
    difficulty: 'medium'
  },
  {
    id: 12,
    text: "Climate change represents one of the greatest challenges facing humanity today. Rising temperatures affect ecosystems worldwide, causing unpredictable weather patterns. Scientists emphasize the urgent need for sustainable practices and renewable energy adoption.",
    difficulty: 'medium'
  },
  {
    id: 13,
    text: "The evolution of artificial intelligence continues to reshape various industries. From healthcare diagnostics to autonomous vehicles, AI applications expand daily. Ethical considerations surrounding these technologies require careful deliberation and regulation.",
    difficulty: 'medium'
  },
  {
    id: 14,
    text: "Urban planning focuses on creating sustainable and livable cities for future generations. Green spaces, efficient public transportation, and mixed-use developments contribute to better quality of life. Modern architects balance functionality with environmental consciousness.",
    difficulty: 'medium'
  },
  {
    id: 15,
    text: "The human brain remains one of the most complex structures in the known universe. Neuroscientists study neural pathways to understand consciousness, memory, and emotion. Recent breakthroughs in brain imaging reveal fascinating insights into cognitive processes.",
    difficulty: 'medium'
  },
  {
    id: 16,
    text: "Global trade networks have become increasingly interconnected over the past decades. Supply chains span multiple countries, creating economic interdependence. This globalization brings both opportunities for growth and vulnerabilities to disruptions.",
    difficulty: 'medium'
  },
  {
    id: 17,
    text: "Education systems worldwide are adapting to digital learning environments. Online platforms provide access to knowledge previously unavailable to many. Teachers develop innovative methods to engage students in virtual classrooms effectively.",
    difficulty: 'medium'
  },
  {
    id: 18,
    text: "Renewable energy sources like solar and wind power gain momentum globally. Governments invest in clean technology to reduce carbon emissions. The transition from fossil fuels requires significant infrastructure changes and political will.",
    difficulty: 'medium'
  },
  {
    id: 19,
    text: "Space exploration pushes the boundaries of human achievement and scientific understanding. Missions to Mars and beyond capture public imagination. Private companies join government agencies in the quest to explore our solar system.",
    difficulty: 'medium'
  },
  {
    id: 20,
    text: "Mental health awareness has increased significantly in recent years. Society recognizes the importance of psychological well-being alongside physical health. Access to counseling services and support systems continues to improve gradually.",
    difficulty: 'medium'
  },

  // Hard texts (technical language, complex structures)
  {
    id: 21,
    text: "Quantum mechanics fundamentally challenges our classical understanding of reality, introducing probabilistic interpretations of particle behavior. The superposition principle suggests particles exist in multiple states simultaneously until observation occurs, collapsing the wave function into definite outcomes.",
    difficulty: 'hard'
  },
  {
    id: 22,
    text: "Cryptocurrency blockchain technology employs cryptographic algorithms to ensure transactional integrity and decentralization. Distributed ledger systems eliminate intermediaries, though scalability and energy consumption remain significant obstacles to widespread adoption.",
    difficulty: 'hard'
  },
  {
    id: 23,
    text: "Epigenetic modifications influence gene expression without altering DNA sequences, demonstrating environmental factors' profound impact on heredity. Methylation patterns and histone acetylation regulate cellular differentiation processes throughout organismal development.",
    difficulty: 'hard'
  },
  {
    id: 24,
    text: "Macroeconomic policies utilize fiscal and monetary instruments to stabilize economic fluctuations and promote sustainable growth. Central banks manipulate interest rates and money supply, while governments adjust taxation and expenditure levels accordingly.",
    difficulty: 'hard'
  },
  {
    id: 25,
    text: "Neural network architectures employ backpropagation algorithms to optimize weight parameters through gradient descent methodology. Convolutional layers extract hierarchical features from input data, enabling sophisticated pattern recognition capabilities.",
    difficulty: 'hard'
  },
  {
    id: 26,
    text: "Phenomenological approaches in philosophy examine consciousness from first-person perspectives, bracketing presuppositions about external reality. Intentionality describes consciousness's inherent directedness toward objects of experience and thought.",
    difficulty: 'hard'
  },
  {
    id: 27,
    text: "Thermodynamic principles govern energy transformations in closed systems, with entropy quantifying disorder and unavailable energy. The second law establishes irreversibility in natural processes, constraining perpetual motion machines' impossibility.",
    difficulty: 'hard'
  },
  {
    id: 28,
    text: "Immunological responses involve intricate coordination between innate and adaptive immune mechanisms. T-lymphocytes and B-lymphocytes recognize antigenic epitopes through receptor specificity, initiating targeted pathogen elimination processes.",
    difficulty: 'hard'
  },
  {
    id: 29,
    text: "Topological manifolds generalize geometric spaces, permitting continuous deformations while preserving intrinsic properties. Differential geometry applies calculus to curved spaces, enabling general relativity's mathematical formulation.",
    difficulty: 'hard'
  },
  {
    id: 30,
    text: "Syntactic structures in transformational grammar distinguish surface and deep linguistic representations. Chomsky's universal grammar hypothesis posits innate language acquisition devices underlying human linguistic competence.",
    difficulty: 'hard'
  },
  {
    id: 31,
    text: "Nanomaterial synthesis techniques leverage quantum confinement effects to engineer novel properties at molecular scales. Self-assembly processes create ordered nanostructures through thermodynamically favorable configurations.",
    difficulty: 'hard'
  },
  {
    id: 32,
    text: "Constitutional jurisprudence interprets fundamental legal principles through precedent and statutory construction. Judicial review mechanisms balance governmental powers, ensuring adherence to constitutional constraints.",
    difficulty: 'hard'
  }
];

/**
 * Get random text based on difficulty
 */
export function getRandomText(difficulty: 'easy' | 'medium' | 'hard', excludeId?: number): TextContent {
  const filteredTexts = textDatabase.filter(
    t => t.difficulty === difficulty && t.id !== excludeId
  );
  
  if (filteredTexts.length === 0) {
    // Fallback to all texts of that difficulty if no non-excluded texts available
    return textDatabase.filter(t => t.difficulty === difficulty)[0];
  }
  
  const randomIndex = Math.floor(Math.random() * filteredTexts.length);
  return filteredTexts[randomIndex];
}

/**
 * Get random words for game mode
 */
export function getRandomWords(count: number): string[] {
  const words = [
    'hello', 'world', 'type', 'fast', 'quick', 'jump', 'run', 'code', 'learn', 'practice',
    'keyboard', 'speed', 'accuracy', 'skill', 'master', 'challenge', 'focus', 'improve',
    'develop', 'create', 'build', 'design', 'think', 'solve', 'achieve', 'succeed',
    'computer', 'program', 'function', 'variable', 'constant', 'algorithm', 'data',
    'structure', 'interface', 'component', 'element', 'method', 'property', 'value',
    'string', 'number', 'boolean', 'array', 'object', 'class', 'module', 'import',
    'export', 'return', 'async', 'await', 'promise', 'callback', 'event', 'handler'
  ];
  
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    result.push(randomWord);
  }
  return result;
}
