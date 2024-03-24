import React from "react";
import { BriefcaseIcon, CalendarIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import "./contact.css";
const Contacts = () => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
      className="grid grid-cols-1 gap-10 items-center md:grid-cols-2"
    >
      <motion.div
        variants={{
          offscreen: {
            y: 150,
          },
          onscreen: {
            y: 0,
            transition: {
              type: "spring",
              bounce: 0.4,
              duration: 1,
            },
          },
        }}
        whileHover={{ scale: 1.02 }}

        className="cursor-pointer bg-card px-6 py-16 rounded-3xl h-full filter shadow-md relative md:px-10 dark:card m-3"
        >
        <h6 className="text-2xl font-bold text-secundary mb-4 dark:text-white">
          <a
            href="https://www.hububble.co/"
            target="_blank"
            className="hover:underline"
          >
            Hububble
          </a>
          <span className="mt-4 text-xs flex items-center justify-start uppercase text-neutral-600 dark:text-neutral-300">
            <CalendarIcon className="h-4 mr-2 text-neutral-600 dark:text-neutral-300" />
            MAY, 2021 - PRESENT
          </span>
          <span className="mt-2 text-xs flex items-center justify-start uppercase text-neutral-600 dark:text-neutral-300">
            <BriefcaseIcon className="h-4 mr-2 text-neutral-600 dark:text-neutral-300" />
            JUNIOR FRONT-END ENGINEER
          </span>
        </h6>
        <div className="relative mb-4">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="uppercase px-2 bg-gray-50 text-sm text-gray-500 dark:bg-primary-500">
              duties & responsibilities
            </span>
          </div>
        </div>

        <ul className="text-base text-primary-400 list-inside list-disc dark:text-neutral-200">
          <li>
            Developed web applications using JavaScript, React, Tailwind, and
            NextJS.
          </li>
          <li>
            Created and developed websites, landing pages, and email templates
            using HubSpot CMS that are easy for clients to edit and optimized
            for different devices
          </li>
          <li>
            Assisted in the maintenance and troubleshooting of client's websites
            to ensure smooth performance and user satisfaction.
          </li>
        </ul>
      </motion.div>
      
      
        <div className="responsive-iframe-container">
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d956.2522226498496!2d-68.1090566!3d-16.5256488!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sbo!4v1711206961513!5m2!1ses-419!2sbo"
            allowFullScreen 
            ></iframe>
        </div>
    </motion.div>
  );
};

export default Contacts;
