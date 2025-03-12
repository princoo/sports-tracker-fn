import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from "react-router-dom";


// import siteBackground from '../../images/site/site_background.jpg'
import siteBackground from '../../images/site/site_background_2.png';
import chart from '../../images/site/chart.png';
import Footer from './Footer';
import Services from './Services';

export default function Home() {
  const ref = useRef(null); // Create a reference to the element
  const refTwo = useRef(null);
  const navigate = useNavigate();

  const isInView = useInView(ref, { once: false }); // Check if it's in the viewport
  const isTwoInView = useInView(refTwo, { once: false }); // Check if it's in the viewport

  return (
    // {/*
    //   Heads up! 👋

    //   This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
    // */}
    <div>
      <section
        className="relative flex items-center justify-center h-[80vh] md:h-[100vh]"
        style={{
          backgroundImage: `url(${siteBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <div className="grid z-1  max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className=" mr-auto place-self-center lg:col-span-7">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -100 }} // Start with hidden and off the screen
              animate={
                isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
              } // Animate based on visibility
              transition={{ duration: 1 }} // Set the duration of the animation
            >
              <h2 className="text-4xl text-gray-900 font-extrabold mx-auto md:text-5xl">
                Empower Your Academy with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">
                  Data-Driven Insights
                </span>
              </h2>
              <p className="max-w-2xl mb-6 mt-5 text-white lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                Effortlessly monitor player performance over time with our
                sports tracker, designed to help your company keep athletes on
                the path to excellence
              </p>
              <a
                href="/auth/login"
                className=" inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-theme-light hover:bg-theme-secondary focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Get started
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Speak to Sales
              </a>
            </motion.div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex justify-center rounded-3xl">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: 100 }} // Start with hidden and off the screen
              animate={
                isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }
              } // Animate based on visibility
              transition={{ duration: 1 }} // Set the duration of the animation
            >
              {/* <img className="w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg" alt="dashboard image" /> */}
              {/* <img className="w-full hidenn dark:block opacity-60 rounded-xl" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg" alt="dashboard image" /> */}
              {/* <img src={chart} alt="mockup" className="w-80" /> */}
              {/* <img
              className="w-full opacity-60 rounded-xl"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
              alt="dashboard image"
            /> */}
            </motion.div>
          </div>
        </div>
        <div className="absolute opacity-60 inset-0 bg-gradient-to-b from-transparent to-theme-light"></div>
      </section>

      <section className="bg-theme-white dark:bg-gray-900">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <motion.div
            ref={refTwo}
            initial={{ opacity: 0, y: 100 }} // Start with hidden and off the screen
            animate={
              isTwoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
            } // Animate based on visibility
            transition={{ duration: 1 }} // Set the duration of the animation
          >
            <img
              className="w-full dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
              alt="dashboard image"
            />
            <img
              className="w-full hidden dark:block"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
              alt="dashboard image"
            />
          </motion.div>
          <div className="mt-4 md:mt-0">
          <motion.div
            ref={refTwo}
            initial={{ opacity: 0, x: -50 }} // Start with hidden and off the screen
            animate={
              isTwoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
            } // Animate based on visibility
            transition={{ duration: 1 }} // Set the duration of the animation
          >
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Revolutionize Your Sports Training Today
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
              Empower your athletes with cutting-edge technology. Our platform
              provides comprehensive tools to track, analyze, and optimize
              performance. From skill assessment to injury prevention, we've got
              you covered. .
            </p>
            <a
              href="#"
              className="inline-flex items-center text-white bg-theme-light hover:bg-theme-dark focus:ring-4 focus:ring-theme-secondary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-theme-secondary"
            >
              Learn more
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            </motion.div>
          </div>
        </div>
      </section>
      <Services />
      <Footer />
    </div>
  );
}
