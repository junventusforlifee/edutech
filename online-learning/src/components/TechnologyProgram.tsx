"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import Image from "next/image";
import { Code, Database, Palette, Shield, Globe, Cpu } from "lucide-react";

const techPrograms = [
  {
    id: 1,
    title: "Software Development",
    description:
      "Learn to build applications from scratch with modern technologies",
    icon: <Code size={32} className="text-blue-600" />,
    image: "/softwaretech.jpg",
  },
  {
    id: 2,
    title: "Data Science",
    description: "Master data analysis, visualization, and machine learning",
    icon: <Database size={32} className="text-blue-600" />,
    image: "/dataanalyst.png",
  },
  {
    id: 3,
    title: "UI/UX Design",
    description:
      "Create beautiful and functional user interfaces and experiences",
    icon: <Palette size={32} className="text-blue-600" />,
    image: "/uiux.png",
  },
  {
    id: 4,
    title: "Cybersecurity",
    description: "Protect systems and networks from digital attacks",
    icon: <Shield size={32} className="text-blue-600" />,
    image: "/cyberstudent.png",
  },
  {
    id: 5,
    title: "DevOp",
    description:
      "Combine software development and IT operation to deliver App and services faster",
    icon: <Globe size={32} className="text-blue-600" />,
    image: "/devop.jpg",
  },
  {
    id: 6,
    title: "Digital Marketing",
    description: "Combine creativity, data, technology as a digital marketer",
    icon: <Cpu size={32} className="text-blue-600" />,
    image: "/digitalmarket.jpg",
  },
];

// Card component
interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  onClick: () => void;
}

function Card({ title, description, icon, image, onClick }: CardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 flex flex-col h-120" // fixed height like academy section
      onClick={onClick}
    >
      {/* Image section (50% of card height) */}
      <div className="relative w-full h-1/2 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover" // fills full width without empty space
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      {/* Content section (50% of card height) */}
      <div className="p-6 flex flex-col h-1/2">
        <div className="flex items-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-4">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 flex-grow">{description}</p>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors self-start">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default function TechnologyProgram() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const handleCardClick = (programId: number) => {
    if (!isAuthenticated) {
      router.push("/auth");
    } else {
      // route to program details in dashboard when authenticated
      router.push(`/dashboard/program/${programId}`);
    }
  };

  return (
    <section id="technology" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Technology Programs
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Cutting-edge technology programs to prepare you for the digital
            future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techPrograms.map((program) => (
            <Card
              key={program.id}
              title={program.title}
              description={program.description}
              icon={program.icon}
              image={program.image}
              onClick={() => handleCardClick(program.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
