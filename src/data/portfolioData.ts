import chemtrailsCover from '../assets/images/chemtrails.png';
import travelerReturnsImg from '../assets/images/traveler_returns_project_1792135912308.jpg';
import maydayImg from '../assets/images/mayday1.png';
import haegisxImg from '../assets/images/haegisx.png';
import vanadiImg from '../assets/images/vanadi_biographical_ai_1792135913223.jpg';

export interface Highlight {
  id: string;
  title: string;
  description: string;
  iconName: 'book' | 'atom' | 'bookmark' | 'compass';
}

export interface Poem {
  id: string;
  title: string;
  category: string;
  publication?: string;
  year: string;
  shortExcerpt: string;
  fullStanzas: string[];
  theme: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  status: 'Published' | 'Forthcoming' | 'Active Initiative' | 'In Development';
  tagline: string;
  description: string;
  longDescription: string[];
  image: string;
  actionLabel?: string;
  link?: string;
  isExternal?: boolean;
  accentDark?: boolean;
}

export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string[];
}

export const PORTFOLIO_DATA = {
  author: {
    brandName: "haegis",
    fullName: "Taiwo Akinyemi",
    email: "ighaegis@gmail.com",
    instagram: "https://instagram.com/haegis",
    instagramHandle: "@haegis",
    location: "Lagos, Nigeria",
    bio: [
      "I'm Taiwo Akinyemi, a poet, physicist by training, and multidisciplinary builder known professionally as haegis.",
      "My interests span poetry, physics, literature, technology, and entrepreneurship. I'm drawn to the questions that connect them: how the universe works, how we make sense of being human, and how an idea moves from imagination into reality.",
      "I find wonder in the natural world, meaning in language, and possibility in things yet to be built. I'm interested in both the things we can observe and the things we are still learning to understand.",
      "Poetry, physics, and building are different ways I engage with the world. One allows me to explore experience through language, another invites me to question what lies beneath appearances, and the third gives me the means to turn ideas into something tangible.",
      "haegis is where these pursuits converge."
    ],
    academicNote: "A background in Physics forms the cognitive foundation of my creative inquiry — observing thermodynamic principles, celestial motion, and wave behaviors as metaphors for human interiority."
  },

  highlights: [
    {
      id: "lit",
      title: "Poetry & Literature",
      description: "Published in literary magazines including Isele, Praxis, The African Magazine, Kalahari Review, and Okadabooks.",
      iconName: "book"
    },
    {
      id: "physics",
      title: "Physics & the Universe",
      description: "A background in Physics, with enduring interests in astrophysics, space physics, and the fundamental workings of the universe.",
      iconName: "atom"
    },
    {
      id: "books",
      title: "Books & Ideas",
      description: "Creator of Chemtrails & Constellations, with The Traveler Returns forthcoming.",
      iconName: "bookmark"
    },
    {
      id: "ventures",
      title: "Independent Ventures",
      description: "Exploring technology, entrepreneurship, and ideas that connect creativity with practical systems.",
      iconName: "compass"
    }
  ] as Highlight[],

  chemtrailsBook: {
    title: "CHEMTRAILS & CONSTELLATIONS",
    subtitle: "Poems on love, memory, solitude, and the strange wonder of being alive.",
    chapbookDescription: "The first chapbook by haegis. A collection of poems tracing the things we remember, the people we become, the distances between us, and the quiet ways the universe finds its way into our lives.\n\nSomewhere between the earthbound and the celestial, these poems linger on what it means to love, to lose, to wonder, and to exist.",
    coverImage: chemtrailsCover,
    actionLabel: "Explore the collection ↗",
    samplePoem: {
      title: "on earth angels are penguins",
      verses: [
        "on earth",
        "all angels are penguins",
        "the adaptable ones survive",
        "the unfortunate ones",
        "get trampled on."
      ]
    }
  },

  poems: [
    {
      id: "what-we-own",
      title: "what we own",
      category: "Love & Poetics",
      publication: "From Chemtrails & Constellations",
      year: "2024",
      theme: "Memory / Devotion",
      shortExcerpt: "the drily february night crawling out of sight, you roamed the streets running out of rhymes...",
      fullStanzas: [
        "the drily february night\ncrawling out of sight,\n\nyou roamed the streets\nrunning out of rhymes.",
        "it lingers in your reach\n&concealed deep within\n\nyou walked the long road to\ntry and find your fire.",
        "scribbler sharpening pens\npoets catching fires\n\nwe forgot how to love but\nhey boy do we try",
        "&for all i really know\nyou're all i truly own\n\nthis is the part of me that\nwill never leave."
      ]
    },
    {
      id: "how-i-became-a-poet",
      title: "how i became a poet",
      category: "Love & Poetics",
      publication: "From Chemtrails & Constellations",
      year: "2024",
      theme: "Poetics / Calling",
      shortExcerpt: "i wrote a song, hum its tune until i passed out. when i woke the melody was gone with the night...",
      fullStanzas: [
        "i wrote a song\n           hum its tune\nuntil i passed out",
        "when i woke\n          the melody was\ngone with the night",
        "all that was left\n             were scribings–\na ballad with broken legs",
        "so i picked it up,\n        added a pair of wings,\n&called it poetry."
      ]
    },
    {
      id: "she-is-art",
      title: "She is Art",
      category: "Published Works",
      publication: "Praxis Magazine",
      year: "2023",
      theme: "The Muse / Praise",
      shortExcerpt: "She is dark and dazzling, beautiful and bewitching. The aura lingering in an enchanted garden...",
      fullStanzas: [
        "She is\nDark and dazzling,\nBeautiful and bewitching.",
        "She is\nthe aura lingering in an enchanted garden.\nSeen, yet completely unseen.\nThe treasure in your reach, yet untouched.",
        "She is\nLike a wildflower in the mountains of bees.",
        "She is a river. Young men went down\nto listen to the willows weep. They\nnever returned.",
        "She is the subtle ingredient in every masterpiece.\n\nShe is Art."
      ]
    },
    {
      id: "sand-house",
      title: "Sand house",
      category: "Memory & Place",
      publication: "Isele Magazine",
      year: "2024",
      theme: "Memory & Maternal Loss",
      shortExcerpt: "The last time I saw her, I was four. The grip of rainfall on that season was like hands around the throat...",
      fullStanzas: [
        "The last time I saw her, \nI was four.\nThe grip of rainfall on that season was \nLike hands around the throat. \nAnd it was an April, after the hesitant \nOutgoing of the dusty winds of harmattan.",
        "Sand house evening. We squat \nOn the chilly sand ground and \nBuild: piling brown petrichor \nScented sand, very gently, \nOver our divine little feet; \nMolding like art entwining itself \nAround the soul.",
        "When we were through, it looked \nLike the Great Pyramid of Giza. \nThere was an irregular hole at its base \nWith the cryptic visage of a chasm. \nI started to think of it as\nA bottomless pit: dark and dry and infinite.",
        "Amidst the bustle of the streets,\nThere was a woman quite unnoticed\nIn plain tie-dye wrapper and\nThat blouse she rarely wears: \nA cloak for the scars that won't heal. \nThis was my mother leaving \nFor the first and the last time."
      ]
    },
    {
      id: "necklacing",
      title: "Necklacing",
      category: "Published Works",
      publication: "Isele Magazine",
      year: "2023",
      theme: "Justice, Bigotry & Mourning",
      shortExcerpt: "Eight years ago, and less than a mile from my grandfather’s house, an angry mob killed a man and burned his corpse...",
      fullStanzas: [
        "Eight years ago, and less than a mile\nfrom my grandfather’s house,\n             an angry mob killed a man and burned his corpse. \nNecklacing. The petrol-filled tire burned through and through \nuntil naked, stiff and charred flesh was all that remained. \n                                                          The young man, an Igbo, \nreportedly shot his Yoruba landlord’s daughter. \nSome of the witnesses testified that it was a mistake,\n                             but the irate crowd were too antsy to reason,\ntheir clamors of  “We refused to be terrorised in our own home”\nrent the afternoon air and made the town quiver.",
        "After the deed, \nthe perpetrators fled, \nleaving behind only the sickening smell                              and a statistic was added to the world’s pain.",
        "Now. This is not merely the story of how a man was lynched, \nor about the men who did it. \n                                                                       This is a poem\nof livid, raging disgust\nat the devilry of the voices whispering\n                                              that the young man deserved it,                                           \nand all the bigots around the world \nwho live with their hate around their necks,\n                                 burning our world to ashes."
      ]
    },
    {
      id: "lost-in-symphony",
      title: "Lost In Symphony",
      category: "Memory & Place",
      publication: "Kalahari Review",
      year: "2024",
      theme: "Love & Urban Reverie",
      shortExcerpt: "arabian fragrance in your pitch-black tote bag. you were smelling in a language i didn’t understand...",
      fullStanzas: [
        "arabian fragrance in your pitch-black tote bag.\nyou were smelling in a language i didn’t understand.",
        "your endless braids tamed in a brown king-size scarf\nwere calling me home. i finally found the one who is\nmore than enough.",
        "you were beaming at a painting on the porcelain wall.\n&i was thinking black girls shouldn’t pay\nto be in art galleries.",
        "chili suya tastes better in the evening time.\nwe walked the crowded street, yet it’s just you and me.",
        "the exit of the sunset is not the end, and even\nthe absence of the moonlight is insignificant\nwhen i am lost in your symphony."
      ]
    },
    {
      id: "the-first-night",
      title: "The First Night",
      category: "Published Works",
      publication: "The African Magazine",
      year: "2023",
      theme: "Intimacy & Sacred Paradox",
      shortExcerpt: "The first night she gave, & you took, she cleaned up the reds with her hijab. After, you sat up all night...",
      fullStanzas: [
        "The first night she gave,\n& you took, she cleaned up the reds\nwith her hijab.",
        "After, you sat up all night\nwatching her sleep, moving from\nside to side like the tongue\nof a church bell calling…",
        "& her body, a temple afire,\never burning, her erected orbs\nminarets calling…",
        "You stayed up all night,\nwondering at the paradox of worshiping\na God you know in a strange sanctuary."
      ]
    }
  ] as Poem[],

  projects: [
    {
      id: "traveler-returns",
      title: "The Traveler Returns",
      subtitle: "Forthcoming Poetry Collection",
      category: "Literature & Astronomy",
      status: "Forthcoming",
      tagline: "A developing literary project exploring migration, homecoming, and celestial cartography.",
      description: "A developing literary project, conceived as a meditation on return — not merely to a geographic origin, but to the self after wandering through knowledge and distance.",
      longDescription: [
        "Conceived as a continuation of Chemtrails & Constellations, The Traveler Returns examines the physics of arrival.",
        "The collection draws from Nigerian oral storytelling cadences, space exploration history, and the intimate solitude of nocturnal contemplation.",
        "Currently in manuscript curation and poetic refinement."
      ],
      image: travelerReturnsImg,
      actionLabel: "View Project Notes",
      accentDark: false
    },
    {
      id: "mayday",
      title: "MAYDAY",
      subtitle: "Action & Intentional Momentum",
      category: "Initiative & Philosophy",
      status: "Active Initiative",
      tagline: "“Stop saying someday. Make it MAYDAY.”",
      description: "An initiative built around action, intentional progress, and the resolute refusal to postpone meaningful work.",
      longDescription: [
        "MAYDAY rejects the paralysis of perfectionism and perpetual preparation.",
        "Built on the principle that the highest respect one can pay to an idea is execution, MAYDAY acts as both an operating philosophy and a gathering point for creative builders.",
        "From writing that chapbook to building that independent venture: when intention meets urgency, someday becomes today."
      ],
      image: maydayImg,
      actionLabel: "Read the MAYDAY Creed",
      accentDark: true
    },
    {
      id: "vanadi",
      title: "Vanadi",
      subtitle: "Biographical Knowledge & AI Inquiry",
      category: "Technology & Culture",
      status: "In Development",
      tagline: "An exploration of AI-supported profiles and nuanced biographical memory.",
      description: "Investigating how personal histories, creative legacies, and multidisciplinary thought can be structured and reflected with contextual nuance rather than superficial keywords.",
      longDescription: [
        "Vanadi investigates the intersection between algorithmic indexing and the poetic messiness of human living.",
        "How do we preserve an intellectual's evolving ideas across decades without reducing them to static CVs?",
        "A quiet, exploratory design and research prototype focusing on semantic depth and human dignity in digital representation."
      ],
      image: vanadiImg,
      actionLabel: "Explore the Concept",
      accentDark: false
    },
    {
      id: "haegisx",
      title: "HaegisX",
      subtitle: "Experimental Systems Lab",
      category: "Applied Ideas",
      status: "In Development",
      tagline: "A developing technology concept exploring ambitious, future-facing systems.",
      description: "Bridging the rigor of physical principles with software tools for creators, thinkers, and independent operators.",
      longDescription: [
        "HaegisX represents the experimental venture arm of haegis.",
        "It focuses on systems that treat creative output as a thermodynamics problem: managing friction, preserving signal against noise, and building sustainable intellectual capital.",
        "Early prototyping phases in workflow architecture and minimal tools."
      ],
      image: haegisxImg,
      actionLabel: "Laboratory Inquiries",
      accentDark: true
    }
  ] as Project[],

  journalEntries: [
    {
      id: "thermodynamics-longing",
      title: "On the Thermodynamics of Longing",
      date: "August 2024",
      category: "Essays & Science",
      readTime: "5 min read",
      excerpt: "Why the second law of thermodynamics is not a decree of despair, but the mathematical justification for poetry.",
      content: [
        "In a physics lecture hall, entropy is introduced as an inevitable descent into chaos. Heat disperses; organized states dissolve; the universe cools into an isotropic stillness.",
        "Yet when a person sits alone at a desk writing a letter they may never send, they are engaged in the opposite enterprise: an active concentration of emotional work, an attempt to gather scattered memory into a single coherent beam of light.",
        "Poetry is localized negative entropy. It takes the noise of an ordinary Tuesday and crystallizes it into an enduring stanza.",
        "When we miss someone across distance, we are not resisting physics; we are demonstrating that the mind is capable of creating gravitational fields of its own."
      ]
    },
    {
      id: "why-physicists-verse",
      title: "Why Physicists Must Learn to Write Verse",
      date: "May 2024",
      category: "Philosophy",
      readTime: "4 min read",
      excerpt: "Equations calculate magnitude; poetry records the human cost of the calculation.",
      content: [
        "A tensor equation can describe the curvature of spacetime under the stress of matter, but it will never convey what it feels like to stand beneath that curve at midnight on an empty beach.",
        "The best physicists in history understood that mathematics is an alphabet, not the story itself. Maxwell wrote lighthearted verse; Oppenheimer translated the Gita; Feynman played the bongo drums while pondering quantum electrodynamics.",
        "Language and physics are two sides of the same telescope: one points outward toward the mechanics of matter, the other inward toward the observer who dared to look."
      ]
    },
    {
      id: "architecture-unfinished",
      title: "The Architecture of Unfinished Things",
      date: "January 2024",
      category: "Creative Process",
      readTime: "6 min read",
      excerpt: "Reflections on manuscripts in progress, the fear of arrival, and why the first draft is always sacred.",
      content: [
        "Every writer carries a graveyard of abandoned opening lines. For years I treated these fragments as failures—remnants of discipline that gave way to distraction.",
        "Lately, I view them differently: like embryonic stars in a molecular cloud that didn't have enough mass to ignite nuclear fusion, but still contributed to the gravitational stability of the nebula.",
        "The finished book is simply the survivor of a thousand private attempts. We must honor the poems that died so the collection could breathe."
      ]
    }
  ] as JournalEntry[]
};
