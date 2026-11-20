
export default function LoginSignup({ mode = "login" }) {
    const isSignup = mode === "signup"

    return (
        <main className="info-page">
            <h1>{isSignup ? "Create an account" : "Login"}</h1>
            <p>
                {isSignup
                    ? "Account registration is not available yet. Please check back soon."
                    : "Account login is not available yet. Please check back soon."}
            </p>
        </main>
    )
}
