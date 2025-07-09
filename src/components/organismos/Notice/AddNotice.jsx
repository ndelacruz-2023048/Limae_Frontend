import React, { useState, useRef } from 'react';

export const AddNotice = () => {
  const [form, setForm] = useState({
    lastName: '',
    postText: '',
    skills: [],
    file: null,
  });
  const [skillInput, setSkillInput] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      setForm({ ...form, skills: [...form.skills, skillInput.trim()] });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    alert('Post added successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-1 bg-blue-500"></div> {/* Barra decorativa azul */}
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Detail */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Personal Detail</h2>
            <div className="border-b border-gray-200 pb-4">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Edit Text */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Edit Text</h2>
            <div className="border-b border-gray-200 pb-4">
              <textarea
                name="postText"
                placeholder="Describe your post..."
                value={form.postText}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
            <div className="border-b border-gray-200 pb-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {form.skills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 text-blue-500 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add Skill"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">File Upload</h2>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
              onClick={() => fileInputRef.current.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                onChange={handleFileChange} 
              />
              {form.file ? (
                <p className="text-blue-500 font-medium">{form.file.name}</p>
              ) : (
                <>
                  <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG, PDF (max. 5MB)</p>
                </>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};