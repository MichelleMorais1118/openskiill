import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider, 
    signInWithPopup, User
} from "firebase/auth";
import { auth } from "../firebase/firebaseConnection"; 
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import loginImg from "../assets/padell.png";

function Login() {
    const [displayLogin, setDisplayLogin] = useState(true);
    const [displaySignUp, setDisplaySignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginPasswordInput, setLoginPasswordInput] = useState("");
    const [loginEmailInput, setLoginEmailInput] = useState("");
    const [isLoginFormValid , setIsLoginFormValid] = useState(true);
    const [signUpEmailInput, setSignUpEmailInput] = useState("");
    const [signUpPasswordInput, setSignUpPasswordInput] = useState("");
    const [isSignUpFormValid , setIsSignUpFormValid] = useState(true);
    const [ , setUser] = useState<User>({} as User);

    const errorAlert = (
        <p className="flex justify-center text-red-300">
            Preencha os campos e tente novamente
        </p>
    );

    const handleDisplayCreateAccount = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();

        setDisplayLogin(false);
        setDisplaySignUp(true);
    };

    function  handleGoogleSignIn(){
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth , provider)
        .then((result)=> {
            setUser(result.user);
        })
    }

    const handleDisplayLogin = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();

        setDisplayLogin(true);
        setDisplaySignUp(false);
    };

    const handleInputForm = (
        event: React.FormEvent<HTMLInputElement>,
        state: React.Dispatch<React.SetStateAction<string>>
      ) => {
        const eventTarget = event.currentTarget as HTMLInputElement;
        const eventValue = eventTarget.value;
        
        state(eventValue);
    };

    const handleExecuteLogin =async (
        event: React.MouseEvent<HTMLFormElement, MouseEvent>
    )=> {
        setIsLoading(true);
        event.preventDefault();

        loginEmailInput.trim().length > 0 && loginPasswordInput.trim().length > 0
        ? setIsLoginFormValid(true)
        : setIsLoginFormValid(false);

        await signInWithEmailAndPassword(auth , loginEmailInput, loginPasswordInput)
            .then(()=> {
                toast.success("Bem vindo de Volta!");
                setDisplayLogin(true);
                setDisplaySignUp(false);
                setIsLoading(false);
            })
            .catch((err: {code:string}) => {
                setIsLoading(false);
                if(err.code === "auth/wrong-password"){
                    toast.error("Senha incorreta");
                }else if (err.code ==='auth/user-not-found'){
                    toast.error("Email não existe");
                }else{
                    toast.error("Erro ao fazer login");
                    setIsLoginFormValid(false);
                }
            });

        setLoginEmailInput("");
        setLoginPasswordInput("");
    };

    const handleExecuteSignUp = async (
        event: React.MouseEvent<HTMLFormElement, MouseEvent>
    )=> {
        setIsLoading(true);
        event.preventDefault();

        signUpEmailInput.trim().length > 0 && signUpPasswordInput.trim().length > 0
        ? setIsSignUpFormValid(true)
        : setIsSignUpFormValid(false);

        await createUserWithEmailAndPassword(
            auth,
            signUpEmailInput,
            signUpPasswordInput
        )
            .then(()=>{
                setDisplayLogin(true);
                setDisplaySignUp(false);
                setIsLoading(false);
                toast.success("Usuário criado!");
            })
            .catch((err: {code:string})=>{
                if(err.code === "auth/weak-password"){
                    toast.error("Senha muito fraca, utilize outra senha");
                }else if (err.code ==='auth/email-already-in-use'){
                    toast.error("Email já cadastrado");
                }else{
                    toast.error("Erro os criar usuário");
                }

                setIsLoading(false);
                setIsSignUpFormValid(false);
            });

        setSignUpEmailInput("");
        setSignUpPasswordInput("");
    };
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
            <div className="hidden sm:block">
                <img 
                    className="w-full h-screen object-cover" 
                    src={loginImg} 
                    alt="Padel" 
                />
            </div>

            <div className="flex flex-col justify-center">
                <div className="flex flex-col justify-center itens-center mb-14">
                    <h1 className="text-4xl text-white  text-center font-semibold">
                        Openskill
                    </h1>
                </div>
            
                {displayLogin && (
                    <form  
                        onSubmit={handleExecuteLogin}
                        className="max-w-[400px] w-full mx-auto bg-orange-500 p-8 rounded-lg"
                    >
                        <h2 className="text-4xl dark:text-white font-bold text-center">
                            Login
                        </h2>
                        <div className="flex flex-col text-white py-2">
                            <label>Email</label>
                            <input type="email" 
                            value={loginEmailInput}
                            onChange={(e) => handleInputForm(e,setLoginEmailInput)}
                            className= {`rounded-lg mt-2 p-2 ${
                                isLoginFormValid 
                                    ?   'bg-orange-400 focus:bg-orange-600' 
                                    : 'bg-red-700 focus:bg-red-800'
                            } focus:bg-orange-300  focus:outline-none focus:placeholder-transparent border-2 border-orange-700`}
                            placeholder="Digite seu email"
                            />
                        </div>
                        <div className="flex flex-col text-white py-2">
                            <label>Senha</label>
                            <input type="password" 
                            className= {`rounded-lg mt-2 p-2 ${
                                isLoginFormValid 
                                    ?   'bg-orange-400 focus:bg-orange-600' 
                                    : 'bg-red-700 focus:bg-red-800'
                            } focus:bg-orange-300  focus:outline-none focus:placeholder-transparent border-2 border-orange-700`}
                            placeholder="Digite sua senha"
                            value={loginPasswordInput}
                            onChange={(e) => handleInputForm(e,setLoginPasswordInput)}
                            />
                        </div>
                        <div className="flex justify-center text-white py-2 hover:cursor-poiter hover:animate-pulse ">
                            <button 
                            type="button" 
                            onClick = {(event)=> handleDisplayCreateAccount(event)}>
                                Criar conta
                            </button>
                        </div>
                        {!isLoginFormValid && errorAlert}
                        <button
                            disabled= {isLoading}
                            type="submit" 
                            className="w-full my-5 py-2 bg-orange-500 shadow-lg enabled:hover:shadow-orange-500/40 text-white font-semibold disabled:bg-orange-400 disable:shadow-none enabled:shadow-orange-500/50"
                        >
                            {isLoading ? "Carregando...": "Fazer Login"}
                        </button>
                        <button  
                        onClick={handleGoogleSignIn}
                        type="submit"
                        className="w-full my-5 py-2 bg-orange-500 shadow-lg enable:hover:shadow-orange-500/40 text-white font-semibold rounded-lg disabled:bg-orange-400 disabled:shadow-none enabled:shadow-orange-500/50"
                        >
                            Entrar com google 
                        </button>
                    </form>
                )}

                {displaySignUp && (
                    <form 
                    onSubmit={handleExecuteSignUp}
                    className="max-w-[400px] w-full mx-auto bg-orange-500 p-8 px-8 rouded-lg">
                        <h2 className="text-4xl dark:text-white font-bold text-center">
                            Criar conta 
                        </h2>

                        <div className="flex flex-col text-white py-2">
                            <label>Email</label>
                            <input 
                            value={signUpEmailInput}
                            onChange={(e) => handleInputForm(e,setSignUpEmailInput)}
                            type="email"
                            className= {`rounded-lg mt-2 p-2 ${
                                isSignUpFormValid 
                                    ? 'bg-orange-400 focus:bg-orange-600' 
                                    : 'bg-red-700 focus:bg-red-800'
                            } focus:bg-orange-300  focus:outline-none focus:placeholder-transparent border-2 border-orange-700`}
                            placeholder="Digite seu email"
                            />
                        </div>

                        <div className="flex flex-col text-white py-2">
                            <label>Senha</label>
                            <input 
                            value={signUpPasswordInput}
                            onChange={(e) => handleInputForm(e,setSignUpPasswordInput)}
                            type="password"
                            className= {`rounded-lg mt-2 p-2 ${
                                isSignUpFormValid 
                                    ? 'bg-orange-400 focus:bg-orange-600' 
                                    : 'bg-red-700 focus:bg-red-800'
                            } focus:bg-orange-300  focus:outline-none focus:placeholder-transparent border-2 border-orange-700`}
                            placeholder="Crie sua senha"
                            />
                        </div>
                        <div className="flex justify-center text-white py-2 hover:cursor-pointer hover:animate-pulse">
                            <button onClick={(event) => handleDisplayLogin(event)} type="button">
                                Fazer Login
                            </button>
                        </div>
                        {!isSignUpFormValid && errorAlert}
                        <button  
                        disabled={isLoading}
                        type="submit"
                        className="w-full my-5 py-2 bg-orange-500 shadow-lg enable:hover:shadow-orange-500/40 text-white font-semibold rounded-lg disabled:bg-orange-400 disabled:shadow-none enabled:shadow-orange-500/50"
                        >
                            {isLoading ? 'Carregando...':'Criar Conta'}
                        </button>
                        <button  
                        onClick={handleGoogleSignIn}
                        type="submit"
                        className="w-full my-5 py-2 bg-orange-500 shadow-lg enable:hover:shadow-orange-500/40 text-white font-semibold rounded-lg disabled:bg-orange-400 disabled:shadow-none enabled:shadow-orange-500/50"
                        >
                            Entrar com google 
                        </button>
                    </form>
                ) }
            </div>
        </div>
    );
}



export default Login;