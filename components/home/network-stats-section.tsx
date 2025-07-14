import { motion } from "framer-motion";

export function NetworkStatsSection() {
  return (
    <section className="relative py-24 border-t border-foreground/10">
      <div className="absolute inset-0 bg-gradient-to-r from-mega-green/2 via-transparent to-mega-coral/2" />
      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div className="space-y-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-[0.1em]">
              MegaETH <span className="text-mega-blue">Testnet</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "2.4K+", label: "Active Users" },
                { value: "15M+", label: "Transactions" },
                { value: "98%", label: "Network Uptime" },
                { value: "24/7", label: "Live Tracking" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 border-2 border-foreground/10 hover:border-mega-coral/30 hover:bg-mega-coral/5 transition-all duration-300 group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-3 group-hover:text-mega-coral transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground/60 uppercase tracking-[0.15em] font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
