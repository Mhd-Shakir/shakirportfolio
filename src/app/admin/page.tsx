'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Code2, FolderKanban, LogOut, Save, Plus, Trash2, ExternalLink, Loader2, Sparkles, AlertCircle, Database, Check, Mail } from 'lucide-react';
import Link from 'next/link';

type Tab = 'projects' | 'skills' | 'messages';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  const [tab, setTab] = useState<Tab>('projects');
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);

  useEffect(() => {
    if (authed) fetchData();
  }, [authed, tab]);

  const fetchData = async () => {
    setLoading(true);
    setDbError(null);
    try {
      const endpoint = tab === 'messages' ? 'contact' : tab;
      const res = await fetch(`/api/${endpoint}`);
      const data = await res.json();
      if (data.success) {
        if (tab === 'projects') setProjects(data.data);
        else if (tab === 'skills') setSkills(data.data);
        else setMessages(data.data);
      } else {
        setDbError(data.error || 'Server connection failed');
      }
    } catch (err) {
      setDbError('Database Connection Error. Ensure your Atlas IP Whitelist is set to 0.0.0.0/0.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (creds.username === 'admin' && creds.password === 'shakir123') {
      setAuthed(true);
    } else {
      setLoginError('Invalid Key. Access Denied.');
    }
  };

  const startEdit = (item: any) => {
    setEditingId(item._id);
    setEditData({ ...item });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  const handleCreate = async () => {
    if (tab === 'messages') return;
    setIsSaving(true);
    const newItem = tab === 'projects' ? {
      title: 'New Project',
      description: 'Project description here...',
      techStack: ['Next.js'],
      liveUrl: '#',
      githubUrl: '#',
      color: '#00ffff',
      iconType: 'Terminal',
      order: projects.length
    } : {
      name: 'New Skill',
      iconName: 'Code2',
      proficiency: 80,
      category: 'Development',
      order: skills.length
    };

    try {
      const res = await fetch(`/api/${tab}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      const data = await res.json();
      if (data.success) {
        if (tab === 'projects') setProjects([...projects, data.data]);
        else if (tab === 'skills') setSkills([...skills, data.data]);
        startEdit(data.data);
        setSavedMsg(true);
        setTimeout(() => setSavedMsg(false), 2000);
      } else {
        alert(data.error || 'Failed to sync with Atlas');
      }
    } catch (err) {
      alert('Network error. Check Atlas status.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/${tab}/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      if (data.success) {
        if (tab === 'projects') setProjects(p => p.map(x => x._id === editingId ? data.data : x));
        else if (tab === 'skills') setSkills(s => s.map(x => x._id === editingId ? data.data : x));
        setEditingId(null);
        setSavedMsg(true);
        setTimeout(() => setSavedMsg(false), 2000);
      } else {
        alert(data.error || 'Update failed');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanent deletion from Database?')) return;
    try {
      const res = await fetch(`/api/${tab === 'messages' ? 'contact' : tab}/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        if (tab === 'projects') setProjects(p => p.filter(x => x._id !== id));
        else if (tab === 'skills') setSkills(s => s.filter(x => x._id !== id));
        else setMessages(m => m.filter(x => x._id !== id));
        setSavedMsg(true);
        setTimeout(() => setSavedMsg(false), 2000);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (!authed) {
    return (
      <div className="w-full h-full min-h-screen flex items-center justify-center bg-[#020617] p-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-700/10 rounded-full blur-[100px]" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 shadow-2xl relative z-10 text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-cyan-400 to-fuchsia-600 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,255,255,0.4)]">
             <Database size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">SHAKIR HUB</h1>
          <p className="text-slate-500 text-[10px] tracking-[0.4em] font-black uppercase mb-10">Satellite Access Control</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input value={creds.username} onChange={e => setCreds(v => ({ ...v, username: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-cyan-500/50" placeholder="Username" />
            <input type="password" value={creds.password} onChange={e => setCreds(v => ({ ...v, password: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50" placeholder="Passkey" />
            {loginError && <p className="text-red-400 text-[10px] font-black uppercase">{loginError}</p>}
            <button type="submit" className="w-full py-5 bg-white text-black font-black text-xs tracking-widest rounded-2xl hover:bg-cyan-400 transition-all active:scale-95 uppercase">Commence</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-screen bg-[#020617] flex flex-col sm:flex-row text-white selection:bg-cyan-500/30 overflow-hidden">
      <aside className="w-full sm:w-72 bg-black/50 backdrop-blur-3xl border-r border-white/10 p-8 flex flex-col z-20">
        <div className="mb-12">
          <p className="text-[10px] text-fuchsia-400 font-black tracking-[0.3em] uppercase mb-1">Identity Confirmed</p>
          <h2 className="text-2xl font-black tracking-tighter">M. SHAKIR</h2>
        </div>
        <nav className="flex-1 space-y-3">
          {(['projects', 'skills', 'messages'] as const).map(id => (
            <button key={id} onClick={() => setTab(id as Tab)} className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${tab === id ? 'bg-white text-black' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
              <div className="flex items-center gap-4">
                 {id === 'projects' ? <FolderKanban size={16} /> : id === 'skills' ? <Code2 size={16} /> : <Mail size={16} />}
                 {id}
              </div>
              <div className={`w-2 h-2 rounded-full ${tab === id ? 'bg-cyan-500' : 'bg-slate-800'}`} />
            </button>
          ))}
        </nav>
        <div className="mt-auto space-y-4 pt-8">
           <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white flex items-center gap-2">
             <ExternalLink size={14} /> View Portfolio
           </Link>
           <button onClick={() => setAuthed(false)} className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-red-400 flex items-center gap-2">
             <LogOut size={14} /> Disconnect System
           </button>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-auto p-6 sm:p-16 relative z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-900/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-16 gap-8">
            <div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase mb-4">{tab} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Live</span></h1>
              <div className="flex items-center gap-4 text-xs font-black tracking-widest uppercase">
                {loading ? <span className="flex items-center gap-2 text-cyan-400"><Loader2 size={14} className="animate-spin" /> Fetching Atlas...</span> : <span className="flex items-center gap-2 text-slate-500"><Check size={14} className="text-fuchsia-400" /> System Operational</span>}
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={handleCreate} disabled={loading || isSaving} className="px-10 py-4 bg-white text-black font-black text-xs tracking-widest uppercase rounded-2xl hover:bg-cyan-400 transition-all shadow-2xl active:scale-95 disabled:opacity-30 flex items-center gap-3">
                 {isSaving && !editingId ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Add New
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {dbError ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 bg-red-500/10 border border-red-500/20 rounded-[2.5rem] text-center">
                 <AlertCircle size={40} className="text-red-500 mx-auto mb-6" />
                 <h3 className="text-xl font-black uppercase mb-2">Connection Blocked</h3>
                 <p className="text-slate-400 text-sm max-w-sm mx-auto mb-8 leading-relaxed font-medium">{dbError}</p>
                 <button onClick={fetchData} className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Retry Link</button>
              </motion.div>
            ) : loading ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center py-40">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin" />
                  <Database size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400" />
                </div>
              </motion.div>
            ) : (tab === 'projects' ? projects : tab === 'skills' ? skills : messages).length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-20 border-2 border-dashed border-white/5 rounded-[3rem] text-center group cursor-pointer hover:border-cyan-500/20 transition-all" onClick={() => tab !== 'messages' && handleCreate()}>
                 <Database size={40} className="text-slate-700 mx-auto mb-6 group-hover:text-cyan-500 transition-colors" />
                 <p className="text-slate-500 font-black tracking-widest uppercase text-xs">
                   {tab === 'messages' ? 'No incoming transmissions detected.' : "No Data Synchronized. Click 'Add New' to Begin."}
                 </p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 gap-6 pb-20">
                {(tab === 'projects' ? projects : tab === 'skills' ? skills : messages).map((item, i) => (
                  <div key={item._id || i} className={`bg-white/[0.02] backdrop-blur-3xl border rounded-[2.5rem] p-10 flex flex-col gap-8 transition-all group ${editingId === item._id ? 'border-cyan-500/50 bg-cyan-500/[0.02]' : 'border-white/10 hover:border-white/20'}`}>
                    {tab === 'messages' ? (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center font-black text-fuchsia-400 border border-white/10 group-hover:bg-fuchsia-500 group-hover:text-black transition-all"><Mail size={20} /></div>
                            <div>
                               <h3 className="text-2xl font-black tracking-tighter uppercase">{item.name}</h3>
                               <div className="flex flex-col gap-0.5 mt-1 opacity-70">
                                 <p className="text-cyan-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">{item.email}</p>
                                 {item.phone ? (
                                   <a href={`tel:${item.phone}`} className="text-fuchsia-400 text-[11px] font-black uppercase tracking-widest flex items-center gap-2 hover:text-white hover:underline transition-all">
                                     <span className="text-white/20 text-[8px]">PHONE:</span> {item.phone}
                                   </a>
                                 ) : (
                                   <p className="text-slate-700 text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                                     <span className="text-white/20 text-[8px]">PHONE:</span> N/A
                                   </p>
                                 )}
                               </div>
                            </div>
                          </div>
                          <button onClick={() => handleDelete(item._id)} className="p-3 text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                           <p className="text-slate-400 text-sm font-medium leading-relaxed italic">"{item.message}"</p>
                        </div>
                        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
                           <span>Received: {new Date(item.createdAt).toLocaleDateString()}</span>
                           <span className="text-white/10">|</span>
                           <span>Status: {item.status}</span>
                        </div>
                      </>
                    ) : editingId === item._id ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase text-slate-500 ml-4">Title / Name</label>
                             <input value={tab === 'projects' ? editData.title : editData.name} onChange={e => setEditData({ ...editData, [tab === 'projects' ? 'title' : 'name']: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-cyan-500" />
                          </div>
                          {tab === 'projects' ? (
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-slate-500 ml-4">Tech Stack (comma separated)</label>
                              <input value={editData.techStack?.join(', ') || ''} onChange={e => setEditData({ ...editData, techStack: e.target.value.split(',').map((s: string) => s.trim()) })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-cyan-500" />
                            </div>
                          ) : (
                             <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase text-slate-500 ml-4">Proficiency (%)</label>
                               <input type="number" value={editData.proficiency} onChange={e => setEditData({ ...editData, proficiency: parseInt(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-cyan-500" />
                             </div>
                          )}
                        </div>

                        {tab === 'projects' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase text-slate-500 ml-4">Live URL</label>
                               <input value={editData.liveUrl} onChange={e => setEditData({ ...editData, liveUrl: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-cyan-500" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase text-slate-500 ml-4">GitHub URL</label>
                               <input value={editData.githubUrl} onChange={e => setEditData({ ...editData, githubUrl: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-cyan-500" />
                            </div>
                          </div>
                        )}

                        {tab === 'projects' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase text-slate-500 ml-4">Accent Color</label>
                               <input type="color" value={editData.color} onChange={e => setEditData({ ...editData, color: e.target.value })} className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 focus:outline-none focus:border-cyan-500" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase text-slate-500 ml-4">Icon Type</label>
                               <select value={editData.iconType} onChange={e => setEditData({ ...editData, iconType: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-cyan-500 appearance-none">
                                  {['Terminal', 'Cpu', 'Shield', 'Rocket'].map(t => <option key={t} value={t} className="bg-slate-900">{t}</option>)}
                               </select>
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-500 ml-4">Description / Category</label>
                          <textarea rows={3} value={tab === 'projects' ? editData.description : editData.category} onChange={e => setEditData({ ...editData, [tab === 'projects' ? 'description' : 'category']: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-cyan-500" />
                        </div>
                        <div className="flex justify-end gap-4 pt-4">
                           <button onClick={cancelEdit} className="px-8 py-4 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:text-white transition-all">Cancel</button>
                           <button onClick={handleUpdate} disabled={isSaving} className="px-10 py-4 bg-cyan-400 text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-cyan-300 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Changes
                           </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-2">
                           <div className="flex items-center gap-5">
                             <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center font-black text-cyan-400 border border-white/10 group-hover:bg-cyan-500 group-hover:text-black transition-all">0{i+1}</div>
                             <h3 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase">{item.title || item.name}</h3>
                           </div>
                           <div className="flex items-center gap-2">
                              <button onClick={() => startEdit(item)} className="p-3 text-slate-700 hover:text-cyan-400 transition-colors"><Plus size={20} className="rotate-45" /></button>
                              <button onClick={() => handleDelete(item._id)} className="p-3 text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                           </div>
                        </div>
                        <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">{item.description || `${item.category}: Proficiency ${item.proficiency}%`}</p>
                        <div className="flex flex-wrap gap-2">
                           {(item.techStack || [item.category]).map((tag: any) => (
                             <span key={tag} className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-400">{tag}</span>
                           ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {savedMsg && (
          <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} className="fixed bottom-12 right-12 z-[100] px-10 py-5 bg-cyan-400 text-black font-black text-[10px] tracking-[0.4em] uppercase rounded-2xl shadow-[0_0_50px_rgba(0,255,255,0.4)] flex items-center gap-3">
             <Sparkles size={16} /> Synchronized
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
