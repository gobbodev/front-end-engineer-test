'use server'

import { ManyArrowsSVG } from "../../../public/icons/ManyArrowsSVG";

export async function BannerHome() {
    return (
        <div className="relative bg-gradient-to-r from-myblack via-[#503613] to-myorange-low/80 rounded-lg overflow-hidden shadow-xl mb-8 border border-myorange-white/10">
            <div className="relative px-10 py-12">
                {/* detalhe laranja no banner*/}
                <div className="absolute left-0 top-0 h-full w-2 bg-myorange-low"></div>

                {/* Content */}
                <div className="z-10 max-w-2xl">
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-1 bg-myorange-low mr-4"></div>
                        <span className="text-myorange-white text-sm font-semibold tracking-tight">TIGERSHOT</span>
                    </div>

                    <h1 className="text-5xl font-bold mb-6 text-myorange-white leading-tight">
                        De um Tiro Certeiro nas <span className="text-myorange-low underline">Melhores Odds</span> de Apostas Esportivas do Brasil
                    </h1>
                    <p className="text-myorange-white/80 text-lg max-w-xl">
                        Aqui você encontra só as melhores odds de apostas do Brasil, com comparativos em tempo real.
                    </p>
                </div>
            </div>

            {/* não é o ideal, mas o svg ta com o vp errado*/}
            <div className="absolute -bottom-14 -right-6 scale-x-[-1]">
                <ManyArrowsSVG className="size-74 filter drop-shadow-lg" />
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-myorange-low/0 md:h-44"/>
            </div>
        </div>  
    );
}
  
