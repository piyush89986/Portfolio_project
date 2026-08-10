import React, { useState, useEffect, useRef } from "react";
import { Tilt } from "react-tilt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  onLearnMore,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;

    // ScrollTrigger for animating project cards with stagger
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 100, // Start off-screen
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: el,
          start: "top bottom",  // Trigger when the top of the element hits the bottom of the viewport
          end: "top center",    // End when the top reaches the center of the viewport
          scrub: true,          // Smoothly sync scroll and animation
          markers: false,       // Set to `true` to see debug markers
        },
      }
    );
  }, []);

  const truncatedDescription = description.length > 120 ? `${description.slice(0, 120)}...` : description;

  return (
    <div ref={cardRef} className="h-full flex flex-col w-full items-center">
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full h-full flex flex-col justify-between"
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="relative w-full h-[230px]">
              <img
                src={image}
                alt="project_image"
                className="w-full h-full object-cover rounded-2xl"
              />

              <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
                <div
                  onClick={() => window.open(source_code_link, "_blank")}
                  className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                >
                  <img
                    src={github}
                    alt="source code"
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-white font-bold text-[24px]">{name}</h3>
              <p className="mt-2 text-secondary text-[14px]">
                {truncatedDescription}
                {description.length > 120 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLearnMore({ name, description, tags, image, source_code_link });
                    }}
                    className="text-[#915EFF] ml-1 font-semibold hover:underline cursor-pointer bg-transparent border-none outline-none"
                  >
                    Learn More
                  </button>
                )}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[14px] ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </Tilt>
    </div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="relative bg-tertiary border border-secondary/20 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-white bg-black-100/50 hover:bg-black-100 p-2 rounded-full transition-all cursor-pointer border-none outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Project Image */}
        <div className="w-full h-[220px] md:h-[320px] overflow-hidden rounded-2xl relative mb-6">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <div
              onClick={() => window.open(project.source_code_link, "_blank")}
              className="black-gradient w-12 h-12 rounded-full flex justify-center items-center cursor-pointer shadow-lg hover:scale-110 transition-transform"
            >
              <img
                src={github}
                alt="source code"
                className="w-2/3 h-2/3 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Project Info */}
        <h3 className="text-white font-bold text-[28px] md:text-[32px] mb-4">{project.name}</h3>
        <p className="text-secondary text-[16px] leading-[26px] mb-6 whitespace-pre-line">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <p
              key={`modal-${project.name}-${tag.name}`}
              className={`text-[14px] font-medium px-3 py-1 rounded-full bg-black-100/40 border border-secondary/10 ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const Works = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Stagger effect for project cards
    gsap.fromTo(
      ".project-card", // Select all project cards
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1, // Stagger delay of 0.3 seconds between each card
        scrollTrigger: {
          trigger: ".works-container",
          start: "top bottom",  // Trigger when the top of the container reaches the bottom
          end: "top center",
          scrub: true,
          markers: false, // Set to true to see debug markers
        },
      }
    );
  }, []);

  return (
    <>
      <div>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </div>

      <div className="w-full flex">
        <p className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
          Following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.
        </p>
      </div>

      <div className="works-container mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-stretch gap-7">
        {projects.map((project, index) => (
          <div key={`project-${index}`} className="project-card flex h-full justify-center">
            <ProjectCard index={index} {...project} onLearnMore={setSelectedProject} />
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default SectionWrapper(Works, "");
