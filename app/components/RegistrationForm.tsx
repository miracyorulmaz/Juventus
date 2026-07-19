'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, User, Users, Calendar, Phone, Shield } from 'lucide-react';
import JuventusLogo from './JuventusLogo';

export default function RegistrationForm() {
  const [form, setForm] = useState({
    parentName: '',
    playerName: '',
    birthYear: '',
    phone: '',
    days: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dayList = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const toggleDay = (d: string) => {
    setForm((p) => ({
      ...p,
      days: p.days.includes(d) ? p.days.filter((x) => x !== d) : [...p.days, d],
    }));
    if (errors.days) setErrors((p) => ({ ...p, days: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.parentName.trim()) e.parentName = 'Zorunlu alan';
    if (!form.playerName.trim()) e.playerName = 'Zorunlu alan';
    if (!form.birthYear) e.birthYear = 'Seçiniz';
    if (!form.phone.trim()) e.phone = 'Zorunlu alan';
    if (form.days.length === 0) e.days = 'En az bir gün seçin';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const inputClass = (name: string) =>
    `w-full px-4 py-3.5 bg-[#0A0A0A] border rounded-2xl text-white text-sm placeholder:text-white/15 focus:outline-none transition-all ${
      errors[name] ? 'border-red-500/50' : 'border-white/10 focus:border-amber-400/50'
    }`;

  return (
    <section id="kayit" className="relative bg-black py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] to-black pointer-events-none" />

      {/* Background image */}
      <div className="absolute inset-0 z-0 opacity-[0.04]">
        <JuventusLogo className="w-full h-full opacity-[0.04]" color="white" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-amber-400/80 text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-semibold">
            Ücretsiz Deneme Antrenmanı
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Kayıt{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-400">
              Başvurusu
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg">
            Çocuğunuz için ücretsiz deneme antrenmanına katılın.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 md:p-10"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-amber-400/10 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-amber-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-amber-400 mb-2">Başvuru Alındı!</h3>
                <p className="text-white/40">En kısa sürede sizi arayıp deneme antrenmanı planlayacağız.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-wider font-semibold mb-2">
                      <User className="w-3.5 h-3.5 text-amber-400" /> Veli Ad Soyad
                    </label>
                    <input name="parentName" value={form.parentName} onChange={handleChange} placeholder="Ad Soyad" className={inputClass('parentName')} />
                    {errors.parentName && <p className="text-red-400 text-xs mt-1">{errors.parentName}</p>}
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-wider font-semibold mb-2">
                      <Users className="w-3.5 h-3.5 text-amber-400" /> Sporcu Ad Soyad
                    </label>
                    <input name="playerName" value={form.playerName} onChange={handleChange} placeholder="Ad Soyad" className={inputClass('playerName')} />
                    {errors.playerName && <p className="text-red-400 text-xs mt-1">{errors.playerName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-wider font-semibold mb-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" /> Doğum Yılı
                    </label>
                    <select name="birthYear" value={form.birthYear} onChange={handleChange} className={inputClass('birthYear') + ' cursor-pointer'}>
                      <option value="">Seçiniz</option>
                      {Array.from({ length: 14 }, (_, i) => 2024 - i).map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                    {errors.birthYear && <p className="text-red-400 text-xs mt-1">{errors.birthYear}</p>}
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-wider font-semibold mb-2">
                      <Phone className="w-3.5 h-3.5 text-amber-400" /> Telefon
                    </label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="05XX XXX XX XX" className={inputClass('phone')} />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wider font-semibold block mb-3">
                    Tercih Edilen Günler
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {dayList.map((d) => {
                      const sel = form.days.includes(d);
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => toggleDay(d)}
                          className={`px-4 py-2.5 rounded-2xl text-xs font-semibold border transition-all duration-300 ${
                            sel
                              ? 'bg-amber-400 text-black border-amber-400'
                              : 'bg-transparent text-white/30 border-white/10 hover:border-white/30 hover:text-white/60'
                          }`}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                  {errors.days && <p className="text-red-400 text-xs mt-1">{errors.days}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-amber-400 text-black font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-amber-300 transition-colors group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <Shield className="w-4 h-4" />
                  Ücretsiz Deneme İçin Başvur
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
