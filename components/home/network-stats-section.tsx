import { motion } from "framer-motion";

export function NetworkStatsSection() {
  return (
    <section className="relative border-t border-foreground/10 py-24">
      <div className="from-mega-green/2 to-mega-coral/2 absolute inset-0 bg-gradient-to-r via-transparent" />
      <div className="container relative z-10 mx-auto px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold uppercase tracking-[0.1em] text-foreground md:text-4xl">
              MegaETH <span className="text-mega-blue">Testnet</span>
            </h2>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { value: "2.4K+", label: "Active Users" },
                { value: "15M+", label: "Transactions" },
                { value: "98%", label: "Network Uptime" },
                { value: "24/7", label: "Live Tracking" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="group border-2 border-foreground/10 p-6 text-center transition-all duration-300 hover:border-mega-coral/30 hover:bg-mega-coral/5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="mb-3 text-3xl font-bold text-foreground transition-colors duration-300 group-hover:text-mega-coral md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium uppercase tracking-[0.15em] text-foreground/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
