import React, { useState } from 'react';
import { Book, X } from 'lucide-react';

interface InfoPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  sourceUrl: string;
  category: 'basics' | 'treatment' | 'lifestyle' | 'emergency';
}

const infoPosts: InfoPost[] = [
  {
    id: '1',
    title: 'What is Addison\'s Disease?',
    summary: 'Understanding the basics of Addison\'s Disease',
    content: `Addison's disease, also known as primary adrenal insufficiency, is a rare endocrine disorder that occurs when the adrenal glands don't produce enough of certain hormones, particularly cortisol and aldosterone.

    Key Points:
    • Affects approximately 1 in 100,000 people
    • Results from damage to the adrenal glands
    • Requires lifelong hormone replacement therapy
    • Can be life-threatening if untreated

    The adrenal glands, located above the kidneys, are essential for:
    • Stress response
    • Blood pressure regulation
    • Electrolyte balance
    • Energy metabolism`,
    source: 'National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)',
    sourceUrl: 'https://www.niddk.nih.gov/',
    category: 'basics'
  },
  {
    id: '2',
    title: 'Symptoms and Diagnosis',
    summary: 'Common symptoms and diagnostic procedures',
    content: `Common symptoms of Addison's disease include:

    Primary Symptoms:
    • Extreme fatigue
    • Weight loss
    • Decreased appetite
    • Low blood pressure
    • Salt craving
    • Hyperpigmentation (darkening of skin)
    
    Diagnosis typically involves:
    • Blood tests
    • ACTH stimulation test
    • Imaging studies
    • Medical history review`,
    source: 'Mayo Clinic',
    sourceUrl: 'https://www.mayoclinic.org/',
    category: 'basics'
  },
  {
    id: '3',
    title: 'Medication Management',
    summary: 'Essential information about hormone replacement therapy',
    content: `Hormone replacement therapy is essential for managing Addison's disease:

    Common Medications:
    • Hydrocortisone (replacing cortisol)
    • Fludrocortisone (replacing aldosterone)
    
    Key Management Points:
    • Take medications as prescribed
    • Never skip doses
    • Carry emergency medication
    • Regular medical check-ups
    • Dose adjustments for illness or stress`,
    source: 'British National Formulary (BNF)',
    sourceUrl: 'https://bnf.nice.org.uk/',
    category: 'treatment'
  },
  {
    id: '4',
    title: 'Emergency Protocols',
    summary: 'What to do in an adrenal crisis',
    content: `An adrenal crisis is a medical emergency requiring immediate treatment:

    Warning Signs:
    • Severe weakness
    • Severe pain
    • Vomiting/diarrhea
    • Low blood pressure
    • Confusion
    
    Emergency Steps:
    1. Inject emergency hydrocortisone
    2. Call emergency services
    3. Get to hospital immediately
    
    Prevention:
    • Regular medication
    • Stress dosing when ill
    • Medical ID jewelry
    • Emergency kit always available`,
    source: 'Society for Endocrinology',
    sourceUrl: 'https://www.endocrinology.org/',
    category: 'emergency'
  },
  {
    id: '5',
    title: 'Diet and Nutrition',
    summary: 'Dietary considerations for Addison\'s Disease',
    content: `Proper nutrition is important for managing Addison's disease:

    Key Dietary Considerations:
    • Adequate salt intake
    • Regular meals
    • Balanced nutrition
    • Hydration
    
    Recommended:
    • Salt-rich foods when needed
    • Regular protein intake
    • Complex carbohydrates
    • Plenty of fluids
    
    Avoid:
    • Long periods without food
    • Excessive alcohol
    • Dehydration`,
    source: 'British Dietetic Association',
    sourceUrl: 'https://www.bda.uk.com/',
    category: 'lifestyle'
  },
  {
    id: '6',
    title: 'Exercise Guidelines',
    summary: 'Safe exercise recommendations',
    content: `Exercise is beneficial but requires careful management:

    Exercise Tips:
    • Start slowly
    • Listen to your body
    • Stay hydrated
    • Take rest days
    
    Important Considerations:
    • Timing of medication
    • Energy levels
    • Recovery time
    • Stress response
    
    Always discuss exercise plans with your healthcare provider.`,
    source: 'American College of Sports Medicine',
    sourceUrl: 'https://www.acsm.org/',
    category: 'lifestyle'
  },
  {
    id: '7',
    title: 'Stress Management',
    summary: 'Techniques for managing stress with Addison\'s',
    content: `Stress management is crucial for Addison's disease:

    Stress Management Techniques:
    • Regular relaxation
    • Adequate sleep
    • Mindfulness practices
    • Regular exercise
    
    Important Points:
    • Recognize stress signals
    • Adjust medication as needed
    • Maintain work-life balance
    • Seek support when needed`,
    source: 'National Health Service (NHS)',
    sourceUrl: 'https://www.nhs.uk/',
    category: 'lifestyle'
  },
  {
    id: '8',
    title: 'Travel Guidelines',
    summary: 'Essential tips for traveling with Addison\'s Disease',
    content: `Safe travel requires careful planning:

    Travel Checklist:
    • Extra medication supply
    • Emergency injection kit
    • Medical ID
    • Doctor's letter
    • Insurance documentation
    
    Additional Considerations:
    • Time zone adjustments for medication
    • Storage of medications
    • Local medical facilities
    • Travel insurance coverage
    
    Always discuss travel plans with your healthcare provider.`,
    source: "Addison's Disease Self-Help Group (ADSHG)",
    sourceUrl: 'https://www.addisonsdisease.org.uk/',
    category: 'lifestyle'
  },
  {
    id: '9',
    title: 'Pregnancy and Addison\'s',
    summary: 'Managing Addison\'s during pregnancy',
    content: `Pregnancy with Addison's disease requires special attention:

    Key Considerations:
    • Pre-pregnancy planning
    • Medication adjustments
    • Regular monitoring
    • Delivery planning
    
    Important Points:
    • Close medical supervision
    • Dose adjustments as needed
    • Regular check-ups
    • Birth plan preparation
    
    Always work closely with your healthcare team.`,
    source: 'Endocrine Society',
    sourceUrl: 'https://www.endocrine.org/',
    category: 'treatment'
  },
  {
    id: '10',
    title: 'Research Updates',
    summary: 'Latest developments in Addison\'s Disease research',
    content: `Current research areas in Addison's disease:

    Research Focus:
    • New treatment options
    • Improved diagnosis methods
    • Quality of life studies
    • Genetic factors
    
    Recent Developments:
    • Continuous hormone delivery systems
    • Modified-release medications
    • Biomarker identification
    • Patient monitoring tools
    
    These advances aim to improve patient care and outcomes.`,
    source: 'National Institutes of Health',
    sourceUrl: 'https://www.nih.gov/',
    category: 'basics'
  }
];

interface PostModalProps {
  post: InfoPost;
  onClose: () => void;
}

function PostModal({ post, onClose }: PostModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{post.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-700">{post.content}</div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Source:{' '}
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {post.source}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AddisonsInfo() {
  const [selectedPost, setSelectedPost] = useState<InfoPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<InfoPost['category'] | 'all'>('all');

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'basics', name: 'Disease Basics' },
    { id: 'treatment', name: 'Treatment' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'emergency', name: 'Emergency Care' }
  ];

  const filteredPosts = selectedCategory === 'all'
    ? infoPosts
    : infoPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Understanding Addison's Disease
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Comprehensive information from trusted medical sources
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as InfoPost['category'] | 'all')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map(post => (
            <button
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-lg shadow-sm p-6 text-left hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start space-x-4">
                <Book className="h-6 w-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                  <p className="mt-2 text-gray-500">{post.summary}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {selectedPost && (
          <PostModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </div>
    </div>
  );
}