const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 py-16">
            <div className="size-8 rounded-full border-4 border-gray-200 border-t-primary animate-spin" />
            <p className="text-gray-400 text-sm">Cargando productos...</p>
        </div>
    )
}

export default Loader
