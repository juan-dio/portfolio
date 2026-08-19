const projectsData = [
  {
    id: "period-tracker",
    title: "Period Tracker",
    subtitle: "Intern Project",
    category: "Intern Project",
    image: "assets/images/projects/period.png",
    images: [
      "assets/images/projects/period.png",
      "assets/images/projects/period.png",
      "assets/images/projects/period.png",
    ],
    repoUrl: "https://github.com/juan-dio/period-tracker-app",
    liveUrl: "https://period-tracker-app-gules.vercel.app",
    description: "A period tracking application developed during an internship at Minilemon Technology. The app helps users log menstrual symptoms, blood flow, mood, and other related notes, while also predicting the next menstrual period based on stored data. Built with Next.js and Supabase.",
    highlights: [
      "Configured Supabase by creating tables, setting up authentication, and implementing RLS policies.",
      "Developed a predictive algorithm to forecast menstrual cycles based on user logs.",
      "Integrated backend server actions with the Next.js frontend."
    ],
    techStack: ["Next.js", "Supabase", "TailwindCSS", "TypeScript"]
  },
  {
    id: "siakad-mahad",
    title: "SIAKAD Backend Development",
    subtitle: "Intern Project",
    category: "Intern Project",
    image: "assets/images/projects/mahad.png",
    images: [
      "assets/images/projects/mahad.png",
      "assets/images/projects/mahad.png",
      "assets/images/projects/mahad.png"
    ],
    repoUrl: "",
    liveUrl: "",
    description: "A backend development project for the Academic Information System (SIAKAD) of Ma'had Aly Sa'iidusshiddiqiyah Jakarta during an internship at PT. Ina Gata Persada. The system manages student data, grades, schedules, and academic administration. Built with Laravel and MySQL, with a focus on data management, module integration, and backend performance optimization.",
    highlights: [
      "Built and integrated RESTful APIs with the frontend.",
      "Handled Pondok Pesantren specific features including permissions, violations, and night class attendance.",
      "Developed Excel import and export functions for various academic data.",
      "Optimized database queries and dashboard API performance."
    ],
    techStack: ["Laravel", "MySQL", "Bootstrap", "jQuery"]
  },
  {
    id: "reagent-inventory",
    title: "Reagent Inventory Management System",
    subtitle: "Intern Project",
    category: "Intern Project",
    image: "assets/images/projects/reagen.png",
    images: [
      "assets/images/projects/reagen.png",
      "assets/images/projects/reagen.png",
      "assets/images/projects/reagen.png"
    ],
    repoUrl: "https://github.com/juan-dio/sistem-pengelolaan-reagen-lab",
    liveUrl: "",
    description: "A web-based application developed during an internship at PT. Saba Indomedika to manage laboratory reagent inventory. The system includes stock tracking, item management, usage monitoring, and barcode printing for efficient identification. Built with Laravel, Bootstrap, jQuery, and MySQL.",
    highlights: [
      "Implemented automated barcode printing and scanning integration for quick stock lookup.",
      "Created comprehensive inventory tracking and usage logs.",
      "Conducted thorough testing and responsive UI improvements."
    ],
    techStack: ["Laravel", "MySQL", "Bootstrap", "jQuery"]
  },
  {
    id: "knight-of-valor",
    title: "Knight of Valor",
    subtitle: "Uni Project",
    category: "Uni Project",
    image: "assets/images/projects/kov.png",
    images: [
      "assets/images/projects/kov.png",
      "assets/images/projects/kov.png",
      "assets/images/projects/kov.png"
    ],
    repoUrl: "https://github.com/juan-dio/knight-of-valor",
    liveUrl: "",
    description: "A 2D platformer game where a knight navigates obstacles and enemies to rescue a princess. Developed with Godot 4 as a final project for the Software Project course, using the Agile development method.",
    highlights: [
      "Designed player movement mechanics, combat interactions, and enemy AI.",
      "Implemented multi-level map layouts with obstacles, collectibles, and win conditions.",
      "Managed project sprints and tasks using Agile methodology."
    ],
    techStack: ["Godot 4", "GDScript"]
  },
  {
    id: "lung-cancer-classification",
    title: "Lung Cancer Classification",
    subtitle: "Uni Project",
    category: "Uni Project",
    image: "assets/images/projects/psd.png",
    images: [
      "assets/images/projects/psd.png",
      "assets/images/projects/psd.png",
      "assets/images/projects/psd.png"
    ],
    repoUrl: "https://github.com/juan-dio/rnn-lung-cancer-classification",
    liveUrl: "",
    description: "A machine learning project that classifies patients as having lung cancer or not based on survey data containing medical history. Developed with a Recurrent Neural Network (RNN) model, using Python, TensorFlow for model training, and Streamlit for the user interface as a final project for the Data Science Project course.",
    highlights: [
      "Preprocessed survey medical dataset and handled feature extraction.",
      "Trained and tuned a Recurrent Neural Network (RNN) using TensorFlow.",
      "Built an interactive web interface using Streamlit for easy user predictions."
    ],
    techStack: ["Python", "TensorFlow", "Streamlit", "Pandas", "Scikit-Learn"]
  },
  {
    id: "boowang-app",
    title: "Boowang Tourism E-Ticketing System",
    subtitle: "Uni Project",
    category: "Uni Project",
    image: "assets/images/projects/boowang.png",
    images: [
      "assets/images/projects/boowang.png",
      "assets/images/projects/boowang.png",
      "assets/images/projects/boowang.png"
    ],
    repoUrl: "https://github.com/juan-dio/boowang-app",
    liveUrl: "",
    description: "A tourism e-ticketing web application that allows users to explore destinations, book tickets, and complete online payments. Developed with PHP, Laravel, MySQL, and Bootstrap as a final project for the Software Engineering course.",
    highlights: [
      "Created user authentication and role management for visitors and admins.",
      "Implemented booking checkout workflow and payment simulation.",
      "Built admin dashboard for managing destinations, ticket prices, and booking reports."
    ],
    techStack: ["PHP", "Laravel", "MySQL", "Bootstrap"]
  },
  {
    id: "meatmaster-app",
    title: "Meat Master E-Commerce System",
    subtitle: "Uni Project",
    category: "Uni Project",
    image: "assets/images/projects/meatmaster.png",
    images: [
      "assets/images/projects/meatmaster.png",
      "assets/images/projects/meatmaster.png",
      "assets/images/projects/meatmaster.png"
    ],
    repoUrl: "https://github.com/juan-dio/meatmaster-app",
    liveUrl: "",
    description: "An e-commerce web application that allows users to register, log in, browse product catalogs, add items to a shopping cart, place orders, and complete payments. Developed with PHP and MySQL as a final project for the Application Development course.",
    highlights: [
      "Developed secure user session handling and product catalog browsing.",
      "Implemented shopping cart state management and checkout process.",
      "Designed relational database schema for products, categories, orders, and users."
    ],
    techStack: ["PHP", "MySQL", "HTML/CSS", "JavaScript"]
  },
  {
    id: "djangga-resort",
    title: "Djangga Selecta Resort Website",
    subtitle: "Uni Project",
    category: "Uni Project",
    image: "assets/images/projects/djangga.png",
    images: [
      "assets/images/projects/djangga.png",
      "assets/images/projects/djangga.png",
      "assets/images/projects/djangga.png"
    ],
    repoUrl: "https://github.com/juan-dio/TugasAplikasiDPW-A03",
    liveUrl: "",
    description: "A static website that showcases information about Djangga Selecta Resort, including facilities, a photo gallery, pricing details, and booking contact information. Developed with HTML, CSS, and JavaScript as a final project for the Web Programming Fundamentals course.",
    highlights: [
      "Crafted responsive and visually appealing UI representing the resort.",
      "Implemented smooth navigation and interactive photo galleries.",
      "Ensured cross-browser compatibility and clean layout structure."
    ],
    techStack: ["HTML5", "CSS3", "JavaScript"]
  }
];
