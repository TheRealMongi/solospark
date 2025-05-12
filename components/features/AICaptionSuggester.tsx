import { useState } from 'react';

interface AICaptionSuggesterProps {
  onSelectCaption: (caption: string) => void;
  platform: string;
}

// Mock AI-generated captions for demonstration
const mockCaptions = {
  twitter: [
    "Just launched our new feature! Check it out and let me know what you think. #ProductLaunch #Innovation",
    "Excited to share our latest update - it's been a labor of love! #NewRelease #ProductDevelopment",
    "Behind the scenes look at what we've been working on. The journey of building something from scratch! #BehindTheScenes #Entrepreneurship"
  ],
  instagram: [
    "✨ New day, new possibilities! Sharing our latest creation with the world today. Double tap if you're as excited as we are!",
    "The moment we've all been waiting for has arrived! 🎉 Our team has been working tirelessly to bring this to life.",
    "Creating magic happens one step at a time ✨ So proud to finally share what we've been working on!"
  ],
  linkedin: [
    "Thrilled to announce our latest innovation that addresses [specific industry problem]. This solution represents months of research and development by our dedicated team.",
    "Proud to share that we've just launched a new feature designed to improve workflow efficiency by 30%. Looking forward to your feedback!",
    "Innovation is at the heart of what we do. Today, we're excited to introduce our newest offering that will transform how professionals approach [specific task]."
  ]
};

export default function AICaptionSuggester({ onSelectCaption, platform }: AICaptionSuggesterProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const generateCaptions = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/ai/generate-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform,
          prompt: 'Generate engaging social media post for a solopreneur',
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.captions) {
        setSuggestions(data.captions);
      } else {
        console.error('Error generating captions:', data.error);
        // Fallback to mock captions if API fails
        setSuggestions(mockCaptions[platform as keyof typeof mockCaptions] || mockCaptions.twitter);
      }
    } catch (error) {
      console.error('Error calling caption API:', error);
      // Fallback to mock captions if API fails
      setSuggestions(mockCaptions[platform as keyof typeof mockCaptions] || mockCaptions.twitter);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 border border-gray-200 rounded-md p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900">AI Caption Suggestions</h3>
        <button
          type="button"
          onClick={generateCaptions}
          disabled={isLoading}
          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Generating...' : 'Generate Ideas'}
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-4">
          <p className="text-sm text-gray-500">Thinking of creative captions...</p>
        </div>
      ) : suggestions.length > 0 ? (
        <ul className="space-y-2">
          {suggestions.map((caption, index) => (
            <li key={index} className="text-sm">
              <button
                type="button"
                onClick={() => onSelectCaption(caption)}
                className="w-full text-left p-2 hover:bg-gray-100 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {caption}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 py-2">
          Click "Generate Ideas" to get AI-powered caption suggestions for your post.
        </p>
      )}
      
      <p className="mt-2 text-xs text-gray-500">
        Suggestions are based on your platform selection and trending content.
      </p>
    </div>
  );
}
