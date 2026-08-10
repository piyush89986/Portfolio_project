
import {
  logo,
  backend,
  creator,
  mobile,
  web,
  github,
  menu,
  close,
  css,
  gearXpert,
  mysql,
  express,
  aws,
  mui,
  shivnshki,

  gsap,
  framer,
  figma,
  git,
  html,
  javascript,
  mongodb,
  nodejs,
  reactjs,
  redux,
  tailwind,
  threejs,
  firstTestimonial,
  secondTestimonial,
  thirdTestimonial,
} from '../assets'

import project4 from '../assets/project4.webp';
import project5 from '../assets/project5.webp';
import project6 from "../assets/project6.webp";
import mindlogo from "../assets/mindlogo.svg"
import carrental from "../assets/carrental.png";
import chatapp from "../assets/chatapp.png";
import chess from "../assets/chess.png";
import room from "../assets/room.png";
import JARVIS from "../assets/JARVIS.png";
import TRACKER from "../assets/TRACKER.png";
import INSTABOT from "../assets/INSTABOT.png";


// Import Tekisky separately
import tekisky from "../assets/company/tekisky.png";


export const navLinks = [


  {
    id: "about",
    title: "About",

  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full-Stack Developer",
    icon: web,
  },
  {
    title: "Frontend Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Ui UX Designer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "gsap",
    icon: gsap,
  },
  {
    name: "framer",
    icon: framer,
  },


  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Material Ui",
    icon: mui,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Express Js",
    icon: express,
  },
  {
    name: "AWS",
    icon: aws,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "MySql",
    icon: mysql,
  },

  {
    name: "git",
    icon: git,
  },


];

const experiences = [
  {
    title: "MERN-Stack developer Intern",
    company_name: "Mindcoders",
    icon: mindlogo,
    iconBg: "#383E56",
    date: "oct 2025 - jan 2025",
    points: [
      "Developing and maintaining web applications using MERN technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  }, {
    title: "Software developer intern",
    company_name: "Shiavnski Technologies LLP",
    icon: shivnshki,
    iconBg: "#383E56",
    date: "jun 2026 - aug 2025",
    points: [
      "Worked on real-world software development projects and contributed to feature development.",
      "Designed and implemented functional solutions based on project requirements and business needs.",
      "Troubleshot technical issues, debugged application errors, and improved overall system performance.",
      "Gained hands-on experience with development workflows, version control, testing, and team collaboration.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but piyush proved me wrong.",
    name: "Aayush atre",
    designation: "Ecommerce",
    company: "Gamma-stack",
    image: firstTestimonial,
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like piyush does.",
    name: "Sarang bhavasker",
    designation: "Ecommerce Business",
    company: "Techtoil",
    image: secondTestimonial,
  },
  {
    testimonial:
      "After piyush optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "dheeraj gami",
    designation: "CTO",
    company: "456 Enterprises",
    image: thirdTestimonial,
  },
];

const projects = [
  {
    name: "piyzzbuy",
    description:
      "piyzzbuy Mart is a web-based platform that allows users to search, explore, and purchase a wide range of products from various providers, offering a seamless and efficient shopping experience.",
    tags: [
      {
        name: "HTML",
        color: "blue-text-gradient",
      },
      {
        name: "CSS",
        color: "white-text-gradient",
      },
      {
        name: "javascript",
        color: "pink-text-gradient",
      },
    ],
    image: project4,
    source_code_link: "https://github.com/piyush89986/E-commerce",
  },
  {
    name: "AI image inhancer",
    description:
      "AI-IMAGE-INHANCER is a modern, web application that allows users to upload and enhance the quality of images instantly using an image enhancement API. Built with React, Tailwind CSS, and Axios, it features a sleek UI and smooth user experience.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "API",
        color: "green-text-gradient",
      },
      {
        name: "tailwindcss",
        color: "pink-text-gradient",
      },
    ],
    image: project6,
    source_code_link: "https://github.com/piyush89986/AI-IMAGE-INHANCER",
  },
  {
    name: "Deadpool",
    description:
      "GTA Style Landing Page is a modern, animated web landing page built with React, GSAP, and Tailwind CSS. It features smooth intro animations, dynamic text reveal effects, and parallax motion that respond to mouse interactions, recreating the bold, cinematic aesthetic inspired",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "threejs",
        color: "white-text-gradient",
      },
      {
        name: "javascript",
        color: "green-text-gradient",
      },
    ],
    image: project5,
    source_code_link: "https://github.com/piyush89986/Gta-style-landing-page",
  },
  {
    name: "Car rental",
    description:
      "Welcome to our Car Rental Platform, a modern and user-friendly solution for renting vehicles quickly and conveniently. Our platform allows users to browse a wide range of cars, view detailed specifications, check availability, and make bookings with ease. Whether you need a compact car for city travel, a luxury sedan for business trips, or an SUV for family vacations, we provide reliable and affordable rental options.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "white-text-gradient",
      },
      {
        name: "mongoDB",
        color: "green-text-gradient",
      },
    ],
    image: carrental,
    source_code_link: "https://github.com/piyush89986/car-reantal-backend",
  },
  {
    name: "chess",
    description:
      "Chess Application is an interactive web-based chess game that allows players to enjoy the classic game of chess with a clean and responsive user interface. The application implements official chess rules, move validation, piece movements, check/checkmate detection, and a smooth gameplay experience across devices..",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "white-text-gradient",
      },
      {
        name: "MongoDB",
        color: "green-text-gradient",
      },
    ],
    image: chess,
    source_code_link: "https://github.com/piyush89986/chess-application",
  },
  {
    name: "Chatapp",
    description:
      "A modern real-time chat application that enables seamless communication through instant messaging. Built with a responsive and user-friendly interface, it supports fast message delivery, secure authentication, and smooth conversations across devices, providing an engaging and reliable chatting experience.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "white-text-gradient",
      },
      {
        name: "MongoDB",
        color: "green-text-gradient",
      },
    ],
    image: chatapp,
    source_code_link: "https://github.com/piyush89986/chatapp-Frontend",
  }
  ,
  {
    name: "Room finder",
    description:
      "A modern room finder application that helps users easily search, explore, and discover available rooms based on their preferences. The platform features an intuitive interface, detailed room listings, and a responsive design for a seamless browsing experience across devices.",
    tags: [
      {
        name: "Tailwind css",
        color: "blue-text-gradient",
      },
      {
        name: "redux",
        color: "white-text-gradient",
      },
      {
        name: "Reactjs",
        color: "green-text-gradient",
      },
    ],
    image: room,
    source_code_link: "https://github.com/piyush89986/Roomate-finder",
  },
  {
    name: "Jarvis",
    description:
      "J.A.R.V.I.S is a personal AI study assistant built for B.Tech students — 'Just A Rather Very Intelligent System' that helps students study smarter with an interactive, assistant-style interface.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "vite",
        color: "green-text-gradient",
      },
      {
        name: "javascript",
        color: "pink-text-gradient",
      },
      {
        name: "openAi",
        color: "blue-text-gradient",
      },
      {
        name: "python",
        color: "pink-text-gradient",
      },
    ],
    image: JARVIS,
    source_code_link: "https://github.com/piyush89986/jarvis0f",
  },
  {
    name: "Tracking Website",
    description:
      "A website designed to help track weather and locations in real-time.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "redux-toolkit",
        color: "white-text-gradient",
      },
      {
        name: "leafletjs",
        color: "pink-text-gradient",
      },
      {
        name: "javascript",
        color: "pink-text-gradient",
      },
    ],
    image: TRACKER,
    source_code_link: "https://github.com/piyush89986/Weather-Tracker",
  },
  {
    name: "Instagram Bot",
    description:
      "A modern React application bot integrated with the Instagram Business API.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "redux-toolkit",
        color: "white-text-gradient",
      },
      {
        name: "META",
        color: "pink-text-gradient",
      },
      {
        name: "javascript",
        color: "pink-text-gradient",
      },
    ],
    image: INSTABOT,
    source_code_link: "https://github.com/piyush89986/instabotfr",
  },

];

export { services, technologies, experiences, testimonials, projects };
