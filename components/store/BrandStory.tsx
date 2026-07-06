import { Sparkles, Shirt, Footprints, ShoppingBag, Award } from 'lucide-react';

export default function BrandStory() {
  const BOX_ICONS = [Sparkles, Shirt, Footprints, ShoppingBag];

  return (
    <section className="py-20 bg-brand-black overflow-hidden">
      <div className="section">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <p className="text-gold-400 text-sm font-medium tracking-[0.2em] uppercase mb-4">Our Story</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Crafting Fashion
              <span className="block text-gold-gradient">Since 2009</span>
            </h2>

            <div className="space-y-4 text-gray-400 text-[15px] leading-relaxed">
              <p>
                Founded in 2009 by <strong className="text-white">K. Chakravarthy</strong> in the heart of Raipur,
                Imperial Fashion Groups began as a single store with a vision — to make premium Indian
                fashion accessible to every family.
              </p>
              <p>
                Over 15+ years, we've grown to serve customers across <strong className="text-white">Raipur,
                Hyderabad, and Bengaluru</strong>, bringing together the finest ethnic and western wear
                collections under one roof.
              </p>
              <p>
                In 2022, we brought Imperial online — so our signature style and quality can reach
                every corner of India. <em className="text-gold-400 font-serif text-lg">"Wear your attitude"</em> isn't just
                a tagline. It's the heart of everything we do.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                { value: '15+',   label: 'Years of Fashion' },
                { value: '3',     label: 'Cities' },
                { value: '10K+',  label: 'Happy Customers' },
              ].map(stat => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-3xl font-bold text-gold-gradient font-display mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative card stack */}
          <div className="relative hidden lg:block h-[500px]">
            <div className="absolute inset-0 grid grid-cols-2 gap-4">
              {[
                { top: '0%',   left: '0%',   h: '60%', gradient: 'from-rose-900/60 to-pink-900/60',    delay: '0ms' },
                { top: '0%',   left: '52%',  h: '45%', gradient: 'from-blue-900/60 to-indigo-900/60',  delay: '100ms' },
                { top: '62%',  left: '0%',   h: '38%', gradient: 'from-purple-900/60 to-violet-900/60', delay: '200ms' },
                { top: '47%',  left: '52%',  h: '53%', gradient: 'from-amber-900/60 to-yellow-900/60', delay: '300ms' },
              ].map((box, i) => (
                <div
                  key={i}
                  className={`absolute rounded-2xl bg-gradient-to-br ${box.gradient} bg-brand-gray border border-white/10 hover:border-gold-400/50 transition-all duration-500`}
                  style={{ top: box.top, left: box.left, height: box.h, width: '48%', animationDelay: box.delay }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {(() => {
                      const Icon = BOX_ICONS[i];
                      return <Icon className="w-12 h-12 text-gold-400/80" />;
                    })()}
                  </div>
                </div>
              ))}
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold-400 text-brand-black px-6 py-3 rounded-full font-bold text-sm shadow-gold-lg whitespace-nowrap flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-black shrink-0" />
              <span>Premium Indian Fashion Brand</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
