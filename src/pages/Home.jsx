import { Calendar, Users, Clock } from "lucide-react";

function Home() {
    return(
        <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Reserva tu mesa en los mejores restaurantes
                </h1>
                <p className="mx-auto max-w-[700px] text-[#D2B48C] md:text-xl">
                  Descubre, reserva y disfruta de experiencias culinarias únicas con RESTOBOOK.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <input className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 bg-white text-[#1E2330]" placeholder="Buscar restaurantes..." type="text" />
                  <button type="submit" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#D2B48C] text-[#1E2330] hover:bg-[#C1A478]">
                    Buscar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#D2B48C] text-[#1E2330]">
          <div className=" px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              ¿Por qué elegir RESTOBOOK?
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Calendar className="h-10 w-10 text-[#1E2330]" />
                <h3 className="text-xl font-bold">Reservas en tiempo real</h3>
                <p className="text-[#1E2330]/80">
                  Reserva tu mesa al instante, sin esperas ni llamadas telefónicas.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Users className="h-10 w-10 text-[#1E2330]" />
                <h3 className="text-xl font-bold">Amplia selección de restaurantes</h3>
                <p className="text-[#1E2330]/80">
                  Encuentra el lugar perfecto para cualquier ocasión, desde cenas románticas hasta reuniones de negocios.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Clock className="h-10 w-10 text-[#1E2330]" />
                <h3 className="text-xl font-bold">Gestión fácil de reservas</h3>
                <p className="text-[#1E2330]/80">
                  Modifica o cancela tus reservas con un solo clic, en cualquier momento.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
}

export default Home;
