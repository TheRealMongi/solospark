import React from 'react';
import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { Button } from '../ui/Button';

interface AICaptionSuggestionProps {
  caption: string;
  onSelect: (caption: string) => void;
}

/**
 * AI Caption Suggestion component based on the Design System Brief
 * - Shows AI-generated badge
 * - Displays caption with animation
 * - Allows selection of the suggestion
 */
const AICaptionSuggestion: React.FC<AICaptionSuggestionProps> = ({ caption, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative mb-3">
        <div className="absolute top-2 right-2">
          <Badge isAI variant="accent" size="sm" />
        </div>
        <p className="text-neutral mb-4 pt-2">{caption}</p>
        <div className="flex justify-end">
          <Button size="sm" variant="secondary" onClick={() => onSelect(caption)}>
            Use This
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default AICaptionSuggestion;
