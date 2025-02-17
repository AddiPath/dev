import React, { useState, useRef, useEffect } from 'react';
import { X, Download, CreditCard, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface EmergencyContact {
  name: string;
  mobile: string;
  landline: string;
  relationship: string;
}

interface EmergencyIDForm {
  fullName: string;
  dateOfBirth: string;
  mobile: string;
  doctorName: string;
  emergencyContact: EmergencyContact;
}

interface EmergencyIDPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmergencyIDPopup({ isOpen, onClose }: EmergencyIDPopupProps) {
  const { user, updateEmergencyId } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formData, setFormData] = useState<EmergencyIDForm>({
    fullName: user?.emergencyId?.fullName || '',
    dateOfBirth: user?.emergencyId?.dateOfBirth || '',
    mobile: user?.emergencyId?.mobile || '',
    doctorName: user?.emergencyId?.doctorName || '',
    emergencyContact: {
      name: user?.emergencyId?.emergencyContact?.name || '',
      mobile: user?.emergencyId?.emergencyContact?.mobile || '',
      landline: user?.emergencyId?.emergencyContact?.landline || '',
      relationship: user?.emergencyId?.emergencyContact?.relationship || ''
    }
  });

  useEffect(() => {
    if (user?.emergencyId) {
      setFormData(user.emergencyId);
    }
  }, [user?.emergencyId]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmergencyId(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const generateEmergencyCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for ID card (3.5" x 2" at 300 DPI)
    canvas.width = 1050;
    canvas.height = 600;

    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header
    ctx.fillStyle = '#2563EB';
    ctx.fillRect(0, 0, canvas.width, 80);

    // Logo and title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 40px Arial';
    ctx.fillText('AddiPath Emergency ID', 40, 55);

    // Content
    ctx.fillStyle = '#000000';
    ctx.font = '24px Arial';

    // Personal Information
    ctx.font = 'bold 28px Arial';
    ctx.fillText('Personal Information', 40, 120);
    ctx.font = '24px Arial';
    ctx.fillText(`Name: ${formData.fullName}`, 40, 160);
    ctx.fillText(`DOB: ${formData.dateOfBirth}`, 40, 200);
    ctx.fillText(`Mobile: ${formData.mobile}`, 40, 240);
    ctx.fillText(`Doctor: ${formData.doctorName}`, 40, 280);

    // Emergency Contact
    ctx.font = 'bold 28px Arial';
    ctx.fillText('Emergency Contact', 40, 340);
    ctx.font = '24px Arial';
    ctx.fillText(`Name: ${formData.emergencyContact.name}`, 40, 380);
    ctx.fillText(`Mobile: ${formData.emergencyContact.mobile}`, 40, 420);
    ctx.fillText(`Landline: ${formData.emergencyContact.landline}`, 40, 460);
    ctx.fillText(`Relationship: ${formData.emergencyContact.relationship}`, 40, 500);

    // Footer
    ctx.fillStyle = '#2563EB';
    ctx.fillRect(0, canvas.height - 60, canvas.width, 60);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px Arial';
    ctx.fillText('I have Addison\'s Disease - In case of emergency, I need immediate medical attention', 40, canvas.height - 25);

    // Download the card
    const link = document.createElement('a');
    link.download = 'AddiPath-Emergency-ID.jpg';
    link.href = canvas.toDataURL('image/jpeg', 0.8);
    link.click();
  };

  const handleSaveAndDownload = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmergencyId(formData);
    generateEmergencyCard();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
              Emergency ID Card
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Doctor's Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.doctorName}
                  onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                />
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={formData.emergencyContact.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        emergencyContact: { ...formData.emergencyContact, name: e.target.value }
                      })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={formData.emergencyContact.mobile}
                      onChange={(e) => setFormData({
                        ...formData,
                        emergencyContact: { ...formData.emergencyContact, mobile: e.target.value }
                      })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Landline Number</label>
                    <input
                      type="tel"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={formData.emergencyContact.landline}
                      onChange={(e) => setFormData({
                        ...formData,
                        emergencyContact: { ...formData.emergencyContact, landline: e.target.value }
                      })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Relationship</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={formData.emergencyContact.relationship}
                      onChange={(e) => setFormData({
                        ...formData,
                        emergencyContact: { ...formData.emergencyContact, relationship: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                {saveSuccess && (
                  <span className="ml-4 text-sm text-green-600 flex items-center">
                    <Save className="w-4 h-4 mr-1" />
                    Changes saved successfully!
                  </span>
                )}
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Save className="w-4 h-4 mr-2 inline" />
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleSaveAndDownload}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Download className="w-4 h-4 mr-2 inline" />
                  Save & Download ID
                </button>
              </div>
            </div>
          </form>
        </div>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}