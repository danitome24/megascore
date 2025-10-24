import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity, TestTube, Trophy } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="relative border-t border-foreground/10 py-24">
      <div className="via-mega-blue/2 absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />
      <div className="container relative z-10 mx-auto px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-16 space-y-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold uppercase tracking-[0.15em] text-foreground md:text-4xl">
              What is <span className="text-mega-coral">MegaReputation</span>?
            </h2>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-foreground/70">
              A transparent scoring system that tracks your contributions to the MegaETH ecosystem
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
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
                <Card className="group relative h-full overflow-hidden border-2 border-foreground/20 bg-background shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <div
                    className={`absolute left-0 top-0 h-1 w-full bg-${feature.color} transition-all duration-300 group-hover:h-2`}
                  />
                  <CardContent className="flex h-full flex-col p-8">
                    <div
                      className={`h-16 w-16 bg-${feature.color} mb-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-grow space-y-4">
                      <h3 className="text-xl font-bold uppercase tracking-[0.1em] text-foreground transition-colors duration-300 group-hover:text-mega-coral">
                        {feature.title}
                      </h3>
                      <p className="font-light leading-relaxed text-foreground/70">{feature.description}</p>
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
