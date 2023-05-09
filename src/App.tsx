import './App.css'
import { User, EnvelopeSimple, ShieldCheck } from "@phosphor-icons/react"

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useState } from 'react'

import alessandra from './assets/alessandraPavani.png'
import bg from './assets/bg.jpg'
import bgResponsive from './assets/bgResponsive.jpg'
import logo from './assets/logo.png'

type CreateUserFormData = z.infer<typeof createUserFormSchema>

const createUserFormSchema = z.object({
  name: z.string().
    nonempty('O nome é obrigatório')
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLowerCase().concat(word.substring(1))
      }).join(' ')
    }),

  email: z.string()
    .nonempty('O e-mail é obrigatorio')
    .toLowerCase(),
})



function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  const [name, setName] = useState<any>();
  const [email, setEmail] = useState<any>();

  function createData(data: CreateUserFormData) {
    axios.post(import.meta.env.VITE_API_KEY, data)
    setName('')
    setEmail('')
    alert('Formulário enviado com sucesso!')
    window.location.reload()
  }

  return (
    <div className='min-h-screen bg-black overflow-hidden'>
      <div className='w-full'>
        <img src={bg} alt="fundo com fotos de cabelos feito pela alessandra pavani" className='w-full xsm:h-[14rem] sm:h-[20rem] md:h-[30rem] lg:h-screen invisible lg:visible absolute object-cover brightness-50' />
        <img src={bgResponsive} alt="fundo com fotos de cabelos feito pela alessandra pavani" className='w-full xsm:h-[14rem] sm:h-[22rem] md:h-[33rem] visible lg:invisible lg:h-screen absolute object-cover brightness-90' />
      </div>
      <div className='absolute flex xsm:flex-col lg:flex-row items-end h-screen justify-evenly w-full overflow-hidden'>
        <img src={alessandra} alt="foto de alessandra pavani" className='xsm:self-center top-0 mt-4 lg:mt-0 absolute invisible lg:visible lg:relative lg:self-end xsm:h-[13rem] sm:h-[19rem] md:h-[25rem] lg:h-[42rem] 3xl:h-[50rem] z-10' />
        <div className='w-[35rem] h-[35rem] 3xl:w-[40rem] 3xl:h-[40rem] rounded-full absolute bg-[#B97748] blur-[230px] right-[50rem] 3xl:right-[65rem] top-[20rem] 3xl:top-[35rem]'></div>
        <form onSubmit={handleSubmit(createData)} className='absolute lg:relative xsm:bottom-6 sm:bottom-8 md:bottom-20 lg:bottom-0 flex flex-col justify-center items-center md:mx-16 sm:px-10 xsm:px-14 lg:px-0 lg:w-[30rem] lg:h-[50rem] 3xl:w-[35rem] 3xl:h-[65rem] z-10'>
          <img src={logo} alt="log do studio alessandra pavani" className='w-fit p-[5rem] relative top-20 md:top-0 md:w-fit md:h-[18rem] lg:p-16 object-cover lg:pb-6 brightness-125' />
          <h1 className='xsm:text-lg sm:text-xl lg:text-3xl font-bold text-center text-slate-100 xsm:pb-2 sm:pb-2'>M.A.P transformation seja o próximo profissional especialista em cachos!</h1>
          <p className='xsm:text-base sm:text-md text-neutral-400 pb-4 text-center'>Aulas gratuitas ao vivo nos dias 18 e 19. Para receber o acesso do evento cadastre-se</p>
          <div className='relative w-full'>
            <div className='flex pointer-events-none absolute pl-3 sm:py-[14px] xsm:py-3 items-center'>
              <User className="text-slate-200" size={25} />
            </div>
            <div className='flex flex-col mb-3'>
              <input
                type="text"
                className='bg-neutral-800 rounded-lg w-full pr-3 pl-12 sm:py-3 xsm:py-2.5 border border-neutral-500 text-slate-300'
                placeholder='Seu nome completo'
                {...register('name')}
                value={name}
              />
              {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
            </div>
          </div>

          <div className='relative w-full'>
            <div className='flex pointer-events-none absolute pl-3 sm:py-[14px] xsm:py-3'>
              <EnvelopeSimple className="text-slate-200" size={25} />
            </div>
            <div className='flex flex-col xsm:mb-2 sm:mb-2'>
              <input
                type="text"
                className='bg-neutral-800 rounded-lg w-full pr-3 pl-12 sm:py-3 xsm:py-2.5 border border-neutral-500 text-slate-300'
                placeholder='Seu email aqui'
                {...register('email')}
                value={email}
              />
              {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
            </div>
          </div>

          <button type="submit"
            className='bg-slate-100 w-full text-neutral-900 text-center mt-4 xsm:py-2.5 sm:py-3 lg:px-8 lg:py-4 xsm:text-base sm:text-md md:text-xl font-bold rounded 
          mb-4 hover:bg-neutral-300 transition-colors'
          >
           Cadastre-se
          </button>
          <div className='flex gap-2 items-center'>
            <ShieldCheck size={25} className='text-green-600' />
            <p className='text-slate-50 sm:text-md xsm:text-sm'>Seus dados estão 100% seguros</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
