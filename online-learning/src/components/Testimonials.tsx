'use client';

const testimonials = [
  {
    id: 1,
    name: 'Rejoice Okoro',
    role: 'SSS3 Student',
    content: 'This platform helped me ace my WAEC exams. The resources are comprehensive and easy to understand.',
    image: '/rejoiceokoro.png',
  },
  {
    id: 2,
    name: 'Aisha Bello',
    role: 'JAMB Candidate',
    content: 'The JAMB preparation program is exceptional. I scored 305 thanks to the practice tests and tutorials.',
    image: '/aishabello.jpg',
  },
  {
    id: 3,
    name: 'Tunde Ojo',
    role: 'Software Developer',
    content: 'The web development course gave me the skills I needed to land my first job as a developer.',
    image: '/tundeojo.jpg',
  },
  {
    id: 4,
    name: 'Funke Adeyemi',
    role: 'Data Science Student',
    content: 'The data science program is well-structured with practical projects that build real-world skills.',
    image: '/funkeadeyemi.jpg',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Students Say</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Hear from students who have transformed their academic and career paths with our programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 flex-grow">"{testimonial.content}"</p>
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}