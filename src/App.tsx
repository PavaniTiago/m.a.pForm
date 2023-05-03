import './App.css'
import { User, EnvelopeSimple, ShieldCheck } from "@phosphor-icons/react"

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useState } from 'react'

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
    .email('Formato de e-mail inválido')
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
  }

  return (
    <div className='min-h-screen bg-slate-600 overflow-hidden'>
      <div className='w-full'>
        <img src="/src/assets/bg.jpg" alt="fundo com fotos de cabelos feito pela alessandra pavani" className='w-full h-screen absolute object-cover brightness-50' />
        <div className="absolute bottom-0 left-0 right-0 h-[100rem] bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>
      <div className='absolute flex items-end h-screen justify-evenly w-full overflow-hidden'>
        <img src="/src/assets/alessandraPavani.png" alt="foto de alessandra pavani" className='md:h-[39rem] 3xl:h-[50rem] z-10' />
        <div className='w-[35rem] h-[35rem] 3xl:w-[40rem] 3xl:h-[40rem] rounded-full absolute bg-[#B97748] blur-[230px] right-[50rem] 3xl:right-[65rem] top-[20rem] 3xl:top-[35rem]'></div>
        <form onSubmit={handleSubmit(createData)} className='flex flex-col justify-center items-center w-[30rem] h-[50rem] 3xl:w-[35rem] 3xl:h-[65rem] z-10'>
          <img src="/src/assets/logo.png" alt="log do studio alessandra pavani" className='p-16 object-cover pb-6 brightness-150' />
          <h1 className='text-3xl font-bold text-center text-slate-100 pb-6'>Não perca nenhuma de nossas lives 100% online e gratuito</h1>
          <p className='text-lg text-neutral-400 pb-4'>Embarque gratuitamente para receber acesso ao evento:</p>
          <div className='relative w-full'>
            <div className='flex pointer-events-none absolute pl-3 py-4 items-center'>
              <User className="text-slate-200" size={25} />
            </div>
            <div className='flex flex-col mb-4'>
              <input
                type="text"
                className='bg-neutral-800 rounded-md w-full pr-3 pl-12 py-4  border border-neutral-900 text-slate-300'
                placeholder='Seu nome completo'
                {...register('name')}
                value={name}
              />
              {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
            </div>
          </div>

          <div className='relative w-full'>
            <div className='flex pointer-events-none absolute pl-3 py-[18px]'>
              <EnvelopeSimple className="text-slate-200" size={25} />
            </div>
            <div className='flex flex-col mb-4'>
              <input
                type="text"
                className='bg-neutral-800 rounded-md w-full pr-3 pl-12 py-4 border border-neutral-900 text-slate-300'
                placeholder='Seu email aqui'
                {...register('email')}
                value={email}
              />
              {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
            </div>
          </div>

          <button type="submit"
            className='bg-slate-100 w-full text-neutral-900 text-center mt-4 px-8 py-4 text-lg font-bold rounded 
          mb-4 hover:bg-neutral-300 transition-colors'
          >
            QUERO ACOMPANHAR TUDO
          </button>
          <div className='flex gap-2'>
            <ShieldCheck size={25} className='text-green-600' />
            <p className='text-slate-50'>Seus dados estão 100% seguros</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
