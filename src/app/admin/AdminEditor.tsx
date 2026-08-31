'use client';

import { useState } from 'react';
import { BriefcaseBusiness, Eye, Layers3, LogOut, Plus, Save, Trash2, UserRound } from 'lucide-react';
import type { PortfolioContent } from '@/lib/portfolio';

type Tab = 'profile' | 'projects' | 'experience' | 'skills';
const newId = () => `new-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export default function AdminEditor({ initialContent }: { initialContent: PortfolioContent }) {
  const [content, setContent] = useState(initialContent);
  const [tab, setTab] = useState<Tab>('profile');
  const [status, setStatus] = useState<'idle'|'saving'|'saved'|'error'>('idle');
  const tabs = [{id:'profile',label:'Profile',icon:UserRound},{id:'projects',label:'Projects',icon:Layers3},{id:'experience',label:'Experience',icon:BriefcaseBusiness},{id:'skills',label:'Skills',icon:Layers3}] as const;
  const setSettings = (key: keyof PortfolioContent['settings'], value: string) => setContent(c => ({...c, settings:{...c.settings,[key]:value}}));
  async function save() {
    setStatus('saving');
    try {
      const response = await fetch('/api/admin/content',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(content)});
      const result = await response.json();
      if (response.ok) { setContent(result.content); setStatus('saved'); setTimeout(()=>setStatus('idle'),2500); }
      else { setStatus('error'); alert(result.error || 'Unable to save changes.'); }
    } catch {
      setStatus('error');
      alert('Unable to reach the server. Check the database configuration and try again.');
    }
  }
  async function logout() { await fetch('/api/admin/logout',{method:'POST'}); window.location.reload(); }
  return <main className="min-h-screen bg-ink text-paper">
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        <div><p className="font-display font-bold">Portfolio CMS</p><p className="text-[10px] font-mono text-muted uppercase tracking-widest">Content control</p></div>
        <div className="flex gap-2"><a href="/" target="_blank" className="admin-icon-button" aria-label="Preview portfolio"><Eye size={17}/></a><button onClick={logout} className="admin-icon-button" aria-label="Log out"><LogOut size={17}/></button></div>
      </div>
    </header>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[220px_1fr] gap-8">
      <aside><nav className="flex lg:flex-col gap-2 overflow-auto">{tabs.map(({id,label,icon:Icon})=><button key={id} onClick={()=>setTab(id)} className={`admin-nav ${tab===id?'active':''}`}><Icon size={16}/>{label}</button>)}</nav></aside>
      <section className="min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"><div><p className="admin-label text-accent">Editor / {tab}</p><h1 className="font-display text-3xl sm:text-4xl font-bold capitalize">{tab}</h1></div><button onClick={save} disabled={status==='saving'} className="h-11 px-5 rounded-xl bg-accent text-ink font-bold flex items-center justify-center gap-2 disabled:opacity-60"><Save size={16}/>{status==='saving'?'Saving…':status==='saved'?'Saved':'Save changes'}</button></div>
        {tab==='profile' && <ProfileEditor content={content} setSettings={setSettings}/>} 
        {tab==='projects' && <ProjectsEditor content={content} setContent={setContent}/>} 
        {tab==='experience' && <ExperienceEditor content={content} setContent={setContent}/>} 
        {tab==='skills' && <SkillsEditor content={content} setContent={setContent}/>} 
      </section>
    </div>
  </main>;
}

const Field = ({label,value,onChange,area=false,type='text'}:{label:string;value:string;onChange:(v:string)=>void;area?:boolean;type?:string}) => <label className="block"><span className="admin-label">{label}</span>{area?<textarea rows={4} value={value} onChange={e=>onChange(e.target.value)} className="admin-input min-h-28 py-3 resize-y"/>:<input type={type} value={value} onChange={e=>onChange(e.target.value)} className="admin-input"/>}</label>;
const Card = ({children}:{children:React.ReactNode}) => <div className="technical-border bg-white/[.02] rounded-2xl p-5 sm:p-6 space-y-5">{children}</div>;

function ProfileEditor({content,setSettings}:{content:PortfolioContent;setSettings:(k:keyof PortfolioContent['settings'],v:string)=>void}) {
  const s=content.settings; return <div className="grid md:grid-cols-2 gap-5">
    <Card><h2 className="admin-card-title">Identity & hero</h2><Field label="Full name" value={s.name} onChange={v=>setSettings('name',v)}/><Field label="Professional role" value={s.role} onChange={v=>setSettings('role',v)}/><Field label="Hero description" value={s.heroDescription} area onChange={v=>setSettings('heroDescription',v)}/><Field label="Profile image path or URL" value={s.profileImage} onChange={v=>setSettings('profileImage',v)}/></Card>
    <Card><h2 className="admin-card-title">About section</h2><div className="grid grid-cols-2 gap-4"><Field label="Heading" value={s.aboutHeading} onChange={v=>setSettings('aboutHeading',v)}/><Field label="Accent word" value={s.aboutAccent} onChange={v=>setSettings('aboutAccent',v)}/></div><Field label="Eyebrow" value={s.aboutEyebrow} onChange={v=>setSettings('aboutEyebrow',v)}/><Field label="First paragraph" value={s.aboutParagraphOne} area onChange={v=>setSettings('aboutParagraphOne',v)}/><Field label="Second paragraph" value={s.aboutParagraphTwo} area onChange={v=>setSettings('aboutParagraphTwo',v)}/></Card>
    <Card><h2 className="admin-card-title">Contact & social</h2><Field label="Email" type="email" value={s.email} onChange={v=>setSettings('email',v)}/><Field label="LinkedIn URL" value={s.linkedInUrl} onChange={v=>setSettings('linkedInUrl',v)}/><Field label="GitHub URL" value={s.githubUrl} onChange={v=>setSettings('githubUrl',v)}/></Card>
    <Card><h2 className="admin-card-title">Contact messaging</h2><Field label="Contact heading" value={s.contactHeading} onChange={v=>setSettings('contactHeading',v)}/><Field label="Contact description" area value={s.contactText} onChange={v=>setSettings('contactText',v)}/></Card>
  </div>;
}

function ProjectsEditor({content,setContent}:{content:PortfolioContent;setContent:React.Dispatch<React.SetStateAction<PortfolioContent>>}) {
  const update=(i:number,key:string,value:unknown)=>setContent(c=>({...c,projects:c.projects.map((p,x)=>x===i?{...p,[key]:value}:p)}));
  const remove=(i:number)=>setContent(c=>({...c,projects:c.projects.filter((_,x)=>x!==i)}));
  const add=()=>setContent(c=>({...c,projects:[...c.projects,{id:newId(),title:'New project',description:'',image:'/img001.png',tags:[],url:'https://',sortOrder:c.projects.length,visible:true}]}));
  return <div className="space-y-5">{content.projects.map((p,i)=><Card key={p.id}><div className="flex justify-between"><h2 className="admin-card-title">{String(i+1).padStart(2,'0')} · {p.title}</h2><button onClick={()=>remove(i)} className="text-muted hover:text-red-400" aria-label="Delete project"><Trash2 size={17}/></button></div><div className="grid md:grid-cols-2 gap-4"><Field label="Title" value={p.title} onChange={v=>update(i,'title',v)}/><Field label="Project URL" value={p.url} onChange={v=>update(i,'url',v)}/><Field label="Image path or URL" value={p.image} onChange={v=>update(i,'image',v)}/><Field label="Tags (comma separated)" value={p.tags.join(', ')} onChange={v=>update(i,'tags',v.split(',').map(x=>x.trim()).filter(Boolean))}/></div><Field label="Description" area value={p.description} onChange={v=>update(i,'description',v)}/><label className="flex items-center gap-3 text-sm text-muted"><input type="checkbox" checked={p.visible} onChange={e=>update(i,'visible',e.target.checked)} className="accent-orange-500"/>Visible on portfolio</label></Card>)}<button onClick={add} className="admin-add"><Plus size={16}/> Add project</button></div>;
}

function ExperienceEditor({content,setContent}:{content:PortfolioContent;setContent:React.Dispatch<React.SetStateAction<PortfolioContent>>}) {
  const update=(i:number,key:string,value:unknown)=>setContent(c=>({...c,experiences:c.experiences.map((p,x)=>x===i?{...p,[key]:value}:p)}));
  const remove=(i:number)=>setContent(c=>({...c,experiences:c.experiences.filter((_,x)=>x!==i)}));
  const add=()=>setContent(c=>({...c,experiences:[...c.experiences,{id:newId(),role:'New role',company:'Company',period:'Current',location:'Remote',points:[],sortOrder:c.experiences.length,visible:true}]}));
  return <div className="space-y-5">{content.experiences.map((e,i)=><Card key={e.id}><div className="flex justify-between"><h2 className="admin-card-title">{e.role} · {e.company}</h2><button onClick={()=>remove(i)} className="text-muted hover:text-red-400"><Trash2 size={17}/></button></div><div className="grid md:grid-cols-2 gap-4"><Field label="Role" value={e.role} onChange={v=>update(i,'role',v)}/><Field label="Company" value={e.company} onChange={v=>update(i,'company',v)}/><Field label="Period" value={e.period} onChange={v=>update(i,'period',v)}/><Field label="Location" value={e.location} onChange={v=>update(i,'location',v)}/></div><Field label="Highlights (one per line)" area value={e.points.join('\n')} onChange={v=>update(i,'points',v.split('\n').filter(Boolean))}/><label className="flex items-center gap-3 text-sm text-muted"><input type="checkbox" checked={e.visible} onChange={x=>update(i,'visible',x.target.checked)} className="accent-orange-500"/>Visible on portfolio</label></Card>)}<button onClick={add} className="admin-add"><Plus size={16}/> Add experience</button></div>;
}

function SkillsEditor({content,setContent}:{content:PortfolioContent;setContent:React.Dispatch<React.SetStateAction<PortfolioContent>>}) {
  const update=(i:number,key:string,value:unknown)=>setContent(c=>({...c,skillGroups:c.skillGroups.map((g,x)=>x===i?{...g,[key]:value}:g)}));
  const remove=(i:number)=>setContent(c=>({...c,skillGroups:c.skillGroups.filter((_,x)=>x!==i)}));
  const add=()=>setContent(c=>({...c,skillGroups:[...c.skillGroups,{id:newId(),name:'New group',icon:'code',sortOrder:c.skillGroups.length,skills:[]}]}));
  return <div className="grid md:grid-cols-2 gap-5">{content.skillGroups.map((g,i)=><Card key={g.id}><div className="flex justify-between"><h2 className="admin-card-title">{g.name}</h2><button onClick={()=>remove(i)} className="text-muted hover:text-red-400"><Trash2 size={17}/></button></div><Field label="Group name" value={g.name} onChange={v=>update(i,'name',v)}/><label className="block"><span className="admin-label">Icon</span><select className="admin-input" value={g.icon} onChange={e=>update(i,'icon',e.target.value)}>{['code','layers','server','globe'].map(x=><option key={x} value={x}>{x}</option>)}</select></label><Field label="Skills (Name | devicon class, one per line)" area value={g.skills.map(s=>`${s.name} | ${s.iconClass}`).join('\n')} onChange={v=>update(i,'skills',v.split('\n').filter(Boolean).map((line,x)=>{const [name,iconClass='']=line.split('|').map(y=>y.trim());return{id:newId()+x,name,iconClass,sortOrder:x}}))}/></Card>)}<button onClick={add} className="admin-add min-h-40"><Plus size={16}/> Add skill group</button></div>;
}
