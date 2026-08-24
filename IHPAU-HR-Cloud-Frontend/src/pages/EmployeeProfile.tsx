import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, CalendarDays, Edit3 } from 'lucide-react';
import { employees } from '../data/mock';
import { Avatar, Badge, Field, Modal, PageHeader } from '../components/UI';
import type { Employee } from '../types';

export default function EmployeeProfile() {
  const { id } = useParams();
  const employee = employees.find((item) => item.id === id) || employees[0];
  const [profile, setProfile] = useState<Employee>(employee);
  const [tab, setTab] = useState('Overview');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const tabs = ['Overview', 'Employment', 'Attendance', 'Leave', 'Performance', 'Training', 'Documents'];

  const openEditor = () => {
    setDraft(profile);
    setEditing(true);
  };

  const saveProfile = (event: React.FormEvent) => {
    event.preventDefault();
    setProfile(draft);
    setEditing(false);
  };

  const updateDraft = (field: keyof Employee, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  return <>
    <Link className="back" to="/employees"><ArrowLeft size={14} /> Back to employees</Link>
    <PageHeader title="Employee profile" subtitle="Organization-scoped employee record" action={<button className="btn primary" onClick={openEditor}><Edit3 size={15} /> Edit profile</button>} />
    <section className="panel profile-card">
      <div className="profile-hero">
        <Avatar name={`${profile.firstName} ${profile.lastName}`} size="lg" />
        <div className="profile-summary">
          <div className="profile-name-row"><h2>{profile.firstName} {profile.lastName}</h2><Badge tone={profile.status === 'ACTIVE' ? 'success' : 'warning'}>{profile.status.replace('_', ' ')}</Badge></div>
          <p>{profile.position} · {profile.department}</p>
          <div className="chips"><span><Mail size={13} />{profile.email}</span><span><Phone size={13} />{profile.phone || 'No phone added'}</span><span><MapPin size={13} />{profile.location}</span><span><CalendarDays size={13} />Joined {profile.joinDate}</span></div>
        </div>
      </div>
    </section>
    <section className="panel">
      <div className="tabs" role="tablist">{tabs.map((item) => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)} role="tab" aria-selected={tab === item}>{item}</button>)}</div>
      {tab === 'Overview' && <div className="info-grid three"><div><small>Employee ID</small><b>{profile.id}</b></div><div><small>Manager</small><b>{profile.manager}</b></div><div><small>Employment</small><b>{profile.employmentType.replace('_', ' ')}</b></div><div><small>Attendance rate</small><b>{profile.attendanceRate}%</b></div><div><small>Leave balance</small><b>{profile.leaveBalance} days</b></div><div><small>Goal progress</small><b>{profile.goalProgress}%</b></div></div>}
      {tab !== 'Overview' && <div className="detail-placeholder"><h3>{tab}</h3><p>This section is ready for the corresponding backend module and can be wired to the existing API service without changing the profile shell.</p></div>}
    </section>
    {editing && <Modal title="Edit employee profile" onClose={() => setEditing(false)} wide><form className="form-grid" onSubmit={saveProfile}>
      <Field label="First name" required><input value={draft.firstName} onChange={(event) => updateDraft('firstName', event.target.value)} required maxLength={60} /></Field>
      <Field label="Last name" required><input value={draft.lastName} onChange={(event) => updateDraft('lastName', event.target.value)} required maxLength={60} /></Field>
      <Field label="Work email" required><input type="email" value={draft.email} onChange={(event) => updateDraft('email', event.target.value)} required maxLength={120} /></Field>
      <Field label="Phone"><input value={draft.phone} onChange={(event) => updateDraft('phone', event.target.value)} maxLength={40} /></Field>
      <Field label="Department"><input value={draft.department} onChange={(event) => updateDraft('department', event.target.value)} maxLength={80} /></Field>
      <Field label="Position"><input value={draft.position} onChange={(event) => updateDraft('position', event.target.value)} maxLength={80} /></Field>
      <Field label="Location"><input value={draft.location} onChange={(event) => updateDraft('location', event.target.value)} maxLength={120} /></Field>
      <Field label="Manager"><input value={draft.manager} onChange={(event) => updateDraft('manager', event.target.value)} maxLength={80} /></Field>
      <div className="form-actions"><button type="button" className="btn ghost" onClick={() => setEditing(false)}>Cancel</button><button className="btn primary" type="submit">Save changes</button></div>
    </form></Modal>}
  </>;
}
