import { memo } from 'react'
import { BuildingStorefrontIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'

const Footer = memo(() => (
    <footer className="sticky bottom-0 bg-white w-full p-2 shadow-[4px_-6px_6px_-1px_rgba(0,0,0,0.1)] lg:px-10 px-4">
        <div className="flex items-center justify-center">
            <div className="text-sm flex md:items-center md:gap-2 md:flex-row justify-start flex-col gap-0">
                <div>
                    <p className="flex items-center gap-2">
                        <BuildingStorefrontIcon className="size-4 text-primary" />
                        Lun a Vie de 8:00 a 12:30 y de 13:00 a 15:00
                    </p>
                    <p className="flex items-center gap-2">
                        <PhoneIcon className="size-4 text-primary" />
                        <a href="tel:3416016153">341-6016153</a> / <a href="tel:3413206644">341-3206644</a>
                    </p>
                </div>
                <div>
                    <p className="flex items-center gap-2">
                        <EnvelopeIcon className="size-4 text-primary" />
                        <a href="mailto:ventas@silvesterindustrial.com">ventas@silvesterindustrial.com</a>
                    </p>
                    <a
                        href="https://maps.app.goo.gl/VKY6dQmUguXNui3BA"
                        target="_blank"
                        className="flex items-center gap-2"
                    >
                        <MapPinIcon className="size-4 text-primary" />
                        Casilda 978, Rosario, Santa Fe
                    </a>
                </div>
            </div>
        </div>
    </footer>
))

export default Footer
