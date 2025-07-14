import { Card, CardContent } from "@/components/ui/card";
import { Activity, TestTube, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export function FeaturesSection() {
  return (
    <section className="relative py-24 border-t border-foreground/10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mega-blue/2 to-transparent" />
      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-[0.15em]">
              What is <span className="text-mega-coral">MegaReputation</span>?
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed font-light">
              A transparent scoring system that tracks your contributions to the
              MegaETH ecosystem
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: "Track Activity",
                description:
                  "Every transaction, smart contract interaction, and testnet participation is automatically recorded and scored.",
                color: "mega-coral",
                delay: 0.2,
              },
              {
                icon: TestTube,
                title: "Pioneer Rewards",
                description:
                  "Early testnet participants receive bonus points and exclusive recognition for helping build the ecosystem.",
                color: "mega-green",
                delay: 0.4,
              },
              {
                icon: Trophy,
                title: "Verifiable Reputation",
                description:
                  "Your reputation is stored on-chain as a Soulbound NFT, making it permanent and verifiable across applications.",
                color: "mega-blue",
                delay: 0.6,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="bg-background border-2 border-foreground/20 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden h-full hover:-translate-y-2">
                  <div
                    className={`absolute top-0 left-0 w-full h-1 bg-${feature.color} group-hover:h-2 transition-all duration-300`}
                  />
                  <CardContent className="p-8 h-full flex flex-col">
                    <div
                      className={`w-16 h-16 bg-${feature.color} flex items-center justify-center group-hover:scale-110 transition-all duration-300 mb-6`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-4 flex-grow">
                      <h3 className="text-xl font-bold text-foreground uppercase tracking-[0.1em] group-hover:text-mega-coral transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-foreground/70 leading-relaxed font-light">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
