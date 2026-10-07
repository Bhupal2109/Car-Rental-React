import { useState } from 'react'
import { Mail, MapPin, MessageSquare } from 'lucide-react'
import Footer from '../components/Footer'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const Contact = () => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
    setSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!form.subject.trim()) nextErrors.subject = 'Subject is required.'
    if (!form.message.trim()) nextErrors.message = 'Message is required.'

    setErrors(nextErrors)
    setSubmitted(Object.keys(nextErrors).length === 0)
  }

  const inputClass = (field) =>
    `w-full rounded-lg border px-3 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[field] ? 'border-red-500' : 'border-gray-200'
    }`

  return (
    <>
      <main className="bg-gray-100 min-h-screen px-4 py-14 sm:px-8 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <header className="max-w-2xl mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Contact Us</h1>
            <p className="mt-3 text-gray-600">
              Have a question about a vehicle or your rental plans? Send a message using the form below.
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <section className="bg-white rounded-xl p-5 shadow-md sm:p-8">
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass('name')}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    />
                    {errors.name && <p id="contact-name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass('email')}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    />
                    {errors.email && <p id="contact-email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange}
                      className={inputClass('subject')}
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                    />
                    {errors.subject && <p id="contact-subject-error" className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="5"
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass('message')} resize-y`}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    />
                    {errors.message && <p id="contact-message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                >
                  Submit Message
                </button>

                {submitted && (
                  <p role="status" className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                    Thank you! Your message has been submitted.
                  </p>
                )}
              </form>
            </section>

            <aside className="bg-white rounded-xl p-5 shadow-md sm:p-8">
              <h2 className="text-xl font-semibold text-gray-900">Contact information</h2>
              <p className="mt-2 text-sm text-gray-600">A few details to help with your inquiry.</p>

              <div className="mt-7 space-y-6">
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-blue-500" />
                  <div>
                    <h3 className="font-medium text-gray-800">Rental questions</h3>
                    <p className="mt-1 text-sm text-gray-600">Include the vehicle name and any relevant dates in your message.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-blue-500" />
                  <div>
                    <h3 className="font-medium text-gray-800">Vehicle locations</h3>
                    <p className="mt-1 text-sm text-gray-600">Browse the Cars page to see the locations listed for sample vehicles.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MessageSquare className="h-5 w-5 shrink-0 text-blue-500" />
                  <div>
                    <h3 className="font-medium text-gray-800">Form behavior</h3>
                    <p className="mt-1 text-sm text-gray-600">This project shows a local confirmation only; it does not send or store messages.</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Contact