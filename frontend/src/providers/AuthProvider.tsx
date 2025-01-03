import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react"
import { Loader, LucideLoader2 } from "lucide-react";
import { useEffect, useState } from "react";

//everytime page updates, tocken will be checked
const updateApiToken = (token: string | null) => { 
    if(token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        axiosInstance.defaults.headers.common['Authorization'];
    }
}

//animated spin while loading page
const AuthProvider = ({children}:{children: React.ReactNode}) => {
    const {getToken} = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);
            } catch (error:any) {
                updateApiToken(null);
                console.log('Error in auth provider', error);
            } finally {
                setLoading(false);
            }
        }

        initAuth();
    }, [getToken]);

    //animated spin will spin until token checked
    if(loading) {
        return (
        <div className="h-screen w-full flex items-center justify-center">
            <Loader className="size-8 text-emerald-500 animate-spin" />
        </div>
    )}

  return <>{children}</>
}

export default AuthProvider;