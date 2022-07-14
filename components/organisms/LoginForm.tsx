import { useCreateWordForm } from "../../hooks/useCreateWordForm";

const LoginForm = () => {
  const {
    text,
    level,
    handleSubmit,
    textFormError,
    setTextFormError,
    setText,
    setLevel,
  } = useCreateWordForm();

  return (
    <>
      <section>
        <div className="flex flex-col justify-center sm:px-6 lg:px-8">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-4 py-8 sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-700"
                  >
                    E-mail
                  </label>
                  <div className="mt-1">
                    <input
                      id="text"
                      name="text"
                      placeholder="E-mail"
                      maxLength={5}
                      minLength={5}
                      value={text}
                      onChange={(event) => setText(event.target.value)}
                      required
                      className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="level"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="level"
                      name="level"
                      placeholder="Password"
                      value={level}
                      onChange={(event) => setLevel(event.target.value)}
                      className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={!text || !level}
                    className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-green-400 rounded-xl hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Log in
                  </button>
                </div>
              </form>
              {textFormError && (
                <p className="mt-5 text-red-600">{textFormError}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default LoginForm;
