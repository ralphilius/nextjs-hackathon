import { useAuth } from "../hooks/use-auth";

function isValidEmail(email): boolean {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const AuthPage = () => {
  const { signinWithEmail, signinWithProvider } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [emailSent, setEmailSent] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-5">
        <div className="bg-white py-8 px-10 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-2">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => {
                    if(!isValidEmail(email) && email.length > 0) setInvalidEmail(true);
                  }}
                  onInput={() => {
                    setInvalidEmail(false);
                    setEmailSent(false);
                  }}
                />
              </div>
            </div>
            {emailSent && <div className="p-2 text-xs text-green-700">
              We sent an email to you (<b>{email}</b>). It has a magic link that&apos;ll sign you in. Please also check your Spam inbox!
            </div>}

            {invalidEmail && <div className="p-2 text-xs text-red-700">
              Please enter a valid email address.
            </div>}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={(e) => {
                  e.preventDefault();
                  if(isValidEmail(email)){
                    signinWithEmail(email).then(user => {
                      setEmailSent(true);
                    });
                  } else {
                    setInvalidEmail(true)
                  }
                 
                }}
              >
                Sign in with magic link
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <div>
                <a
                  onClick={() => {
                    signinWithProvider('facebook');
                  }}
                  className="w-full flex justify-center space-x-2 py-3 px-6 border border-gray-300 rounded-md shadow-sm bg-white text-gray-500 hover:bg-gray-50 cursor-pointer"
                >
                  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="flex-grow text-base text-center">Continue with Facebook</span>
                </a>
              </div>

              <div>
                <a
                  onClick={() => {
                    signinWithProvider('github');
                  }}
                  className="w-full flex justify-center space-x-2 py-3 px-6 border border-gray-300 rounded-md shadow-sm bg-white text-gray-500 hover:bg-gray-50 cursor-pointer"
                >
                  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="flex-grow text-base text-center">Continue with GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage;