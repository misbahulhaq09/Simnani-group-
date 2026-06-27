import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Lock, Check, X, Upload, RotateCcw, Trash2, Plus, Image as ImageIcon, Mail } from 'lucide-react';
import { AppData, Venture, AdditionalContact } from '../types';

interface AdminPanelProps {
  data: AppData;
  onSave: (newData: AppData) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const ADMIN_PASSWORD = '#S1simnani786';

function ImagePicker({ 
  label, 
  value, 
  onChange, 
  onRemove 
}: { 
  label: string; 
  value?: string; 
  onChange: (base64: string) => void; 
  onRemove: () => void; 
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider ml-1">{label}</label>
      <div className="relative group">
        {value ? (
          <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 bg-white/5">
            <img src={value} alt={label} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
                title="Change Image"
              >
                <Upload size={18} />
              </button>
              <button 
                onClick={onRemove}
                className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full text-red-400 transition-colors"
                title="Remove Image"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full aspect-video border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all text-white/40 hover:text-[#D4AF37]"
          >
            <div className="p-3 bg-white/5 rounded-full">
              <Upload size={24} />
            </div>
            <span className="text-sm font-medium">Upload Image</span>
            <span className="text-[10px] opacity-50">JPG, PNG, WEBP (Max 10MB)</span>
          </button>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
      </div>
    </div>
  );
}

export default function AdminPanel({ data, onSave, onReset, isOpen, onClose }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [editedData, setEditedData] = useState<AppData>(data);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'ventures'>('general');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleSave = () => {
    onSave(editedData);
    onClose();
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleClose = () => {
    onClose();
    setIsAuthenticated(false);
    setPassword('');
  };

  const updateVenture = (index: number, field: keyof Venture, value: any) => {
    const newVentures = [...editedData.ventures];
    newVentures[index] = { ...newVentures[index], [field]: value };
    setEditedData({ ...editedData, ventures: newVentures });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0A1120] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]">
                    <Settings size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Control Panel</h2>
                    {isAuthenticated && <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Authenticated</p>}
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-3 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
                >
                  <X size={28} />
                </button>
              </div>

              {!isAuthenticated ? (
                <div className="flex-1 flex items-center justify-center p-8">
                  <form onSubmit={handleLogin} className="w-full max-w-sm space-y-8">
                    <div className="text-center space-y-3">
                      <div className="inline-flex p-4 bg-[#D4AF37]/10 rounded-3xl text-[#D4AF37] mb-2">
                        <Lock size={32} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">Admin Access Required</h3>
                      <p className="text-white/40 text-sm leading-relaxed">Enter your master password to unlock site management features.</p>
                    </div>

                    <div className="space-y-4">
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-center text-lg tracking-widest focus:border-[#D4AF37]/50 focus:bg-white/10 outline-none transition-all"
                        autoFocus
                      />
                      {error && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          className="text-red-400 text-xs text-center font-medium bg-red-400/10 py-2 rounded-lg"
                        >
                          {error}
                        </motion.p>
                      )}
                      <button
                        type="submit"
                        className="w-full bg-[#D4AF37] hover:bg-[#B8962D] text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-[#D4AF37]/10 active:scale-[0.98]"
                      >
                        Unlock System
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  {/* Tabs */}
                  <div className="flex border-b border-white/10 bg-white/5 px-6">
                    <button 
                      onClick={() => setActiveTab('general')}
                      className={`px-6 py-4 text-sm font-bold tracking-widest uppercase transition-all border-b-2 ${activeTab === 'general' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-white/40 hover:text-white/60'}`}
                    >
                      General Settings
                    </button>
                    <button 
                      onClick={() => setActiveTab('ventures')}
                      className={`px-6 py-4 text-sm font-bold tracking-widest uppercase transition-all border-b-2 ${activeTab === 'ventures' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-white/40 hover:text-white/60'}`}
                    >
                      Manage Ventures
                    </button>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12 custom-scrollbar">
                    
                    {activeTab === 'general' && (
                      <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                          <h4 className="text-white font-bold text-lg flex items-center gap-2">
                            <ImageIcon size={20} className="text-[#D4AF37]" />
                            Brand Identity
                          </h4>
                          
                          <ImagePicker 
                            label="Site Logo" 
                            value={editedData.logoUrl} 
                            onChange={(base64) => setEditedData({ ...editedData, logoUrl: base64 })}
                            onRemove={() => setEditedData({ ...editedData, logoUrl: '' })}
                          />

                          <div className="space-y-4">
                            <h4 className="text-white font-bold text-lg flex items-center gap-2 pt-4">
                              <Upload size={20} className="text-[#D4AF37]" />
                              Hero Background
                            </h4>
                            <div className="flex gap-4 p-2 bg-white/5 rounded-2xl border border-white/5">
                              {(['video', 'image'] as const).map((type) => (
                                <button
                                  key={type}
                                  onClick={() => setEditedData({ ...editedData, heroBackgroundType: type })}
                                  className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${editedData.heroBackgroundType === type ? 'bg-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/20' : 'text-white/40 hover:bg-white/5'}`}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                            <ImagePicker 
                              label={`Hero ${editedData.heroBackgroundType === 'video' ? 'Video' : 'Image'}`} 
                              value={editedData.heroBackground} 
                              onChange={(base64) => setEditedData({ ...editedData, heroBackground: base64 })}
                              onRemove={() => setEditedData({ ...editedData, heroBackground: '' })}
                            />
                          </div>
                        </div>

                        <div className="space-y-8">
                          <h4 className="text-white font-bold text-lg flex items-center gap-2">
                            <Mail size={20} className="text-[#D4AF37]" />
                            Global Contact Info
                          </h4>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider ml-1">Footer Email</label>
                              <input
                                type="text"
                                value={editedData.socialLinks.email}
                                onChange={(e) => setEditedData({ ...editedData, socialLinks: { ...editedData.socialLinks, email: e.target.value } })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-[#D4AF37]/50 outline-none transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider ml-1">Footer WhatsApp Link</label>
                              <input
                                type="text"
                                value={editedData.socialLinks.whatsapp}
                                onChange={(e) => setEditedData({ ...editedData, socialLinks: { ...editedData.socialLinks, whatsapp: e.target.value } })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-[#D4AF37]/50 outline-none transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'ventures' && (
                      <div className="space-y-8">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-bold text-lg">Business Ventures</h4>
                          <p className="text-white/40 text-sm">Update card details and images</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                          {editedData.ventures.map((venture, idx) => (
                            <div key={idx} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-6">
                              <div className="flex items-center justify-between">
                                <h5 className="text-[#D4AF37] font-bold uppercase tracking-widest text-sm">{venture.name}</h5>
                                <div className="p-2 bg-[#D4AF37]/10 rounded-lg text-[#D4AF37]">
                                  <ImageIcon size={16} />
                                </div>
                              </div>

                              <ImagePicker 
                                label="Card Preview Image" 
                                value={venture.image} 
                                onChange={(base64) => updateVenture(idx, 'image', base64)}
                                onRemove={() => updateVenture(idx, 'image', '')}
                              />

                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] text-white/30 uppercase tracking-widest font-bold ml-1">Phone Number</label>
                                  <input
                                    type="text"
                                    value={venture.phone}
                                    onChange={(e) => updateVenture(idx, 'phone', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#D4AF37]/30 outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] text-white/30 uppercase tracking-widest font-bold ml-1">Website URL</label>
                                  <input
                                    type="text"
                                    value={venture.website}
                                    onChange={(e) => updateVenture(idx, 'website', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#D4AF37]/30 outline-none"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Actions */}
                  <div className="p-8 border-t border-white/10 bg-white/5 flex flex-col md:flex-row gap-4 items-center">
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to reset all site settings to factory defaults? This action cannot be undone.')) {
                          onReset();
                          onClose();
                          setIsAuthenticated(false);
                        }
                      }}
                      className="w-full md:w-auto px-10 py-4 bg-white/5 hover:bg-red-500/10 text-white/60 hover:text-red-400 border border-white/10 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300"
                    >
                      <RotateCcw size={20} />
                      Reset to Default
                    </button>
                    
                    <button
                      onClick={handleSave}
                      className="flex-1 w-full bg-[#D4AF37] hover:bg-[#B8962D] text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-[#D4AF37]/20 active:scale-[0.98]"
                    >
                      <Check size={24} />
                      Apply All Changes
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.3);
        }
      `}</style>
    </>
  );
}
