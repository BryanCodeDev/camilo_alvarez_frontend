import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, Loader2, CheckCircle } from 'lucide-react'
import SEO from '../components/seo/SEO'
import toast from 'react-hot-toast'

const contactInfo = [
  { icon: Mail, title: 'Email', value: 'hola@techstore.com', desc: 'Respondemos en menos de 24hs' },
  { icon: Phone, title: 'Teléfono', value: '+54 11 0000-0000', desc: 'Lunes a Viernes 9:00 - 18:00' },
  { icon: MapPin, title: 'Showroom', value: 'Av. Corrientes 1234, CABA', desc: 'Visítanos con cita previa' },
  { icon: Clock, title: 'Horarios', value: 'Lun-Vie 9:00-18:00', desc: 'Sábados 10:00-14:00' },
]

const faqs = [
  { q: '¿Hacen envíos a todo el país?', a: 'Sí, enviamos a todo Argentina. El envío es gratis en compras superiores a $100.000. Los tiempos de entrega varían según la localidad: 24-48hs en CABA/GBA, 3-5 días en el interior.' },
  { q: '¿Cuál es la política de devoluciones?', a: 'Tienes 30 días para devolver o cambiar cualquier producto. Debe estar en su estado original, con embalaje y accesorios completos. Los costos de envío de devolución corren por nuestra cuenta si el producto tiene falla de fábrica.' },
  { q: '¿Los productos tienen garantía oficial?', a: 'Sí, todos nuestros productos cuentan con garantía oficial del fabricante (generalmente 12 meses). Nosotros gestionamos el trámite directamente con el service oficial.' },
  { q: '¿Puedo pagar en cuotas?', a: 'Sí, a través de Mercado Pago puedes pagar en hasta 12 cuotas sin interés con tarjetas seleccionadas, o en cuotas con interés según la tarjeta.' },
  { q: '¿Tienen showroom físico?', a: 'Sí, tenemos showroom en Av. Corrientes 1234, CABA. Recomendamos coordinar visita previa por WhatsApp para asegurarte que el producto que buscas esté en exhibición.' },
  { q: '¿Cómo funciona la compra por WhatsApp?', a: 'Al hacer clic en "Comprar por WhatsApp" en cualquier producto, se abre una conversación con nuestro equipo con el mensaje pre-cargado. Te asesoramos, confirmas stock y coordinas pago/envío.' },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      toast.success('¡Mensaje enviado! Te responderemos a la brevedad.')
    } catch {
      toast.error('Error al enviar. Intenta nuevamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      <SEO
        title="Contacto | TechStore"
        description="Contacta a TechStore: showroom en CABA, teléfono, email y WhatsApp. Atención personalizada para tus consultas tecnológicas."
      />

      <div className="min-h-screen bg-primary-900 pt-20">
        <section className="py-20 lg:py-28" aria-labelledby="contact-hero">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 id="contact-hero" className="font-display font-bold text-4xl sm:text-5xl text-white mb-6">
                HABLEMOS
              </h1>
              <p className="text-lg text-white leading-relaxed">
                Estamos aquí para ayudarte. Ya sea que necesites asesoramiento para tu compra,
                tengas dudas sobre un pedido o quieras visitarnos en el showroom.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-primary-900/50" aria-labelledby="contact-info-title">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 id="contact-info-title" className="section-title mx-auto mb-4">CANALES DE CONTACTO</h2>
              <p className="text-white max-w-2xl mx-auto">Elige el que prefieras, nosotros nos adaptamos a ti</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <motion.article
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-primary-800/50 border border-dark-border rounded-2xl hover:border-red-600/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600/20 to-red-500/10 border border-red-600/30 flex items-center justify-center mb-4">
                    <info.icon className="w-6 h-6 text-red-400" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-white mb-2">{info.title}</h3>
                  <p className="text-white font-medium mb-1">{info.value}</p>
                  <p className="text-white text-sm">{info.desc}</p>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <a
                href="https://wa.me/5491100000000?text=Hola,%20me%20gustaría%20recibir%20asesoramiento%20personalizado."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 btn-whatsapp px-8 py-4 text-lg"
              >
                <MessageSquare className="w-6 h-6" />
                <span>Escribirnos por WhatsApp</span>
              </a>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28" aria-labelledby="form-title">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 id="form-title" className="section-title mb-6">ENVIANOS UN MENSAJE</h2>
                <p className="text-white mb-8">Completa el formulario y te responderemos en menos de 24 horas hábiles.</p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-primary-800/50 border border-green-500/30 rounded-2xl text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="font-display font-bold text-xl text-white mb-2">¡Mensaje enviado!</h3>
                    <p className="text-white mb-6">Gracias por contactarnos. Te responderemos a la brevedad.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-outline"
                    >
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="label">Nombre completo *</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className="input"
                          required
                          autoComplete="name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="label">Email *</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="input"
                          required
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="label">Teléfono</label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="input"
                          placeholder="+54 11 0000 0000"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="label">Asunto *</label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="input"
                          required
                        >
                          <option value="">Seleccionar asunto</option>
                          <option value="consulta">Consulta general</option>
                          <option value="pedido">Consulta por pedido</option>
                          <option value="soporte">Soporte técnico</option>
                          <option value="garantia">Garantía / Devolución</option>
                          <option value="mayorista">Ventas corporativas</option>
                          <option value="prensa">Prensa / Colaboraciones</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="label">Mensaje *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="input min-h-[150px] resize-y"
                        required
                        placeholder="Cuéntanos en qué podemos ayudarte..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full py-4 text-lg gap-3"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6" />
                          Enviar mensaje
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:pl-8"
              >
                <h2 id="faq-title" className="section-title mb-8">PREGUNTAS FRECUENTES</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <DetailsFAQ key={index} question={faq.q} answer={faq.a} index={index} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function DetailsFAQ({ question, answer, index }) {
  const [open, setOpen] = useState(false)
  return (
    <details className="group bg-primary-800/50 border border-dark-border rounded-xl overflow-hidden">
      <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
        <span className="font-medium text-white pr-4">{question}</span>
        <span className="flex-shrink-0 w-6 h-6 text-red-400 transition-transform duration-300 group-open:rotate-180">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </span>
      </summary>
      <div className="px-5 pb-5 text-white leading-relaxed animate-fade-in">{answer}</div>
    </details>
  )
}