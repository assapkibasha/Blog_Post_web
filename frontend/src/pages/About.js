import React from 'react';
import { User, Heart, BookOpen, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-accent-light">
            Get to know the person behind the blog
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-secondary text-white p-4 rounded-full">
              <User size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary">Hello, I'm Ntsinzi Francois</h2>
              <p className="text-gray-600">Blogger, Writer, and Enthusiast</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Welcome to my personal blog! I'm passionate about sharing my thoughts, experiences, 
              and insights on various topics that interest me. This space is where I explore ideas, 
              document my journey, and connect with like-minded individuals.
            </p>
            
            <p>
              Through this blog, I aim to create meaningful content that inspires, educates, and 
              entertains. Whether it's technology, lifestyle, travel, or personal development, 
              I believe in the power of storytelling and authentic expression.
            </p>

            <p>
              When I'm not writing, you can find me exploring new places, reading books, 
              experimenting with new technologies, or simply enjoying a good cup of coffee 
              while contemplating life's many wonders.
            </p>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-secondary text-white p-3 rounded-full w-fit mb-4">
              <Heart size={24} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">My Passion</h3>
            <p className="text-gray-600">
              Creating authentic content that resonates with readers and adds value to their lives.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-secondary text-white p-3 rounded-full w-fit mb-4">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">My Approach</h3>
            <p className="text-gray-600">
              Combining personal experiences with research to deliver insightful and engaging content.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-secondary text-white p-3 rounded-full w-fit mb-4">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">My Goal</h3>
            <p className="text-gray-600">
              Building a community of readers who share curiosity and a love for learning.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg p-8 mt-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Let's Connect!</h3>
          <p className="text-accent-light mb-6">
            I'd love to hear from you. Feel free to reach out with questions, suggestions, or just to say hello!
          </p>
          <a
            href="/contact"
            className="inline-block bg-accent hover:bg-accent-dark text-primary px-8 py-3 rounded-lg font-semibold transition"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
