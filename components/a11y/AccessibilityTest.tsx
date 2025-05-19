import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Input from '../ui/Input';
import Alert from '../ui/Alert';
import Modal from '../ui/Modal';
import { motion } from 'framer-motion';

/**
 * This component is used to test the accessibility of UI components
 * It renders various UI components and checks for accessibility issues
 */
const AccessibilityTest: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [a11yIssues, setA11yIssues] = useState<any[]>([]);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      import('axe-core').then(({ default: axe }) => {
        axe.run(document.body, {}, (err, results) => {
          if (err) throw err;
          setA11yIssues(results.violations);
        });
      });
    }
  }, []);

  return (
    <div className="p-6 space-y-8 bg-background">
      <h1 className="text-heading-2 font-heading font-bold text-neutral">Accessibility Test</h1>
      
      <section aria-labelledby="buttons-heading">
        <h2 id="buttons-heading" className="text-heading-3 font-heading font-medium text-neutral mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="primary" disabled>Disabled Button</Button>
        </div>
      </section>
      
      <section aria-labelledby="cards-heading">
        <h2 id="cards-heading" className="text-heading-3 font-heading font-medium text-neutral mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card shadow="sm" className="p-4">
            <h3 className="text-lg font-heading font-medium mb-2">Card Title</h3>
            <p className="text-neutral/80 font-body">This is a card with some content.</p>
          </Card>
          <Card shadow="md" className="p-4 border-l-4 border-l-primary">
            <h3 className="text-lg font-heading font-medium mb-2">Highlighted Card</h3>
            <p className="text-neutral/80 font-body">This card has a colored border.</p>
          </Card>
        </div>
      </section>
      
      <section aria-labelledby="badges-heading">
        <h2 id="badges-heading" className="text-heading-3 font-heading font-medium text-neutral mb-4">Badges</h2>
        <div className="flex flex-wrap gap-4">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="primary" isAI>AI Generated</Badge>
        </div>
      </section>
      
      <section aria-labelledby="inputs-heading">
        <h2 id="inputs-heading" className="text-heading-3 font-heading font-medium text-neutral mb-4">Inputs</h2>
        <div className="space-y-4 max-w-md">
          <Input label="Name" placeholder="Enter your name" />
          <Input label="Email" type="email" placeholder="Enter your email" />
          <Input label="Password" type="password" placeholder="Enter your password" />
          <Input label="Invalid Input" error="This field is required" placeholder="Error state" />
        </div>
      </section>
      
      <section aria-labelledby="alerts-heading">
        <h2 id="alerts-heading" className="text-heading-3 font-heading font-medium text-neutral mb-4">Alerts</h2>
        <div className="space-y-4">
          <Alert variant="success" title="Success">Your post was scheduled successfully!</Alert>
          <Alert variant="error" title="Error">Failed to schedule post. Please try again.</Alert>
          <Alert variant="warning" title="Warning">Your account is approaching the free plan limit.</Alert>
          <Alert variant="info" title="Info">New features are available in your dashboard.</Alert>
        </div>
      </section>
      
      <section aria-labelledby="modal-heading">
        <h2 id="modal-heading" className="text-heading-3 font-heading font-medium text-neutral mb-4">Modal</h2>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>Open Modal</Button>
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title="Modal Title"
        >
          <p className="mb-4">This is a modal dialog with some content.</p>
          <div className="flex justify-end">
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>Close</Button>
          </div>
        </Modal>
      </section>
      
      <section aria-labelledby="animations-heading">
        <h2 id="animations-heading" className="text-heading-3 font-heading font-medium text-neutral mb-4">Animations</h2>
        <div className="space-y-4">
          <motion.div
            className="p-4 bg-primary/10 rounded-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-neutral font-body">This element animates on load.</p>
          </motion.div>
          <motion.button
            className="px-4 py-2 bg-secondary text-white rounded-md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Hover me
          </motion.button>
        </div>
      </section>
      
      {a11yIssues.length > 0 && (
        <section aria-labelledby="issues-heading" className="mt-8 p-4 bg-red-50 rounded-md">
          <h2 id="issues-heading" className="text-heading-3 font-heading font-medium text-red-700 mb-4">Accessibility Issues Found</h2>
          <ul className="list-disc pl-5 space-y-2">
            {a11yIssues.map((issue, index) => (
              <li key={index} className="text-red-700">
                <strong>{issue.impact} - {issue.help}</strong>
                <p>{issue.description}</p>
                <p className="text-sm text-red-600">Affected elements: {issue.nodes.length}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default AccessibilityTest;
