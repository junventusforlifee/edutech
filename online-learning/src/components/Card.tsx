interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  onClick: () => void;
}

export default function Card({ title, description, icon,image, onClick }: CardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
      onClick={onClick}
    >
      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}