import { IoFlashOutline } from 'react-icons/io5';
import { LuBrainCircuit } from 'react-icons/lu';
import { TbUserSearch } from 'react-icons/tb';


export default function Services() {
  const features = [
    {
      icon: <IoFlashOutline />,
      title: 'Performance Analytics',
      desc: ' Track key metrics like speed, agility, power, and reaction time to identify strengths and weaknesses.',
    },
    {
      icon: <LuBrainCircuit />,
      title: 'Skill Assessment',
      desc: "Objectively assess your athletes' skills with our comprehensive skill testing tools.",
    },
    {
      icon: <TbUserSearch />,
      title: 'Talent Scouting',
      desc: 'Discover the next generation of sports stars. Our talent scouting tools help you identify and recruit top talent based on data-driven insights.',
    },
  ];

  return (
    <section className="relative py-28 bg-theme-dark">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 text-gray-300 justify-between gap-24 lg:flex md:px-8">
        <div className="max-w-xl">
          <h3 className="text-white text-3xl font-semibold sm:text-4xl">
            Services and Features
          </h3>
          <p className="mt-3">
            optimize athlete performance, streamline talent identification, and
            make informed decisions
          </p>
        </div>
        <div className="mt-12 lg:mt-0">
          <ul className="grid gap-8 sm:grid-cols-2">
            {features.map((item, idx) => (
              <li key={idx} className="flex gap-x-4">
                <div className="flex-none w-12 h-12 bg-gray-700 text-cyan-400 rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg text-gray-100 font-semibold">
                    {item.title}
                  </h4>
                  <p className="mt-3">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="absolute inset-0 max-w-md mx-auto h-72 blur-[118px]"
        style={{
          background:
            'linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)',
        }}
      ></div>
    </section>
  );
}
