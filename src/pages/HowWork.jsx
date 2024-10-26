import { Button } from "@nextui-org/react"
import { Search, Calendar, Utensils, Star, ArrowRight } from "lucide-react"

function HowWork() {
    const steps = [
        {
          title: "Busca un restaurante",
          description: "Utiliza nuestro buscador para encontrar restaurantes por ubicación, tipo de cocina o nombre.",
          icon: Search,
        },
        {
          title: "Elige fecha y hora",
          description: "Selecciona la fecha y hora que prefieras para tu reserva.",
          icon: Calendar,
        },
        {
          title: "Haz tu reserva",
          description: "Confirma tu reserva con un solo clic. Recibirás una confirmación por correo electrónico.",
          icon: Utensils,
        },
        {
          title: "Disfruta y valora",
          description: "Después de tu visita, comparte tu experiencia dejando una reseña.",
          icon: Star,
        },
      ]
    return(
        <>
            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-12 text-white">Cómo funciona RESTOBOOK</h1>
          <div className="space-y-12 ">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#D2B48C] flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-[#1E2330]" />
                </div>
                <div className="flex-grow md:mt-4">
                  <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                  <p className="text-[#D2B48C]/80">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block self-center">
                    <ArrowRight className="h-6 w-6 text-[#D2B48C]" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Button className="bg-[#D2B48C] text-[#1E2330] hover:bg-[#C1A478] text-lg px-8 py-3">
              Empieza a reservar ahora
            </Button>
          </div>
        </div>
      </main>
        </>
    )
}

export default HowWork;
