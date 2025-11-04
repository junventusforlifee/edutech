'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import Image from 'next/image';
import { BookOpen, GraduationCap, FileText, Award, School } from 'lucide-react';

const academyPrograms = [
  {
    id: 1,
    title: 'K12 Students',
    description: 'Complete secondary school curriculum for K12 students',
    icon: <School size={32} className="text-blue-600" />,
    image: '/k12students.jpg',
  },
  {
    id: 2,
    title: 'WAEC & NECO',
    description: 'Preparation for West African and Nigerian examinations',
    icon: <FileText size={32} className="text-blue-600" />,
    image: '/k12student.jpg',
  },
  {
    id: 3,
    title: 'JAMB',
    description: 'Comprehensive preparation for university entrance exams',
    icon: <BookOpen size={32} className="text-blue-600" />,
    image: '/jambstudents.jpg',
  },
  {
    id: 4,
    title: 'JUPEB',
    description: 'Direct entry program for university admission',
    icon: <Award size={32} className="text-blue-600" />,
    image: '/jupebstudents.jpg',
  },
  {
    id: 5,
    title: '100 Level',
    description: 'First year university courses and foundation programs',
    icon: <GraduationCap size={32} className="text-blue-600" />,
    image: '/yearone.jpg',
  },
];

// Card component
type CardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  onClick: () => void;
};

function Card({ title, description, icon, image, onClick }: CardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 flex flex-col h-120" // fixed height card
      onClick={onClick}
    >
      {/* Image section (50% of card height) */}
      <div className="relative w-full h-1/2 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover" // fills entire area without empty space
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

export default function AcademyProgram() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const handleCardClick = (programId: number) => {
    if (!isAuthenticated) {
      router.push('/auth');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <section id="academy" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Academy Programs</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Our comprehensive academic programs designed to help students excel at every level of their education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {academyPrograms.map((program) => (
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
