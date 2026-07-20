import ContactForm from './components/ContactForm';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-slate-700/50 bg-surface/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#" className="text-lg font-bold tracking-tight text-sky-400">
            NPO
          </a>
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-slate-400 transition-colors hover:text-sky-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section id="about" className="mx-auto max-w-5xl px-6 py-24">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-sky-400">
            Frontend Developer
          </p>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Hi, I&apos;m Nurettin Polat Özçetin
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            I build clean, modern web experiences with React and JavaScript.
            Currently working on my Frontend AI Engineering capstone project.
          </p>
        </section>

        <section id="contact" className="border-t border-slate-700/50 bg-surface-light/30">
          <div className="mx-auto max-w-5xl px-6 py-24">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-widest text-sky-400">
                  Get in Touch
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Let&apos;s work together
                </h2>
                <p className="mt-4 leading-relaxed text-slate-400">
                  Have a project in mind or want to connect? Fill out the form and
                  I&apos;ll respond as soon as I can.
                </p>
                <dl className="mt-8 space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Email</dt>
                    <dd>
                      <a
                        href="mailto:hello@example.com"
                        className="text-sky-400 transition-colors hover:text-sky-300"
                      >
                        hello@example.com
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Location</dt>
                    <dd className="text-slate-300">Istanbul, Turkey</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-xl border border-slate-700/50 bg-surface-light/50 p-6 sm:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-700/50 py-8 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Nurettin Polat Özçetin. All rights reserved.
      </footer>
    </div>
  );
}
