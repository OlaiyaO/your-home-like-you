'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { serviceGroups } from '@/data/site';

const initialState = { name: '', phone: '', email: '', service: '', location: '', message: '' };

export function QuoteForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('idle');

  async function submit(event) {
    event.preventDefault();
    setStatus('loading');

    const response = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (result.mode === 'configuration-pending') {
      setStatus('unavailable');
      return;
    }

    setStatus(response.ok ? 'success' : 'error');
    if (response.ok) setForm(initialState);
  }

  if (status === 'success') {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center bg-ivory p-8 md:p-12">
        <CheckCircle2 className="size-10 text-red" />
        <h3 className="mt-6 font-display text-4xl text-ink">Your brief has been received.</h3>
        <p className="mt-4 max-w-md leading-relaxed text-ink/60">
          Keep a copy of the details you submitted. The team will use them to understand the scope
          and define the next practical step.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-7 text-sm font-bold text-red"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-5 border border-black/10 bg-paper p-6 shadow-[0_30px_100px_rgba(34,25,20,0.07)] md:grid-cols-2 md:p-10"
    >
      <label className="field-label">
        Your name
        <input
          className="field"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </label>
      <label className="field-label">
        Phone / WhatsApp
        <input
          className="field"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </label>
      <label className="field-label">
        Email
        <input
          className="field"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </label>
      <label className="field-label">
        Service needed
        <select
          className="field"
          required
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
        >
          <option value="">Choose one</option>
          {serviceGroups.map((group) => (
            <option key={group.id}>{group.title}</option>
          ))}
        </select>
      </label>
      <label className="field-label md:col-span-2">
        Property location
        <input
          className="field"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
      </label>
      <label className="field-label md:col-span-2">
        What would you like us to deliver?
        <textarea
          className="field min-h-32 resize-y"
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </label>
      <div className="md:col-span-2">
        <button
          disabled={status === 'loading'}
          className="button-primary w-full justify-center disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending brief…' : 'Send property brief'}{' '}
          <ArrowRight className="size-4" />
        </button>
        {status === 'error' && (
          <p className="mt-3 text-sm text-red">The brief could not be sent. Please try again.</p>
        )}
        {status === 'unavailable' && (
          <p className="mt-3 border-l-2 border-red pl-3 text-sm leading-relaxed text-ink/60">
            Online delivery is not connected yet, so your details were not sent. Please keep a copy
            of this brief until the confirmed contact channel is published.
          </p>
        )}
      </div>
    </form>
  );
}
