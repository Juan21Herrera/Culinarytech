export default function AuthCard( { title, children, footer } ) {
    return (
        <div
            className="bg-white/20 backdrop-blur-md p8 rounded 2xl shadow-xl w-full max-w-md"
        >
            <h2 className="text-center text-2xl font-bold text-purple-600 mb-6">{title}</h2>
            {children}
            {footer && 
                <div className="mt-6 text-xs text-center text-gray-500">
                    {footer}
                </div>
            }
        </div>

    );
};