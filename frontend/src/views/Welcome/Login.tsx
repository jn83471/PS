
import { useNavigate } from "react-router-dom";
import type { UserLoginForm } from "../../types/UserForms";
import { useMutation } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify'
import { AuthLoginApi } from "../../api/AuthApis";
import { useForm } from 'react-hook-form'
import { ErrorMessage } from "../../components/Gnr/ErrorMessage";

import Logo from '../../assets/Logo.png'
const initialValues: UserLoginForm = {
  Email: '',
  Password: ''
}
export default function Login() {
  const navigate = useNavigate()


  const { mutate, isPending } = useMutation({
    mutationFn: AuthLoginApi,
    onError: (error) => {
      if (import.meta.env.DEV) {
        console.error(error);
      }
      toast.error(error.message)
    },
    onSuccess: (data) => {
      if (import.meta.env.DEV) {
        console.info(data);
      }
      navigate('/home')

    }
  })

  const HandleSubmitLogin = (formData: UserLoginForm) => {
    mutate(formData)
  }

  const { register, handleSubmit, formState: { errors } } = useForm<UserLoginForm>({ defaultValues: initialValues })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white">

      {/* Card Container */}
      <div className="w-full max-w-6xl bg-black/80 rounded-2xl shadow-2xl  shadow-[rgba(255,255,255,.5)] overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SIDE – LOGIN */}
        <div className="p-10 flex flex-col justify-between">

          {/* Header */}
          <form onSubmit={handleSubmit(HandleSubmitLogin)}>
            <div className="flex items-center gap-2 mb-10">
              <div className="w-9 h-9 rounded-full" >
                <img src={Logo} alt="Logo" />
              </div>
              <span className="text-lg font-semibold">TKE</span>
            </div>

            <h1 className="text-3xl font-semibold mb-2">Bienvenido!</h1>
            <p className="text-gray-400 mb-6">
              Necesita iniciar session para continuar
            </p>

            {/* Social buttons */}
            {/*<div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 transition rounded-lg py-2">
                <FaGoogle />
                Log in with Google
              </button>

              <button className="w-full flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 transition rounded-lg py-2">
                <FaApple />
                Log in with Apple
              </button>
            </div>*/}

            {/* Divider */}
            {/*<div className="flex items-center gap-4 my-6">
              <span className="flex-1 h-px bg-zinc-700" />
              <span className="text-xs text-gray-400">OR</span>
              <span className="flex-1 h-px bg-zinc-700" />
            </div>*/}

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300">Email</label>
                <input
                  type="email"
                  placeholder="Escribe tu email"
                  className="w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  {...register("Email", {
                    required: "El Email es obligatorio",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "E-mail no válido",
                    },
                  })}
                />
                {errors.Email && (
                  <ErrorMessage Text={errors.Email.message!} />
                )}
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <label className="text-gray-300">Password</label>
                  {/*<a href="#" className="text-purple-400 hover:underline">
                    Forgot password?
                  </a>*/}
                </div>
                <input
                  type="password"
                  placeholder="Escribe tu contraseña "
                  className="w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  {...register("Password", {
                    required: "El Password es obligatorio",
                  })}
                />
                {errors.Password && (
                  <ErrorMessage Text={errors.Password.message!} />
                )}
              </div>

              <button type="submit" disabled={isPending} className="w-full bg-purple-600 hover:bg-purple-500 transition rounded-lg py-2 font-semibold
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-600">
                {
                  isPending
                    ? "Iniciando sesión..."
                    : "Iniciar sesión"
                }
              </button>
            </div>
          </form>

          {/* Footer */}
          {/*<p className="text-sm text-gray-400">
            Don’t have an account?{" "}
            <a href="#" className="text-purple-400 hover:underline">
              Sign up
            </a>
          </p>*/}
        </div>

        {/* RIGHT SIDE – VISUAL / MARKETING */}
        <div className="hidden md:flex relative items-center justify-center bg-gradient-to-br from-purple-900/40 to-black p-10">
          <div className="text-right max-w-sm">
            <h2 className="text-4xl font-bold leading-tight mb-4">
              División  Tepic<br />
              4 plantas de ensamble
            </h2>
            <p className="text-gray-300 mb-6">
              Sistema escalable de planificación y generación de informes para entornos industriales.
            </p>
          </div>
        </div>

      </div>
      <ToastContainer />
    </div>
  );
}
