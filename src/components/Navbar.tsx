import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import {auth} from "../firebase/firebaseConnection";
import { useState, useRef, Fragment } from "react";
import { Transition, Dialog } from '@headlessui/react';



function Navbar(){

    const [isLoading,setIsLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isNewGameFormValid, setIsNewGameFormValid] = useState(true);
    const cancelButtonRef = useRef(null);
    const [gameJogadorUmInput,setGameJogadorUmImput] = useState("");
    const [gameJogadorDoisInput,setGameJogadorDoisImput] = useState("");
    const [gameJogadorTresInput,setGameJogadorTresImput] = useState("");
    const [gameJogadorQuatroInput,setGameJogadorQuatroImput] = useState("");

    const handleSignOut = async()=> {
        await signOut(auth)
        .then(()=> toast.success("Logout feito com sucesso"))
        .catch(()=> toast.error("Ocorreu um erro, tente novamente"));

    };

    const handleInputForm = (
        event: React.FormEvent<HTMLInputElement>,
        state: React.Dispatch<React.SetStateAction<string>>
      ) => {
        const eventTarget = event.currentTarget as HTMLInputElement;
        const eventValue = eventTarget.value;
        
        state(eventValue);
    };

    const handleCreateNewGame = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        
        if(gameJogadorUmInput.trim().length > 0 && gameJogadorDoisInput.trim().length > 0 && gameJogadorTresInput.trim().length > 0 && gameJogadorQuatroInput.trim().length > 0){
           setIsNewGameFormValid(true);
        } else {
            setIsNewGameFormValid(false);
        }

    };

    

    return(
        <>
            {/*bleh*/}
            <div className="w-full mx-auto flex flex-wrap gap-5 p-5 flex-col md:flex-row items-center bg-orange-700">
                <button

                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center rounded-md bg-red-500 px-3 py-2 text-sm fornt-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 border-0 mt-4 nd:mt-0"
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
        
                Sair
                </button>

                <div 
                className="md:ml-auto md:mr:auto flex flex-wrap items-center text-base justify-center"
                >
                    <h1 className="text-4xl text-white font-mono">Openskill</h1>
                </div>

                <button
                onClick={()=> setOpenModal(!openModal)}
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-orange-500 shadow-sm hover:bg-yellow-50  focus-visible:outline focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-white border-0 mt-4 md:mt-0 "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Adicionar Jogo   
                </button>
            </div>

            <Transition.Root show = {openModal} as={Fragment}>
                <Dialog 
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setOpenModal}
                >
                    <Transition.Child
                        as={Fragment}
                        enter ="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacitym-0"
                    >
                        <div className="fixed inset-0 bg-white bgopacity-75 transition-opacity"/>
                            
                        
                    </Transition.Child>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                        as={Fragment}
                        enter ="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacitym-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel>
                            <div className="flex flex-col justify-center h-min">
                                <form onSubmit={handleCreateNewGame} className="max-w-[400px] w-full mx-auto bg-white p-8 px-8 rounded-lg">
                                    <h2 className="text-3xl mb-5 dark:text-white font-bold text-center">
                                        Registre o Jogo
                                    </h2>

                                    <div className="flex flex-col text-start text-yellow-400 py-2">
                                        <label>Jogador 1</label>
                                        <input type="text" 
                                            onChange={(event)=> handleInputForm(event,setGameJogadorUmImput)}
                                            placeholder="Nome do Jogador"
                                            className={`w-full rounded-lg mt p-2 ${
                                                isNewGameFormValid
                                                ?` bg-orange-600 focus:bg-orange-700`
                                                :` bg-red-700 focus:bg-red-800`
                                            } bg-orange-600 focus:bg-orange-800 border-2 border-orange-800 focus:border-orange-700`}
                                        />
                                    </div>

                                    <div className="flex flex-col text-start text-yellow-400 py-2">
                                        <label>Jogador 2</label>
                                        <input type="text" 
                                            onChange={(event)=> handleInputForm(event,setGameJogadorDoisImput)}
                                            placeholder="Nome do Jogador"
                                            className={`w-full rounded-lg mt p-2 ${
                                                isNewGameFormValid
                                                ?` bg-orange-600 focus:bg-orange-700`
                                                :` bg-red-700 focus:bg-red-800`
                                            } bg-orange-600 focus:bg-orange-800 border-2 border-orange-800 focus:border-orange-700`}
                                        />
                                    </div>

                                    <div className="flex flex-col text-start text-yellow-400 py-2">
                                        <label>Jogador 3</label>
                                        <input type="text" 
                                            onChange={(event)=> handleInputForm(event,setGameJogadorTresImput)}
                                            placeholder="Nome do Jogador"
                                            className={`w-full rounded-lg mt p-2 ${
                                                isNewGameFormValid
                                                ?` bg-orange-600 focus:bg-orange-700`
                                                :` bg-red-700 focus:bg-red-800`
                                            } bg-orange-600 focus:bg-orange-800 border-2 border-orange-800 focus:border-orange-700`}
                                        />
                                    </div>

                                    <div className="flex flex-col text-start text-yellow-400 py-2">
                                        <label>Jogador 4</label>
                                        <input type="text" 
                                            onChange={(event)=> handleInputForm(event,setGameJogadorQuatroImput)}
                                            placeholder="Nome do Jogador"
                                            className={`w-full rounded-lg mt p-2 ${
                                                isNewGameFormValid
                                                ?` bg-orange-600 focus:bg-orange-700`
                                                :` bg-red-700 focus:bg-red-800`
                                            } bg-orange-600 focus:bg-orange-800 border-2 border-orange-800 focus:border-orange-700`}
                                        />
                                    </div>

                                    <button
                                    disabled={isLoading}
                                    type="submit"
                                    className="w-full my-5 py-2 bg-orange-500 shadow-lg  enabled:hover:shadow-orange-500/40 text-white font-semibold rounded-lg disabled:bg-orange-400 disabled:shadow-none enabled:shadow-orange-500/50"
                                    >
                                        {isLoading ? "Registrando ":"Registrar"}
                                    </button>
                                    
                                    <button
                                    onClick={()=> setOpenModal(false)}
                                    disabled={isLoading}
                                    type="button"
                                    className="w-full  py-2 bg-red-500 shadow-lg  enabled:hover:shadow-red-500/40 text-white font-semibold rounded-lg disabled:bg-red-400 disabled:shadow-none enabled:shadow-red-500/50"
                                    >
                                       Cancelar 
                                    </button>

                                </form>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root> 
        </>
    )
}

export default Navbar;