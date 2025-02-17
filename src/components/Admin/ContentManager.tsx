import React, { useState } from 'react';
import { Save, CheckCircle, Image as ImageIcon, Upload, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import * as Icons from 'lucide-react';

interface ContentSection {
  id: string;
  title: string;
  content: string;
  type: 'hero' | 'feature' | 'emergency';
}

interface HeroImage {
  url: string;
  alt: string;
}

export function ContentManager() {
  const { sections, features, heroImage, updateSections, updateFeatures, updateHeroImage } = useContent();
  const [activeType, setActiveType] = useState<'hero' | 'feature' | 'emergency'>('hero');
  const [saving, setSaving] = useState<{ [key: string]: boolean }>({});
  const [saveSuccess, setSaveSuccess] = useState<{ [key: string]: boolean }>({});
  const [imagePreview, setImagePreview] = useState<string | null>(heroImage.url);
  const [localHeroImage, setLocalHeroImage] = useState(heroImage);
  const [editingFeature, setEditingFeature] = useState<number | null>(null);

  const handleSave = async (id: string) => {
    setSaving(prev => ({ ...prev, [id]: true }));
    setSaveSuccess(prev => ({ ...prev, [id]: false }));

    try {
      updateSections(sections);
      setSaveSuccess(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setSaveSuccess(prev => ({ ...prev, [id]: false }));
      }, 3000);
    } catch (error) {
      console.error('Failed to save content:', error);
    } finally {
      setSaving(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleContentChange = (id: string, newContent: string) => {
    const updatedSections = sections.map(section => 
      section.id === id ? { ...section, content: newContent } : section
    );
    updateSections(updatedSections);
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      [field]: value
    };
    updateFeatures(updatedFeatures);
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setLocalHeroImage(prev => ({ ...prev, url: newUrl }));
    setImagePreview(newUrl);
  };

  const handleImageAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalHeroImage(prev => ({ ...prev, alt: e.target.value }));
  };

  const handleImageSave = async () => {
    setSaving(prev => ({ ...prev, heroImage: true }));
    setSaveSuccess(prev => ({ ...prev, heroImage: false }));

    try {
      updateHeroImage(localHeroImage);
      setSaveSuccess(prev => ({ ...prev, heroImage: true }));
      setTimeout(() => {
        setSaveSuccess(prev => ({ ...prev, heroImage: false }));
      }, 3000);
    } catch (error) {
      console.error('Failed to save hero image:', error);
    } finally {
      setSaving(prev => ({ ...prev, heroImage: false }));
    }
  };

  const filteredSections = sections.filter(section => section.type === activeType);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveType('hero')}
            className={`px-4 py-2 rounded-md ${
              activeType === 'hero'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Hero Section
          </button>
          <button
            onClick={() => setActiveType('feature')}
            className={`px-4 py-2 rounded-md ${
              activeType === 'feature'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Features Section
          </button>
          <button
            onClick={() => setActiveType('emergency')}
            className={`px-4 py-2 rounded-md ${
              activeType === 'emergency'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Emergency Section
          </button>
        </div>
      </div>

      {activeType === 'hero' && (
        <div className="mb-6">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <ImageIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Hero Image</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                  <input
                    type="url"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    value={localHeroImage.url}
                    onChange={handleImageUrlChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Alt Text</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    value={localHeroImage.alt}
                    onChange={handleImageAltChange}
                    placeholder="Describe the image"
                  />
                </div>

                {imagePreview && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview</label>
                    <div className="relative rounded-lg overflow-hidden h-48">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={() => setImagePreview(null)}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end items-center">
                  {saveSuccess.heroImage && (
                    <span className="mr-4 text-sm text-green-600 dark:text-green-400 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-1" />
                      Image saved successfully!
                    </span>
                  )}
                  <button
                    onClick={handleImageSave}
                    disabled={saving.heroImage}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {saving.heroImage ? 'Saving...' : 'Save Image'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeType === 'feature' && (
        <div className="space-y-6">
          {features.map((feature, index) => {
            const IconComponent = Icons[feature.icon as keyof typeof Icons];
            return (
              <div key={feature.id} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {IconComponent && (
                        <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 dark:bg-blue-600 text-white mr-4">
                          <IconComponent className="h-6 w-6" />
                        </div>
                      )}
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Feature {index + 1}</h3>
                    </div>
                    <button
                      onClick={() => setEditingFeature(editingFeature === index ? null : index)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      {editingFeature === index ? 'Done' : 'Edit'}
                    </button>
                  </div>

                  {editingFeature === index ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          value={feature.title}
                          onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <textarea
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          rows={3}
                          value={feature.description}
                          onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Icon</label>
                        <select
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          value={feature.icon}
                          onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                        >
                          {Object.keys(Icons).map((iconName) => (
                            <option key={iconName} value={iconName}>
                              {iconName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{feature.title}</h4>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="space-y-6">
        {filteredSections.map((section) => (
          <div key={section.id} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{section.title}</h3>
              <div className="space-y-4">
                <textarea
                  rows={4}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  value={section.content}
                  onChange={(e) => handleContentChange(section.id, e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleSave(section.id)}
                    disabled={saving[section.id]}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saving[section.id] ? 'Saving...' : 'Save Changes'}
                  </button>
                  {saveSuccess[section.id] && (
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Changes saved successfully!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}